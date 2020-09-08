import { AxiosRequestConfig } from '../types'

/**
 * 默认合并策略
 * 如果有 val2 则返回 val2，否则返回 val1
 * @param val1
 * @param val2
 */
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

/**
 * 只接受自定义配置合并策略（url、params、data）
 * 如果有 val2 则返回 val2
 * @param val1
 * @param val2
 */
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

/**
 * 对象合并策略（headers）
 * @param val1
 * @param val2
 */
function headersMergeStrat(val1: any, val2: any): any {
  return { ...val1, ...val2 }
}

const strats = Object.create(null)

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratHeadersMerge = ['headers']

strats.headers = headersMergeStrat

export default function mergeConfig(config1: AxiosRequestConfig, config2: AxiosRequestConfig) {
  if (!config2) config2 = {}

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    // 设计模式 - 策略模式
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }
  return config
}
