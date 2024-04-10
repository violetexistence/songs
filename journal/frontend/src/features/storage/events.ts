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

export interface LocalStorageEventPayload<TValue> {
  key: string
  value: TValue
}

export function isTypeOfLocalStorageChanged(evt: Event): boolean {
  return !!evt && evt.type === LOCAL_STORAGE_CHANGE_EVENT_NAME
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

export function receiveStorageChangeEvents<TValue>(
  key: string,
  handler: (value: TValue | null) => void
): () => void {
  const handlerWrapper = (e: any | StorageEvent) => {
    if (isTypeOfLocalStorageChanged(e)) {
      e.detail.key === key && handler(e.detail?.value)
    } else {
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
