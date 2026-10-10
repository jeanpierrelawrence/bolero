export function renderTimelineCard(section, index) {
  const mins = Math.floor(section.time / 60).toString().padStart(2, '0');
  const secs = (section.time % 60).toString().padStart(2, '0');
  const formattedTime = `${mins}:${secs}`;

  const tagsHtml = section.featuredStems.map(stemPath => {
    const rawName = stemPath.split('/').pop().replace('.mp3', '').replace(/_/g, ' ');
    return `<span class="stem-tag">${rawName}</span>`;
  }).join('');

  return `
    <section class="timeline-card" id="${section.id}" data-time="${section.time}" data-index="${index}">
      <div class="card-inner">
        
        <header class="card-header">
          <span class="card-entrance-num">Entrance ${String(index + 1).padStart(2, '0')}</span>
          <span class="card-timestamp">${formattedTime}</span>
        </header>

        <h2 class="card-instrument">${section.instrument}</h2>
        <h3 class="card-title">${section.title}</h3>
        <p class="card-description">${section.description}</p>

        <div class="card-api-badge" id="apiBadge-${section.id}">
          <span class="api-meta-placeholder">Loading Wikipedia entry...</span>
        </div>

        <div class="card-stems-group">
          <span class="stem-label">Featured Soloist:</span>
          <div class="stem-tags">
            ${tagsHtml}
          </div>
        </div>

        <button class="btn-card-seek" type="button" data-seek-time="${section.time}" data-section-id="${section.id}">
          <span class="seek-icon">▷</span> Listen From Here (${formattedTime})
        </button>

      </div>
    </section>
  `;
}

export function updateCardApiMeta(sectionId, data) {
  const badgeContainer = document.getElementById(`apiBadge-${sectionId}`);
  if (!badgeContainer || !data) return;

  badgeContainer.innerHTML = `
    <div class="api-meta-content">
      ${data.thumbnailUrl ? `<img src="${data.thumbnailUrl}" alt="${data.title}" class="api-inst-thumb" loading="lazy">` : ''}
      <div class="api-meta-text">
        <span class="api-meta-title">Wikipedia — ${data.title}</span>
        <p class="api-meta-desc">${data.extract}</p>
      </div>
    </div>
  `;
}