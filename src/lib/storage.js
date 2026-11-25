import { useCallback, useEffect, useState } from 'react'

const PREFIX = 'andaman:'

export function storageKey(key) {
  return key.startsWith(PREFIX) ? key : `${PREFIX}${key}`
}

export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(storageKey(key))
    if (raw == null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(storageKey(key), JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(storageKey(key))
  } catch {
    /* ignore */
  }
}

/** React hook with try/catch and safe fallback. */
export function useLocalStorage(key, initialValue) {
  const fullKey = storageKey(key)
  const [value, setValue] = useState(() => readStorage(fullKey, initialValue))

  useEffect(() => {
    setValue(readStorage(fullKey, initialValue))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullKey])

  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next
        writeStorage(fullKey, resolved)
        return resolved
      })
    },
    [fullKey],
  )

  return [value, set]
}

export function exportAllState() {
  const data = {}
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const k = localStorage.key(i)
      if (k && k.startsWith(PREFIX)) {
        try {
          data[k] = JSON.parse(localStorage.getItem(k))
        } catch {
          data[k] = localStorage.getItem(k)
        }
      }
    }
  } catch {
    /* ignore */
  }
  return data
}

export function importAllState(data) {
  if (!data || typeof data !== 'object') throw new Error('Invalid backup')
  Object.entries(data).forEach(([k, v]) => {
    if (!k.startsWith(PREFIX)) return
    localStorage.setItem(k, JSON.stringify(v))
  })
}

export function resetAllState() {
  const keys = []
  for (let i = 0; i < localStorage.length; i += 1) {
    const k = localStorage.key(i)
    if (k && k.startsWith(PREFIX)) keys.push(k)
  }
  keys.forEach((k) => localStorage.removeItem(k))
}

export { PREFIX }
