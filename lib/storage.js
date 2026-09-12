const COLLECTION_KEY = 'auravue_collection';

export function getCollection() {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(COLLECTION_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Collection is not an array');

    return parsed.filter(
      (item) => item && typeof item === 'object' && item.id && item.type
    );
  } catch {
    // Recover automatically from old/corrupt localStorage data.
    window.localStorage.removeItem(COLLECTION_KEY);
    return [];
  }
}

export function setCollection(items) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(COLLECTION_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('collectionchange'));
}

export { COLLECTION_KEY };
