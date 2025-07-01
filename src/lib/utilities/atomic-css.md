---
nav: 工具
title: 原子化样式
order: -2
group:
  title: 工程化
---

## 介绍

原子化样式能提升编写样式的效率，特别在编写业务组件时；在一定程度上也能降低项目打包体积。

下面演示如何将 `sard-uniapp` 的样式设计体系融合到 `tailwindcss`，使其能简化 `sard-uniapp` 样式的使用。同时自定义了 `tailwindcss` 的主题，使其更好兼容 `uniapp`。

@info

仅适用通过命令行创建的项目。

@endinfo

## 安装 tailwindcss

```bash
npm install tailwindcss@3 -D
```

必须安装 `tailwindcss@3` 版本，更高版本不支持。

## 编写 tailwindcss 配置

在项目根目录创建 `tailwind.config.js` 文件，并写入以下内容：

@code('${CWD}/tailwind.config.js')

## 添加为 postcss 插件

在 `vite.config.ts` 文件中进行配置：

```ts
import tailwindcss from 'tailwindcss'

export default defineConfig({
  // ...
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  // ...
})
```

## 添加 @tailwind 指令

在 `App.vue` 中添加以下指令：

```css
@tailwind utilities;
```

## 忽略 vscode 提示

`@tailwind` 会有以下的提示：

```bash
Unknown at rule @tailwind scss(unknownAtRules)
```

需在 `.vscode/settings.json` 文件添加以下配置以便忽略提示：

```json
{
  // ...
  "scss.lint.unknownAtRules": "ignore"
  // ...
}
```

运行 `Vue: Restart Vue and TS servers` 命令即可生效。

## vscode 中类名自动补全

在 vscode 中安装 `Tailwind CSS IntelliSense` 扩展，即可享受类名自动补全。

## 使用

经过上面的配置，就可以使用 `tailwindcss` 工具类了。

下面讲解 `tailwind.config.js` 的配置和对应的使用方式。

### 间距和大小

`theme.spacing` 配置了 0至750个梯度的间距和大小，单位为 rpx；在 750px 宽度的设计稿中，测试到多大尺寸直接就能用这个数值了，无需进行换算。

下面是类名和对应的声明：

```scss
.w-100 {
  width: 100rpx !important;
}

.h-100 {
  height: 100rpx !important;
}

.m-100 {
  margin: 100rpx !important;
}

.p-100 {
  padding: 100rpx !important;
}

.top-100 {
  top: 100rpx !important;
}

.gap-100 {
  gap: 100rpx !important;
}

// ...
```

### 主题色

`theme.colors` 配置了颜色名称与 `sard-uniapp` css 变量的对应关系。

```scss
.text-primary {
  color: var(--sar-primary) !important;
}

.text-secondary {
  color: var(--sar-secondary) !important;
}

.text-success {
  color: var(--sar-success) !important;
}

.text-info {
  color: var(--sar-info) !important;
}

.text-warning {
  color: var(--sar-warning) !important;
}

.text-danger {
  color: var(--sar-danger) !important;
}

.bg-primary {
  background-color: var(--sar-primary) !important;
}

.bg-secondary {
  background-color: var(--sar-secondary) !important;
}

.bg-success {
  background-color: var(--sar-success) !important;
}

.bg-info {
  background-color: var(--sar-info) !important;
}

.bg-warning {
  background-color: var(--sar-warning) !important;
}

.bg-danger {
  background-color: var(--sar-danger) !important;
}

// ...
```

### 圆角

`theme.borderRadius` 配置了圆角名称与 `sard-uniapp` css变量的对应关系。

```scss
.rounded-xs {
  border-radius: var(--sar-rounded-xs) !important;
}

.rounded-sm {
  border-radius: var(--sar-rounded-sm) !important;
}

.rounded {
  border-radius: var(--sar-rounded) !important;
}

.rounded-lg {
  border-radius: var(--sar-rounded-lg) !important;
}

.rounded-xl {
  border-radius: var(--sar-rounded-xl) !important;
}

.rounded-full {
  border-radius: var(--sar-rounded-full) !important;
}

// ...
```

### 边框颜色

