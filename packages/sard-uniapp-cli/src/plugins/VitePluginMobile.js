import {
  MOBILE_COMP_PATH_R,
  MOBILE_BUILD_PATH,
  MOBILE_URL_PLACEHOLDER,
} from '../utils/constants.js'

function transform(code, id) {
  if (!MOBILE_COMP_PATH_R.test(id)) {
    return
  }

  let url = process.sard.url
  if (process.env.NODE_ENV === 'production') {
    url = MOBILE_BUILD_PATH
  }

  return code.replace(MOBILE_URL_PLACEHOLDER, url)
}

export function VitePluginMobile() {
  return {
    name: 'VitePluginMobile',
    enforce: 'pre',
    config(config) {
      config.url
    },
    transform(code, id) {
      return transform(code, id)
    },
  }
}
