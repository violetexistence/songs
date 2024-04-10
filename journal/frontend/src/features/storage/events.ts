import { isBrowser } from '../browser/detection'

/**
 * CustomEvent polyfill derived from: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
 */
;(() => {
  if (!isBrowser()) {
    return
  }

  if (typeof window.CustomEvent === 'function') {
    return
  }

  function CustomEvent<T>(
    typeArg: string,
    params: CustomEventInit<T> = { bubbles: false, cancelable: false }
  ): CustomEvent<T> {
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(
      typeArg,
      params?.bubbles ?? false,
      params?.cancelable ?? false,
      params?.detail
    )
    return evt
  }

  window.CustomEvent = CustomEvent as unknown as typeof window.CustomEvent
})()

export const LOCAL_STORAGE_CHANGE_EVENT_NAME = 'onLocalStorageChange'

export interface LocalStorageEventPayload {
  key: string
  value: string | null
}

type LocalStorageChangeEvent = {
  type: 'onLocalStorageChange'
  detail: LocalStorageEventPayload
}

function isLocalStorageChangeEvent(
  event: unknown
): event is LocalStorageChangeEvent {
  return (event as LocalStorageChangeEvent).detail !== undefined
}

function isStorageEvent(e: unknown): e is StorageEvent {
  return (e as StorageEvent).newValue !== undefined
}

export function sendStorageChangeEvent<TValue>(detail: {
  key: string
  value: TValue | null
}) {
  if (!isBrowser()) {
    return
  }

  window.dispatchEvent(
    new CustomEvent(LOCAL_STORAGE_CHANGE_EVENT_NAME, {
      detail,
    })
  )
}

export function receiveStorageChangeEvents(
  key: string,
  handler: (value: string | null) => void
): () => void {
  const handlerWrapper = (e: unknown) => {
    if (isLocalStorageChangeEvent(e)) {
      e.detail.key === key && handler(e.detail.value)
    }

    if (isStorageEvent(e)) {
      e.key === key && handler(e.newValue)
    }
  }

  window.addEventListener(LOCAL_STORAGE_CHANGE_EVENT_NAME, handlerWrapper)
  window.addEventListener('storage', handlerWrapper)

  return () => {
    window.removeEventListener(LOCAL_STORAGE_CHANGE_EVENT_NAME, handlerWrapper)
    window.removeEventListener('storage', handlerWrapper)
  }
}
