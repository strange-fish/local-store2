import { LocalStoreOptions, getGlobalOptions } from "./options"
import { getKey, isEmpty } from "./utils"

export function fromObject<T extends Record<string, any>>(
  obj: T,
  options?: Partial<LocalStoreOptions>
): T {
  const keyValues = Object.entries(obj)
  const { store, prefix, forceOverride } = {
    ...getGlobalOptions(),
    ...options,
  }

  keyValues.forEach(([k, v]) => {
    const key = getKey(prefix, k)
    if (forceOverride || (v !== undefined && isEmpty(store.get(key)))) {
      store.set(key, v)
    }

    Object.defineProperty(obj, key, {
      get() {
        return store.get(key)
      },
      set(value) {
        return store.set(key, value)
      },
    })
  })
  return obj
}
