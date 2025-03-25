---
nav: 组件
title: Signature
subtitle: 签名
group: 表单组件
version: 1.12+
---

## 介绍

用于签名场景的组件，基于 Canvas 实现。

## 引入

```ts
import Signature from 'sard-uniapp/components/signature/signature.vue'
```

## 代码演示

### 基础使用

书写完签名，点击确定按钮会触发 `confirm` 事件，并接收图片的 `dataURL` 或临时文件路径，如果没有书写或者点击了清空按钮，则会得到空字符串。

@code('${DEMO_PATH}/signature/demo/Basic.vue')

### 画笔颜色

使用 `color` 属性可以设置画笔的颜色。

@code('${DEMO_PATH}/signature/demo/Color.vue')

### 画笔粗细

使用 `line-width` 属性可以设置画笔的粗细。

@code('${DEMO_PATH}/signature/demo/LineWidth.vue')

### 背景色

使用 `background` 属性可以设置画板的颜色，默认为透明。如果想在最终生成的图片背景为透明的情况下设置书写时的背景颜色，则可以使用 `--sar-signature-canvas-bg` css 变量来设置。

@code('${DEMO_PATH}/signature/demo/Background.vue')

### 全屏显示

如果设置 `full-screen` 来全屏展示签名组件，此时可以绑定 `v-model:visible` 属性来控制显隐。

@code('${DEMO_PATH}/signature/demo/FullScreen.vue')

## API

### SignatureProps

| 属性         | 描述                           | 类型                    | 默认值    |
| ------------ | ------------------------------ | ----------------------- | --------- |
| root-class   | 组件根元素类名                 | string                  | -         |
| root-style   | 组件根元素样式                 | StyleValue              | -         |
| color        | 笔触颜色                       | string                  | '#000'    |
| line-width   | 线条宽度                       | number                  | 3         |
| background   | 背景颜色                       | string                  | -         |
| full-screen  | 是否全屏展示                   | boolean                 | false     |
| visible      | 视屏时控制显隐                 | boolean                 | false     |
| duration     | 显隐持续时间                   | number                  | 150       |
| cancel-text  | 取消按钮文案                   | string                  | '取消'    |
| clear-text   | 清空按钮文案                   | string                  | '清空'    |
| confirm-text | 确定按钮文案                   | string                  | '确定'    |
| type         | 导出图片类型                   | 'png' \| 'jpg'          | 'png'     |
| target       | confirm 事件回调接收的图片类型 | 'dataURL' \| 'filePath' | 'dataURL' |
| quality      | 转换为 DataURL 时的质量        | number                  | 0.92      |

### SignatureSlots

| 插槽    | 描述                   | 属性 |
| ------- | ---------------------- | ---- |
| default | 全屏时定义底部提示文案 | -    |

### SignatureEmits

| 事件           | 描述               | 类型                       |
| -------------- | ------------------ | -------------------------- |
| update:visible | 弹出框显隐时触发   | (visible: boolean) => void |
| confirm        | 点击确定按钮时触发 | (dataURL: string) => void  |
| clear          | 点击清空按钮时触发 | () => void                 |
| cancel         | 点击取消按钮时触发 | () => void                 |

### SignatureExpose

| 属性    | 描述                                                       | 类型       |
| ------- | ---------------------------------------------------------- | ---------- |
| resize  | 外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘 | () => void |
| clear   | 可调用此方法来清除签名                                     | () => void |
| confirm | 触发 `confirm` 事件，与点击确认按钮的效果等价              | () => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
