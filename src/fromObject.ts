import { StoreWrapper } from "./storeWrapper"
import { LocalStoreOptions } from "./options"
import { getKey, setup } from "./utils"

type Re = Record<string, any>

export function fromObject<T extends Re> (obj: T, options?: LocalStoreOptions)
export function fromObject<T extends Re> (obj: T, store?: StoreWrapper, options?: LocalStoreOptions)

export function fromObject<T extends Re> (
  obj: T,
  first?: StoreWrapper | LocalStoreOptions,
  second?: LocalStoreOptions
) {
  const keyValues = Object.entries(obj)
  const { store, options } = setup(first, second)

  keyValues.forEach(([k, v]) => {
    const key = getKey(options.prefix, k)
    if (options.forceOverride || (v !== undefined && store.get(key) === undefined)) {
      store.set(key, v)
    }

    if (!options.useProxy) {
      Object.defineProperty(obj, key, {
        get () { return store.get(key) },
        set (value) { return store.set(key, value) }
      })
    }
  })
  if (!options.useProxy) {
    return obj
  }
  return new Proxy(obj, {
    get (target, k: string) {
      const key = getKey(options.prefix, k)
      return store.get(key as string)
    },
    set (target, k: string, value, receiver) {
      const key = getKey(options.prefix, k)
      store.set(key, value)
      return true
    }
  })
}