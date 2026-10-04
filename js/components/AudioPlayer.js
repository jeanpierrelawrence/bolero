export function renderAudioPlayer() {
  return `
    <div class="floating-player" id="floatingPlayer">
      
      <!-- Left Controls: Step Back, Play/Pause, Step Forward -->
      <div class="player-controls">
        <button id="playerPrevBtn" class="player-btn" type="button" aria-label="Previous Section">
          <!-- User SVG: Backtrack -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>

        <button id="playerPlayBtn" class="player-btn player-btn-primary" type="button" aria-label="Play or Pause">
          <!-- User SVG: Play / Pause toggle container -->
          <span id="playerPlayIcon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </span>
        </button>

        <button id="playerNextBtn" class="player-btn" type="button" aria-label="Next Section">
          <!-- User SVG: Forward track -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      </div>

      <!-- Center Title: Currently Playing Melody Instruments -->
      <div class="player-info">
        <span class="player-instrument" id="playerInstrumentLabel">Snare Drum</span>
        <span class="player-section-label" id="playerSectionTitle">Rhythmic Ostinato</span>
      </div>

      <!-- Right Controls: Solo/Integrate Toggle & Secondary Feature -->
      <div class="player-actions">
        <button id="soloToggleBtn" class="btn-toggle-mode" type="button" data-mode="integrate">
          Solo
        </button>

        <button id="extraControlBtn" class="player-btn" type="button" aria-label="Secondary Feature">
          <!-- Placeholder SVG for your upcoming feature -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      </div>

    </div>
  `;
}