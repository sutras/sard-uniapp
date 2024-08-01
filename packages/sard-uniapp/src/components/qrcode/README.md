# Qrcode 二维码<sup>1.4+</sup>

## 介绍

将一段文字或链接编码成图形，以便光学扫描仪或手机摄像头快速读取。

## 引入

```ts
import Qrcode from 'sard-uniapp/components/qrcode/qrcode.vue'
```

## 代码演示

### 基础使用

设置 `text` 属性即可渲染一个二维码图片。

@code('${DEMO_PATH}/qrcode/demo/Basic.vue')

### 呈现的大小

使用 `size` 属性设置二维码呈现的大小，可以设置为任意尺寸单位。

@code('${DEMO_PATH}/qrcode/demo/DisplaySize.vue')

### 画板的大小

画板大小决定了二维码图片的分辨率。

@code('${DEMO_PATH}/qrcode/demo/CanvasSize.vue')

### 自定义颜色

通过设置 `color` 自定义二维码暗模块颜色，
通过设置 `bg-color` 自定义二维码亮模块颜色，即背景颜色。

@code('${DEMO_PATH}/qrcode/demo/Color.vue')

### 安静区域模块数

可以简单把设置 `quiet-zone-modules` 当成设置二维码内边距。

@code('${DEMO_PATH}/qrcode/demo/QuietZoneModules.vue')

### 错误纠错级别

错误纠错级别越高，二维码抗磨损、抗脏能力越强，同时二维码就越大，可容纳的字符容量越小。

`ecl` 属性用于设置错误纠错级别。

@code('${DEMO_PATH}/qrcode/demo/ECL.vue')

下面是不同纠错级别的纠错能力表。

| 错误纠错级别 | 错误纠错能力   |
| ------------ | -------------- |
| L            | 恢复 7%的数据  |
| M            | 恢复 15%的数据 |
| Q            | 恢复 25%的数据 |
| H            | 恢复 30%的数据 |

## API

### QrcodeProps

| 属性               | 描述               | 类型                     | 默认值 |
| ------------------ | ------------------ | ------------------------ | ------ |
| root-class         | 组件根元素类名     | string                   | -      |
| root-style         | 组件根元素样式     | StyleValue               | -      |
| text               | 要编码的字符串数据 | string                   | -      |
| ecl                | 错误纠错级别       | 'L' \| 'M' \| 'Q' \| 'H' | 'M'    |
| size               | 二维码呈现的大小   | string                   | 320rpx |
| canvas-size        | 画板的大小         | number                   | 400    |
| color              | 二维码颜色         | string                   | #000   |
| bg-color           | 二维码背景颜色     | string                   | #fff   |
| quiet-zone-modules | 安静区域模块数     | number                   | 2      |
