declare const wx: any // 微信小程序、微信小游戏
declare const my: any // 支付宝小程序
declare const tt: any // 字节跳动小程序
declare const dd: any // 钉钉小程序
declare const qq: any // QQ 小程序、QQ 小游戏
declare const uni: any // uniApp

/**
 * 小程序平台 SDK 接口
 */
interface SDK {
  request: Function
  httpRequest?: Function // 针对钉钉小程序
  getSystemInfoSync: Function
  onError?: Function
  onUnhandledRejection?: Function
  onPageNotFound?: Function
  onMemoryWarning?: Function
  getLaunchOptionsSync?: Function
}

/**
 * 小程序平台 接口
 */
type AppName = 'uniApp' | 'wechat' | 'alipay' | 'bytedance' | 'dingtalk' | 'qq' | 'unknown'

/**
 * 获取跨平台的 SDK
 */
const getSDK = () => {
  let currentSdk: SDK = {
    // tslint:disable-next-line: no-empty
    request: () => {},
    // tslint:disable-next-line: no-empty
    httpRequest: () => {},
    // tslint:disable-next-line: no-empty
    getSystemInfoSync: () => {}
  }
  if (typeof uni === 'object' && JSON.stringify(uni) !== '{}') {
    currentSdk = uni
  }
  if (typeof wx === 'object' && JSON.stringify(wx) !== '{}') {
    // tslint:disable-next-line: no-unsafe-any
    currentSdk = wx
  } else if (typeof my === 'object' && JSON.stringify(my) !== '{}') {
    // tslint:disable-next-line: no-unsafe-any
    currentSdk = my
  } else if (typeof tt === 'object' && JSON.stringify(tt) !== '{}') {
    // tslint:disable-next-line: no-unsafe-any
    currentSdk = tt
  } else if (typeof dd === 'object' && JSON.stringify(dd) !== '{}') {
    // tslint:disable-next-line: no-unsafe-any
    currentSdk = dd
  } else if (typeof qq === 'object' && JSON.stringify(qq) !== '{}') {
    // tslint:disable-next-line: no-unsafe-any
    currentSdk = qq
  } else {
    throw new Error('miniAxios 暂不支持此平台')
  }

  return currentSdk
}

/**
 * 获取平台名称
 */
const getAppName = () => {
  let currentAppName: AppName = 'unknown'
  if (typeof uni === 'object' && JSON.stringify(wx) !== '{}') {
    currentAppName = 'uniApp'
  } else if (typeof wx === 'object' && JSON.stringify(wx) !== '{}') {
    currentAppName = 'wechat'
  } else if (typeof my === 'object' && JSON.stringify(wx) !== '{}') {
    currentAppName = 'alipay'
  } else if (typeof tt === 'object' && JSON.stringify(wx) !== '{}') {
    currentAppName = 'bytedance'
  } else if (typeof dd === 'object' && JSON.stringify(wx) !== '{}') {
    currentAppName = 'dingtalk'
  } else if (typeof qq === 'object' && JSON.stringify(wx) !== '{}') {
    currentAppName = 'qq'
  }
  return currentAppName
}

const sdk = getSDK()
const appName = getAppName()

const getSDKRequest: Function = () => {
  if (typeof dd === 'object' && JSON.stringify(dd) !== '{}') {
    return dd.httpRequest
  } else {
    return sdk.request
  }
}
const sdkRequest = getSDKRequest()

export { sdk, appName, sdkRequest }
