export function parseJSON<T>(value: string | null): T | null {
  if (value === '' || value === null) {
    return null
  }

  return JSON.parse(value)
}
