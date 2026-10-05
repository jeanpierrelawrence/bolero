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
        <button id="soloToggleBtn" class="btn-toggle-mode" type="button" data-mode="integrate">Solo</button>
      </div>
    </div>
  `;
}

const playSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
const pauseSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

export function updatePlayerPlaybackState(isPlaying) {
  const iconSpan = document.getElementById('playerPlayIcon');
  if (iconSpan) iconSpan.innerHTML = isPlaying ? pauseSvg : playSvg;
}

export function updatePlayerMeta(instrument, sectionTitle) {
  const label = document.getElementById('playerInstrumentLabel');
  const title = document.getElementById('playerSectionTitle');
  if (label) label.textContent = instrument;
  if (title) title.textContent = sectionTitle;
}

export function updatePlayerSoloState(isSolo) {
  const btn = document.getElementById('soloToggleBtn');
  if (btn) {
    btn.classList.toggle('active', isSolo);
    btn.textContent = isSolo ? 'INTEGRATE' : 'SOLO';
  }
}