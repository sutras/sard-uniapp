import { createSSRApp } from 'vue'
import App from './App.vue'

// #ifdef H5
import './ganged'
// #endif

export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
