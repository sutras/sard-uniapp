import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index.js'

loadLanguages(['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'scss', 'bash'])

export function highlight(code, lang = 'text') {
  return Prism.highlight(code, Prism.languages[lang], lang)
}

export function hlCallback(code = '', lang = 'text') {
  try {
    return `<pre class="language-${lang}"><code class="language-${lang}">${highlight(
      code,
      lang,
    )}</code></pre>`
  } catch {
    return code
  }
}
