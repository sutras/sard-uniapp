import { useContext } from 'react'
import { LocaleContext } from './index'
import { useEvent } from '../../use'
import { chainSelect } from '../../utils'

export function useTranslate(prefix?: string) {
  const translation = useContext(LocaleContext)

  const translate = useEvent((chain?: string) => {
    return chainSelect(
      translation,
      prefix ? (chain ? prefix + '.' + chain : prefix) : chain,
    )
  })

  return [translate]
}

export default useTranslate
