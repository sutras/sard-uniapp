---
nav: 指引
title: 返回操作关闭弹出框
order: 3
group:
  title: 基础
version: 1.25.7+
---

## 介绍

在弹出框显示时，用户进行返回操作会直接离开当前页面，这被视为一种不好的交互体验；通常在原生 App 中会关闭弹出框，再次进行返回操作时才离开当前页面。

这也是 web 比原生体验差的一个原因。

而在 uniapp 中，在 web 端依然无法阻止页面的返回；在小程序端可以使用 `page-container` 组件阻止页面返回；在 app 安卓端可使用 `onBackPress` 页面生命周期函数阻止页面返回；在 app iOS 端也无能为力，除非使用 `disableSwipeBack` 页面配置粗暴地禁止滑动返回上一页，但是体验非常不好。

## 实现

### web端

无法实现。

### app端（仅安卓实现）

app 端通过 `onBackPress` 回调，在用户返回上一页时，判断当前有没有显示的弹出框，有则隐藏弹出框并阻止页面返回，没有则直接返回上一页。

### 小程序端

小程序端使用 `page-container` 组件监听并阻止页面返回；

并非使用 `page-container` 组件包裹弹出框，因为此组件一个页面只能渲染一个，但弹出框组件却可以同时显示多个；

实现中，`page-container` 是被放置在弹出框组件的犄角旮旯处，并将其在视觉上不可见，且仅显示在最上层的弹出框组件才将其渲染出来；

渲染出来的 `page-container` 会自动拦截返回操作，借由其隐藏事件得到关闭弹出框的时机。

## 使用

如果只需要在小程序端返回时隐藏弹出框，直接使用 `Popup` 或基于此组件的组件即可（sard-uniapp 中几乎所有的弹出框都基于此组件）。

如果在 app 端也需要返回时隐藏弹出框，则需要在每个页面中使用 `onBackPress` 和 `usePageTopPopup` 钩子函数。

```html
<script setup lang="ts">
  import { usePageTopPopup } from 'sard-uniapp'
  import { onBackPress } from '@dcloudio/uni-app'

  const { shouldStopBack, hidePopup } = usePageTopPopup()

  onBackPress(() => {
    if (shouldStopBack.value) {
      hidePopup()
      return true
    }
  })
</script>
```

返回值 `shouldStopBack` 用于判断当前页面是否有显示的弹出框，如果有则调用 `hidePopup` 方法隐藏弹出框，并返回 `true` 阻止页面返回。

## 接口

### useTopPopup

```ts
function useTopPopup(
  visible: MaybeRefOrGetter<boolean>,
  disabled?: MaybeRefOrGetter<boolean>,
  callback?: () => void,
): {
  isTopLayer: ComputedRef<boolean>
}
```

`visible` 表示弹出框的显示状态，`disabled` 表示是否禁用返回行为，像 `Toast` 和 `Notify` 组件就不阻止页面的返回；`callback` 用在 app 端，调用 `hidePopup` 时会调用此回调来关闭弹窗。

### usePageTopPopup

```ts
function usePageTopPopup(): {
  shouldStopBack: ComputedRef<boolean>
  hidePopup: () => void
}
```

`shouldStopBack` 用于判断当前页面是否有显示的弹出框，`hidePopup` 用于隐藏位于页面最上面的弹出框。
