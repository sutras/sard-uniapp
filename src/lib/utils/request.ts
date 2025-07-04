import { URLQuery } from './url-query'

interface UploadFileOptionFiles {
  /**
   * multipart 提交时，表单的项目名，默认为 file，如果 name 不填或填的值相同，可能导致服务端读取文件时只能读取到一个文件。
   */
  name?: string
  /**
   * 要上传的文件对象
   */
  file?: File
  /**
   * 要上传文件资源的路径
   */
  uri?: string
}

export interface RequestConfig<
  D extends string | AnyObject | ArrayBuffer = any,
  E extends Record<string, any> = any,
  Task extends
    | UniApp.RequestTask
    | UniApp.UploadTask
    | UniApp.DownloadTask = UniApp.RequestTask,
> {
  /**
   * 自动加在 `url` 前面，除非 `url` 是一个绝对 URL
   */
  baseURL?: string
  /**
   * 与请求一起发送的 URL 参数
   */
  params?: AnyObject
  /**
   * 获取 uni.request 返回值，可用于中断请求
   */
  getTask?: (task: Task, config: RequestConfig<D, E>) => void
  /**
   * 请求的参数
   */
  data?: D
  /**
   * 额外的请求参数，用于实现自定义的行为
   */
  extra?: E

  // UniApp.RequestOptions
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

  // 上传/下载
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
   * 要上传/下载文件资源的路径
   */
  filePath?: string
  /**
   * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
   */
  name?: string
  /**
   * HTTP 请求中其他额外的 form data
   */
  formData?: AnyObject
}

export interface Response<
  T = any,
  D extends string | AnyObject | ArrayBuffer = any,
> {
  /**
   * 开发者服务器返回的数据
   */
  data: T
  /**
   * 开发者服务器返回的 HTTP 状态码
   */
  statusCode: number
  /**
   * 开发者服务器返回的 HTTP Response Header
   */
  header: any
  /**
   * 开发者服务器返回的 cookies，格式为字符串数组
   */
  cookies: string[]
  /**
   * 请求的配置信息
   */
  config: RequestConfig<D>
  /**
   * 错误信息
   */
  errMsg: string
  /**
   * 临时文件路径，下载后的文件会存储到一个临时文件。微信小程序、支付宝小程序、百度小程序、抖音小程序、飞书小程序
   */
  tempFilePath: string
  /**
   * 下载文件保存的路径（本地临时文件）。入参未指定 filePath 的情况下可用。支付宝小程序
   */
  apFilePath: string
  /**
   * 用户文件路径 (本地路径)。传入 filePath 时会返回，跟传入的 filePath 一致。微信小程序、支付宝小程序、抖音小程序、飞书小程序
   */
  filePath: string
  /**
   * 文件内容。QQ小程序
   */
  fileContent?: any
  /**
   * 需要基础库： `2.10.4`
   *
   * 网络请求过程中一些调试信息，[查看详细说明](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/network.html)
   */
  profile?: UniApp.RequestProfile
}

export interface ErrorResponse<
  D extends string | AnyObject | ArrayBuffer = any,
> {
  /**
   * 请求的配置信息
   */
  config: RequestConfig<D>
  /**
   * 错误信息
   */
  errMsg: string
}

