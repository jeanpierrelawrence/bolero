export function initNavEvents() {
  const track = document.getElementById('navList');
  const prevBtn = document.getElementById('navPrev');
  const nextBtn = document.getElementById('navNext');

  if (!track || !prevBtn || !nextBtn) return;

  function updateArrowVisibility() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    prevBtn.hidden = track.scrollLeft <= 5;
    nextBtn.hidden = track.scrollLeft >= maxScroll - 5;
  }

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: 240, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -240, behavior: 'smooth' });
  });

  track.addEventListener('scroll', updateArrowVisibility);
  window.addEventListener('resize', updateArrowVisibility);

  // Initial check
  updateArrowVisibility();
}