export const getStorageValue = (key: string) =>
  window.localStorage.getItem(key) || window.sessionStorage.getItem(key)

export const removeStorageValue = (key: string) => {
  window.localStorage.removeItem(key)
  window.sessionStorage.removeItem(key)
}
