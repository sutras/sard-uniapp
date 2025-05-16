import { type Theme } from 'sard-cli'
import { registerGlobalComponent } from './components'

export default {
  // extends: DefaultTheme,
  async enhanceApp({ app }) {
    registerGlobalComponent(app)
    console.log(app)
  },
} satisfies Theme
