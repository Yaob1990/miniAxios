import { message } from './message'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse, Config } from '../types'
import { combineURL, isAbsoluteURL } from '../helpers/util'
import transform from './transform'
import miniRequest from './miniRequest'
import { appName } from './crossPlatform'

export function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return miniRequest(config)
    .then(res => {
      return transformResponseData(res)
    })
    .catch(error => {
      // transformResponseData
      // TODO 需要看下catch时候返回值是否是 Promise
      return Promise.reject(error)
    })
}

function processConfig(config: AxiosRequestConfig): void {
  // 合并 url
  config.url = transformURL(config)
  // 数据转换
  config.data = transform(config.data, config.headers, config.transformRequest)
  if (appName === 'uniApp' || appName === 'wechat') {
    config.header = config.headers
  }
}

export function transformURL(config: AxiosRequestConfig): string {
  let { url, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return url as string
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
