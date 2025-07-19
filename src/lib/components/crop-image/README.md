---
nav: 组件
title: CropImage
subtitle: 裁剪图片
group:
  title: 工具组件
  order: 7
version: 1.12+
---

## 介绍

对图片进行裁剪。

## 引入

```ts
import CropImage from 'sard-uniapp/components/crop-image/crop-image.vue'
import CropImageAgent from 'sard-uniapp/components/crop-image-agent/crop-image-agent.vue'
import { cropImage } from 'sard-uniapp'
```

## 代码演示

### 基础使用

先在页面放置代理组件。

接着便可以使用 `cropImage` 方法对图片进行裁剪。

```tsx
<sar-crop-image-agent />
```

@code('${DEMO_PATH}/crop-image/demo/Basic.vue')

### 裁剪比例

可以通过 `cropScale` 属性设置任意比例。

@code('${DEMO_PATH}/crop-image/demo/CropScale.vue')

### 修改裁剪尺寸

可以通过 `beforeCrop` 方法修改裁剪尺寸，接收实际宽高，通过返回缩放比例来修改裁剪大小。

@code('${DEMO_PATH}/crop-image/demo/BeforeCrop.vue')

## API

### CropImageProps

| 属性        | 描述                                                   | 类型                                      | 默认值 |
| ----------- | ------------------------------------------------------ | ----------------------------------------- | ------ |
| root-class  | 组件根元素类名                                         | string                                    | -      |
| root-style  | 组件根元素样式                                         | StyleValue                                | -      |
| visible     | 是否显示裁剪弹框                                       | boolean                                   | false  |
| src         | 要裁剪的图片                                           | string                                    | false  |
| crop-scale  | 裁剪的比例                                             | string                                    | '1:1'  |
| type        | 导出图片类型                                           | 'png' \| 'jpg'                            | 'png'  |
| quality     | 导出图片的质量                                         | number                                    | 0.92   |
| duration    | 弹窗显隐过渡时间（单位 ms）                            | number                                    | 150    |
| success     | 裁剪成功回调                                           | (filePath: string) => void                | -      |
| fail        | 裁剪成功回调                                           | (err: any) => void                        | -      |
| complete    | 裁剪成功或失败回调                                     | () => void                                | -      |
| before-crop | 裁剪前回调，可以修改裁剪的尺寸；接收宽高，返回缩放比例 | (width: number, height: number) => number | -      |

### CropImageEmits

| 事件                               | 描述                        | 类型                               |
| ---------------------------------- | --------------------------- | ---------------------------------- |
| update:visible                     | 弹出框显隐时触发            | (visible: boolean) => void         |
| visible-hook <sup>1.22.1+</sup>    | 入场/退场动画状态改变时触发 | (name: TransitionHookName) => void |
| before-enter <sup>1.22.1+</sup>    | 入场动画开始前触发          | () => void                         |
| enter <sup>1.22.1+</sup>           | 入场动画开始时触发          | () => void                         |
| after-enter <sup>1.22.1+</sup>     | 入场动画结束时触发          | () => void                         |
| enter-cancelled <sup>1.22.1+</sup> | 入场动画取消时触发          | () => void                         |
| before-leave <sup>1.22.1+</sup>    | 退场动画开始前触发          | () => void                         |
| leave <sup>1.22.1+</sup>           | 退场动画开始时触发          | () => void                         |
| after-leave <sup>1.22.1+</sup>     | 退场动画结束时触发          | () => void                         |
| leave-cancelled <sup>1.22.1+</sup> | 退场动画取消时触发          | () => void                         |

### CropImageAgentProps / CropImageOptions

继承 [`CropImageProps`](#CropImageProps) 并有以下额外属性。

| 属性 | 描述          | 类型   | 默认值      |
| ---- | ------------- | ------ | ----------- |
| id   | 裁剪组件的 id | string | 'cropImage' |

### 命令式方法

| 名称      | 描述     | 类型                                |
| --------- | -------- | ----------------------------------- |
| cropImage | 裁剪图片 | (options: CropImageOptions) => void |
