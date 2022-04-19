/* eslint-disable no-unused-vars */
import { useState } from 'react'

export type SetStorageValue<T> = T | ((prevValue: T) => T)

export type SetStorage<T> = (
  value: SetStorageValue<T>,
  persist?: boolean,
  shouldStringify?: boolean,
) => void

export type UnsetStorage = () => void

export function useStorage<T>(
  key: string,
  initialValue: T,
): [T, SetStorage<T>, UnsetStorage] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    let result: T
    try {
      const item =
        window.localStorage.getItem(key) || window.sessionStorage.getItem(key)
      result = item ? JSON.parse(item) : initialValue
    } catch {
      result = initialValue
    }

    return result
  })

  const setValue = (
    value: SetStorageValue<T>,
    persist?: boolean,
    shouldStringify = true,
  ) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)

    try {
      const _value = shouldStringify
        ? JSON.stringify(valueToStore)
        : valueToStore
      if (persist) {
        // @ts-ignore
        window.localStorage.setItem(key, _value)
      } else {
        // @ts-ignore
        window.sessionStorage.setItem(key, _value)
      }
    } catch {
      console.warn(`Could not save ${key} to localStorage`)
    }
  }

  const unsetValue = () => {
    window.localStorage.removeItem(key)
    window.sessionStorage.removeItem(key)
  }

  return [storedValue, setValue, unsetValue]
}
