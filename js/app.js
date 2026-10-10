import { renderHeader } from './components/Header.js';
import { renderHero, updateHeroMusicBrainzMeta } from './components/Hero.js';
import { 
  renderAudioPlayer, 
  updatePlayerPlaybackState, 
  updatePlayerMeta, 
  updatePlayerSoloState,
  setPlayerBuffering,
  updateVolumeIcon
} from './components/AudioPlayer.js';
import { renderTimeline } from './components/Timeline.js';
import { updateCardApiMeta } from './components/TimelineCard.js';
import { 
  renderPreloader, 
  updatePreloaderProgress, 
  enablePreloaderStart 
} from './components/Preloader.js';
import { initNavScroll, initCardObserver, setActiveNavPill } from './modules/visuals.js';
import { SECTIONS, STEMS } from './modules/timeline.js';
import { AudioEngine } from './modules/audio.js';
import { fetchWikipediaSummary, fetchMusicBrainzWork } from './modules/api.js';

document.addEventListener('DOMContentLoaded', async () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  document.body.classList.add('is-loading');
  document.documentElement.classList.add('is-loading');

  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.insertAdjacentHTML('afterbegin', renderPreloader());
  }

  document.getElementById('siteHeader').innerHTML = renderHeader();
  document.getElementById('heroContainer').innerHTML = renderHero();
  document.getElementById('playerContainer').innerHTML = renderAudioPlayer();
  document.getElementById('timelineContainer').innerHTML = renderTimeline();

  initNavScroll();
  const audio = new AudioEngine();

  let currentSectionIndex = 0;
  let isSoloMode = false;
  let isManualJumping = false;
  let monitorFrameId = null;

  const volumeSlider = document.getElementById('volumeSlider');
  const muteBtn = document.getElementById('muteBtn');

  volumeSlider?.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    audio.setMasterVolume(val);
    updateVolumeIcon(audio.isMuted, val);
  });

  muteBtn?.addEventListener('click', () => {
    const isMuted = audio.toggleMute();
    updateVolumeIcon(isMuted, parseFloat(volumeSlider?.value || '1'));
  });

  const getSectionStems = (index) => {
    const section = SECTIONS[index];
    if (!section) return SECTIONS[0].activeStems;
    return section.activeStems || Object.values(STEMS);
  };

  const applyIsolation = () => {
    const featured = SECTIONS[currentSectionIndex]?.featuredStems || [];
    Object.values(STEMS).forEach(stem => {
      audio.setStemVolume(stem, isSoloMode ? (featured.includes(stem) ? 1.0 : 0.05) : 1.0);
    });
  };

  const initApiMetadata = async () => {
    // 1. Fetch MusicBrainz meta for Hero
    fetchMusicBrainzWork().then(mbData => {
      if (mbData) updateHeroMusicBrainzMeta(mbData);
    });

    // 2. Parallel fetch Wikipedia summaries for all cards
    SECTIONS.forEach(async (section) => {
      if (section.wikiTitle) {
        const data = await fetchWikipediaSummary(section.wikiTitle);
        if (data) {
          updateCardApiMeta(section.id, data);
        }
      }
    });
  };

  // Run API fetch immediately on boot
  initApiMetadata();

  const startPlaybackMonitor = () => {
    const checkPlayback = async () => {
      if (!audio.isPlaying) return;

      const currentTime = audio.getCurrentTime();

      let activeIndex = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        if (currentTime >= SECTIONS[i].time) {
          activeIndex = i;
        } else {
          break;
        }
      }

      const activeSectionStems = getSectionStems(activeIndex);
      if (!audio.hasStems(activeSectionStems)) {
        await audio.ensureStems(activeSectionStems);
      }

      if (activeIndex !== currentSectionIndex && !isManualJumping) {
        currentSectionIndex = activeIndex;
        const section = SECTIONS[activeIndex];
        setActiveNavPill(section.id);
        updatePlayerMeta(section.instrument, section.title);
        applyIsolation();

        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
      }

      const nextIndex = activeIndex + 1;
      if (nextIndex < SECTIONS.length) {
        const nextSectionTime = SECTIONS[nextIndex].time;
        if (nextSectionTime - currentTime <= 25) {
          const nextStems = getSectionStems(nextIndex);
          if (!audio.hasStems(nextStems)) {
            audio.ensureStems(nextStems);
          }
        }
      }

      monitorFrameId = requestAnimationFrame(checkPlayback);
    };

    if (monitorFrameId) cancelAnimationFrame(monitorFrameId);
    monitorFrameId = requestAnimationFrame(checkPlayback);
  };

  const stopPlaybackMonitor = () => {
    if (monitorFrameId) {
      cancelAnimationFrame(monitorFrameId);
      monitorFrameId = null;
    }
  };

  const jumpTo = async (index) => {
    if (index < 0 || index >= SECTIONS.length) return;
    isManualJumping = true;
    currentSectionIndex = index;
    const section = SECTIONS[index];

    setActiveNavPill(section.id);
    updatePlayerMeta(section.instrument, section.title);

    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });

    const requiredStems = getSectionStems(index);
    if (!audio.hasStems(requiredStems)) {
      setPlayerBuffering(true, 'Buffering Stems...');
      await audio.ensureStems(requiredStems);
      setPlayerBuffering(false);
    }

    updatePlayerMeta(section.instrument, section.title);
    audio.seek(section.time);
    applyIsolation();

    if (!audio.isPlaying) {
      audio.play(section.time);
    }
    startPlaybackMonitor();
    updatePlayerPlaybackState(true);

    setTimeout(() => {
      isManualJumping = false;
    }, 800);
  };

  const handleInitialPlay = async () => {
    const initialStems = getSectionStems(currentSectionIndex);

    if (!audio.hasStems(initialStems)) {
      updatePlayerMeta('Initializing', 'Loading Audio...');
      await audio.ensureStems(initialStems);
    }

    if (audio.isPlaying) {
      audio.pause();
      stopPlaybackMonitor();
      updatePlayerPlaybackState(false);
    } else {
      audio.play();
      startPlaybackMonitor();
      updatePlayerPlaybackState(true);
      const section = SECTIONS[currentSectionIndex];
      updatePlayerMeta(section.instrument, section.title);
    }
  };

  const initialStemsToLoad = getSectionStems(1);

  await audio.ensureStems(initialStemsToLoad, (progress) => {
    updatePreloaderProgress(progress * 100, 'Decoding baseline stems...');
  });

  updatePreloaderProgress(100, 'Auditorium ready');
  enablePreloaderStart(() => {
    document.body.classList.remove('is-loading');
    document.documentElement.classList.remove('is-loading');
    window.scrollTo(0, 0);

    audio.play();
    startPlaybackMonitor();
    updatePlayerPlaybackState(true);
    const section = SECTIONS[0];
    updatePlayerMeta(section.instrument, section.title);
  });

  document.getElementById('playBtn')?.addEventListener('click', handleInitialPlay);
  document.getElementById('playerPlayBtn')?.addEventListener('click', handleInitialPlay);

  document.getElementById('playerPrevBtn')?.addEventListener('click', () => jumpTo(currentSectionIndex - 1));
  document.getElementById('playerNextBtn')?.addEventListener('click', () => jumpTo(currentSectionIndex + 1));

  document.getElementById('soloToggleBtn')?.addEventListener('click', () => {
    isSoloMode = !isSoloMode;
    updatePlayerSoloState(isSoloMode);
    applyIsolation();
  });

  initCardObserver((sectionId, index) => {
    if (isManualJumping || audio.isPlaying) return;

    currentSectionIndex = index;
    const section = SECTIONS[index];

    setActiveNavPill(sectionId);
    updatePlayerMeta(section.instrument, section.title);
    if (isSoloMode) applyIsolation();
  });

  document.addEventListener('click', (e) => {
    const navPill = e.target.closest('.nav-pill');
    if (navPill) {
      e.preventDefault();
      const sectionId = navPill.dataset.section;
      const idx = SECTIONS.findIndex(s => s.id === sectionId);
      if (idx !== -1) jumpTo(idx);
      return;
    }

    const seekBtn = e.target.closest('.btn-card-seek');
    if (seekBtn) {
      const idx = SECTIONS.findIndex(s => s.id === seekBtn.dataset.sectionId);
      if (idx !== -1) jumpTo(idx);
    }
  });
});