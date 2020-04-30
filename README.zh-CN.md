## Local Store2
声明式的使用`localStorage`或`sessionStorage`

解决使用`localStorage`的时候，需要使用各种魔法字符串以及手动格式化内容的问题。

## 安装
```shell
npm i local-store2
```
**************

## 使用

### `fromClass`
使用class作为local store载体。

会使用属性名存取store内容，当含有默认值且该属性在store中为空时，会对该属性进行赋值。

```ts
import { fromClass } from 'local-store2'

@fromClass()
class Demo {
  array: number[] = []
}

const demo = new Demo
console.log(demo.array)
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

const prefixStore = fromObject({ name: 'p' }, { prefix: 'my_' })

console.log(prefixStore.name === store.get('my_name'))
```
**************

### `storeWrapper`
接受一个实现了`Storage`接口的对象, 实现了自动格式化内容的功能, 默认使用`localStorage`


```ts
import { StoreWrapper } from 'local-store2'

const store = new StoreWrapper(sessionStorage)
```
**************

### `setGlobalOptions`
```ts
import { setGlobalOptions } from 'local-store2'

setGlobalOptions(options)
```

**************

### `options`
store: StoreWrapper = defaultStore 使用的store

prefix: string = ""  为所有storeKey添加前缀

forceOverride: boolean = false 无视store已存在的内容，强行覆盖
