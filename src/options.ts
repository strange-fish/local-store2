import { StoreWrapper, defaultStore } from "./storeWrapper"

export interface LocalStoreOptions {
  /** 
   * the storage use to store things
   * 使用的store 
  */
  store: StoreWrapper;
  /* 
    should use default values to override the content of store when store is created
    是否每次新建都覆盖store里面原有的内容 
  */
  forceOverride: boolean;
  /* 
    add prefix to storeKey
    为存取属性值的key添加前缀 
  */
  prefix?: string;
}

const globalOptions: LocalStoreOptions = {
  store: defaultStore,
  forceOverride: false
}

export function setGlobalOptions (options: Partial<LocalStoreOptions>) {
  Object.assign(globalOptions, options)
}

export function getGlobalOptions () {
  return globalOptions
}
