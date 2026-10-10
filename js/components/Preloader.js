export function renderPreloader() {
  return `
    <div class="preloader-overlay" id="preloaderOverlay">
      <div class="preloader-content">
        <h1 class="preloader-title">Boléro</h1>
        
        <div class="preloader-progress-container">
          <div class="preloader-progress-bar" id="preloaderBar"></div>
        </div>
        
        <div class="preloader-status-row">
          <span class="preloader-status" id="preloaderStatus">Initializing stems...</span>
          <span class="preloader-percent" id="preloaderPercent">0%</span>
        </div>

        <button id="preloaderStartBtn" class="btn-preloader-start" type="button" disabled>
          LOADING AUDIO...
        </button>
      </div>
    </div>
  `;
}

export function updatePreloaderProgress(percent, statusText) {
  const bar = document.getElementById('preloaderBar');
  const percentText = document.getElementById('preloaderPercent');
  const status = document.getElementById('preloaderStatus');

  if (bar) bar.style.width = `${percent}%`;
  if (percentText) percentText.textContent = `${Math.round(percent)}%`;
  if (status && statusText) status.textContent = statusText;
}

export function enablePreloaderStart(onStart) {
  const btn = document.getElementById('preloaderStartBtn');
  if (btn) {
    btn.disabled = false;
    btn.textContent = 'ENTER AUDITORIUM';
    btn.classList.add('ready');
    
    btn.addEventListener('click', () => {
      const overlay = document.getElementById('preloaderOverlay');
      if (overlay) {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 600);
      }
      if (onStart) onStart();
    }, { once: true });
  }
}