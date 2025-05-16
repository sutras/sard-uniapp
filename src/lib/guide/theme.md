---
nav: 指引
title: 定制主题
order: -1
group:
  title: 进阶
---

## 介绍

`sard-uniapp` 把组件可定制的 css 声明值通过 css 变量表示，并将通用 css 变量和组件 css 变量声明在 `page` 和 `.sar-portal` 选择器下，并保存在 `sard-uniapp/index.scss` 文件（暗黑主题声明保存在 `sard-uniapp/dark.scss` 文件）。

`.sar-portal` 节点的内容是通过 `root-portal` 或 `teleport` 传送到当前页面外的弹出框内容，包括 `popup` 、基于 `popup` 的 `action-sheet、dialog、notify、popout、share-sheet、toast` 和基于 `popout` 的 `*-input` 等组件。

自定义主题的方式是覆盖 `page` 和 `.sar-portal` 的样式声明：

```html
<!-- App.vue -->
<style lang="scss">
  @import 'sard-uniapp/index.scss';
  @import 'sard-uniapp/dark.scss';

  page,
  .sar-portal {
    --sar-primary: red;
  }
</style>
```

局部自定义主题：

```html
<sar-button>button</sar-button>

<view style="--sar-primary: green;">
  <sar-button>button</sar-button>
</view>
```

## 通用 CSS 变量

@code('../components/style/variables.scss#variables')

## 通用 CSS 变量 - 暗黑模式

@code('../components/style/variables-dark.scss#variables')

## 组件 CSS 变量

组件介绍页面底部都会展示对应组件的 css 变量，例如：跳转到 [按钮组件介绍页](../components/button#CSS变量)
