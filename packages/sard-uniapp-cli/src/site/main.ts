import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

import 'prism-themes/themes/prism-one-dark.css'
// import 'prism-themes/themes/prism-one-light.css'
import './assets/font/hsi.css'
import './index.scss'
import './custom.scss'

const app = createApp(App)

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach((to) => {
  NProgress.done()

  if (to.hash) {
    setTimeout(() => {
      const el = document.querySelector(to.hash)
      if (el) {
        window.scrollBy({
          top: el.getBoundingClientRect().top - 60 - 10,
          behavior: 'instant',
        })
      }
    })
  } else {
    window.scrollTo(0, 0)
  }
})

app.use(router)

// #sard-config-placeholder

app.mount('#root')
