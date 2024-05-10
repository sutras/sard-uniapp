# LoadMore 加载更多

## 介绍

放置在列表底部，做滚动加载使用，展示加载的各种状态。

## 引入

```ts
import LoadMore from 'sard-uniapp/components/load-more/load-more.vue'
```

## 代码演示

### 基础使用

通过设置 `status` 属性展示不同的状态信息；
组件处于 `incomplete` 状态时点击会触发 `load-more` 事件，通常用于加载的数据不满一屏无法触底加载时使用。

处于 `error` 状态时点击会触发 `reload` 事件。

@code('${DEMO_PATH}/load-more/demo/Basic.vue')

### 配合 PullDownRefresh 组件一起使用

下面的案例代码展示了经典的“下拉刷新+上拉加载”功能实现。

@code('${DEMO_PATH}/load-more/demo/WithRefresh.vue')

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

| 事件      | 描述                             | 类型       |
| --------- | -------------------------------- | ---------- |
| load-more | 在 `incomplete` 状态下点击时触发 | () => void |
| reload    | 在 `error` 状态下点击时触发      | () => void |

### LoadMoreStatus

```ts
type LoadMoreStatus = 'incomplete' | 'loading' | 'complete' | 'error'
```

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
