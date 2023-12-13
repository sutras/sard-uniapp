# NoticeBar 公告栏

## 介绍

用于循环播放展示一组消息通知。

## 引入

```ts
import NoticeBar from '@sard/uniapp/dist/notice-bar/notice-bar.vue'
```

## 代码演示

### 基础使用

公告栏的内容长度溢出时会自动开启滚动播放。

@code('${DEMO_PATH}/notice-bar/demo/Basic.vue')

### 强制滚动

设置 `scrollable="always"` 属性时，无论公告栏内容多少都会滚动。

@code('${DEMO_PATH}/notice-bar/demo/Scrollable.vue')

### 强制不滚动

设置 `scrollable="never"` 属性时，无论公告栏内容多少都不会滚动。

@code('${DEMO_PATH}/notice-bar/demo/UnScrollable.vue')

### 多行展示

默认文本不换行，设置 `wrap` 可以使其换行。

@code('${DEMO_PATH}/notice-bar/demo/Wrap.vue')

### 自定义左边图标

设置 `leftIcon` 插槽可以自定义左边的图标；或者设置 `hideLeftIcon` 属性隐藏左侧图标。

@code('${DEMO_PATH}/notice-bar/demo/LeftIcon.vue')

### 可关闭的

设置 `closable` 属性可以在右边显示关闭按钮。

@code('${DEMO_PATH}/notice-bar/demo/Closable.vue')

### 可链接的

设置 `linkable` 属性可以在右边显示箭头。

@code('${DEMO_PATH}/notice-bar/demo/Linkable.vue')

### 自定义右边图标

设置 `rightIcon` 插槽可以修改右边的关闭按钮图标或者箭头图标。

@code('${DEMO_PATH}/notice-bar/demo/RightIcon.vue')

### 自定义样式

通过 `color` 属性设置文本颜色，通过 `background` 属性设置背景色。

@code('${DEMO_PATH}/notice-bar/demo/Style.vue')

### 垂直滚动

搭配 `NoticeBar` 和 `Swipe` 组件，可以实现垂直滚动的效果。

@code('${DEMO_PATH}/notice-bar/demo/Vertical.vue')

## API

### NoticeBarProps

| 属性           | 描述                                     | 类型                          | 默认值 |
| -------------- | ---------------------------------------- | ----------------------------- | ------ |
| root-class     | 组件根元素类名                           | string                        | -      |
| root-style     | 组件根元素样式                           | StyleValue                    | -      |
| color          | 自定义颜色                               | string                        | -      |
| background     | 自定义背景色                             | string                        | -      |
| hide-left-icon | 隐藏左边图标                             | boolean                       | false  |
| delay          | 动画延迟时间 (ms)                        | number                        | 1000   |
| speed          | 滚动速率 (px/s)                          | number                        | 50     |
| scrollable     | 是否开启滚动播放，内容长度溢出时默认开启 | 'auto' \| 'never' \| 'always' | 'auto' |
| wrap           | 是否开启文本换行                         | boolean                       | false  |
| closable       | 是否显示关闭按钮                         | boolean                       | false  |
| linkable       | 是否展示右侧箭头                         | boolean                       | false  |
| visible        | 是否显示公告栏                           | boolean                       | true   |
| vertical       | 搭配 `Swipe` 组件实现垂直滚动            | boolean                       | false  |

### NoticeBarSlots

| 插槽       | 描述               | 属性 |
| ---------- | ------------------ | ---- |
| default    | 自定义默认内容     | -    |
| left-icon  | 自定义左侧图标内容 | -    |
| right-icon | 自定义右侧图标内容 | -    |

### NoticeBarEmits

| 事件  | 描述               | 类型                 |
| ----- | ------------------ | -------------------- |
| click | 点击通知栏时触发   | (event: any) => void |
| close | 点击关闭按钮时触发 | () => void           |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
