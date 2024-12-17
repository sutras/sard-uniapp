---
nav: 组件
title: PullDownRefresh
subtitle: 下拉刷新
group: 反馈组件
---

## 介绍

`PullDownRefresh` 提供下拉刷新的交互操作。

`PullDownRefresh` 可以在页面、`scroll-view` 或其他容器中使用，
当满足下拉刷新条件（滚动到顶部）且进行下拉操作时，会接替容器的滚动行为。

因此当滚动到顶部时调用 `PullDownRefreshExpose['enableToRefresh']` 方法并传递`true`告诉组件可以进行下拉刷新操作。

当用户下拉到指定阈值时会触发 `refresh` 事件，此时要设置 `loading` 属性为 `true` 以便向用户展示加载状态，并发送网络请求。

在获取到数据后设置 `loading` 属性为 `false` 来关闭加载状态。

`PullDownRefresh` 组件被设计为与滚动容器弱关联关系，因此，如果有需要，你可以将此组件与滚动容器以及上拉加载组件组合使用来实现复杂的效果。

## 引入

```ts
import PullDownRefresh from 'sard-uniapp/components/pull-down-refresh/pull-down-refresh.vue'
```

## 代码演示

### 基于页面的刷新

在页面生命周期 `onPageScroll` 中获取当前 `scrollTop` 的值，当为 0 时启用下拉刷新。

@code('${DEMO_PATH}/pull-down-refresh/index.vue')

### 基于 scroll-view 的刷新

监听 `scroll-view` 组件的 `scroll` 事件来获取 `scrollTop` 值，当为 0 时启用下拉刷新。

因为小程序端 `scroll-view` 组件内置了节流功能，当快速滚动到顶部时，可能不会触发 `scroll` 事件，
造成 `scrollTop` 不为 0 的情况。

因此需要同时监听 `scrolltoupper` 事件，当此事件触发时也启用下拉刷新。

即便如此，在极少数的情况下，滚动到顶部也不会触发 `scrolltoupper` 事件，因此保守起见，
还要设置 `scroll-view` 组件的 `throttle` 属性为 `false` 来关闭节流（官方文档中没有关于`throttle` 属性的描述，但此属性确实存在）。

@code('${DEMO_PATH}/pull-down-refresh/demo/ScrollView.vue')

### 自定义插槽

通过使用插槽可以自定义不同状态的提示信息。

其中 `unready` 插槽接收一个 `progress` 属性用来实现下拉进度展示的效果。

@code('${DEMO_PATH}/pull-down-refresh/demo/Slot.vue')

## API

### PullDownRefreshProps

| 属性                | 描述                          | 类型       | 默认值 |
| ------------------- | ----------------------------- | ---------- | ------ |
| root-class          | 组件根元素类名                | string     | -      |
| root-style          | 组件根元素样式                | StyleValue | -      |
| threshold           | 触发下拉刷新的阈值，单位 px   | number     | 50     |
| header-height       | 顶部内容高度，单位 px         | number     | 50     |
| loading             | 是否处于加载中状态            | boolean    | false  |
| transition-duration | 回弹动画时长，单位 ms         | number     | 300    |
| done-duration       | 加载完成状态持续时长，单位 ms | number     | 0      |
| disabled            | 是否禁止用户进行下拉操作      | boolean    | false  |

### PullDownRefreshSlots

| 插槽    | 描述                                                                               | 属性                 |
| ------- | ---------------------------------------------------------------------------------- | -------------------- |
| default | 自定义默认内容                                                                     | -                    |
| unready | 自定义未预备加载状态内容，`progress` 属性表示从下拉开始到达到 `threshold` 的进度值 | { progress: number } |
| ready   | 自定义预备加载状态内容                                                             | -                    |
| loading | 自定义加载中状态内容                                                               | -                    |
| done    | 自定义加载完成状态内容                                                             | -                    |

### PullDownRefreshEmits

| 事件    | 描述                           | 类型       |
| ------- | ------------------------------ | ---------- |
| refresh | 下拉到指定阈值并松开手指后触发 | () => void |

### PullDownRefreshExpose

| 属性            | 描述                                           | 类型                          |
| --------------- | ---------------------------------------------- | ----------------------------- |
| enableToRefresh | 是否启用下拉刷新，通常在容器滚动到顶部时设为真 | (canRefresh: boolean) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
