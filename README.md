[中文文档](https://github.com/strange-fish/local-store2/README.zh-CN.md)

## Local Store2
To use `localStorage` or `sessionStorage` Declarative

When using 'localStorage', we need to use various magic strings and manually format the content.

**************

## Install
```shell
npm i local-store2
```
**************

## Usage

### `fromClass`
Use class as the local store carrier.

The property name will be used to access the store content. When there is a default value and the property is empty in the store, the property will be assigned a value.

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
By default, `fromClass` uses the attribute name to access the store content, and the `key` decorator can be used to customize the access key
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
If you don't want to use `class`, you can use `fromObject`
```ts
import { fromObject } from 'local-store2'

const demo = fromObject({ name: 'z' })

console.log(demo.name === store.get('name'))

const prefixStore = fromObject({ name: 'p' }, { prefix: 'my_' })

console.log(prefixStore.name === store.get('my_name'))
```
**************

### `storeWrapper`
Accept an object that implements the `Storage` interface, and realize the function of automatically formatting content. By default, `localStorage` is used

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
store: storeWrapper = store used by defaultStore

prefix: String = "" prefix all storeKeys

forceOverride: Boolean = false ignore the existing content of store and force override
