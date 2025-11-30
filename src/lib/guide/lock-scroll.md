---
nav: 指引
title: 阻止页面滚动
order: 2
group:
  title: 基础
version: 1.25.5+
---

## 介绍

阻止页面滚动（滚动穿透）有不同的方式，常用的是给 `body` 添加溢出隐藏样式。

在 web 端给 `body` 元素添加溢出隐藏很好实现，因为 web 端可直接获取到 `document` 对象；
在 app 端逻辑层无法获取 `document` 对象，但可以通过运行在视图层的 `renderjs` 获取到 `document` 对象；
而在小程序端没有途径获取 `document` 对象，但可以使用 `page-meta` 组件设置页面的样式，相当于变相设置 `body` 的样式。

## 实现

### web端

在 web 端提供了 `useLockScroll` 钩子函数用于记录弹出框的显隐状态，当页面上没有显示的弹出框时，取消 `body` 的溢出隐藏样式，否则设置溢出隐藏样式。

你通常不会直接使用到 `useLockScroll` 钩子函数，你一般会使用包含此函数的 `Popup` 组件或者基于此组件的 `Popout` 组件。开箱即用，不用做任何配置。

### app端

app端通过 `renderjs` 获取 `document` 对象与当前组件元素，通过监听 DOM 元素属性和结构变动来获取组件的显示状态，进而控制 `body` 是否设置溢出隐藏样式。`Popup` 包含此逻辑，开箱即用，同样是不用做任何配置。

### 小程序端

小程序端只能通过 `page-meta` 组件设置 `body` 的样式；和 web 端一样使用 `useLockScroll` 记录弹出框的显隐状态，但是需要使用 `useCurrentPageLock` 钩子函数获取当前页面是否应该阻止滚动的数据，并设置 `page-meta` 组件的属性。

## 使用

如果不需要适配到小程序，直接使用 `Popup` 或基于此组件的组件即可（sard-uniapp 中几乎所有的弹出框都基于此组件）。

如果要适配小程序，则需要在页面组件的顶部声明 `page-meta` 组件，并使用 `useCurrentPageLock` 钩子函数获取锁定状态数据，并设置 `page-meta` 组件的 `page-style` 属性：

```html
<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <view>页面内容...</view>
</template>

<script setup lang="ts">
  import { useCurrentPageLock } from 'sard-uniapp'

  const { isLocked } = useCurrentPageLock()
</script>
```

## 接口

### useLockScroll

```ts
function useLockScroll(
  visible: MaybeRefOrGetter<boolean>,
  lockScroll?: boolean,
): void
```

`visible` 表示弹出框的显示状态；`lockScroll` 表示是否启用页面滚动的锁定，默认为 `true`，像 `Toast` 组件就传递了 `false`。

### useCurrentPageLock

```ts
function useCurrentPageLock(): {
  isLocked: ComputedRef<boolean>
}
```
