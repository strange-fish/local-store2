export interface StoreInterface {
  get(key: string): any;
  set(key: string, value: any): void;
  delete(key: string): void;
  clear(): void;
}

function getLocal () {
  const g = global || window || globalThis
  if (g) {
    // @ts-ignore
    return g.localStorage
  } 
  console.warn(`localStorage doesn't exist!`)
  return {}
}

export class StoreWrapper implements StoreInterface {
  private store: Storage
  constructor (store?: Storage) {
    this.store = store || getLocal()
  }
  get (key: string) {
    const val = this.store.getItem(key)
    if (val === undefined) return val
    
    try {
      return JSON.parse(val)
    } catch {
      return val
    }
  }
  set (key: string, value: any) {
    this.store.setItem(key, JSON.stringify(value))
  }
  delete (key: string) {
    this.store.removeItem(key)
  }
  clear (): void {
    this.store.clear()
  }
}

export const defaultStore = new StoreWrapper()