export function getKey (prefix: string | undefined, k: string) {
  return prefix ? (prefix + k) : k
}

export function isEmpty (value: any) {
  return value === undefined || value === null
}