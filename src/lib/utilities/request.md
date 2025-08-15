---
nav:
  title: 工具
  order: 2
title: 请求
group:
  title: 工程化
version: 1.20+
---

## 介绍

`uni.request` 接口是基础的、原始的，通常需要经过封装才更好使用。

本库因此提供了 `Request` 类用于发送请求，在 `uni.request` 基础上，新增以下特性：

- 支持默认配置
- 提供快捷方法
- 拦截请求和响应
- 自动处理 URL 的查询字符串
- 支持额外参数
- 支持文件上传/下载

## 用例

创建请求对象

```ts
import { Request } from 'sard-uniapp'

const request = new Request({
  baseURL: 'http://localhost/api',
})
```

发送一个 GET 请求

```ts
// 向给定ID的用户发起请求
request
  .get('/user?ID=12345')
  .then((response) => {
    // 处理成功情况
    console.log(response)
  })
  .catch((error) => {
    // 处理错误情况
    console.log(error)
  })
  .finally(() => {
    // 总是会执行
  })

// 上述请求也可以按以下方式完成（可选）
request.get('/user', {
  params: {
    ID: 12345,
  },
})

// 支持async/await用法
async function getUser() {
  try {
    const response = await request.get('/user?ID=12345')
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
```

发起一个 POST 请求

```ts
request
  .post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone',
  })
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
```

发起多个并发请求

```ts
function getUserAccount() {
  return request.get('/user/12345')
}

function getUserPermissions() {
  return request.get('/user/12345/permissions')
}

const [acct, perm] = await Promise.all([getUserAccount(), getUserPermissions()])

// OR

Promise.all([getUserAccount(), getUserPermissions()]).then(([acct, perm]) => {
  // ...
})
```

## 接口

### Request 构造函数

```ts
constructor Request<E extends Record<string, any> = any>(defaultConfig?: RequestConfig): Request<E>
```

### 实例方法

```ts
Request#request(config)
Request#get(url[, config])
Request#head(url[, config])
Request#connect(url[, config])
Request#trace(url[, config])
Request#post(url[, data[, config]])
Request#put(url[, data[, config]])
Request#delete(url[, data[, config]])
Request#options(url[, data[, config]])
Request#upload(url[, data[, config]])
Request#download(url[, data[, config]])
```

### 请求配置 RequestConfig

```ts
interface RequestConfig {
  /**
   * 自动加在 `url` 前面，除非 `url` 是一个绝对 URL
   */
  baseURL?: string
  /**
   * 与请求一起发送的 URL 参数
   */
  params?: {
    [key: string]: any
  }
  /**
   * 获取 uni.request 返回值，可用于中断请求
   */
  getTask?: (task: UniApp.RequestTask, config: RequestConfig) => void
  /**
   * 请求的参数
   */
  data?: any
  /**
   * 额外的请求参数，用于实现自定义的行为
   */
  extra?: Record<string, any>

  /**
   * 资源url
   */
  url?: string
  /**
   * 设置请求的 header，header 中不能设置 Referer。
   */
  header?: any
  /**
   * 默认为 GET
   * 可以是：OPTIONS，GET，HEAD，POST，PUT，DELETE，TRACE，CONNECT
   */
  method?:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
    | 'DOWNLOAD'
    | 'UPLOAD'
  /**
   * 超时时间
   */
  timeout?: number
  /**
   * 如果设为json，会尝试对返回的数据做一次 JSON.parse
   */
  dataType?: string
  /**
   * 设置响应的数据类型。合法值：text、arraybuffer
   */
  responseType?: string
  /**
   * 验证 ssl 证书
   */
  sslVerify?: boolean
  /**
   * 跨域请求时是否携带凭证
   */
  withCredentials?: boolean
  /**
   * DNS解析时优先使用 ipv4
   */
  firstIpv4?: boolean
  /**
   * 开启 http2
   */
  enableHttp2?: boolean
  /**
   * 开启 quic
   */
  enableQuic?: boolean
  /**
   * 开启 cache
   */
  enableCache?: boolean
  /**
   * 是否开启 HttpDNS 服务。如开启，需要同时填入 httpDNSServiceId 。 HttpDNS 用法详见 [移动解析HttpDNS](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/HTTPDNS.html)
   */
  enableHttpDNS?: boolean
  /**
   * HttpDNS 服务商 Id。 HttpDNS 用法详见 [移动解析HttpDNS](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/HTTPDNS.html)
   */
  httpDNSServiceId?: boolean
  /**
   * 开启 transfer-encoding chunked
   */
  enableChunked?: boolean
  /**
   * wifi下使用移动网络发送请求
   */
  forceCellularNetwork?: boolean
  /**
   * 默认 false，开启后可在headers中编辑cookie（支付宝小程序10.2.33版本开始支持）
   */
  enableCookie?: boolean
  /**
   * 是否开启云加速（详见[云加速服务](https://smartprogram.baidu.com/docs/develop/extended/component-codeless/cloud-speed/introduction/)）
   */
  cloudCache?: object | boolean
  /**
   * 控制当前请求是否延时至首屏内容渲染后发送
   */
  defer?: boolean
}
```

