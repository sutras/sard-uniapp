---
nav: 组件
title: Popover
subtitle: 气泡弹出框
group: 数据展示
---

## 介绍

弹出式的气泡菜单。

## 引入

```ts
import Popover from 'sard-uniapp/components/popover/popover.vue'
import PopoverReference from 'sard-uniapp/components/popover-reference/popover-reference.vue'
```

## 代码演示

### 基础使用

使用 `options` 属性设置弹出框菜单；
在 `Popover` 组件里面放置 `PopoverReference` 组件，以便控制弹出框的显示和位置计算。

@code('${DEMO_PATH}/popover/demo/Basic.vue')

### 暗黑模式

设置 `theme="dark"` 会显示为暗黑模式。

@code('${DEMO_PATH}/popover/demo/Dark.vue')

### 展示图标

通过 `options` 属性的可以在菜单左边展示图标。

@code('${DEMO_PATH}/popover/demo/Icon.vue')

### 禁用选项

禁用的选项无法点击。

@code('${DEMO_PATH}/popover/demo/Disabled.vue')

### 水平排列

配置 `direction="horizontal"` 可以水平排列菜单。

@code('${DEMO_PATH}/popover/demo/Horizontal.vue')

### 自定义内容

弹出框可以放置任何内容，而不仅仅是菜单。通过 `v-model:visible` 可以控制弹出框的隐藏。

@code('${DEMO_PATH}/popover/demo/Content.vue')

### 弹出位置

气泡弹出框会尽量在视窗中匹配各个位置以便可以完整展示，默认底部居中展示。

@code('${DEMO_PATH}/popover/demo/Position.vue')

### 自定义 reference

如果因 `DOM` 结构限制，无法在 `Popover` 组件里面放置 `PopoverReference` 组件，
可以使用 `usePopover` 钩子函数关联 `Popover` 组件和自定义的 `reference` 组件。

`usePopover` 钩子函数接收一个 `reference` 的选择器，并返回一个控制器对象，
将此对象绑定到 `Popover` 组件的 `controller` 属性，便可以使用控制器对象的 `show` 方法显示弹出框。

@code('${DEMO_PATH}/popover/demo/CustomReference.vue')

### 手动定义位置

借助 `usePopover` 钩子函数，你甚至不需要 `reference` 组件来提供位置，
控制器的 `show` 方法可以接收返回 `NodeRect` 或者 `Promise<NodeRect>` 的函数，
可以让弹出框显示在屏幕任意位置。

@code('${DEMO_PATH}/popover/demo/Manual.vue')

## API

### PopoverProps

| 属性         | 描述                                       | 类型                       | 默认值     |
| ------------ | ------------------------------------------ | -------------------------- | ---------- |
| root-class   | 组件根元素类名                             | string                     | -          |
| root-style   | 组件根元素样式                             | StyleValue                 | -          |
| visible      | 是否显示气泡弹出框                         | boolean                    | -          |
| options      | 菜单选项列表                               | MenuOption[]               | []         |
| position     | 弹出位置                                   | PopoverPosition            | 'bottom'   |
| direction    | 菜单选项排列方向                           | 'vertical' \| 'horizontal' | 'vertical' |
| theme        | 主题风格                                   | 'dark' \| 'light'          | 'light'    |
| refGap       | 气泡弹出框与`reference`元素的间距，单位 px | number                     | 10         |
| viewport-gap | 气泡弹出框距与视窗的间距，单位 px          | number                     | 10         |
| transparent  | 遮罩是否透明                               | boolean                    | true       |
| duration     | 显隐动画时长，单位 ms                      | number                     | 150        |

### PopoverSlots

| 插槽    | 描述                         | 属性 |
| ------- | ---------------------------- | ---- |
| default | 放置 `PopoverReference` 组件 | -    |
| content | 自定义弹出框内容             | -    |

### PopoverEmits

| 事件           | 描述             | 类型                         |
| -------------- | ---------------- | ---------------------------- |
| update:visible | 弹出框显隐时触发 | (visible: boolean) => void   |
| select         | 选择菜单项时触发 | (option: MenuOption) => void |

### MenuOption

| 属性       | 描述           | 类型    |
| ---------- | -------------- | ------- |
| text       | 菜单项文本     | string  |
| disabled   | 是否禁用菜单项 | boolean |
| icon       | 图标名称       | string  |
| iconFamily | 图标字体       | string  |

### PopoverPosition

```tsx
type PopoverPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
```

### PopoverReferenceProps

| 属性       | 描述           | 类型       | 默认值 |
| ---------- | -------------- | ---------- | ------ |
| root-class | 组件根元素类名 | string     | -      |
| root-style | 组件根元素样式 | StyleValue | -      |

### PopoverReferenceSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### PopoverReferenceEmits

| 事件  | 描述           | 类型                 |
| ----- | -------------- | -------------------- |
| click | 点击组件时触发 | (event: any) => void |

### usePopover

```ts
function usePopover(selector?: string): PopoverController
```

### PopoverController

```ts
interface PopoverController {
  show: (getRect?: () => NodeRect | Promise<NodeRect>) => void
}
```

### NodeRect

```ts
interface NodeRect {
  top: number
  right: number
  bottom: number
  left: number
  height: number
  width: number
}
```

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
