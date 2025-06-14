---
nav: 组件
title: Upload
subtitle: 上传
group: 表单组件
---

## 介绍

控制文件的上传及状态展示。

## 引入

```ts
import Upload from 'sard-uniapp/components/upload/upload.vue'
```

## 代码演示

### 基础使用

选择文件后通过 `afterRead` 将文件上传到服务器。期间通过 `UploadFileItem['status']` 和 `UploadFileItem['message']` 修改上传的状态。

@code('${DEMO_PATH}/upload/demo/Basic.vue')

### 上传视频

默认只能选择图片，可以设置 `accept="video"` 来选择上传视频。

@code('${DEMO_PATH}/upload/demo/Video.vue')

### 限定上传数量

通过 `maxCount` 属性可以限制上传文件的数量，上传数量达到限制后，会自动隐藏选择区域。

@code('${DEMO_PATH}/upload/demo/MaxCount.vue')

### 多选

默认一次只能选择一张图片，设置 `multiple` 允许图片多选。

@code('${DEMO_PATH}/upload/demo/Multiple.vue')

### 选择文件前置处理 <sup>1.19.2+</sup>

通过传入 `beforeChoose` 函数可以在选择之前做处理，接受当前文件列表和 `next` 函数作参数，调用 `next(true)` 允许选择，调用 `next(false)` 不允许选择。

@code('${DEMO_PATH}/upload/demo/BeforeChoose.vue')

### 上传前置处理

通过传入 `beforeRead` 函数可以在上传前进行校验和处理，返回 `true` 表示校验通过，返回 `false` 表示校验失败。支持返回 `Promise` 对 `file` 对象进行自定义处理。

@code('${DEMO_PATH}/upload/demo/BeforeRead.vue')

### 限定上传大小

通过 `maxSize` 属性可以限制上传文件的大小，超过大小的文件会被自动过滤，这些文件信息可以通过 `overSize` 事件获取。

@code('${DEMO_PATH}/upload/demo/Size.vue')

### 上传状态

通过 `status` 属性可以标识上传状态，`uploading` 表示上传中，`failed` 表示上传失败，`done` 表示上传完成。

@code('${DEMO_PATH}/upload/demo/Status.vue')

### 只读和禁用

只读会隐藏选择区域，禁用则不允许用户点击选择。

@code('${DEMO_PATH}/upload/demo/DisabledReadOnly.vue')

### 自定义选区样式

使用 `select` 插槽自定义选区内容。

@code('${DEMO_PATH}/upload/demo/CustomSelect.vue')

## API

### UploadProps

| 属性                             | 描述                                                                                                              | 类型                                                                   | 默认值                     |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------- |
| root-class                       | 组件根元素类名                                                                                                    | string                                                                 | -                          |
| root-style                       | 组件根元素样式                                                                                                    | StyleValue                                                             | -                          |
| accept                           | 允许上传的文件类型                                                                                                | 'image' \| 'video'                                                     | 'image'                    |
| multiple                         | 是否开启图片多选                                                                                                  | boolean                                                                | false                      |
| source-type                      | 文件选择来源                                                                                                      | ('album' \| 'camera')[]                                                | ['album', 'camera']        |
| size-type                        | 所选的图片的尺寸                                                                                                  | ('original' \| 'compressed')[]                                         | ['original', 'compressed'] |
| max-duration                     | 拍摄视频最长拍摄时间，单位秒                                                                                      | number                                                                 | 60                         |
| camera                           | 默认拉起的是前置或者后置摄像头。部分 Android 手机下由于系统 ROM 不支持无法生效                                    | 'back' \| 'front'                                                      | 'back'                     |
| model-value (v-model)            | 已上传的文件列表                                                                                                  | UploadFileItem[]                                                       | -                          |
| max-count                        | 文件上传数量限制                                                                                                  | number                                                                 | Number.MAX_SAFE_INTEGER    |
| max-size                         | 文件大小限制，单位为 `byte`                                                                                       | number \| ((file: File) => boolean)                                    | Number.MAX_SAFE_INTEGER    |
| over-size                        | 文件大小超过限制时触发                                                                                            | (fileItem: UploadFileItem \| UploadFileItem[]) => void                 | -                          |
| disabled                         | 是否禁用文件上传                                                                                                  | boolean                                                                | false                      |
| readonly                         | 是否将上传区域设置为只读状态                                                                                      | boolean                                                                | false                      |
| before-choose <sup>1.19.2+</sup> | 文件选择前的回调，接受当前文件列表和 `next` 函数作参数，调用 `next(true)` 允许选择，调用 `next(false)` 不允许选择 | (fileList: UploadFileItem[], next: (allowed: boolean) => void) => void | -                          |
| before-read                      | 文件读取前的回调，返回 false 可终止文件读取，支持返回 Promise                                                     | (file: File) => boolean \| Promise\<File>                              | -                          |
| after-read                       | 文件读取完成后的回调                                                                                              | (fileItem: UploadFileItem \| UploadFileItem[]) => void                 | -                          |
| removable                        | 是否可删除                                                                                                        | boolean                                                                | true                       |
| before-remove                    | 文件删除前的回调，返回 false 可终止文件读取，支持返回 Promise                                                     | (...args: any[]) => boolean \| Promise\<void>                          | -                          |
| validate-event                   | 是否触发表单验证                                                                                                  | boolean                                                                | true                       |

### UploadSlots

| 插槽   | 描述           | 属性 |
| ------ | -------------- | ---- |
| select | 自定义选取内容 | -    |

### ButtonEmits

| 事件                     | 描述                     | 类型                                          |
| ------------------------ | ------------------------ | --------------------------------------------- |
| update:model-value       | 选择的文件列表改变时触发 | (value: UploadFileItem[]) => void             |
| change <sup>1.9.2+</sup> | 选择的文件列表改变时触发 | (value: UploadFileItem[]) => void             |
| remove                   | 删除文件时触发           | (index: number, item: UploadFileItem) => void |

### UploadFileItem

| 属性     | 描述                                                                              | 类型         | 默认值    |
| -------- | --------------------------------------------------------------------------------- | ------------ | --------- |
| file     | 用户选择的文件                                                                    | UploadFile   | -         |
| name     | 图片和视频之外的文件要展示的文件名，如果不指定且有 `file`，则获取 `file` 的文件名 | string       | -         |
| url      | 图片的 `url`                                                                      | string       | -         |
| is-image | 当无法从 `url` 中判断为图片时，可以显式指定为图片，以便可以对图片进行预览         | boolean      | false     |
| is-video | 当无法从 `url` 中判断为视频时，可以显式指定为视频，以便可以对视频进行预览         | boolean      | false     |
| status   | 指定预览图片的状态                                                                | UploadStatus | 'pending' |
| message  | 展示预览图片在 `uploading`, `failed` 等状态下的说明文本                           | string       | -         |

### UploadStatus

```ts
type UploadStatus = 'pending' | 'uploading' | 'failed' | 'done'
```

### UploadFile

| 属性     | 描述               | 类型               | 默认值 |
| -------- | ------------------ | ------------------ | ------ |
| type     | 文件类型           | 'image' \| 'video' | -      |
| size     | 文件大小，单位字节 | number             | -      |
| path     | 本地临时文件路径   | string             | -      |
| duration | 选定视频的时间长度 | number             | 0      |
| width    | 返回选定视频的宽度 | number             | 0      |
| height   | 返回选定视频的高度 | number             | 0      |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
