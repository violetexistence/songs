import { RefObject, useRef, useState } from 'react'
import { useEventListener } from './useEventListener'

export function useHover<TElement extends HTMLElement>(): [
  boolean,
  RefObject<TElement>,
  ] {
  const elementRef = useRef<TElement>(null)
  const [hovered, setHovered] = useState(false)

  useEventListener('mouseenter', () => setHovered(true), elementRef)
  useEventListener('mouseleave', () => setHovered(false), elementRef)

  return [hovered, elementRef]
}
