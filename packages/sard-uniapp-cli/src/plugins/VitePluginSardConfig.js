import { MAIN_FILE_NAME, sardConfig } from '../utils/constants.js'

export function VitePluginSardConfig() {
  return {
    name: 'VitePluginSardConfig',
    enforce: 'pre',
    transform(code, id) {
      if (new RegExp(MAIN_FILE_NAME + '$').test(id)) {
        return code.replace(
          /\/\/ #sard-config-placeholder/,
          `app.provide('sardConfig', ${JSON.stringify(sardConfig)})`,
        )
      }
    },
  }
}
