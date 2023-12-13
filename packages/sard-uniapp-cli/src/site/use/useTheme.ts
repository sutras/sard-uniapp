import { ref, watchPostEffect, provide } from 'vue'

const themeKey = 'sardTheme'

export type ThemeType = 'dark' | 'light'

const systemTheme = window.matchMedia('(prefers-color-scheme:dark)').matches
  ? 'dark'
  : 'light'

const defaulTheme = (window.localStorage.getItem(themeKey) ||
  systemTheme) as ThemeType

document.documentElement.dataset.docTheme = defaulTheme

export default function useTheme() {
  const theme = ref(defaulTheme)

  watchPostEffect(() => {
    document.documentElement.dataset.docTheme = theme.value
    window.localStorage.setItem(themeKey, theme.value)
  })

  provide('theme', {
    theme,
    toggle() {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    },
    setTheme(t: ThemeType) {
      theme.value = t
    },
  })
}
