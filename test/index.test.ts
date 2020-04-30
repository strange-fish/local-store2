import { fromClass, key, StoreWrapper, fromObject, setGlobalOptions } from "../src"
import { MockLocalStorage } from "./mockLocalStorage"

//@ts-ignore
const mockStore = new StoreWrapper(MockLocalStorage)

describe("fromClass Test", () => {
  const num = 1
  const str = "1"
  const arr = [1, 2]
  const obj = {
    one: 1,
  }
  const nil = null
  const storeKey = "one"

  setGlobalOptions({ store: mockStore })

  @fromClass()
  class TestStore {
    number = num
    @key(storeKey)
    number2 = num + 1
    string = str
    array = arr
    object: Record<string, any> = obj
    nil = nil
    un: any
  }

  @fromClass()
  class TestStore2 {
    number = num + 1
  }

  const store = new TestStore()

  test("can set default values", () => {
    expect(store.number).toBe(num)
    expect(store.string).toBe(str)
    expect(store.array).toEqual(arr)
    expect(store.object).toEqual(obj)
    expect(store.nil).toBe(nil)
    expect(store.un).toBe(void 0)
  })
  test("can set value", () => {
    const val = {
      one: 1,
      two: [1, 2],
    }
    store.object = val
    store.un = 'un'
    expect(store.object).toEqual(val)
    expect(store.un).toBe('un')
  })
  test("with key decorator, storage can use different store key", () => {
    expect(store.number2).toBe(mockStore.get(storeKey))
  })
  test(`won't set default value when value has already existed`, () => {
    store.number = num
    const store2 = new TestStore2()
    expect(store2.number).toBe(num)
  })
  test('when option sets to forceOverride, default value will be set anyway', () => {
    mockStore.set('number', 10)
    @fromClass({ forceOverride: true })
    class TestStore {
      number = 1
    }
    const store = new TestStore
    expect(store.number).toBe(1)
  })
  test('can use prefix get/set', () => {
    mockStore.clear()
    @fromClass({ prefix: 'my_' })
    class TestStore {
      number = 4
    }
    const store = new TestStore
    const number = store.number
    expect(number).toBe(mockStore.get('my_number'))
    expect(number).toBe(4)
  })
  test(`default value won't override when class new again`, () => {
    mockStore.clear()
    const store = new TestStore()
    store.number = 10
    const store2 = new TestStore()
    expect(store.number).toBe(10)
  })
})

describe('fromObject Test', () => {
  const number = 1
  const arr = [1, 2]
  const object = {
    one: 1,
    two: 2
  }

  test('can set default value', () => {
    MockLocalStorage.clear()
    const obj = { 
      number,
      arr,
      object
    }
    const store = fromObject(obj)
    expect(store.number).toBe(number)
    expect(store.arr).toEqual(arr)
    expect(store.object).toEqual(object)
  })
  test(`won't set default value when value has already existed`, () => {
    mockStore.set('number', number)
    const store = fromObject({ number: number + 1 })
    expect(store.number).toBe(number)
  })
  test(`when option sets to forceOverride, default value will be set anyway`, () => {
    mockStore.set('number', 3)
    const store = fromObject({ number: 2 }, { forceOverride: true })
    expect(store.number).toBe(2)
  })
  test('can use prefix get/set', () => {
    mockStore.clear()
    const store = fromObject({ number: 4 }, { prefix: 'my_' })
    const number = store.number
    expect(number).toBe(mockStore.get('my_number'))
    expect(number).toBe(4)
  })
})
