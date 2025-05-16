---
nav: 指引
title: 暗黑模式
order: 1
group:
  title: 进阶
---

## 介绍

`sard-uniapp` 使用 `CSS` 变量声明组件的颜色、字号、圆角等样式，
因此通过变量动态更新主题也是相当容易的。

## 开启暗黑模式

`sard-uniapp` 暗黑主题是通过 `prefers-color-scheme` 媒体查询特性实现的，并提供了暗黑主题的样式文件 `dark.scss`，将其置于全局样式文件之后便可随着系统或浏览器的主题变化而修改颜色。

```html
<!-- App.vue -->
<style lang="scss">
  @import 'sard-uniapp/index.scss';
  @import 'sard-uniapp/dark.scss';
</style>
```
