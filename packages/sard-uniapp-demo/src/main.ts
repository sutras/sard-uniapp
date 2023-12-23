import { createSSRApp } from 'vue'
import App from './App.vue'
import { setLocale } from 'sard-uniapp'
import zhCN from 'sard-uniapp/components/locale/lang/zh-CN'
// import enUS from 'sard-uniapp/components/locale/lang/en-US'

// #ifdef H5
import './bridge'
// #endif

setLocale(zhCN)

export function createApp() {
  const app = createSSRApp(App)

  // app.use(ConfigProvider, {
  //   locale: zhCN,
  // })

  return {
    app,
  }
}