### 请求成功响应对象 Response

一个请求的成功响应包含以下信息。

注意，此“成功”指服务器有处理请求，无论响应的状态码是什么。

```ts
interface Response {
  /**
   * 开发者服务器返回的数据
   */
  data: any
  /**
   * 开发者服务器返回的 HTTP 状态码
   */
  statusCode: number
  /**
   * 开发者服务器返回的 HTTP Response Header
   */
  header: Record<string, string>
  /**
   * 开发者服务器返回的 cookies，格式为字符串数组
   */
  cookies: string[]
  /**
   * 请求的配置信息
   */
  config: RequestConfig
  /**
   * 错误信息
   */
  errMsg: string
  /**
   * 临时文件路径，下载后的文件会存储到一个临时文件。微信小程序、支付宝小程序、百度小程序、抖音小程序、飞书小程序
   *
   * 仅 download 接口。
   */
  tempFilePath: string
  /**
   * 下载文件保存的路径（本地临时文件）。入参未指定 filePath 的情况下可用。支付宝小程序
   *
   * 仅 download 接口。
   */
  apFilePath: string
  /**
   * 用户文件路径 (本地路径)。传入 filePath 时会返回，跟传入的 filePath 一致。微信小程序、支付宝小程序、抖音小程序、飞书小程序
   *
   * 仅 download 接口。
   */
  filePath: string
  /**
   * 文件内容。QQ小程序
   *
   * 仅 download 接口。
   */
  fileContent?: Buffer
  /**
   * 需要基础库： `2.10.4`
   *
   * 网络请求过程中一些调试信息，[查看详细说明](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/network.html)
   *
   * 仅 download 接口。
   */
  profile?: UniApp.RequestProfile
}
```

当使用 then 时，您将接收如下响应:

```ts
request.get('/user/12345').then((response) => {
  console.log(response.data)
  console.log(response.statusCode)
  console.log(response.header)
  console.log(response.cookies)
  console.log(response.config)
  console.log(response.errMsg)
})
```

### 请求失败响应对象 ErrorResponse

```ts
interface ErrorResponse {
  /**
   * 请求的配置信息
   */
  config: RequestConfig
  /**
   * 错误信息
   */
  errMsg: string
}
```

请求失败原因可能为以下或其他：

- 网络不通
- 服务器拒绝连接
- 跨域错误
- 连接超时
- 其他

### 拦截器

在请求或响应被 then 或 catch 处理前拦截它们。

```ts
// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 服务器有响应触发该函数，需要对非 2xx 做处理
    // 对响应数据做点什么
    return response
  },
  (error) => {
    // 请求失败时触发该函数
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)
```

### 中断请求

`getTask` 配置项可用于获取 <a target="_blank" href="https://uniapp.dcloud.net.cn/api/request/request.html#requesttask-values">`RequestTask`</a>。

```ts
let requestTask: UniApp.RequestTask | null = null

request.get('/user?ID=12345', {
  getTask(task) {
    requestTask = task
  },
})

setTimeout(() => {
  requestTask?.abort()
}, 1000)
```

### 重试

将重试相关配置放置在 `extra` 配置项，并在请求失败时重试。

```ts
request.interceptors.response.use(null, ({ config, errMsg }) => {
  const extra = config.extra
  if (extra.retryCount && --extra.retryCount > 0) {
    return new Promise((resolve) =>
      setTimeout(resolve, extra.retryDelay || 1000),
    ).then(() => request.request(config))
  }

  uni.showToast({
    title: errMsg,
  })
  return Promise.reject(errMsg)
})
```

