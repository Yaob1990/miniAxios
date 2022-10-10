import { AxiosPromise, AxiosRequestConfig, AxiosResponse, AxiosResponseError } from '../types'
import { sdkRequest } from './crossPlatform'

export default function miniRequest<T>(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { validateStatus } = config

    const request = sdkRequest({
      ...config,
      success(response: AxiosResponse<T>) {
        //  https://segmentfault.com/a/1190000017328258

        const axiosResponse: AxiosResponse = {
          data: response.data,
          status: response.status,
          // statusText: response.statusText, // 微信有，支付宝没有
          headers: response.headers || response.header,
          config,
          request
        }

        if (!validateStatus || validateStatus(response.status)) {
          response.config = config
          resolve(response)
        } else {
          reject(response)
        }
      },
      fail(error: AxiosResponseError) {
        // TODO 需要明确返回的内容
        error.config = config
        reject(error)
      }
    })
  })
}
