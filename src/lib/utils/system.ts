let platform = ''

// #ifdef APP
platform = 'app'
// #endif

// #ifdef MP-WEIXIN
platform = 'mp-weixin'
// #endif

// #ifdef MP-ALIPAY
platform = 'mp-alipay'
// #endif

// #ifdef WEB
platform = 'web'
// #endif

export const isWeb = platform === 'web'
export const isApp = platform === 'app'
export const isMp = platform.startsWith('mp-')
export const isWeixin = platform === 'mp-weixin'
export const isAlipay = platform === 'mp-alipay'
