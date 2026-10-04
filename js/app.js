import { renderHeader } from './components/Header.js';
import { renderHero } from './components/Hero.js';
import { renderAudioPlayer } from './components/AudioPlayer.js';
import { initNavEvents } from './modules/visuals.js';
import { SECTIONS } from './modules/timeline.js';
import { AudioEngine } from './modules/audio.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render UI Components
  const siteHeader = document.getElementById('siteHeader');
  const heroContainer = document.getElementById('heroContainer');
  const playerContainer = document.getElementById('playerContainer');

  if (siteHeader) siteHeader.innerHTML = renderHeader();
  if (heroContainer) heroContainer.innerHTML = renderHero();
  if (playerContainer) {playerContainer.innerHTML = renderAudioPlayer();}
  
  // Initialize navigation interactions
  initNavEvents();

  // 2. Initialize Audio Engine
  const audio = new AudioEngine();
  const playBtn = document.getElementById('playBtn');

  if (!playBtn) return;

  // 3. Audio Button Event Listener
  playBtn.addEventListener('click', async () => {
    if (audio.isPlaying) {
      audio.pause();
      playBtn.textContent = 'RESUME AUDIO';
      return;
    }

    // Preload stems on first user gesture
    if (audio.buffers.size === 0) {
      playBtn.disabled = true;
      playBtn.textContent = 'LOADING STEMS (0%)...';

      await audio.loadStems(SECTIONS, (progress) => {
        const percent = Math.round(progress * 100);
        playBtn.textContent = `LOADING STEMS (${percent}%)...`;
      });

      playBtn.disabled = false;
    }

    audio.play();
    playBtn.textContent = 'PAUSE AUDIO';
  });
});