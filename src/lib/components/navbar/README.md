---
nav: 组件
title: Navbar
subtitle: 头部导航
group: 导航组件
---

## 介绍

在页面顶部的导航栏。

## 引入

```ts
import Navbar from 'sard-uniapp/components/navbar/navbar.vue'
import NavbarItem from 'sard-uniapp/components/navbar-item/navbar-item.vue'
```

## 代码演示

### 基础使用

使用 `title` 显示居中的标题。

@code('${DEMO_PATH}/navbar/demo/Basic.vue')

### 返回按钮

设置 `show-back` 显示返回按钮，设置 `back-text` 显示返回文本。

@code('${DEMO_PATH}/navbar/demo/Back.vue')

### 导航项

可以在 `left/right` 插槽中放置导航项。导航项带有默认的颜色和点击态。

内置的返回按钮也是使用导航项实现的。

@code('${DEMO_PATH}/navbar/demo/Item.vue')

### 流动导航

默认情况下标题居中， `left/right` 绝对定位于左右两侧；可以使用 `flow` 使其变为流动布局。

@code('${DEMO_PATH}/navbar/demo/Flow.vue')

### 自定义内容

默认插槽的内容会覆盖标题，可以实现更加自由的布局。

@code('${DEMO_PATH}/navbar/demo/Content.vue')

### 背景色

使用 css 变量 `--sar-navbar-bg` 设置想要的背景色，例如全屏时设置背景透明。

@code('${DEMO_PATH}/navbar/demo/Background.vue')

### 文本颜色

使用 css 变量 `--sar-navbar-item-color` 和 `--sar-navbar-title-color` 设置导航项颜色和标题颜色。

@code('${DEMO_PATH}/navbar/demo/Color.vue')

## API

### NavbarProps

| 属性                        | 描述                                                                               | 类型       | 默认值 |
| --------------------------- | ---------------------------------------------------------------------------------- | ---------- | ------ |
| root-class                  | 组件根元素类名                                                                     | string     | -      |
| root-style                  | 组件根元素样式                                                                     | StyleValue | -      |
| title                       | 自定义标题                                                                         | string     | -      |
| flow                        | 默认 `left/right` 绝对定位于左右两侧，标题居中；可以使用 `flow` 使其变为流动布局。 | boolean    | false  |
| show-back <sup>1.12+</sup>  | 是否显示返回按钮（仅显示，返回逻辑需自行编写）                                     | boolean    | false  |
| back-text <sup>1.12+</sup>  | 返回按钮的文本                                                                     | string     | -      |
| fixed <sup>1.12+</sup>      | 是否固定到页面顶部                                                                 | boolean    | false  |
| status-bar <sup>1.12+</sup> | 是否包含状态栏                                                                     | boolean    | false  |

### NavbarSlots

| 插槽    | 描述                   | 属性 |
| ------- | ---------------------- | ---- |
| default | 自定义导航中间内容     | -    |
| title   | 自定义标题内容         | -    |
| left    | 自定义导航左侧区域内容 | -    |
| right   | 自定义导航右侧区域内容 | -    |

### NavbarEmits

| 事件 | 描述                 | 类型                 |
| ---- | -------------------- | -------------------- |
| back | 点击返回按钮项时触发 | (event: any) => void |

### NavbarItemProps

| 属性                         | 描述                             | 类型       | 默认值 |
| ---------------------------- | -------------------------------- | ---------- | ------ |
| root-class                   | 组件根元素类名                   | string     | -      |
| root-style                   | 组件根元素样式                   | StyleValue | -      |
| text <sup>1.12+</sup>        | 导航项文本                       | string     | -      |
| icon <sup>1.12+</sup>        | 导航项图标                       | string     | -      |
| icon-family <sup>1.12+</sup> | 导航项图标字体名称               | string     | -      |
| icon-size <sup>1.12+</sup>   | 导航项图标大小                   | string     | -      |
| reverse <sup>1.12+</sup>     | 默认图标在文本前面，可以互换位置 | string     | false  |

### NavbarItemSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### NavbarItemEmits

| 事件  | 描述             | 类型                 |
| ----- | ---------------- | -------------------- |
| click | 点击导航项时触发 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
