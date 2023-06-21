import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'prism-themes/themes/prism-one-dark.css'
import './index.scss'
import './custom.scss'

const app = createApp(App)

app.use(router)

app.mount('#root')
