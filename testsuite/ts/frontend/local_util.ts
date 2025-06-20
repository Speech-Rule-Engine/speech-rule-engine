declare const firebase: any;

/**
 *
 */
export function getFirebase(): any {
  return firebase;
}

/**
 * @param key
 */
export function getStorage(key: string) {
  return localStorage.getItem(key);
}

/**
 * @param key
 * @param value
 */
export function setStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}
