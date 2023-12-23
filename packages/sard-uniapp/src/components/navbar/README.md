# Navbar 头部导航

## 介绍

在页面顶部的导航栏。

## 引入

```ts
import Navbar from 'sard-uniapp/components/navbar/navbar.vue'
```

## 代码演示

### 基础使用

使用 `title` 显示居中的标题。

@code('${DEMO_PATH}/navbar/demo/Basic.vue')

### 导航项

可以在 `left/right` 插槽中放置导航项。导航项带有默认的颜色和点击态。

@code('${DEMO_PATH}/navbar/demo/Item.vue')

### 流动导航

默认情况下标题居中， `left/right` 绝对定位于左右两侧；可以使用 `flow` 使其变为流动布局。

@code('${DEMO_PATH}/navbar/demo/Flow.vue')

### 自定义内容

默认插槽的内容会覆盖标题，可以实现更加自由的布局。

@code('${DEMO_PATH}/navbar/demo/Content.vue')

## API

### NavbarProps

| 属性       | 描述                                                                               | 类型       | 默认值 |
| ---------- | ---------------------------------------------------------------------------------- | ---------- | ------ |
| root-class | 组件根元素类名                                                                     | string     | -      |
| root-style | 组件根元素样式                                                                     | StyleValue | -      |
| title      | 自定义标题                                                                         | string     | -      |
| flow       | 默认 `left/right` 绝对定位于左右两侧，标题居中；可以使用 `flow` 使其变为流动布局。 | boolean    | false  |

### NavbarSlots

| 插槽    | 描述                   | 属性 |
| ------- | ---------------------- | ---- |
| default | 自定义导航中间内容     | -    |
| title   | 自定义标题内容         | -    |
| left    | 自定义导航左侧区域内容 | -    |
| right   | 自定义导航右侧区域内容 | -    |

### NavbarItemProps

| 属性       | 描述           | 类型       | 默认值 |
| ---------- | -------------- | ---------- | ------ |
| root-class | 组件根元素类名 | string     | -      |
| root-style | 组件根元素样式 | StyleValue | -      |

### NavbarItemSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### NavbarItemEmits

| 事件  | 描述         | 类型                 |
| ----- | ------------ | -------------------- |
| click | 导航项时触发 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
