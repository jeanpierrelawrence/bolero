export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.buffers = new Map();   // stemPath -> AudioBuffer
    this.gainNodes = new Map(); // stemPath -> GainNode
    this.sources = new Map();   // stemPath -> AudioBufferSourceNode
    this.startTime = 0;
    this.pausedAt = 0;
    this.isPlaying = false;
  }

  // Initialize AudioContext on user gesture to bypass browser autoplay rules
  initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Accepts either the STEMS object, SECTIONS array, or an array of URLs.
   */
  async loadStems(stemsInput, onProgress) {
    this.initContext();

    // Dynamically extract unique stem URLs regardless of input structure
    let uniqueStems = [];
    if (Array.isArray(stemsInput)) {
      uniqueStems = [...new Set(stemsInput.flatMap(s => 
        typeof s === 'string' ? s : (s.featuredStems || s.stem || [])
      ))];
    } else if (typeof stemsInput === 'object' && stemsInput !== null) {
      uniqueStems = [...new Set(Object.values(stemsInput))];
    }

    if (uniqueStems.length === 0) {
      console.warn("AudioEngine: No stem URLs found to load.");
      return;
    }

    let loadedCount = 0;

    await Promise.all(
      uniqueStems.map(async (stemPath) => {
        try {
          const response = await fetch(stemPath);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status} - File not found at ${stemPath}`);
          }

          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);

          this.buffers.set(stemPath, audioBuffer);

          // Route each stem through an individual GainNode connected to destination
          const gainNode = this.ctx.createGain();
          gainNode.gain.setValueAtTime(1.0, this.ctx.currentTime);
          gainNode.connect(this.ctx.destination);
          this.gainNodes.set(stemPath, gainNode);

          loadedCount++;
          if (onProgress) {
            onProgress(loadedCount / uniqueStems.length);
          }
        } catch (error) {
          console.error(`Failed to load stem (${stemPath}):`, error);
        }
      })
    );
  }

  // Play all loaded stems synchronously at a specific time offset (in seconds)
  play(offset = this.pausedAt) {
    if (this.buffers.size === 0) {
      console.warn("AudioEngine: Cannot play because no audio buffers are loaded.");
      return;
    }

    if (this.isPlaying) this.pause();
    this.initContext();

    this.startTime = this.ctx.currentTime - offset;

    this.buffers.forEach((buffer, stemPath) => {
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.gainNodes.get(stemPath));
      
      // Sample-aligned playback start
      source.start(0, offset);
      this.sources.set(stemPath, source);
    });

    this.isPlaying = true;
  }

  // Pause playback and preserve location
  pause() {
    if (!this.isPlaying) return;

    this.pausedAt = this.getCurrentTime();
    this.sources.forEach(source => {
      try { source.stop(); } catch (_) {}
    });
    this.sources.clear();
    this.isPlaying = false;
  }

  // Jump to a specific timestamp in seconds
  seek(seconds) {
    const wasPlaying = this.isPlaying;
    if (this.isPlaying) this.pause();
    this.pausedAt = seconds;
    if (wasPlaying) this.play(seconds);
  }

  // Real-time volume/isolation control for individual stems (0.0 to 1.0)
  setStemVolume(stemPath, volume, fadeDuration = 0.05) {
    const gainNode = this.gainNodes.get(stemPath);
    if (gainNode) {
      gainNode.gain.linearRampToValueAtTime(
        volume,
        this.ctx.currentTime + fadeDuration
      );
    }
  }

  // Returns current playback offset in seconds
  getCurrentTime() {
    if (!this.isPlaying) return this.pausedAt;
    return this.ctx.currentTime - this.startTime;
  }
}