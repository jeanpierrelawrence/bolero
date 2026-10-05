import { renderHeader } from './components/Header.js';
import { renderHero } from './components/Hero.js';
import { 
  renderAudioPlayer, 
  updatePlayerPlaybackState, 
  updatePlayerMeta, 
  updatePlayerSoloState 
} from './components/AudioPlayer.js';
import { renderTimeline } from './components/Timeline.js';
import { initNavScroll, initCardObserver, setActiveNavPill } from './modules/visuals.js';
import { SECTIONS, STEMS } from './modules/timeline.js';
import { AudioEngine } from './modules/audio.js';

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('siteHeader').innerHTML = renderHeader();
  document.getElementById('heroContainer').innerHTML = renderHero();
  document.getElementById('playerContainer').innerHTML = renderAudioPlayer();
  document.getElementById('timelineContainer').innerHTML = renderTimeline();

  initNavScroll();
  const audio = new AudioEngine();

  let currentSectionIndex = 0;
  let isSoloMode = false;

  const applyIsolation = () => {
    const featured = SECTIONS[currentSectionIndex].featuredStems || [];
    Object.values(STEMS).forEach(stem => {
      audio.setStemVolume(stem, isSoloMode ? (featured.includes(stem) ? 1.0 : 0.05) : 1.0);
    });
  };

  const jumpTo = async (index) => {
    if (index < 0 || index >= SECTIONS.length) return;
    currentSectionIndex = index;
    const section = SECTIONS[index];

    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });

    if (audio.buffers.size === 0) await audio.loadStems(STEMS);
    audio.seek(section.time);
    applyIsolation();

    if (!audio.isPlaying) audio.play(section.time);
    updatePlayerPlaybackState(true);
  };

  document.getElementById('playBtn')?.addEventListener('click', async () => {
    if (audio.buffers.size === 0) await audio.loadStems(STEMS);
    audio.isPlaying ? audio.pause() : audio.play();
    updatePlayerPlaybackState(audio.isPlaying);
  });

  document.getElementById('playerPlayBtn')?.addEventListener('click', async () => {
    if (audio.buffers.size === 0) await audio.loadStems(STEMS);
    audio.isPlaying ? audio.pause() : audio.play();
    updatePlayerPlaybackState(audio.isPlaying);
  });

  document.getElementById('playerPrevBtn')?.addEventListener('click', () => jumpTo(currentSectionIndex - 1));
  document.getElementById('playerNextBtn')?.addEventListener('click', () => jumpTo(currentSectionIndex + 1));

  document.getElementById('soloToggleBtn')?.addEventListener('click', () => {
    isSoloMode = !isSoloMode;
    updatePlayerSoloState(isSoloMode);
    applyIsolation();
  });

  initCardObserver((sectionId, index) => {
    currentSectionIndex = index;
    const section = SECTIONS[index];

    setActiveNavPill(sectionId);
    updatePlayerMeta(section.instrument, section.title);
    if (isSoloMode) applyIsolation();
  });

  document.addEventListener('click', (e) => {
    const seekBtn = e.target.closest('.btn-card-seek');
    if (seekBtn) {
      const idx = SECTIONS.findIndex(s => s.id === seekBtn.dataset.sectionId);
      if (idx !== -1) jumpTo(idx);
    }
  });
});