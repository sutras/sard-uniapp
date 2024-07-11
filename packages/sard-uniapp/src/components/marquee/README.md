# Marquee 跑马灯<sup>1.2+</sup>

## 介绍

让文字无缝循环滚动。

## 引入

```ts
import Marquee from 'sard-uniapp/components/marquee/marquee.vue'
```

## 代码演示

### 基础使用

为了实现无缝的循环滚动，需要提供两份数据。

@code('${DEMO_PATH}/marquee/demo/Basic.vue')

### 异步数据

`Marquee` 组件是通过 `animation` 来实现高效的滚动动画的，
会根据内容高度或宽度动态设置动画时长，以实现固定速率滚动。

如果 `Marquee` 挂载时机比插槽内容靠前，即插槽内容数据需要通过接口异步获取再渲染的，
需要手动调用 `update` 方法来更新动画时长。

@code('${DEMO_PATH}/marquee/demo/Reset.vue')

### 水平方向

可以设置 `direction="horizontal"` 属性实现水平方向的滚动。

@code('${DEMO_PATH}/marquee/demo/Horizontal.vue')

## API

### MarqueeProps

| 属性       | 描述                                                | 类型                       | 默认值     |
| ---------- | --------------------------------------------------- | -------------------------- | ---------- |
| root-class | 组件根元素类名                                      | string                     | -          |
| root-style | 组件根元素样式                                      | StyleValue                 | -          |
| direction  | 动画滚动方向                                        | 'vertical' \| 'horizontal' | 'vertical' |
| speed      | 滚动速率 (px/s)                                     | number                     | 50         |
| delay      | 挂载后，延迟动画时间（单位 ms），避免进入页面时卡顿 | number                     | 1000       |

### MarqueeSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### MarqueeExpose

| 属性   | 描述         | 类型       |
| ------ | ------------ | ---------- |
| update | 重置滚动时长 | () => void |
