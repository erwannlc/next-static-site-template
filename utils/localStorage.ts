type LocalStorageKey = string

export function setLocalStorageItem<T>(key: LocalStorageKey, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorageItem<T>(key: LocalStorageKey) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) as T : null;
}

export function getLocalStorageItems() {
  const items = { ...localStorage };
  return items;
}

export function removeLocalStorageItem(key: LocalStorageKey) {
  localStorage.removeItem(key);
}