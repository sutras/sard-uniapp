---
nav: 组件
title: Watermark
subtitle: 水印
group:
  title: 其他
  order: 8
version: 1.24+
---

## 介绍

在页面上添加文本或图片等水印信息。

## 引入

```ts
import Watermark from 'sard-uniapp/components/watermark/watermark.vue'
```

## 代码演示

### 基础使用

使用 `content` 属性设置水印文本。`Watermark` 组件会绝对定位并覆盖在第一个非 `static` 定位的祖先元素。

@code('${DEMO_PATH}/watermark/demo/Basic.vue')

### 多行水印

使用 `content` 设置一个字符串数组来指定多行文本水印内容。

@code('${DEMO_PATH}/watermark/demo/MultiLine.vue')

### 图片水印

通过 `image` 指定图像地址。 为了确保图像清晰展示而不是被拉伸，请设置宽度和高度，建议使用至少两倍的宽度和高度的图片来保证显示效果。

@code('${DEMO_PATH}/watermark/demo/Image.vue')

### 自定义绘制

配置自定义参数预览水印效果。

@code('${DEMO_PATH}/watermark/demo/Custom.vue')

## API

### WatermarkProps

| 属性       | 描述                             | 类型                   | 默认值               |
| ---------- | -------------------------------- | ---------------------- | -------------------- |
| root-class | 组件根元素类名                   | string                 | -                    |
| root-style | 组件根元素样式                   | StyleValue             | -                    |
| width      | 图片水印的宽度                   | number                 | 120                  |
| height     | 图片水印的宽度                   | number                 | 64                   |
| rotate     | 水印的旋转角度                   | number                 | -22                  |
| z-index    | 水印元素的z-index值              | number                 | 9                    |
| image      | 水印图片，建议使用 2x 或 3x 图像 | string                 | -                    |
| content    | 水印文本内容                     | string \| string[]     | -                    |
| font       | 文字样式                         | WatermarkFont          | -                    |
| gap        | 水印之间的间距                   | [x: number, y: number] | [30, 30]             |
| offset     | 水印从容器左上角的偏移           | [x: number, y: number] | [gap[0]/2, gap[1]/2] |

### WatermarkFont

| 属性       | 描述     | 类型                                        | 默认值            |
| ---------- | -------- | ------------------------------------------- | ----------------- |
| color      | 字体颜色 | string                                      | 'rgba(0,0,0,.15)' |
| fontSize   | 字体大小 | number                                      | 14                |
| fontWeight | 字重     | string \| number                            | normal            |
| fontFamily | 字体     | string                                      | 'sans-serif'      |
| fontStyle  | 字体样式 | 'none' \| 'normal' \| 'italic' \| 'oblique' | 'normal'          |
| textAlign  | 字体样式 | 'left' \| 'right' \| 'center'               | 'center'          |
