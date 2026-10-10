export function renderAudioPlayer() {
  return `
    <div class="floating-player" id="floatingPlayer">
      <div class="player-controls">
        <button id="playerPrevBtn" class="player-btn" type="button" aria-label="Previous Section" title="Previous Entrance">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
        </button>

        <button id="playerPlayBtn" class="player-btn player-btn-primary" type="button" aria-label="Play or Pause" title="Play/Pause">
          <span id="playerPlayIcon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </span>
        </button>

        <button id="playerNextBtn" class="player-btn" type="button" aria-label="Next Section" title="Next Entrance">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
        </button>
      </div>

      <div class="player-info">
        <span class="player-instrument" id="playerInstrumentLabel">Snare Drum</span>
        <span class="player-section-label" id="playerSectionTitle">Rhythmic Ostinato</span>
      </div>

      <div class="player-actions">
        <div class="volume-control-group">
          <button id="muteBtn" class="player-btn btn-volume" type="button" aria-label="Mute or Unmute" title="Toggle Mute">
            <span id="volumeIcon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            </span>
          </button>
          <input type="range" id="volumeSlider" class="volume-slider" min="0" max="1" step="0.01" value="1" aria-label="Master Volume">
        </div>
        <button id="soloToggleBtn" class="btn-toggle-mode" type="button" data-mode="integrate">Solo</button>
      </div>
    </div>
  `;
}

const playSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
const pauseSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

const volMaxSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;
const volMuteSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`;

export function updatePlayerPlaybackState(isPlaying) {
  const iconSpan = document.getElementById('playerPlayIcon');
  if (iconSpan) iconSpan.innerHTML = isPlaying ? pauseSvg : playSvg;
}

export function updatePlayerMeta(instrument, sectionTitle) {
  const label = document.getElementById('playerInstrumentLabel');
  const title = document.getElementById('playerSectionTitle');
  if (label) label.textContent = instrument;
  if (title) {
    title.classList.remove('is-buffering');
    title.textContent = sectionTitle;
  }
}

export function setPlayerBuffering(isBuffering, customText = 'Buffering Stems...') {
  const title = document.getElementById('playerSectionTitle');
  if (title) {
    if (isBuffering) {
      title.classList.add('is-buffering');
      title.textContent = customText;
    } else {
      title.classList.remove('is-buffering');
    }
  }
}

export function updateVolumeIcon(isMuted, volume = 1) {
  const iconSpan = document.getElementById('volumeIcon');
  if (iconSpan) {
    iconSpan.innerHTML = (isMuted || volume === 0) ? volMuteSvg : volMaxSvg;
  }
}

export function updatePlayerSoloState(isSolo) {
  const btn = document.getElementById('soloToggleBtn');
  if (btn) {
    btn.classList.toggle('active', isSolo);
    btn.textContent = isSolo ? 'INTEGRATE' : 'SOLO';
  }
}