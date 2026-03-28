import fs from 'node:fs'
import path from 'node:path'
import esbuild from 'esbuild'

type SnippetAlias = '@demo' | '@comp' | '@src' | '@cwd'

type SnippetAliasRoot = {
  prefix: SnippetAlias
  dir: string
}

type SnippetTarget = {
  filePath: string
  region: string
  title: string
}

type SnippetPluginOptions = {
  docsDir: string
  aliasRoots: SnippetAliasRoot[]
}

type DevServerLike = {
  watcher: {
    add: (file: string | string[]) => void
  }
  ws: {
    send: (payload: { type: string; path: string }) => void
  }
}

function cleanupTranspiledOutput(code: string) {
  return code
    .replace(/^['"]use strict['"];?\n?/gm, '')
    .replace(/^\/\/#[#@] sourceMappingURL=.*$/gm, '')
    .trim()
}

function transpileTypeScript(code: string, fileName: string) {
  const result = esbuild.transformSync(code, {
    loader: 'ts',
    legalComments: 'inline',
    sourcefile: fileName,
    format: 'esm',
  })

  return cleanupTranspiledOutput(result.code) || null
}

function transpileVueTypeScript(code: string, fileName: string) {
  let changed = false

  const output = code.replace(
    /<script\b([^>]*?)\blang=(['"])ts\2([^>]*)>([\s\S]*?)<\/script>/g,
    (
      fullMatch,
      beforeLang: string,
      quote: string,
      afterLang: string,
      script: string,
    ) => {
      const transpiled = transpileTypeScript(script, `${fileName}.ts`)

      if (!transpiled) {
        return fullMatch
      }

      changed = true

      const attrs = `${beforeLang}${afterLang}`.replace(/\s+/g, ' ').trim()
      const normalizedAttrs = attrs ? ` ${attrs}` : ''

      return `<script${normalizedAttrs} lang=${quote}js${quote}>\n${transpiled}\n</script>`
    },
  )

  return changed ? output : null
}

function getFenceLanguage(filePath: string) {
  const ext = path.extname(filePath).toLowerCase()

  if (ext === '.ts') {
    return 'ts'
  }

  if (ext === '.js' || ext === '.mjs' || ext === '.cjs') {
    return 'js'
  }

  if (ext === '.vue') {
    return 'vue'
  }

  if (ext === '.scss') {
    return 'scss'
  }

  if (ext === '.css') {
    return 'css'
  }

  if (ext === '.json') {
    return 'json'
  }

  if (ext === '.html') {
    return 'html'
  }

  return ext.replace(/^\./, '') || 'txt'
}

function parseSnippetTarget(rawTarget: string) {
  const match = rawTarget.match(/^(.+?)(?:#([\w*-]+))?(?:\s*\[(.+)\])?$/)

  if (!match) {
    return null
  }

  const [, filePath, region = '', title = ''] = match

  return {
    filePath: filePath.trim(),
    region,
    title: title.trim(),
  } satisfies SnippetTarget
}

function resolveSnippetPath(
  targetPath: string,
  aliasRoots: SnippetAliasRoot[],
) {
  for (const root of aliasRoots) {
    if (targetPath.startsWith(`${root.prefix}/`)) {
      return path.join(root.dir, targetPath.slice(root.prefix.length + 1))
    }
  }

  return null
}

function stripRegionMarker(line: string) {
  return line
    .replace(/^\s*(?:\/\/|\/\*+|\*|<!--)\s*/, '')
    .replace(/\s*(?:\*\/|-->)\s*$/, '')
}

function extractRegion(content: string, region: string) {
  if (!region) {
    return content
  }

  const lines = content.split('\n')
  const startPattern = new RegExp(`^#region\\s+${region}$`)
  const endPattern = new RegExp(`^#endregion\\s+${region}$`)
  let start = -1
  let end = -1

  for (let index = 0; index < lines.length; index += 1) {
    const marker = stripRegionMarker(lines[index]).trim()

    if (start === -1 && startPattern.test(marker)) {
      start = index + 1
      continue
    }

    if (start !== -1 && endPattern.test(marker)) {
      end = index
      break
    }
  }

  if (start === -1) {
    return content
  }

  return lines.slice(start, end === -1 ? undefined : end).join('\n')
}

function createFence(language: string, code: string, title = '') {
  const info = title ? `${language} [${title}]` : language

  return ['```' + info, code, '```'].join('\n')
}

function renderSnippet(target: SnippetTarget, sourcePath: string) {
  const source = fs.readFileSync(sourcePath, 'utf8').replace(/\r\n/g, '\n')
  const snippet = extractRegion(source, target.region).trimEnd()
  const ext = path.extname(sourcePath).toLowerCase()
  const language = getFenceLanguage(sourcePath)

  if (ext === '.ts') {
    const transpiled = transpileTypeScript(snippet, sourcePath)

    if (transpiled) {
      return [
        '::: code-group',
        createFence('ts', snippet, target.title || 'ts'),
        createFence('js', transpiled, 'js'),
        ':::',
      ].join('\n')
    }
  }

  if (ext === '.vue' && /<script\b[^>]*lang=['"]ts['"][^>]*>/.test(snippet)) {
    const transpiled = transpileVueTypeScript(snippet, sourcePath)

    if (transpiled) {
      return [
        '::: code-group',
        createFence('vue', snippet, target.title || 'vue lang="ts"'),
        createFence('vue', transpiled, 'vue lang="js"'),
        ':::',
      ].join('\n')
    }
  }

  return createFence(language, snippet, target.title)
}

function transformMarkdown(code: string, aliasRoots: SnippetAliasRoot[]) {
  const lines = code.split('\n')
  const output: string[] = []
  let changed = false

  for (const line of lines) {
    const match = line.match(/^(\s*)<<<\s+(.+)$/)

    if (!match) {
      output.push(line)
      continue
    }

    const [, indent, rawTarget] = match
    const target = parseSnippetTarget(rawTarget)

    if (!target) {
      output.push(line)
      continue
    }

    const sourcePath = resolveSnippetPath(target.filePath, aliasRoots)

    if (!sourcePath || !fs.existsSync(sourcePath)) {
      output.push(line)
      continue
    }

    const rendered = renderSnippet(target, sourcePath)
      .split('\n')
      .map((renderedLine) => `${indent}${renderedLine}`)
      .join('\n')

    output.push(rendered)
    changed = true
  }

  return changed ? output.join('\n') : null
}

function isInsideDocs(filePath: string, docsDir: string) {
  const relativePath = path.relative(docsDir, filePath)
  return !relativePath.startsWith('..') && !path.isAbsolute(relativePath)
}

function isSnippetSource(filePath: string, aliasRoots: SnippetAliasRoot[]) {
  return aliasRoots.some((root) => {
    const relativePath = path.relative(root.dir, filePath)
    return !relativePath.startsWith('..') && !path.isAbsolute(relativePath)
  })
}

function fullReload(server: DevServerLike) {
  server.ws.send({
    type: 'full-reload',
    path: '*',
  })
}

export function vitepressSnippetPlugin(options: SnippetPluginOptions) {
  return {
    name: 'sard-vitepress-snippet-plugin',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!id.endsWith('.md') || !isInsideDocs(id, options.docsDir)) {
        return null
      }

      return transformMarkdown(code, options.aliasRoots)
    },
    configureServer(server: DevServerLike) {
      for (const root of options.aliasRoots) {
        server.watcher.add(root.dir)
      }
    },
    handleHotUpdate(context: { file: string; server: DevServerLike }) {
      if (isSnippetSource(context.file, options.aliasRoots)) {
        fullReload(context.server)
        return []
      }

      return undefined
    },
  }
}
