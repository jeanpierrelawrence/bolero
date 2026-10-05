import { SECTIONS } from '../modules/timeline.js';
import { renderTimelineCard } from './TimelineCard.js';

export function renderTimeline() {
  const cardsHtml = SECTIONS.map((section, index) => renderTimelineCard(section, index)).join('');
  return `<div class="timeline-wrapper">${cardsHtml}</div>`;
}