export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

export function extend<T, U>(to: T, from: U): T & U {
  // 无法遍历 原型 属性
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  // 遍历原型属性
  let keys = Object.getOwnPropertyNames(Object.getPrototypeOf(from)).filter(
    item => item !== 'constructor'
  )
  for (const key of keys) {
    ;(to as { [index: string]: any })[key] = (from as { [index: string]: any })[key]
  }
  return to as T & U
}
