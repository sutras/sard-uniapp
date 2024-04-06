# PullDownRefresh 下拉刷新

## 介绍

提供下拉刷新的交互操作。

## 引入

```ts
import PullDownRefresh from 'sard-uniapp/components/pull-down-refresh/pull-down-refresh.vue'
```

## 代码演示

### 基于页面的刷新

`PullDownRefresh` 可以在页面、`scroll-view` 或其他容器中使用，
当判断被设置的 `scrollTop` 值为 0 且进行下拉操作时，会接替容器的滚动行为。

因此，当容器滚动时，需要调用 `PullDownRefreshExpose['setScrollTop']` 方法来收集容器的 `scrollTop` 值。

当正在请求数据时，需将 `loading` 属性设置为 `true` 以便向用户展示加载状态。

当用户下拉到指定阈值时会触发 `refresh` 事件，此时要设置 `loading = true`，并发送网络请求；

在获取到数据后设置 `loading = false` 来关闭加载状态。

@code('${DEMO_PATH}/pull-down-refresh/index.vue')

### 基于 scroll-view 的刷新

需要监听 `scroll-view` 的 `scroll` 事件来收集 `scrollTop` 值。

`PullDownRefresh` 组件被设计为与容器弱关联关系，因此，如果有需要，你可以将此组件与容器以及上拉加载组件组合使用实现复杂的效果。

@code('${DEMO_PATH}/pull-down-refresh/demo/ScrollView.vue')

### 使用插槽

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

| 属性         | 描述                             | 类型                        |
| ------------ | -------------------------------- | --------------------------- |
| setScrollTop | 用于设置容器当前滚动到顶部的距离 | (scrollTop: number) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
