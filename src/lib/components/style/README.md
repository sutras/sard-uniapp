---
nav: 组件
title: Style
subtitle: 样式
group: 基础组件
---

## 介绍

`sard-uniapp` 为了避免视觉传达差异，各组件用到的一些公用的颜色值、字号、圆角等统一进行了定义，并将变量值添加到 `page, .sar-portal` 选择器以便引用和自定义样式覆盖。

可以通过 `CSS` 变量 来组织样式，通过覆盖这些 `CSS` 变量来实现定制样式、动态切换主题等效果。

## 通用 CSS 变量

@code('./variables.scss#variables')

## 通用 CSS 变量 - 暗黑模式

@code('./variables-dark.scss#variables')
