import { LocalStoreOptions, getGlobalOptions } from "./options"
import { getKey, isEmpty } from "./utils"

const KEY_MAP_KEY = Symbol('key_map')
const INIT_MAP_KEY = Symbol('init_map')
/**
 * turn class to local store
 */
export function fromClass(options?: Partial<LocalStoreOptions>) {
  const turn: ClassDecorator = (target: any) => {
    
    const { store, forceOverride, prefix } = {
      ...getGlobalOptions(),
      ...options
    }
    const rawClass = new target()
    const keyMap = target.prototype[KEY_MAP_KEY] || {}
    const keys = dedupeKeys(rawClass, keyMap)

    keys.forEach(key => {
      const initValue = rawClass[key]
      if (typeof initValue !== "function") {
        const storeKey = getKey(
          prefix,
          keyMap[key] !== undefined ? keyMap[key] : key
        )
        const hasInitValue = initValue !== undefined
        Object.defineProperty(target.prototype, key, {
          get() {
            return store.get(storeKey)
          },
          set(value) {
            const initMap = this[INIT_MAP_KEY] || (this[INIT_MAP_KEY] = {})
            if (initMap[key]) {
              store.set(storeKey, value)
            } else {
              initMap[key] = true
              if (
                forceOverride ||
                (hasInitValue && isEmpty(store.get(storeKey)))
              ) {
                store.set(storeKey, value)
              }
            }
          },
        })
      }
    })
  }
  return turn
}
/**
 * set the storage key of field
 * @param newK storage key
 */
export const key = (newK?: string) => {
  const changeKey: PropertyDecorator = (target, oldK) => {
    if (typeof oldK === "string") {
      // @ts-ignore
      const keyMap = target[KEY_MAP_KEY] || (target[KEY_MAP_KEY] = {})
      keyMap[oldK] = newK
    }
  }
  return changeKey
}

function dedupeKeys (...args: object[]) {
  const keyMap: Record<string, boolean> = {}
  for (const m of args) {
    for (const k in m) {
      keyMap[k] = true
    }
  }
  return Object.keys(keyMap)
}