`theme.borderColor` 配置了边框颜色名称与 `sard-uniapp` css变量的对应关系。

```scss
.border-current {
  border-color: currentColor !important;
}

.border-transparent {
  border-color: transparent !important;
}

.border-inherit {
  border-color: inherit !important;
}

.border-white {
  border-color: white !important;
}

.border-black {
  border-color: black !important;
}

.border-base {
  border-color: var(--sar-border-color) !important;
}

.border-primary {
  border-color: var(--sar-primary) !important;
}

.border-secondary {
  border-color: var(--sar-secondary) !important;
}

.border-success {
  border-color: var(--sar-success) !important;
}

.border-info {
  border-color: var(--sar-info) !important;
}

.border-warning {
  border-color: var(--sar-warning) !important;
}

.border-danger {
  border-color: var(--sar-danger) !important;
}
```

### 字号

`theme.fontSize` 配置了字号名称与 `sard-uniapp` css变量的对应关系。

```scss
.text-xs {
  font-size: var(--sar-text-xs) !important;
}

.text-sm {
  font-size: var(--sar-text-sm) !important;
}

.text-base {
  font-size: var(--sar-text-base) !important;
}

.text-lg {
  font-size: var(--sar-text-lg) !important;
}

.text-xl {
  font-size: var(--sar-text-xl) !important;
}

.text-2xl {
  font-size: var(--sar-text-2xl) !important;
}
```

### 字重

`theme.fontWeight` 配置了字重名称与 `sard-uniapp` css变量的对应关系。

```scss
.font-bold {
  font-weight: var(--sar-font-bold) !important;
}

.font-normal {
  font-weight: var(--sar-font-normal) !important;
}

.font-light {
  font-weight: var(--sar-font-light) !important;
}
```

### 行高

`theme.lineHeight` 配置了行高名称与 `sard-uniapp` css变量的对应关系。

```scss
.leading-none {
  line-height: var(--sar-leading-none) !important;
}

.leading-tight {
  line-height: var(--sar-leading-tight) !important;
}

.leading-snug {
  line-height: var(--sar-leading-snug) !important;
}

.leading-normal {
  line-height: var(--sar-leading-normal) !important;
}

.leading-relaxed {
  line-height: var(--sar-leading-relaxed) !important;
}

.leading-loose {
  line-height: var(--sar-leading-loose) !important;
}
```

### 字体

`theme.fontFamily` 配置了字体名称与 `sard-uniapp` css变量的对应关系。

```scss
.font-sans {
  font-family: var(--sar-font-sans) !important;
}

.font-serif {
  font-family: var(--sar-font-serif) !important;
}

.font-mono {
  font-family: var(--sar-font-mono) !important;
}
```

### 灰度场景色

`plugins` 配置了一个 `tailwindcss` 插件，添加了一些灰度场景色的工具类，相比较于 `theme.colors` 中的类名，`sbg-*` 和 `stext-*` 可以适应亮色和暗色的系统主题。

```scss
.sbg-body {
  background-color: var(--sar-body-bg) !important;
}

.sbg-secondary {
  background-color: var(--sar-secondary-bg) !important;
}

.sbg-tertiary {
  background-color: var(--sar-tertiary-bg) !important;
}

.sbg-fourth {
  background-color: var(--sar-fourth-bg) !important;
}

.sbg-emphasis {
  background-color: var(--sar-emphasis-bg) !important;
}

.sbg-active {
  background-color: var(--sar-active-bg) !important;
}

.sbg-active-deep {
  background-color: var(--sar-active-deep-bg) !important;
}

.stext-body {
  color: var(--sar-body-color) !important;
}

.stext-secondary {
  color: var(--sar-secondary-color) !important;
}

.stext-tertiary {
  color: var(--sar-tertiary-color) !important;
}

.stext-fourth {
  color: var(--sar-fourth-color) !important;
}

.stext-emphasis {
  color: var(--sar-emphasis-color) !important;
}
```

## 关于 !important

工具类的优先级通常比组件的优先级要高，因此配置 `important: true` 是合理的，并且因为小程序端不支持类名中包含特殊字符，因此也只能配置 `important: true`。
