## Local Store2
声明式的使用`localStorage`或`sessionStorage`

解决使用`localStorage`的时候，需要使用各种魔法字符串以及手动格式化内容的问题。

## 安装
```shell
npm i local-store2
```
**************

## 使用


### `storeWrapper`
接受一个实现了`Storage`接口的对象, 实现了自动格式化内容的功能, 默认使用`localStorage`
```ts
import { StoreWrapper } from 'local-store2'

const store = new StoreWrapper(sessionStorage)
```
**************

### `fromClass`
使用class作为local store载体, `fromClass`接受一个`storeWrapper`对象，默认使用`defaultStore`。

会使用属性名存取store内容，当含有默认值且该属性在store中为空时，会对该属性进行赋值。

**注意：重复new该class会导致默认值覆盖**
```ts
import { fromClass } from 'local-store2'

@fromClass()
class Demo {
  array: number[] = []
}

const demo = new Demo
console.log(demo.array)
```

`fromClass` 接受最多2个参数
4种传参方式
```ts
fromClass()
fromClass(store)
fromClass(options)
fromClass(store, options)
```
**************

### `key`
`fromClass`默认使用属性名存取store内容，使用`key`装饰器可以自定义存取的key
```ts
@fromClass()
class Demo {
  @key('name')
  str: string = ''
}

const demo = new Demo
console.log(demo.str === store.get('name'))
```
**************

### `fromObject`
如果不想使用`class`，可以使用`fromObject`
```ts
import { fromObject } from 'local-store2'

const demo = fromObject({ name: 'z' })

console.log(demo.name === store.get('name'))  
```
`fromObject`接受最多3个参数

支持4种传参方式
```ts
fromObject(obj)

fromObject(obj, store)

fromObject(obj, options)

fromObject(obj, store, options)
```
**************

### `options`
prefix: string = ""  为所有storeKey添加前缀

forceOverride: boolean = false 无视store已存在的内容，强行复写

useProxy: boolean = true 是否使用Proxy, 仅对fromObject起效
