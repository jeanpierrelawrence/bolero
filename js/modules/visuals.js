export function initNavScroll() {
  const track = document.getElementById('navList');
  const prevBtn = document.getElementById('navPrev');
  const nextBtn = document.getElementById('navNext');

  if (!track || !prevBtn || !nextBtn) return;

  const updateArrows = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    prevBtn.hidden = track.scrollLeft <= 5;
    nextBtn.hidden = track.scrollLeft >= maxScroll - 5;
  };

  nextBtn.addEventListener('click', () => track.scrollBy({ left: 240, behavior: 'smooth' }));
  prevBtn.addEventListener('click', () => track.scrollBy({ left: -240, behavior: 'smooth' }));
  track.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
  updateArrows();
}

export function setActiveNavPill(sectionId) {
  const pills = document.querySelectorAll('.nav-pill');
  pills.forEach(pill => {
    const isTarget = pill.getAttribute('href') === `#${sectionId}`;
    pill.classList.toggle('active', isTarget);

    if (isTarget) {
      pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  });
}

export function initCardObserver(onCardInView) {
  const cards = document.querySelectorAll('.timeline-card');
  if (cards.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onCardInView(entry.target.id, parseInt(entry.target.dataset.index, 10));
      }
    });
  }, { root: null, threshold: 0.6 });

  cards.forEach(card => observer.observe(card));
}