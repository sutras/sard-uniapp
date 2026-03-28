// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import { type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SardDocHeader from './components/SardDocHeader.vue'
import SardMobilePreview from './components/SardMobilePreview.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-before': () => h(SardDocHeader),
      'aside-top': () => h(SardMobilePreview),
    })
  },
} satisfies Theme
