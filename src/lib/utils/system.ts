export const systemInfo = uni.getSystemInfoSync()

export const isApp = systemInfo.uniPlatform === 'app'
export const isWeb = systemInfo.uniPlatform === 'web'
export const isMp = systemInfo.uniPlatform.startsWith('mp-')
