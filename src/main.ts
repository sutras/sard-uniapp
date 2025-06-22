import { createSSRApp } from 'vue'
import App from './App.vue'
import { setConfig, useLocaleProvide } from 'sard-uniapp'

import zhCN from 'sard-uniapp/components/locale/lang/zh-CN'
import enUS from 'sard-uniapp/components/locale/lang/en-US'

// #ifdef WEB
import './bridge'
// #endif

setConfig({
  button: {
    // loadingType: 'clock',
  },
})

export function createApp() {
  const app = createSSRApp(App)

  useLocaleProvide(
    app,
    {
      zhCN,
      enUS,
    },
    'zhCN',
  )

  return {
    app,
  }
}
