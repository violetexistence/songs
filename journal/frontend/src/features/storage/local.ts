import { useCallback, useEffect, useState } from "react"
import { isBrowser } from "../browser/detection"
import { receiveStorageChangeEvents } from "./events"
import { deleteFromStore, getFromStore, writeToStore } from "./store"

type LocalStorageSetStateValue<TValue> = TValue | ((prevState: TValue | null) => TValue)
type LocalStorageReturnValue<TValue> = [TValue | null, (v: LocalStorageSetStateValue<TValue>) => void, () => void];

export function useLocalStorage<TValue = string>(key: string, defaultValue: TValue | null = null): LocalStorageReturnValue<TValue> {
  const [localState, updateLocalState] = useState<TValue | null>(() => {
    const existingStoredValue = getFromStore<TValue>(key)
    console.log('loaded stored values: ' + JSON.stringify(existingStoredValue))
    return existingStoredValue ?? defaultValue
  })

  const onLocalStorageChange = useCallback((value: any | null) => {
    updateLocalState(value)
  }, [updateLocalState, key])

  useEffect(() => {
    if (!isBrowser()) {
      return
    }

    const cleanupHandlers = receiveStorageChangeEvents(key, value => onLocalStorageChange(value))

    if (getFromStore(key) === null && defaultValue !== null) {
      writeToStore(key, defaultValue)
    }

    return cleanupHandlers
  }, [key, defaultValue, onLocalStorageChange])

  const writeState = useCallback((value: LocalStorageSetStateValue<TValue>) => {
    if (value instanceof Function) {
      writeToStore(key, value(localState))
    } else {
      writeToStore(key, value)
    }
  },[key, localState])

  const deleteState = useCallback(() => deleteFromStore(key), [key])

  return [localState, writeState, deleteState]
}