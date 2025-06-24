---
nav: 组件
title: ResizeSensor
subtitle: 尺寸传感器
group: 反馈组件
version: 1.20+
---

## 介绍

可感知元素尺寸的变化，在元素宽度或高度变化时触发事件。

## 引入

```ts
import ResizeSensor from 'sard-uniapp/components/resize-sensor/resize-sensor.vue'
```

## 代码演示

### 基础使用

将 `ResizeSensor` 组件放置在要监听尺寸变化的元素里面，此元素需要设置相对、绝对或固定定位；监听 `resize` 事件，此事件会在被监听元素尺寸发生变化时触发。

@code('${DEMO_PATH}/resize-sensor/demo/Basic.vue')

## API

### ResizeSensorProps

| 属性       | 描述                               | 类型       | 默认值 |
| ---------- | ---------------------------------- | ---------- | ------ |
| root-class | 组件根元素类名                     | string     | -      |
| root-style | 组件根元素样式                     | StyleValue | -      |
| initial    | 是否在初始化时触发 `resize` 事件   | boolean    | false  |
| threshold  | 触发 `resize` 事件的阈值，单位毫秒 | number     | 150    |

### ResizeSensorEmits

| 事件   | 描述                       | 类型                      |
| ------ | -------------------------- | ------------------------- |
| resize | 在元素宽或高发生变化时触发 | (value: NodeRect) => void |

#### NodeRect

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
