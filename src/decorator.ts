import { StoreWrapper } from "./storeWrapper"
import { LocalStoreOptions } from "./options"
import { getKey, setup, isEmpty } from "./utils"

let keyMap = {}
/**
 * turn class to local store
 * 注意：包装后重复new生成class会导致store原值被默认值覆盖
 */
export function fromClass(options?: LocalStoreOptions)
export function fromClass(store: StoreWrapper, options?: LocalStoreOptions)
export function fromClass(
  first: StoreWrapper | LocalStoreOptions,
  second?: LocalStoreOptions
) {
  let ran = false
  const turn: ClassDecorator = (target: any) => {
    if (ran) return
    ran = true
    const raw = Object.entries(new target())
    const { store, options } = setup(first, second)
    raw.forEach(([key, initValue]) => {
      define(store, target.prototype, key, initValue, options)
    })
    keyMap = {}
  }
  return turn
}
/**
 * set the storage key of field
 * @param newK storage key
 */
export const key = (newK: string) => {
  const changeKey: PropertyDecorator = (target, oldK) => {
    if (typeof oldK === "string") {
      if (keyMap[oldK] !== undefined) {
        const msg = `${oldK} has already existed in keyMap! You might use this decorator in wrong place!`
        throw Error(msg)
      }
      keyMap[oldK] = newK
    }
  }
  return changeKey
}

function define(store: StoreWrapper, target: any, key: string, initValue: any, options: LocalStoreOptions) {
  if (typeof initValue !== "function") {
    const storeKey = getKey(
      options.prefix,
      keyMap[key] !== undefined ? keyMap[key] : key
    )
    const hasInitValue = initValue !== undefined
    Object.defineProperty(target, key, {
      get() {
        return store.get(storeKey)
      },
      set(value) {
        const initMap = this.__initMap__ || (this.__initMap__ = {})
        if (initMap[key]) {
          store.set(storeKey, value)
        } else {
          initMap[key] = true
          if (
            options.forceOverride ||
            (hasInitValue && isEmpty(store.get(storeKey)))
          ) {
            store.set(storeKey, value)
          }
        }
      },
    })
  }
}
