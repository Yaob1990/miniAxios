# miniAxios

> 小程序 request 增强库，api 参考 axios，提供完整的 ts 支持

### 支持平台

<table>
    <tbody>
    <tr>
        <td align="center" valign="middle">
            <a href="https://developers.weixin.qq.com/miniprogram/dev/api/wx.request.html" target="_blank">
                <img src="./doc/wechat.png" alt="微信小程序" width="60">
                <div>微信小程序</div>
            </a>
        </td>
        <td align="center" valign="middle">
            <a href="https://docs.alipay.com/mini/api/network" target="_blank">
                <img src="./doc/alipay.png" alt="支付宝小程序" width="60">
                <div>支付宝小程序</div>
            </a>
        </td>
        <td align="center" valign="middle">
            <a href="https://docs.alipay.com/mini/multi-platform/common" target="_blank">
                <img src="./doc/dingding.png" alt="钉钉小程序" width="60">
                <div>钉钉小程序</div>
            </a>
        </td>
        <td align="center" valign="middle">
            <a href="https://smartprogram.baidu.com/docs/develop/api/net_request/#request/" target="_blank">
                <img src="./doc/baidu.png" alt="百度小程序" width="60">
                <div>百度小程序</div>
            </a>
        </td>
        <td align="center" valign="middle">
            <a href="https://q.qq.com/wiki/develop/game/API/network/request.html" target="_blank">
                <img src="./doc/qq.png" alt="QQ 小程序" width="60">
                <div>QQ 小程序</div>
            </a>
        </td>
        <td align="center" valign="middle">
            <a href="https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/api/network/http/tt-request/" target="_blank">
                <img src="./doc/tt.png" alt="字节跳动" width="60">
                <div>字节跳动 小程序</div>
            </a>
        </td>
    </tr>
    </tbody>
</table>



### 引入：

1.  `npm i @aocoding/mini-axios`
2. `import miniAxios from '@aocoding/mini-axios';`

### 使用：

```
// http.js
import miniAxios from './libs/wxAxios.min.js'
miniAxios.get(url).then(res => {
    console.log(res )
})
// 或者
miniAxios.defaults.baseURL = 'https://xxx.com/'   // 配置默认地址
miniAxios.get(url).then(res => {
    console.log(res)
})
```

### 请求配置：

> 部分参数请参考小程序本身配置，如默认配置不能满足要求，可以直接传入配置。（对修改开放）

| 参数              | 说明                 | 类型     | 默认值                                                       |
| ----------------- | -------------------- | -------- | ------------------------------------------------------------ |
| method            | 请求方法             | string   | `GET`                                                        |
| baseURL           | 默认请求基础地址     |          | `''`                                                         |
| timeout           | 超时时间             | number   | 3000                                                         |
| headers           | 请求发送时候的请求头 | object   | `{'Content-Type': 'application/json'}`                       |
| dataType          | 返回时的数据类型     | string   | `JSON`                                                       |
| transformRequest  | 请求数据转换         | array    | `[   function(data: any, headers: any): any {     return data   } ]` |
| transformResponse | 返回数据转换         | array    | `[   function(data: any): any {     return data   } ]`       |
| validateStatus    | 返回数据状态验证     | function | `validateStatus(status: number): boolean {   return status >= 200 && status < 300 }` |

### 拦截器

#### request

```javascript
// 1.第一个 request 的拦截器
miniAxios.interceptors.request.use(config => {
    config.data.companyId = 1
    // ...do something
    return config
})
// 2.第二个 request 的拦截器，
miniAxios.interceptors.request.use(config => {
    config.data.token = wx.getStorageSync('token')
    // ...do something
    return config
})
```

#### response

```javascript
// 1.第一个 response 的拦截器
axios.interceptors.response.use(response => {
   if (response.statusCode === 200) {
      // ...do something
   }
   console.log(response.header);
    return response
})
// 2.第二个 response 的拦截器，
axios.interceptors.response.use(function (response) {
    if (response.status === 400) {
      // ...do something
   }
    return response
})
```

### Bug，反馈

请在`Issues`中发帖

### License

------

MIT