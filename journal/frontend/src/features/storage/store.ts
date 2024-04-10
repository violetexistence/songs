import { isBrowser } from '../browser/detection'
import { tryParse } from '../json/parsing'
import { sendStorageChangeEvent } from './events'

export function localStorageAvailable() {
  try {
    const test = 'journal/localstorage:' + new Date().toISOString()
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return (
      isBrowser() &&
      e instanceof DOMException &&
      (e.code === 22 ||
        e.code === 1014 ||
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      localStorage &&
      localStorage.length !== 0
    )
  }
}

interface Store {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

class LocalStore implements Store {
  getItem(key: string): string | null {
    return localStorage.getItem(key)
  }
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value)
  }
  removeItem(key: string): void {
    localStorage.removeItem(key)
  }
}

class MemoryStore implements Store {
  private _memoryStore = new Map<string, string>()

  getItem(key: string): string | null {
    return this._memoryStore.get(key) ?? null
  }
  setItem(key: string, value: string): void {
    this._memoryStore.set(key, value)
  }
  removeItem(key: string): void {
    this._memoryStore.delete(key)
  }
}

const store: Store = localStorageAvailable()
  ? new LocalStore()
  : new MemoryStore()

export function writeToStore<TValue>(key: string, value: TValue) {
  try {
    const serializedValue =
      typeof value === 'object' ? JSON.stringify(value) : `${value}`
    store.setItem(key, serializedValue)
    sendStorageChangeEvent({ key, value })
  } catch (err) {
    if (
      err instanceof TypeError &&
      err.message.includes('circular structure')
    ) {
      throw new TypeError(
        'The object that was given to the writeToStore function has circular references.\n' +
          'For more information, check here: ' +
          'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value'
      )
    }
  }
}

export function deleteFromStore(key: string) {
  store.removeItem(key)
  sendStorageChangeEvent({ key, value: null })
}

export function getFromStore<TValue>(key: string): TValue | null {
  const rawValue = store.getItem(key)  
  const value = tryParse(rawValue)
  
  if (value === rawValue) {
    throw new Error(`Error in JSON.parse() for string value: ${rawValue}.`)
  }

  return value as TValue
}
