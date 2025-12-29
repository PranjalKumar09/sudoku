const VERSION = 2;

export function saveGame(key, data) {
  const payload = {
    version: VERSION,
    savedAt: Date.now(),
    data,
  };
  localStorage.setItem(key, JSON.stringify(payload));
}

export function loadSavedGame(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

   try {
    const parsed = JSON.parse(raw);

    if (parsed.version !== VERSION) {
      localStorage.removeItem(key);
      return null;
    }

    return parsed.data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

export function clearGame(key) {
  localStorage.removeItem(key);
}
