export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'option'
  | 'OPTION'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
export type dataType = 'JSON' | 'text' | 'base64' | 'arraybuffer'

export interface Config {
  url: string
  method?: Method
  baseURL?: string
  data: object
  header: object
  dataType: dataType
}
// 赋予默认值any，这个技巧不错
export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}
export interface AxiosRequestConfig {
  baseURL?: string
  url?: string
  method?: Method
  data?: Object | ArrayBuffer
  params?: any
  headers?: any
  // axios 中的 responseType
  dataType?: dataType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  // cancelToken?: CancelToken
  validateStatus?: (status: number) => boolean
  [propName: string]: any
}

// 这个继承真棒，返回promise，只传入 泛型 T
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  headers: any
  statusText?: string
  config: AxiosRequestConfig
  request: any
}

export interface AxiosResponseError {
  data: any
  error: number
  errorMessage: string
  headers: {
    [propName: string]: string
  }
  status: number
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  // getUri(config?: AxiosRequestConfig): string
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosClassStatic {
  new (config: AxiosRequestConfig): Axios
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  // CancelToken: CancelTokenStatic
  // Cancel: CancelStatic
  // isCancel: (value: any) => boolean

  all<T>(promises: Array<T | Promise<T>>): Promise<T[]>

  spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R

  Axios: AxiosClassStatic
}
