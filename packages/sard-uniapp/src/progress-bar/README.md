# ProgressBar 条形进度条

## 介绍

以横条的方式展示当前进度。

## 引入

```ts
import ProgressBar from '@sard/uniapp/dist/progress-bar/progress-bar.vue'
```

## 代码演示

### 基础使用

设置 `percent` 属性展示当前所处进度。

@code('${DEMO_PATH}/progress-bar/demo/Basic.vue')

### 内部文本

设置 `inside` 属性让文本显示在进度条内部。

@code('${DEMO_PATH}/progress-bar/demo/Inside.vue')

### 隐藏文本

设置 `:showText="false"` 属性让文本隐藏。

@code('${DEMO_PATH}/progress-bar/demo/ShowText.vue')

### 粗细

使用 `thickness` 属性设置粗细。

@code('${DEMO_PATH}/progress-bar/demo/Thickness.vue')

### 颜色

使用 `trackColor` 设置轨道颜色，使用 `color` 设置进度条颜色。

@code('${DEMO_PATH}/progress-bar/demo/Color.vue')

### 有条纹的

设置 `striped` 属性显示条纹，设置 `animated` 属性可以让条纹动起来。

@code('${DEMO_PATH}/progress-bar/demo/Striped.vue')

### 状态

设置 `status` 属性展示不同的状态。

@code('${DEMO_PATH}/progress-bar/demo/Status.vue')

## API

### ProgressBarProps

| 属性        | 描述             | 类型                              | 默认值 |
| ----------- | ---------------- | --------------------------------- | ------ |
| root-class  | 组件根元素类名   | string                            | -      |
| root-style  | 组件根元素样式   | StyleValue                        | -      |
| percent     | 当前进度         | number                            | 0      |
| inside      | 在内部显示文本   | boolean                           | false  |
| color       | 进度条颜色       | string                            | -      |
| track-color | 轨道颜色         | string                            | -      |
| thickness   | 进度条粗细       | string                            | -      |
| show-text   | 是否显示文本     | string                            | true   |
| striped     | 是否显示条纹样式 | boolean                           | false  |
| animated    | 是否显示条纹动画 | boolean                           | false  |
| status      | 进度条当前状态   | 'success' \| 'warning' \| 'error' | -      |

### ProgressBarSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
