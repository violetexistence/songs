import { RefObject, useEffect, useRef } from 'react'

type EventTypes = keyof WindowEventMap & keyof HTMLElementEventMap // TODO: & (typeof MediaQueryListEventMap)

export function useEventListener<T extends HTMLElement>(
  eventType: EventTypes,
  callback: EventListener,
  element?: RefObject<T>
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const targetElement: T | Window = element?.current ?? window

    if (!(targetElement && targetElement.addEventListener)) return

    const listener: typeof callback = (event) => {
      callbackRef.current(event)
    }

    targetElement.addEventListener(eventType, listener)

    return () => {
      targetElement.removeEventListener(eventType, listener)
    }
  }, [eventType, element])
}
