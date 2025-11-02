---
nav: 组件
title: Image
subtitle: 图片
group: 基础组件
version: 1.25+
---

## 介绍

image 组件的加强版，在继承了原有功能外，还支持淡入动画、加载中、加载失败提示、圆角值和形状等。

## 引入

```ts
import Image from 'sard-uniapp/components/image/image.vue'
```

## 代码演示

### 基础使用

配置图片的 `width` 宽和 `height` 高，以及 `src` 路径即可使用。

@code('${DEMO_PATH}/image/demo/Basic.vue')

### 图片模式

使用 `mode` 设置图片裁剪、缩放的模式。

@code('${DEMO_PATH}/image/demo/Mode.vue')

### 图片形状

通过 `shape` 参数设置图片的形状，`circle` 为圆形，`square` 为方形
如果为方形时，还可以通过 `radius` 属性设置圆角值。

@code('${DEMO_PATH}/image/demo/Shape.vue')

### 懒加载

设置 `lazy-load` 属性可懒加载图片，在 web 端使用 `loading="lazy"` 实现，在其他端参考 `uniapp` 的实现。

@code('${DEMO_PATH}/image/demo/LazyLoad.vue')

### 加载中提示

加载时会显示默认的加载图标，可使用 `show-loading` 设置是否显示加载中图标，也可以使用 `loading-icon` 自定义加载图标，或者使用 `loading` 插槽自定义加载内容。

@code('${DEMO_PATH}/image/demo/Loading.vue')

### 加载错误提示

加载失败时会显示默认的失败图标，可使用 `show-error` 设置是否显示加载失败图标，也可以使用 `error-icon` 自定义加载失败图标，或者使用 `error` 插槽自定义加载失败内容。

@code('${DEMO_PATH}/image/demo/Error.vue')

### 淡入动画

组件自带了加载完成时的淡入动画效果，通过 `fade` 属性配置是否开启动画效果。

@code('${DEMO_PATH}/image/demo/Fade.vue')

## API

### ImageProps

| 属性                   | 描述                                     | 类型                                                                                                                                                                                            | 默认值        |
| ---------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| root-class             | 组件根元素类名                           | string                                                                                                                                                                                          | -             |
| root-style             | 组件根元素样式                           | StyleValue                                                                                                                                                                                      | -             |
| src                    | 图片资源地址                             | string                                                                                                                                                                                          | -             |
| mode                   | 图片资源地址                             | 'scaleToFill' \| 'aspectFit' \| 'aspectFill' \| 'widthFix' \| 'heightFix' \| 'top' \| 'bottom' \| 'center' \| 'left' \| 'right' \| 'top left' \| 'top right' \| 'bottom left' \| 'bottom right' | 'aspectFill'  |
| lazy-load              | 图片懒加载                               | boolean                                                                                                                                                                                         | false         |
| fade                   | 是否需要淡入效果                         | boolean                                                                                                                                                                                         | true          |
| webp                   | 在系统不支持webp的情况下是否单独启用webp | boolean                                                                                                                                                                                         | false         |
| show-menu-by-longpress | 开启长按图片显示识别小程序码菜单         | boolean                                                                                                                                                                                         | true          |
| width                  | 图片宽度                                 | string                                                                                                                                                                                          | '320px'       |
| height                 | 图片高度                                 | string                                                                                                                                                                                          | '240px'       |
| shape                  | 图片形状                                 | 'circle' \| 'square'                                                                                                                                                                            | 'square'      |
| radius                 | 图片圆角                                 | string                                                                                                                                                                                          | -             |
| loading-icon           | 加载中的图标                             | string                                                                                                                                                                                          | 'image'       |
| error-icon             | 加载失败的图标                           | string                                                                                                                                                                                          | 'image-error' |
| icon-family            | 图标族                                   | string                                                                                                                                                                                          | 'sari'        |
| show-loading           | 是否显示加载中的图标或者自定义的插槽     | boolean                                                                                                                                                                                         | true          |
| show-error             | 是否显示加载失败的图标或者自定义的插槽   | boolean                                                                                                                                                                                         | true          |
| background             | 图片背景颜色                             | string                                                                                                                                                                                          | -             |

### ImageSlots

| 插槽    | 描述                 | 属性 |
| ------- | -------------------- | ---- |
| loading | 自定义加载中的内容   | -    |
| error   | 自定义加载失败的内容 | -    |

### ImageEmits

| 事件  | 描述               | 类型                 |
| ----- | ------------------ | -------------------- |
| click | 点击图片时触发     | (event: any) => void |
| load  | 图片加载成功时触发 | (event: any) => void |
| error | 图片加载失败时触发 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
