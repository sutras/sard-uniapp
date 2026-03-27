import { type App } from 'vue'

import DocHome from './DocHome.vue'

const components = [DocHome]

export function registerGlobalComponent(app: App) {
  components.forEach((component) => {
    app.component(component.name!, component)
  })
}
