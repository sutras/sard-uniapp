---
title: Barcode
subtitle: 条形码
group: 数据展示
version: 1.29.0+
---

## 介绍

根据内容生成对应条形码图形。

## 引入

```js
import Barcode from 'sard-uniapp/components/barcode/barcode.vue'
```

## 代码演示

### 基础用法

通过 `value` 属性设置条形码内容，`format` 属性设置条形码类型，默认为 `CODE128`。

<<< @demo/barcode/demo/Basic.vue

### 条形码类型

当前支持 4 种条形码类型：`CODE128`、`EAN13`、`UPC-A`、`ITF14`。

<<< @demo/barcode/demo/Format.vue

### 自定义样式

可以通过以下属性自定义条形码外观：

- `width` 条形码单个条纹宽度
- `height` 条形码高度
- `color` 条形码颜色
- `background` 背景颜色

<<< @demo/barcode/demo/Style.vue

### 文本

通过 `display-value` 控制文本显示，通过 `text-position`、`text-align`、`text-margin`、`font-style`、`font-weight`、`font-size`、`font-family` 自定义文本样式。

<<< @demo/barcode/demo/Text.vue

## API

### BarcodeProps

| 属性                                      | 描述                         | 类型                                                  | 默认值      |
| ----------------------------------------- | ---------------------------- | ----------------------------------------------------- | ----------- |
| root-class                                | 组件根元素类名               | string                                                | -           |
| root-style                                | 组件根元素样式               | StyleValue                                            | -           |
| value                                     | 条形码内容                   | string                                                | -           |
| format                                    | 条形码类型                   | BarcodeFormat                                         | 'CODE128'   |
| width                                     | 条形码单个条纹宽度           | number                                                | 2           |
| height                                    | 条形码高度                   | number                                                | 100         |
| color                                     | 条形码颜色                   | string                                                | '#000'      |
| background                                | 背景颜色                     | string                                                | '#fff'      |
| display-value                             | 是否显示文本                 | boolean                                               | true        |
| text-position                             | 文本位置                     | 'top' \| 'bottom'                                     | 'bottom'    |
| text-align                                | 文本对齐方式                 | 'left' \| 'center' \| 'right'                         | 'center'    |
| text-margin                               | 文本与条形码间距             | number                                                | 2           |
| font-style                                | 文本样式                     | 'normal' \| 'italic' \| 'oblique'                     | 'normal'    |
| font-weight                               | 文本加粗                     | 'normal' \| 'bold' \| number \| 'lighter' \| 'bolder' | 'normal'    |
| font-size                                 | 文本字号                     | number                                                | 14          |
| font-family                               | 文本字体                     | string                                                | 'monospace' |
| margin                                    | 统一外边距                   | number                                                | 10          |
| margin-top                                | 上外边距                     | number                                                | 'margin'    |
| margin-bottom                             | 下外边距                     | number                                                | 'margin'    |
| margin-left                               | 左外边距                     | number                                                | 'margin'    |
| margin-right                              | 右外边距                     | number                                                | 'margin'    |
| show-menu-by-longpress <sup>1.29.0+</sup> | 长按图片显示菜单(微信小程序) | boolean                                               | false       |

### BarcodeEmits

| 事件                       | 描述                                             | 类型                             |
| -------------------------- | ------------------------------------------------ | -------------------------------- |
| success <sup>1.29.0+</sup> | 条形码图片绘制成功后触发，可用于获取临时文件路径 | `(tempFilePath: string) => void` |

### BarcodeFormat

```ts
type BarcodeFormat = 'CODE128' | 'EAN13' | 'UPC-A' | 'ITF14'
```
