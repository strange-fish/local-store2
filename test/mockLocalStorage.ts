export class MockLocalStorage implements Partial<Storage> {
  private static _map: object = {}
  static getItem (key: string): string {
    return this._map[key]
  }
  static setItem (key: string, value: any): void {
    this._map[key] = String(value)
  }
  static removeItem (key: string): void {
    delete this._map[key]
  }
  static clear (): void {
    this._map = {}
  }
}