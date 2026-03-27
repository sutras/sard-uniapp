import { type Theme } from 'sard-cli'
import { registerGlobalComponent } from './components'

export default {
  async enhanceApp({ app }) {
    registerGlobalComponent(app)
  },
} satisfies Theme
