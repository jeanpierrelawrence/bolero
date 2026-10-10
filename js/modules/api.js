const CACHE_KEY_PREFIX = 'bolero_api_cache_v4_';
const CACHE_TTL = 1000 * 60 * 60 * 24 * 7;

function getCachedData(key) {
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY_PREFIX + key);
      return null;
    }
    return parsed.data;
  } catch (_) {
    return null;
  }
}

function setCachedData(key, data) {
  try {
    localStorage.setItem(
      CACHE_KEY_PREFIX + key,
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch (_) {}
}

export async function fetchMusicBrainzWork() {
  const cached = getCachedData('mb_work_raw');
  if (cached) return cached;

  const searchUrl = `https://musicbrainz.org/ws/2/work/?query=work:"Bolero"%20AND%20artist:"Ravel"&fmt=json`;
  
  const response = await fetch(searchUrl);
  if (!response.ok) {
    throw new Error(`MusicBrainz Search Request Failed: HTTP ${response.status}`);
  }

  const data = await response.json();
  
  console.log('🎵 Raw MusicBrainz API Response Payload:', data);

  const topWork = data.works?.[0];
  if (!topWork) {
    throw new Error('MusicBrainz query returned zero work matches.');
  }

  const result = {
    title: topWork.title,
    mbid: topWork.id,
    iswc: topWork.iswcs?.[0] || 'No ISWC listed',
    type: topWork.type || 'Work',
    scoreLanguage: topWork.language || 'Instrumental',
    attributes: topWork.attributes?.map(a => a.type) || []
  };

  console.log('✅ Extracted MusicBrainz Live Data:', result);

  setCachedData('mb_work_raw', result);
  return result;
}

export async function fetchWikipediaSummary(wikiTitle) {
  if (!wikiTitle) return null;

  const cached = getCachedData('wiki_summary_' + wikiTitle);
  if (cached) return cached;

  try {
    const cleanSlug = decodeURIComponent(wikiTitle);
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanSlug)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Wikipedia HTTP ${response.status}`);

    const data = await response.json();

    const result = {
      title: data.title,
      extract: data.extract,
      description: data.description || '',
      thumbnailUrl: data.thumbnail?.source || null,
      pageUrl: data.content_urls?.desktop?.page || null
    };

    setCachedData('wiki_summary_' + wikiTitle, result);
    return result;
  } catch (error) {
    console.error(`Failed to fetch Wikipedia summary for ${wikiTitle}:`, error);
    return null;
  }
}