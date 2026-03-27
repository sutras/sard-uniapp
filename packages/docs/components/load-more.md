---
title: LoadMore
subtitle: 加载更多
group: 反馈组件
---

## 介绍

放置在列表底部，做滚动加载使用，展示加载的各种状态。

## 引入

```js
import LoadMore from 'sard-uniapp/components/load-more/load-more.vue'
```

## 代码演示

### 基础使用

通过设置 `status` 属性展示不同的状态信息；
组件处于 `incomplete` 状态时点击会触发 `load-more` 事件，通常用于加载的数据不满一屏无法触底加载时使用。

处于 `error` 状态时点击会触发 `reload` 事件。

<<< @demo/load-more/demo/Basic.vue

### 配合 useLoadMore 钩子函数使用 <sup>1.27+</sup>

`LoadMore` 组件仅用于展示，状态管理和接口加载相关逻辑放在 `useLoadMore` 钩子函数里面。

如果在 `scroll-view` 中使用触底加载，需要传递 `scrollViewSelector` 选项用于获取滚动盒子元素。

`request` 选项是获取数据的函数，接收当前页码作为参数，需要返回是否加载完所有数据的布尔值。

钩子函数返回的 `status, onLoadMore, onReload` 需绑定到 `LoadMore` 组件，`loadMoreId` 是 `LoadMore` 组件包裹元素的 `id`。

<<< @demo/load-more/demo/Hook.vue

### 配合 PullDownRefresh 组件使用 <sup>1.27+</sup>

下面的案例代码展示了经典的“下拉刷新+上拉加载”功能实现。

相比于单独使用 `onLoadMore`，当配合使用 `PullDownRefresh` 组件时，在触发下拉刷新事件时调用 `refresh` 函数，此时 `request` 函数参数二为 `true`，表示这是一个刷新请求，同时 `page` 会被传递为 1，可根据参数二来决定列表数据重置还是拼接。

<<< @demo/load-more/demo/WithRefresh.vue

### 页面触底加载 <sup>1.27+</sup>

页面触底加载比 `scroll-view` 中的触底加载少了一个 `scrollViewSelector` 选项的配置。

<<< @demo/load-more/demo/FullPage.vue

## API

### LoadMoreProps

| 属性            | 描述               | 类型           | 默认值                   |
| --------------- | ------------------ | -------------- | ------------------------ |
| root-class      | 组件根元素类名     | string         | -                        |
| root-style      | 组件根元素样式     | StyleValue     | -                        |
| status          | 加载的状态         | LoadMoreStatus | 'incomplete'             |
| incomplete-text | 未加载完的状态文本 | string         | '加载更多'               |
| loading-text    | 加载中的状态文本   | string         | '加载中...'              |
| complete-text   | 加载完的状态文本   | string         | '没有更多了'             |
| error-text      | 加载错误的状态文本 | string         | '请求失败，点击重新加载' |

### LoadMoreSlots

| 插槽       | 描述                                                   | 属性 |
| ---------- | ------------------------------------------------------ | ---- |
| incomplete | 自定义未加载完的状态内容，会覆盖 `incompleteText` 属性 | -    |
| loading    | 自定义加载中的状态内容，会覆盖 `loadingText` 属性      | -    |
| complete   | 自定义加载完的状态内容，会覆盖 `completeText` 属性     | -    |
| error      | 自定义加载错误的状态内容，会覆盖 `errorText` 属性      | -    |

### LoadMoreEmits

| 事件      | 描述                             | 类型         |
| --------- | -------------------------------- | ------------ |
| load-more | 在 `incomplete` 状态下点击时触发 | `() => void` |
| reload    | 在 `error` 状态下点击时触发      | `() => void` |

### LoadMoreStatus

```ts
type LoadMoreStatus = 'incomplete' | 'loading' | 'complete' | 'error'
```

### useLoadMore <sup>1.27+</sup>

```ts
function useLoadMore(options: UseLoadMoreOptions): {
  status: Ref<LoadMoreStatus, LoadMoreStatus>
  isLoading: ComputedRef<boolean>
  onLoadMore: () => void
  onReload: () => void
  currentPage: Ref<number, number>
  loadMoreId: string
  refresh: () => Promise<void | null>
}

interface UseLoadMoreOptions {
  request: (page: number, isRefresh: boolean) => Promise<boolean>
  marginBottom?: MaybeRefOrGetter<number>
  marginTop?: MaybeRefOrGetter<number>
  scrollViewSelector?: string
  disabled?: MaybeRefOrGetter<boolean>
}
```

## 主题定制

### CSS 变量

<<< @comp/load-more/variables.scss#variables
