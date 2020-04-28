export interface LocalStoreOptions {
  /* 是否使用proxy */
  useProxy?: boolean;
  /* 是否每次新建都覆盖store里面原有的内容 */
  forceOverride?: boolean;
  /* 为存取属性值的key添加前缀 */
  prefix?: string;
}

export const defaultOptions: LocalStoreOptions = {
  useProxy: true,
  forceOverride: false
}
