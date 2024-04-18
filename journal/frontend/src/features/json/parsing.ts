export function tryParse<T>(value: string | null): T | string | null {
  if (value === '' || value === null) {
    return null
  }

  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}
