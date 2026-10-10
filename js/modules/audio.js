export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGainNode = null;
    this.buffers = new Map();
    this.gainNodes = new Map();
    this.sources = new Map();
    this.loadingPromises = new Map();
    this.startTime = 0;
    this.pausedAt = 0;
    this.isPlaying = false;
    this.masterVolume = 1.0;
    this.isMuted = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      this.masterGainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  hasStems(stemPaths) {
    return stemPaths.every(path => this.buffers.has(path));
  }

  async loadStem(stemPath) {
    if (this.buffers.has(stemPath)) {
      return this.buffers.get(stemPath);
    }
    if (this.loadingPromises.has(stemPath)) {
      return this.loadingPromises.get(stemPath);
    }

    const promise = (async () => {
      try {
        const response = await fetch(stemPath);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} at${stemPath}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);

        this.buffers.set(stemPath, audioBuffer);

        const gainNode = this.ctx.createGain();
        gainNode.gain.setValueAtTime(1.0, this.ctx.currentTime);
        gainNode.connect(this.masterGainNode);
        this.gainNodes.set(stemPath, gainNode);

        if (this.isPlaying && !this.sources.has(stemPath)) {
          const currentOffset = this.getCurrentTime();
          if (currentOffset < audioBuffer.duration) {
            const source = this.ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(gainNode);
            source.start(0, currentOffset);
            this.sources.set(stemPath, source);
          }
        }

        return audioBuffer;
      } catch (error) {
        console.error(`Failed to load stem (${stemPath}):`, error);
      } finally {
        this.loadingPromises.delete(stemPath);
      }
    })();

    this.loadingPromises.set(stemPath, promise);
    return promise;
  }

  async ensureStems(stemsInput, onProgress) {
    this.initContext();

    let uniqueStems = [];
    if (Array.isArray(stemsInput)) {
      uniqueStems = [...new Set(stemsInput.flatMap(s => 
        typeof s === 'string' ? s : (s.featuredStems || s.stem || [])
      ))];
    } else if (typeof stemsInput === 'object' && stemsInput !== null) {
      uniqueStems = [...new Set(Object.values(stemsInput))];
    }

    if (uniqueStems.length === 0) return;

    let loadedCount = 0;
    const total = uniqueStems.length;

    await Promise.all(
      uniqueStems.map(async (stemPath) => {
        await this.loadStem(stemPath);
        loadedCount++;
        if (onProgress) {
          onProgress(loadedCount / total);
        }
      })
    );
  }

  play(offset = this.pausedAt) {
    if (this.buffers.size === 0) return;

    if (this.isPlaying) this.pause();
    this.initContext();

    this.startTime = this.ctx.currentTime - offset;

    this.buffers.forEach((buffer, stemPath) => {
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.gainNodes.get(stemPath));
      
      source.start(0, offset);
      this.sources.set(stemPath, source);
    });

    this.isPlaying = true;
  }

  pause() {
    if (!this.isPlaying) return;

    this.pausedAt = this.getCurrentTime();
    this.sources.forEach(source => {
      try { source.stop(); } catch (_) {}
    });
    this.sources.clear();
    this.isPlaying = false;
  }

  seek(seconds) {
    const wasPlaying = this.isPlaying;
    if (this.isPlaying) this.pause();
    this.pausedAt = seconds;
    if (wasPlaying) this.play(seconds);
  }

  setStemVolume(stemPath, volume, fadeDuration = 0.05) {
    const gainNode = this.gainNodes.get(stemPath);
    if (gainNode) {
      gainNode.gain.linearRampToValueAtTime(
        volume,
        this.ctx.currentTime + fadeDuration
      );
    }
  }

  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGainNode && !this.isMuted) {
      this.masterGainNode.gain.linearRampToValueAtTime(
        this.masterVolume,
        this.ctx.currentTime + 0.05
      );
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGainNode) {
      const targetVol = this.isMuted ? 0 : this.masterVolume;
      this.masterGainNode.gain.linearRampToValueAtTime(
        targetVol,
        this.ctx.currentTime + 0.05
      );
    }
    return this.isMuted;
  }

  getCurrentTime() {
    if (!this.isPlaying) return this.pausedAt;
    return this.ctx.currentTime - this.startTime;
  }
}