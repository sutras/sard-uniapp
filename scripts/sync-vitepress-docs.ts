import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

type DocSection = 'guide' | 'utilities' | 'components'
type SnippetAlias = '@demo' | '@comp' | '@src' | '@cwd'

type DocMeta = {
  name: string
  title: string
  subtitle?: string
  order: number
  groupTitle: string
  groupOrder: number
}

type DocFile = DocMeta & {
  content: string
  filePath: string
  section: DocSection
}

const currentFile = fileURLToPath(import.meta.url)
const scriptDir = path.dirname(currentFile)
const rootDir = path.resolve(scriptDir, '..')
const docsDir = path.join(rootDir, 'packages', 'docs')
const componentsDir = path.join(docsDir, 'components')
const sardConfigPath = path.join(rootDir, 'sard.config.ts')
const packageComponentsDir = path.join(
  rootDir,
  'packages',
  'sard-uniapp',
  'components',
)
const demoSourceDir = path.join(rootDir, 'src', 'pages', 'components')
const srcSourceDir = path.join(rootDir, 'src')
const normalizedRegionFiles = new Set<string>()
const docSections: DocSection[] = ['guide', 'utilities', 'components']
const ignoredLegacyMarkers = new Set([
  'if',
  'ifdef',
  'ifndef',
  'endif',
  'else',
  'elif',
])

const snippetAliasRoots: Array<{ prefix: SnippetAlias; dir: string }> = [
  { prefix: '@demo', dir: demoSourceDir },
  { prefix: '@comp', dir: packageComponentsDir },
  { prefix: '@src', dir: srcSourceDir },
  { prefix: '@cwd', dir: rootDir },
]

function formatComponentText(component: Pick<DocMeta, 'title' | 'subtitle'>) {
  return component.subtitle
    ? `${component.title} ${component.subtitle}`
    : component.title
}

function stripQuotes(value: string) {
  return value.trim().replace(/^['"]|['"]$/g, '')
}

function toPosixPath(filePath: string) {
  return filePath.split(path.sep).join('/')
}

function ensureDirectory(dirPath: string) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function walkDirectory(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return []
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const resolvedPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      files.push(...walkDirectory(resolvedPath))
      continue
    }

    files.push(resolvedPath)
  }

  return files
}

function readCodeAliases() {
  const content = fs.readFileSync(sardConfigPath, 'utf8')
  const aliases = new Map<string, string>()
  const codeAliasBlock = content.match(/codeAlias:\s*\{([\s\S]*?)\n\s*\},/)

  if (!codeAliasBlock) {
    return aliases
  }

  const aliasRegexp =
    /([A-Z_]+):\s*path\.resolve\(process\.cwd\(\),\s*'([^']+)'\)/g

  for (const matched of codeAliasBlock[1].matchAll(aliasRegexp)) {
    const [, alias, relativePath] = matched
    aliases.set(alias, path.resolve(rootDir, relativePath))
  }

  return aliases
}

const codeAliases = readCodeAliases()

const aliasFallbacks = new Map<string, string>([
  ['DEMO_PATH', demoSourceDir],
  ['COMP_PATH', packageComponentsDir],
  ['ROOT_PATH', srcSourceDir],
  ['CWD', rootDir],
])

function parseFrontmatter(content: string) {
  const matched = content.match(/^---\n([\s\S]*?)\n---/)
  const meta = {
    title: '',
    subtitle: '',
    order: Number.MAX_SAFE_INTEGER,
    groupTitle: '未分组',
    groupOrder: Number.MAX_SAFE_INTEGER,
  }

  if (!matched) {
    return meta
  }

  const lines = matched[1].split(/\r?\n/)

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const pair = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)

    if (!pair) {
      continue
    }

    const [, key, rawValue] = pair

    if (key === 'group') {
      if (rawValue) {
        meta.groupTitle = stripQuotes(rawValue)
        continue
      }

      while (index + 1 < lines.length && lines[index + 1].startsWith('  ')) {
        index += 1
        const nestedPair = lines[index]
          .trim()
          .match(/^([A-Za-z][\w-]*):\s*(.*)$/)

        if (!nestedPair) {
          continue
        }

        const [, nestedKey, nestedValue] = nestedPair

        if (nestedKey === 'title') {
          meta.groupTitle = stripQuotes(nestedValue)
        }

        if (nestedKey === 'order') {
          const order = Number(nestedValue)

          if (!Number.isNaN(order)) {
            meta.groupOrder = order
          }
        }
      }

      continue
    }

    if (key === 'title') {
      meta.title = stripQuotes(rawValue)
    }

    if (key === 'subtitle') {
      meta.subtitle = stripQuotes(rawValue)
    }

    if (key === 'order') {
      const order = Number(rawValue)

      if (!Number.isNaN(order)) {
        meta.order = order
      }
    }
  }

  return meta
}

