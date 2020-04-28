import { defaultStore, StoreWrapper } from "./storeWrapper"
import { defaultOptions } from './options'

export function getKey (prefix: string | undefined, k: string) {
  return prefix ? (prefix + k) : k
}

export function setup(first: any, second: any) {
  let store = defaultStore
  let options = defaultOptions
  if (first instanceof StoreWrapper) {
    store = first
  } else if (typeof first === "object" && !second) {
    options = first
  }
  if (typeof second === "object") {
    options = second
  }
  return { store, options }
}