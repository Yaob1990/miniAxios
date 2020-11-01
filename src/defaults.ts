import { AxiosRequestConfig, Config } from './types'

const defaults: AxiosRequestConfig = {
  method: 'GET',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  },
  dataType: 'JSON',

  transformRequest: [
    function(data: any, headers: any): any {
      return data
    }
  ],

  transformResponse: [
    function(data: any): any {
      return data
    }
  ],
  validateStatus(status: number): boolean {
    return status >= 200 && status < 300
  }
}

export default defaults