function getSourceBaseDir(section: DocSection, name: string) {
  if (section === 'components') {
    return path.join(packageComponentsDir, name)
  }

  return path.join(rootDir, 'packages', 'sard-uniapp', section)
}

function resolveAliasCandidates(alias: string) {
  const candidates = [codeAliases.get(alias), aliasFallbacks.get(alias)].filter(
    (value): value is string => Boolean(value),
  )

  return [...new Set(candidates)]
}

function resolveLegacyCodePath(
  doc: Pick<DocFile, 'filePath' | 'section' | 'name'>,
  rawPath: string,
) {
  const aliasMatch = rawPath.match(/^\$\{([A-Z_]+)\}(?:\/(.*))?$/)

  if (aliasMatch) {
    const [, alias, subPath = ''] = aliasMatch
    const normalizedSubPath = subPath.replace(/^\//, '')

    for (const basePath of resolveAliasCandidates(alias)) {
      const resolved = path.resolve(basePath, normalizedSubPath)

      if (fs.existsSync(resolved)) {
        return resolved
      }
    }
  }

  return path.resolve(getSourceBaseDir(doc.section, doc.name), rawPath)
}

function normalizeLegacyRegionMarkers(filePath: string) {
  if (normalizedRegionFiles.has(filePath) || !fs.existsSync(filePath)) {
    return
  }

  normalizedRegionFiles.add(filePath)

  const content = fs.readFileSync(filePath, 'utf8')
  const normalized = content
    .replace(
      /^(\s*\/\/\s*)#end([A-Za-z][\w*-]*)\s*$/gm,
      (_, prefix: string, marker: string) => {
        if (ignoredLegacyMarkers.has(marker.toLowerCase())) {
          return `${prefix}#end${marker}`
        }

        return `${prefix}#endregion ${marker}`
      },
    )
    .replace(
      /^(\s*\/\/\s*)#([A-Za-z][\w*-]*)\s*$/gm,
      (_, prefix: string, marker: string) => {
        if (ignoredLegacyMarkers.has(marker.toLowerCase())) {
          return `${prefix}#${marker}`
        }

        return `${prefix}#region ${marker}`
      },
    )

  if (normalized !== content) {
    fs.writeFileSync(filePath, normalized)
  }
}

function cleanupTranspiledOutput(code: string) {
  return code
    .replace(/^['"]use strict['"];?\n?/gm, '')
    .replace(/^\/\/#[#@] sourceMappingURL=.*$/gm, '')
    .trim()
}

function transpileTypeScript(code: string, fileName: string) {
  const result = ts.transpileModule(code, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
      removeComments: false,
      verbatimModuleSyntax: false,
    },
    fileName,
    reportDiagnostics: true,
  })

  const hasErrors = result.diagnostics?.some(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  )

  if (hasErrors) {
    return null
  }

  const output = cleanupTranspiledOutput(result.outputText)

  return output || null
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

function isTrivialJavaScriptModuleBlock(code: string) {
  const trimmed = code.trim()

  if (!trimmed) {
    return false
  }

  return trimmed.split('\n').every((line) => {
    const statement = line.trim()

    if (!statement) {
      return true
    }

    return (
      statement.startsWith('import ') ||
      statement.startsWith('export ') ||
      statement.startsWith('//') ||
      statement.startsWith('/*') ||
      statement.startsWith('*') ||
      statement.startsWith('*/')
    )
  })
}

function hasTypeOnlyTypeScriptDeclarations(code: string) {
  const trimmed = code.trim()

  if (!trimmed) {
    return false
  }

  return /(?:^|\n)\s*(?:export\s+)?(?:interface|type)\s+[A-Za-z_$][\w$]*/mu.test(
    trimmed,
  )
}

function isSemanticSnippetAlias(filePath: string) {
  return snippetAliasRoots.some(({ prefix }) =>
    filePath.startsWith(`${prefix}/`),
  )
}

function toSnippetAliasPath(sourcePath: string) {
  const normalizedSourcePath = path.resolve(sourcePath)

  for (const root of snippetAliasRoots) {
    const relativePath = path.relative(root.dir, normalizedSourcePath)

    if (!relativePath.startsWith('..') && !path.isAbsolute(relativePath)) {
      return `${root.prefix}/${toPosixPath(relativePath)}`
    }
  }

  return `@cwd/${toPosixPath(path.relative(rootDir, normalizedSourcePath))}`
}

function createSnippetAliasMarkdown(sourcePath: string, region = '') {
  if (fs.existsSync(sourcePath)) {
    normalizeLegacyRegionMarkers(sourcePath)
  }

  return `<<< ${toSnippetAliasPath(sourcePath)}${region ? `#${region}` : ''}`
}

function parseSnippetTarget(rawTarget: string) {
  const match = rawTarget.match(/^(.+?)(?:#([\w*-]+))?(?:\s*\[(.+)\])?$/)

  if (!match) {
    return null
  }

  const [, filePath, region = ''] = match

  return {
    filePath: filePath.trim(),
    region,
  }
}

function resolveLegacyGeneratedAliasPath(rawTarget: string) {
  const target = parseSnippetTarget(rawTarget)

  if (!target) {
    return null
  }

  const match = target.filePath.match(
    /^@\/__code\/(demo|comp|root)-(ts|js)\/(.+)$/,
  )

  if (!match) {
    return null
  }

  const [, bucket, variant, relativePath] = match
  const baseDir =
    bucket === 'demo'
      ? demoSourceDir
      : bucket === 'comp'
        ? packageComponentsDir
        : rootDir
  const preferredRelativePath =
    variant === 'js' && relativePath.endsWith('.js')
      ? relativePath.replace(/\.js$/u, '.ts')
      : relativePath
  const preferredSourcePath = path.join(baseDir, preferredRelativePath)
  const fallbackSourcePath = path.join(baseDir, relativePath)
  const resolvedSourcePath = fs.existsSync(preferredSourcePath)
    ? preferredSourcePath
    : fallbackSourcePath

  return createSnippetAliasMarkdown(resolvedSourcePath, target.region)
}

function normalizeGeneratedSnippetAliases(content: string) {
  const lines = content.split('\n')
  const output: string[] = []

  for (let index = 0; index < lines.length; index += 1) {
    const currentLine = lines[index]
    const trimmed = currentLine.trim()

    if (
      trimmed === '::: code-group' &&
      index + 3 < lines.length &&
      lines[index + 3].trim() === ':::'
    ) {
      const tsSnippet = resolveLegacyGeneratedAliasPath(
        lines[index + 1].trim().replace(/^<<<\s+/, ''),
      )
      const jsTarget = lines[index + 2].trim().replace(/^<<<\s+/, '')

      if (tsSnippet && /^@\/__code\/(demo|comp|root)-js\//.test(jsTarget)) {
        output.push(tsSnippet)
        index += 3
        continue
      }
    }

    const snippetMatch = currentLine.match(/^(\s*)<<<\s+(.+)$/)

    if (snippetMatch) {
      const [, indent, rawTarget] = snippetMatch
      const normalizedSnippet = resolveLegacyGeneratedAliasPath(rawTarget)

      if (normalizedSnippet) {
        output.push(`${indent}${normalizedSnippet}`)
        continue
      }
    }

    output.push(currentLine)
  }

  return output.join('\n')
}

function normalizeLegacyContainers(content: string) {
  return content
    .replace(/^@info\s*$/gm, '::: info')
    .replace(/^@warning\s*$/gm, '::: warning')
    .replace(/^@endinfo\s*$/gm, ':::')
    .replace(/^@endwarning\s*$/gm, ':::')
}

function normalizeSnippetReferences(
  content: string,
  doc: Pick<DocFile, 'filePath' | 'section' | 'name'>,
) {
  const lines = normalizeGeneratedSnippetAliases(content).split('\n')
  const output: string[] = []
  let insideCodeGroup = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (!insideCodeGroup && /^:::\s*code-group\s*$/.test(trimmed)) {
      insideCodeGroup = true
      output.push(line)
      continue
    }

    if (insideCodeGroup) {
      output.push(line)

      if (trimmed === ':::') {
        insideCodeGroup = false
      }

      continue
    }

    const legacyCodeMatch = trimmed.match(/^@code\((['"])(.+?)\1\)$/)

    if (legacyCodeMatch) {
      const resolvedPath = resolveLegacyCodePath(doc, legacyCodeMatch[2])
      const snippetTarget = parseSnippetTarget(legacyCodeMatch[2])

      output.push(
        createSnippetAliasMarkdown(resolvedPath, snippetTarget?.region),
      )
      continue
    }

    const snippetMatch = line.match(/^(\s*)<<<\s+(.+)$/)

    if (!snippetMatch) {
      output.push(line)
      continue
    }

    const [, indent, rawTarget] = snippetMatch
    const snippetTarget = parseSnippetTarget(rawTarget)

    if (!snippetTarget) {
      output.push(line)
      continue
    }

    if (isSemanticSnippetAlias(snippetTarget.filePath)) {
      output.push(
        `${indent}<<< ${snippetTarget.filePath}${snippetTarget.region ? `#${snippetTarget.region}` : ''}`,
      )
      continue
    }

    const resolvedPath = path.resolve(
      path.dirname(doc.filePath),
      snippetTarget.filePath,
    )
    output.push(
      `${indent}${createSnippetAliasMarkdown(resolvedPath, snippetTarget.region)}`,
    )
  }

  return output.join('\n')
}

function normalizeMarkdownCodeBlocks(content: string) {
  const lines = content.split('\n')
  const output: string[] = []
  let index = 0
  let insideCodeGroup = false

  while (index < lines.length) {
    const line = lines[index]
    const trimmed = line.trim()

    if (!insideCodeGroup && /^:::\s*code-group\s*$/.test(trimmed)) {
      insideCodeGroup = true
      output.push(line)
      index += 1
      continue
    }

    if (insideCodeGroup) {
      output.push(line)

      if (trimmed === ':::') {
        insideCodeGroup = false
      }

      index += 1
      continue
    }

    const fenceMatch = line.match(/^```(ts|html|vue)\s*$/)

    if (!fenceMatch) {
      output.push(line)
      index += 1
      continue
    }

    const lang = fenceMatch[1]
    const blockLines: string[] = []
    let cursor = index + 1

    while (cursor < lines.length && lines[cursor] !== '```') {
      blockLines.push(lines[cursor])
      cursor += 1
    }

    if (cursor >= lines.length) {
      output.push(line)
      output.push(...blockLines)
      break
    }

    const blockContent = blockLines.join('\n')

    if (lang === 'ts') {
      const transpiled = transpileTypeScript(blockContent, 'doc-example.ts')

      if (transpiled) {
        if (/^(?:export \{\};?)$/u.test(transpiled)) {
          if (hasTypeOnlyTypeScriptDeclarations(blockContent)) {
            output.push('```ts')
            output.push(blockContent)
            output.push('```')
            index = cursor + 1
            continue
          }

          if (isTrivialJavaScriptModuleBlock(blockContent)) {
            output.push('```js')
            output.push(blockContent)
            output.push('```')
            index = cursor + 1
            continue
          }
        }

        output.push('::: code-group')
        output.push('```ts [ts]')
        output.push(blockContent)
        output.push('```')
        output.push('```js [js]')
        output.push(transpiled)
        output.push('```')
        output.push(':::')
        index = cursor + 1
        continue
      }
    }

    if (
      (lang === 'html' || lang === 'vue') &&
      /<script\b[^>]*lang=['"]ts['"][^>]*>/.test(blockContent)
    ) {
      const transpiled = transpileVueTypeScript(blockContent, 'doc-example.vue')

      if (transpiled) {
        output.push('::: code-group')
        output.push('```vue [vue lang="ts"]')
        output.push(blockContent)
        output.push('```')
        output.push('```vue [vue lang="js"]')
        output.push(transpiled)
        output.push('```')
        output.push(':::')
        index = cursor + 1
        continue
      }
    }

    output.push(line)
    output.push(...blockLines)
    output.push('```')
    index = cursor + 1
  }

  return output.join('\n')
}

function normalizeTrivialTypeScriptCodeGroups(content: string) {
  const lines = content.split('\n')
  const output: string[] = []

  for (let index = 0; index < lines.length; index += 1) {
    if (
      lines[index]?.trim() === '::: code-group' &&
      lines[index + 1]?.trim() === '```ts [ts]'
    ) {
      let tsFenceEnd = index + 2

      while (tsFenceEnd < lines.length && lines[tsFenceEnd] !== '```') {
        tsFenceEnd += 1
      }

      if (
        tsFenceEnd < lines.length &&
        lines[tsFenceEnd + 1]?.trim() === '```js [js]'
      ) {
        let jsFenceEnd = tsFenceEnd + 2

        while (jsFenceEnd < lines.length && lines[jsFenceEnd] !== '```') {
          jsFenceEnd += 1
        }

        if (
          jsFenceEnd < lines.length &&
          lines[jsFenceEnd + 1]?.trim() === ':::'
        ) {
          const tsContent = lines.slice(index + 2, tsFenceEnd).join('\n')
          const jsContent = lines
            .slice(tsFenceEnd + 2, jsFenceEnd)
            .join('\n')
            .trim()

          if (
            /^(?:export \{\};?)$/u.test(jsContent) &&
            hasTypeOnlyTypeScriptDeclarations(tsContent)
          ) {
            output.push('```ts')
            output.push(tsContent)
            output.push('```')
            index = jsFenceEnd + 1
            continue
          }

          if (
            /^(?:export \{\};?)$/u.test(jsContent) &&
            isTrivialJavaScriptModuleBlock(tsContent)
          ) {
            output.push('```js')
            output.push(tsContent)
            output.push('```')
            index = jsFenceEnd + 1
            continue
          }
        }
      }
    }

    output.push(lines[index])
  }

  return output.join('\n')
}

function normalizeSnippetSpacing(content: string) {
  const lines = content.split('\n')
  const output: string[] = []

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const nextLine = lines[index + 1]

    output.push(line)

    if (!/^\s*<<<\s+\S+/.test(line)) {
      continue
    }

    if (nextLine !== undefined && nextLine.trim() !== '') {
      output.push('')
    }
  }

  return output.join('\n')
}

function shouldWrapTableCell(trimmed: string, cellIndex: number) {
  if (cellIndex < 3) {
    return false
  }

  if (!trimmed || trimmed.startsWith('`') || trimmed.endsWith('`')) {
    return false
  }

  return (
    trimmed.includes('=>') ||
    trimmed.startsWith('{') ||
    trimmed.startsWith('(') ||
    (trimmed.includes('{') && trimmed.includes('}'))
  )
}

function normalizeTableLine(line: string) {
  if (!line.startsWith('|') || /^\|(?:\s*-+:?\s*\|)+$/.test(line)) {
    return line
  }

  const protectedLine = line.replace(/\\\|/g, '\u0000')
  const segments = protectedLine.split('|')

  if (segments.length < 4) {
    return line
  }

  for (let index = 1; index < segments.length - 1; index += 1) {
    const restored = segments[index].split('\u0000').join('\\|')
    const trimmed = restored.trim()

    if (shouldWrapTableCell(trimmed, index)) {
      segments[index] = ` \`${trimmed}\` `
    } else {
      segments[index] = restored
    }
  }

  return segments.join('|').split('\u0000').join('\\|')
}

function normalizeComponentContent(content: string) {
  return content
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => normalizeTableLine(line))
    .join('\n')
}

function normalizeDocContent(
  content: string,
  doc: Pick<DocFile, 'filePath' | 'section' | 'name'>,
) {
  let normalized = content.replace(/\r\n/g, '\n')
  normalized = normalizeSnippetReferences(normalized, doc)
  normalized = normalizeLegacyContainers(normalized)
  normalized = normalizeTrivialTypeScriptCodeGroups(normalized)
  normalized = normalizeMarkdownCodeBlocks(normalized)
  normalized = normalizeSnippetSpacing(normalized)

  if (doc.section === 'components') {
    normalized = normalizeComponentContent(normalized)
  }

  return normalized
}

function getSectionDocs(section: DocSection): DocFile[] {
  const sectionDir = path.join(docsDir, section)

  return fs
    .readdirSync(sectionDir)
    .filter((fileName) => fileName.endsWith('.md') && fileName !== 'index.md')
    .map((fileName) => {
      const filePath = path.join(sectionDir, fileName)
      const name = path.basename(fileName, '.md')
      const content = normalizeDocContent(fs.readFileSync(filePath, 'utf8'), {
        filePath,
        name,
        section,
      })
      const meta = parseFrontmatter(content)

      return {
        name,
        filePath,
        section,
        content,
        order: meta.order,
        title: meta.title || name,
        subtitle: meta.subtitle || undefined,
        groupTitle: meta.groupTitle,
        groupOrder: meta.groupOrder,
      }
    })
}

function sortDocs<T extends DocMeta>(docs: T[]) {
  return [...docs].sort((left, right) => {
    if (left.groupOrder !== right.groupOrder) {
      return left.groupOrder - right.groupOrder
    }

    if (left.groupTitle !== right.groupTitle) {
      return left.groupTitle.localeCompare(right.groupTitle, 'zh-Hans-CN')
    }

    if (left.order !== right.order) {
      return left.order - right.order
    }

    return left.title.localeCompare(right.title, 'zh-Hans-CN')
  })
}

function writeDocs(docs: DocFile[]) {
  for (const doc of docs) {
    fs.writeFileSync(doc.filePath, doc.content)
  }
}

function writeComponentIndex(docs: DocMeta[]) {
  const grouped = new Map<string, DocMeta[]>()

  for (const doc of sortDocs(docs)) {
    const groupDocs = grouped.get(doc.groupTitle) ?? []
    groupDocs.push(doc)
    grouped.set(doc.groupTitle, groupDocs)
  }

  const sections = [...grouped.entries()]
    .sort((left, right) => {
      const leftOrder = Math.min(...left[1].map((doc) => doc.groupOrder))
      const rightOrder = Math.min(...right[1].map((doc) => doc.groupOrder))

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder
      }

      return left[0].localeCompare(right[0], 'zh-Hans-CN')
    })
    .map(([groupTitle, groupDocs]) => {
      const lines = sortDocs(groupDocs)
        .map(
          (doc) => `- [${formatComponentText(doc)}](/components/${doc.name})`,
        )
        .join('\n')

      return `## ${groupTitle}\n\n${lines}`
    })
    .join('\n\n')

  const indexContent = `---
title: 组件
---

# 组件

这里的组件文档位于 \`packages/docs/components\`，同步时会按 frontmatter 排序，
旧的 sard 指令会转换为 VitePress 容器、代码片段别名和 TS/JS 代码组。

${sections}
`

  fs.writeFileSync(path.join(componentsDir, 'index.md'), indexContent)
}

function normalizeRepositoryMarkdownFiles() {
  const markdownFiles = walkDirectory(
    path.join(rootDir, 'packages', 'sard-uniapp'),
  ).filter((filePath) => filePath.endsWith('.md'))

  for (const filePath of markdownFiles) {
    const content = fs.readFileSync(filePath, 'utf8')
    const normalized = normalizeLegacyContainers(
      content.replace(
        /^\s*@code\((['"])(.+?)\1\)\s*$/gm,
        (_, __: string, target: string) => {
          const parsed = parseSnippetTarget(target)

          if (!parsed) {
            return `@code('${target}')`
          }

          return `<<< ${parsed.filePath}${parsed.region ? `#${parsed.region}` : ''}`
        },
      ),
    )

    if (normalized !== content) {
      fs.writeFileSync(filePath, normalized)
    }
  }
}

function normalizeAllLegacyRegions() {
  const sourceFiles = walkDirectory(
    path.join(rootDir, 'packages', 'sard-uniapp'),
  ).filter((filePath) => /\.(?:ts|js|vue|scss|css)$/u.test(filePath))

  for (const filePath of sourceFiles) {
    normalizeLegacyRegionMarkers(filePath)
  }
}

function main() {
  ensureDirectory(componentsDir)
  normalizeAllLegacyRegions()
  normalizeRepositoryMarkdownFiles()

  const docs = docSections.flatMap((section) => getSectionDocs(section))
  const componentDocs = sortDocs(
    docs.filter((doc): doc is DocFile => doc.section === 'components'),
  )

  writeDocs(docs)
  writeComponentIndex(componentDocs)

  console.log(
    `Normalized ${docs.length} docs and synced ${componentDocs.length} component docs.`,
  )
}

main()
