import { createContext, FC, ReactNode, useContext } from 'react'
import enUS from './lang/en-US'
import zhCN from './lang/zh-CN'
import { ConfigProviderContext } from '../config-provider'

const translations = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

const addTranslation = (lang: string, translation: Record<string, any>) => {
  translations[lang] = translation
}

export type LocaleContext = typeof zhCN

export const LocaleContext = createContext<LocaleContext>(zhCN)

export interface LocaleProps {
  children?: ReactNode
}

interface LocaleFC extends FC<LocaleProps> {
  add: typeof addTranslation
}

export const Locale: LocaleFC = (props) => {
  const { children } = props

  const { lang } = useContext(ConfigProviderContext)

  const translation = translations[lang] || zhCN
  return (
    <LocaleContext.Provider value={translation}>
      {children}
    </LocaleContext.Provider>
  )
}

Locale.add = addTranslation

export default Locale