发送请求

```ts
request.get('admin/users', {
  extra: {
    retryCount: 3,
    retryDelay: 1000,
  },
})
```

### 通用工厂函数

下面演示如何编写一个通用的 `Request` 工厂函数，可以处理添加 token、失败状态码、错误提示、重试。

```ts
// @/utils/request.ts
import { Request, type RequestConfig } from 'sard-uniapp'
import { useUserStore } from '@/stores/user'

const errToastDuration = 5000

function createRequest(defaultConfig: RequestConfig) {
  const request = new Request(defaultConfig)

  // 请求拦截器
  request.interceptors.request.use((config) => {
    const userStore = useUserStore()

    // 添加 token 到请求头
    if (userStore.token) {
      config.header.Authorization = 'Bearer ' + userStore.token
    }

    return config
  })

  // 响应拦截器
  request.interceptors.response.use(
    (response) => {
      // 处理 http 状态码
      if (response.statusCode < 200 || response.statusCode >= 300) {
        uni.showToast({
          title: 'Error: statusCode ' + response.statusCode,
          icon: 'none',
          duration: errToastDuration,
        })

        return Promise.reject(response.errMsg)
      }

      // 假设返回 json 类型数据
      const {
        code,
        data,
        message = 'error',
      } = (response.data || {}) as {
        code: number
        data: any
        message: string
      }

      // 处理自定义状态码
      if (code !== 200) {
        uni.showToast({
          title: message,
          icon: 'none',
          duration: errToastDuration,
        })
        return Promise.reject(message)
      }

      return data
    },
    async ({ config, errMsg }) => {
      const extra = config.extra
      if (extra.retryCount && --extra.retryCount > 0) {
        return new Promise((resolve) =>
          setTimeout(resolve, extra.retryDelay || 1000),
        ).then(() => request.request(config))
      }

      // 处理请求失败
      uni.showToast({
        title: errMsg,
        icon: 'none',
        duration: errToastDuration,
      })
      return Promise.reject(errMsg)
    },
  )

  return request
}
```

创建请求对象

```ts
export const requestV1 = createRequest({
  baseURL: 'http://localhost/api-v1',
})

export const requestV2 = createRequest({
  baseURL: 'http://localhost/api-v2',
})
```

### 上传

```ts
request.upload('api/upload', {
  /**
   * 资源url
   */
  url?: string
  /**
   * 自动加在 `url` 前面，除非 `url` 是一个绝对 URL
   */
  baseURL?: string
  /**
   * 与请求一起发送的 URL 参数
   */
  params?: {
    [key: string]: any
  }
  /**
   * 获取 uni.uploadFile 返回值，可用于中断请求
   */
  getTask?: (task: UniApp.UploadTask, config: RequestConfig) => void
  /**
   * 设置请求的 header，header 中不能设置 Referer。
   */
  header?: any
  /**
   * 超时时间
   */
  timeout?: number
  /**
   * 需要上传的文件列表。App、H5（ 2.6.15+）
   */
  files?: UploadFileOptionFiles[]
  /**
   * 文件类型，image/video/audio，仅支付宝小程序，且必填。
   * - image: 图像
   * - video: 视频
   * - audio: 音频
   */
  fileType?: 'image' | 'video' | 'audio'
  /**
   * 要上传的文件对象。	仅H5（2.6.15+）支持
   */
  file?: File
  /**
   * 要上传文件资源的路径
   */
  filePath?: string
  /**
   * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
   */
  name?: string
  /**
   * HTTP 请求中其他额外的 form data
   */
  formData?: {
   [key: string]: any
  }
})
```

### 下载

```ts
request.upload('api/download', {
  /**
   * 资源url
   */
  url?: string
  /**
   * 自动加在 `url` 前面，除非 `url` 是一个绝对 URL
   */
  baseURL?: string
  /**
   * 与请求一起发送的 URL 参数
   */
  params?: {
    [key: string]: any
  }
  /**
   * 获取 uni.uploadFile 返回值，可用于中断请求
   */
  getTask?: (task: UniApp.UploadTask, config: RequestConfig) => void
  /**
   * 设置请求的 header，header 中不能设置 Referer。
   */
  header?: any
  /**
   * 超时时间
   */
  timeout?: number
  /**
   * 要下载文件资源的路径
   */
  filePath?: string
})
```
