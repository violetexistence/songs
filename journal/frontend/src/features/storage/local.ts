import { useCallback, useEffect, useState } from 'react'
import { isBrowser } from '../browser/detection'
import { receiveStorageChangeEvents } from './events'
import { deleteFromStore, getFromStore, writeToStore } from './store'
import { parseJSON } from '../json/parsing'

type LocalStorageSetStateValue<TValue> =
  | TValue
  | ((prevState: TValue) => TValue)
type LocalStorageReturnValue<TValue> = [
  TValue,
  (v: LocalStorageSetStateValue<TValue>) => void,
  () => void,
]

export function useLocalStorage<TValue = string>(
  key: string,
  defaultValue: TValue
): LocalStorageReturnValue<TValue> {
  const [localState, updateLocalState] = useState<TValue | null>(() => {
    const existingStoredValue = getFromStore<TValue>(key)
    return existingStoredValue ?? defaultValue
  })

  const onLocalStorageChange = useCallback(
    (value: TValue | null) => {
      updateLocalState(value)
    },
    [updateLocalState]
  )

  useEffect(() => {
    if (!isBrowser()) {
      return
    }

    const cleanupHandlers = receiveStorageChangeEvents(key, (value) => {
      onLocalStorageChange(parseJSON(value))
    })

    if (getFromStore(key) === null && defaultValue !== null) {
      writeToStore(key, defaultValue)
    }

    return cleanupHandlers
  }, [key, defaultValue, onLocalStorageChange])

  const writeState = useCallback(
    (value: LocalStorageSetStateValue<TValue>) => {
      if (value instanceof Function) {
        writeToStore(key, value(localState ?? defaultValue))
      } else {
        writeToStore(key, value)
      }
    },
    [key, localState, defaultValue]
  )

  const deleteState = useCallback(() => deleteFromStore(key), [key])

  return [localState ?? defaultValue, writeState, deleteState]
}
