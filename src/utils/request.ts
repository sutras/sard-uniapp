import { Request, RequestConfig } from 'sard-uniapp'

const errToastDuration = 5000
const token = ''

function createRequest(defaultConfig: RequestConfig) {
  const request = new Request(defaultConfig)

  // 请求拦截器
  request.interceptors.request.use((config) => {
    // 添加 token 到请求头
    if (token) {
      config.header.Authorization = 'Bearer ' + token
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

export const request = createRequest({
  baseURL: 'http://localhost:8880/api',
  timeout: 6000,
})
