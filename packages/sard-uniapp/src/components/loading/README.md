# Loading 加载

## 介绍

表示处理中的状态。

## 引入

```ts
import Button from 'sard-uniapp/components/loading/loading.vue'
```

## 代码演示

### 基础使用

@code('${DEMO_PATH}/loading/demo/Basic.vue')

### 加载类型

使用`type`属性设置不同类型。

@code('${DEMO_PATH}/loading/demo/Type.vue')

### 加载文案

通过`text`属性或者默认插槽展示文字。

@code('${DEMO_PATH}/loading/demo/Text.vue')

### 垂直排布

通过`vertical`属性设置图标和文字垂直排布。

@code('${DEMO_PATH}/loading/demo/Vertical.vue')

### 加载尺寸

`size`属性设置图标大小，`textSize`属性设置文字大小。

@code('${DEMO_PATH}/loading/demo/Size.vue')

### 自定义颜色

`color`属性设置图标颜色，`textColor`属性设置文字颜色。

@code('${DEMO_PATH}/loading/demo/Color.vue')

### 自定义图标

通过 `circular` 插槽可以自定义加载图标。

@code('${DEMO_PATH}/loading/demo/Custom.vue')

## API

### LoadingProps

| 属性       | 描述                   | 类型                  | 默认值     |
| ---------- | ---------------------- | --------------------- | ---------- |
| root-class | 组件根元素类名         | string                | -          |
| root-style | 组件根元素样式         | StyleValue            | -          |
| type       | 加载类型               | 'clock' \| 'circular' | 'circular' |
| color      | 加载颜色               | string                | -          |
| size       | 图标尺寸               | string                | -          |
| text       | 图标文字               | string                | -          |
| text-color | 文字颜色               | string                | -          |
| text-size  | 文字尺寸               | string                | -          |
| vertical   | 是否垂直排列图标和文案 | boolean               | false      |
| animated   | 是否开启加载动画       | boolean               | true       |
| progress   | 当前加载的进度         | number                | 1          |

### LoadingSlots

| 插槽     | 描述                         | 属性 |
| -------- | ---------------------------- | ---- |
| default  | 自定义加载文字内容           | -    |
| circular | 自定义 `circular` 类型的图标 | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
