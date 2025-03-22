export const systemInfo = uni.getSystemInfoSync()

const platform = systemInfo.uniPlatform

export const isApp = platform === 'app'
export const isWeb = platform === 'web'
export const isMp = platform.startsWith('mp-')
export const isAlipay = platform === 'mp-alipay'
export const isWeixin = platform === 'mp-weixin'