function reducerFactory<T, E>() {
  const handlers: {
    fulfilled: (value: T) => T | Promise<T>
    rejected?: ((error: E) => any) | null
  }[] = []

  function use(
    onFulfilled: (value: T) => T | Promise<T>,
    onRejected?: ((error: E) => any) | null,
  ) {
    handlers.push({
      fulfilled: onFulfilled,
      rejected: onRejected,
    })
  }

  async function resolve(data: T) {
    for (const { fulfilled } of handlers) {
      try {
        data = await fulfilled(data)
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return Promise.resolve(data)
  }

  async function reject(error: any) {
    for (const { rejected } of handlers) {
      try {
        if (rejected) {
          const data = await rejected(error)
          return Promise.resolve(data)
        }
      } catch (newError) {
        error = newError
      }
    }
    return Promise.reject(error)
  }

  return {
    use,
    resolve,
    reject,
  }
}

function createInterceptors<T, U, E>() {
  return {
    request: reducerFactory<T, E>(),
    response: reducerFactory<U, E>(),
  }
}

const defaultRequestConfig: RequestConfig = {}

function mergeConfig(...configs: RequestConfig<any, any, any>[]) {
  return configs.reduce((result, config) => {
    return {
      ...result,
      ...config,
      header: {
        ...result.header,
        ...config.header,
      },
      params: {
        ...result.params,
        ...config.params,
      },
      extra: {
        ...result.extra,
        ...config.extra,
      },
    }
  }, {} as RequestConfig)
}

function mergeUrl(options: {
  baseURL?: string
  url?: string
  params?: AnyObject
}) {
  const { baseURL = '', url = '', params } = options

  let mergedUrl = ''

  if (/^(https?:)?\/\//.test(url)) {
    mergedUrl = url
  } else if (baseURL && url) {
    mergedUrl = baseURL.replace(/\/*$/, '') + '/' + url.replace(/^\/*/, '')
  } else if (baseURL) {
    mergedUrl = baseURL
  } else if (url) {
    mergedUrl = url
  }

  if (params) {
    const query = new URLQuery(params)
    const index = mergedUrl.indexOf('?')

    if (index !== -1) {
      const originPath = mergedUrl.slice(0, index)
      const search = mergedUrl.slice(index)
      mergedUrl =
        originPath +
        '?' +
        new URLQuery([...new URLQuery(search), ...query]).toString()
    } else {
      mergedUrl += '?' + query.toString()
    }
  }

  return mergedUrl
}

export class Request<E extends Record<string, any> = any> {
  readonly interceptors: ReturnType<
    typeof createInterceptors<
      RequestConfig<any, E, any>,
      Response,
      ErrorResponse
    >
  >
  protected defaultConfig: RequestConfig

  constructor(defaultConfig: RequestConfig = {}) {
    this.defaultConfig = mergeConfig(defaultRequestConfig, defaultConfig)
    this.interceptors = createInterceptors<
      RequestConfig,
      Response,
      ErrorResponse
    >()
  }

  request<
    T = any,
    R = Response<T>,
    D extends string | AnyObject | ArrayBuffer = any,
    Task extends
      | UniApp.RequestTask
      | UniApp.UploadTask
      | UniApp.DownloadTask = UniApp.RequestTask,
  >(config: RequestConfig<D, E, Task>) {
    return new Promise<R>((resolve, reject) => {
      const interceptors = this.interceptors

      config = mergeConfig(this.defaultConfig, config)

      interceptors.request
        .resolve(config)
        .then((config: RequestConfig<D>) => {
          const { baseURL, params, getTask, url, extra, ...rest } = config

          void extra

          const mergedUrl = mergeUrl({ baseURL, url, params })

          const mergedConfig = {
            ...rest,
            url: mergedUrl,
            success(
              result: UniApp.RequestSuccessCallbackResult &
                UniApp.UploadFileSuccessCallbackResult &
                UniApp.DownloadSuccessData & {
                  apFilePath: string
                  fileContent?: any
                },
            ) {
              const {
                data,
                statusCode,
                header = {},
                cookies = [],
                errMsg = '',
                tempFilePath = '',
                apFilePath = '',
                filePath = '',
                fileContent,
                profile,
              } = result

              let parsedData = data
              if (typeof data === 'string') {
                try {
                  parsedData = JSON.parse(data)
                } catch {
                  void 0
                }
              }

              interceptors.response
                .resolve({
                  data: parsedData,
                  statusCode,
                  header,
                  cookies,
                  errMsg,
                  tempFilePath,
                  apFilePath,
                  filePath,
                  fileContent,
                  profile,
                  config,
                })
                .then(resolve as (value: Response<any, any>) => void, reject)
            },
            fail(result: UniApp.GeneralCallbackResult) {
              interceptors.response
                .reject({
                  ...result,
                  config,
                })
                .then(resolve, reject)
            },
          }

          let task: UniApp.RequestTask | UniApp.UploadTask | UniApp.DownloadTask

          switch (config.method) {
            case 'DOWNLOAD':
              task = uni.downloadFile(
                mergedConfig as any,
              ) as UniApp.DownloadTask
              break
            case 'UPLOAD':
              task = uni.uploadFile(mergedConfig as any) as UniApp.UploadTask
              break
            default:
              task = uni.request(mergedConfig as any) as UniApp.RequestTask
              break
          }

          if (getTask) {
            getTask(task, config)
          }
        })
        .catch(reject)
    })
  }

  get<
    T = any,
    R = Response<T>,
    D extends string | AnyObject | ArrayBuffer = any,
  >(url: string, config?: RequestConfig<D, E>) {
    return this.request<T, R, D>({
      ...config,
      url,
      method: 'GET',
    })
  }

  head<
    T = any,
    R = Response<T>,
    D extends string | AnyObject | ArrayBuffer = any,
  >(url: string, config?: RequestConfig<D, E>) {
    return this.request<T, R, D>({
      ...config,
      url,
      method: 'HEAD',
    })
  }

  connect<
    T = any,
    R = Response<T>,
    D extends string | AnyObject | ArrayBuffer = any,
  >(url: string, config?: RequestConfig<D, E>) {
    return this.request<T, R, D>({
      ...config,
      url,
      method: 'CONNECT',
    })
  }

  trace<
    T = any,
    R = Response<T>,
    D extends string | AnyObject | ArrayBuffer = any,
  >(url: string, config?: RequestConfig<D, E>) {
    return this.request<T, R, D>({
      ...config,
      url,
      method: 'TRACE',
    })
  }

  post<
    T = any,
    R = Response<T>,
    D extends string | AnyObject | ArrayBuffer = any,
  >(url: string, data?: D, config?: RequestConfig<D, E>) {
    return this.request<T, R, D>({
      ...config,
      url,
      data,
      method: 'POST',
    })
  }

  put<
    T = any,
    R = Response<T>,
    D extends string | AnyObject | ArrayBuffer = any,
  >(url: string, data?: D, config?: RequestConfig<D, E>) {
    return this.request<T, R, D>({
      ...config,
      url,
      data,
      method: 'PUT',
    })
  }

  delete<
    T = any,
    R = Response<T>,
    D extends string | AnyObject | ArrayBuffer = any,
  >(url: string, data?: D, config?: RequestConfig<D, E>) {
    return this.request<T, R, D>({
      ...config,
      url,
      data,
      method: 'DELETE',
    })
  }

  options<
    T = any,
    R = Response<T>,
    D extends string | AnyObject | ArrayBuffer = any,
  >(url: string, data?: D, config?: RequestConfig<D, E>) {
    return this.request<T, R, D>({
      ...config,
      url,
      data,
      method: 'OPTIONS',
    })
  }

  upload<
    T = any,
    R = Response<T>,
    D extends string | AnyObject | ArrayBuffer = any,
  >(url: string, config?: RequestConfig<D, E, UniApp.UploadTask>) {
    return this.request<T, R, D, UniApp.UploadTask>({
      ...config,
      url,
      method: 'UPLOAD',
    })
  }

  download<
    T = any,
    R = Response<T>,
    D extends string | AnyObject | ArrayBuffer = any,
  >(url: string, config?: RequestConfig<D, E, UniApp.DownloadTask>) {
    return this.request<T, R, D, UniApp.DownloadTask>({
      ...config,
      url,
      method: 'DOWNLOAD',
    })
  }
}
