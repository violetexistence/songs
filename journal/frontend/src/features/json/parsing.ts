export function tryParse(value: string | null): any | null {
  if (value === '' || value === null) {
    return null
  }

  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}