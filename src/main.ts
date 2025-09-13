import { createSSRApp } from 'vue'
import App from './App.vue'
import { setConfig, useLocaleProvide } from 'sard-uniapp'

import zhCN from 'sard-uniapp/components/locale/lang/zh-CN'
import enUS from 'sard-uniapp/components/locale/lang/en-US'
import arSA from 'sard-uniapp/components/locale/lang/ar-SA'

console.log(uni.getWindowInfo())

// #ifdef WEB
import './bridge'
// #endif

setConfig({
  button: {
    // loadingType: 'clock',
  },
  form: {
    // contentPosition: 'right',
  },
})

export function createApp() {
  const app = createSSRApp(App)

  useLocaleProvide(
    app,
    {
      zhCN,
      enUS,
      arSA,
    },
    'zhCN',
  )

  return {
    app,
  }
}
