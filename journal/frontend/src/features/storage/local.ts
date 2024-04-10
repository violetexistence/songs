import { useCallback, useEffect, useState } from 'react'
import { isBrowser } from '../browser/detection'
import { receiveStorageChangeEvents } from './events'
import { deleteFromStore, getFromStore, writeToStore } from './store'

type LocalStorageSetStateValue<TValue> =
  | TValue
  | ((prevState: TValue | null) => TValue)
type LocalStorageReturnValue<TValue> = [
  TValue | null,
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
    [updateLocalState, key]
  )

  useEffect(() => {
    if (!isBrowser()) {
      return
    }

    const cleanupHandlers = receiveStorageChangeEvents<TValue>(key, (value) =>
      onLocalStorageChange(value)
    )

    if (getFromStore(key) === null && defaultValue !== null) {
      writeToStore(key, defaultValue)
    }

    return cleanupHandlers
  }, [key, defaultValue, onLocalStorageChange])

  const writeState = useCallback(
    (value: LocalStorageSetStateValue<TValue>) => {
      if (value instanceof Function) {
        writeToStore(key, value(localState))
      } else {
        writeToStore(key, value)
      }
    },
    [key, localState]
  )

  const deleteState = useCallback(() => deleteFromStore(key), [key])

  return [localState, writeState, deleteState]
}
