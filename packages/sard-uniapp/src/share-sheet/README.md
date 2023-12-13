# ShareSheet 分享面板

## 介绍

从底部向上弹出分享菜单。

## 引入

```ts
import ShareSheet from '@sard/uniapp/dist/share-sheet/share-sheet.vue'
```

## 代码演示

### 基础使用

使用 `v-model:visible` 属性控制显隐，使用 `itemList` 属性配置分享项。

@code('${DEMO_PATH}/share-sheet/demo/Basic.vue')

### 多行

`itemList` 属性值如果是二维数组则渲染成多行。

@code('${DEMO_PATH}/share-sheet/demo/MultipleRow.vue')

### 标题和描述

使用 `title` 和 `description` 配置标题和描述。

@code('${DEMO_PATH}/share-sheet/demo/TitleDescription.vue')

### 图片类型图标

`icon` 属性可以是图片路径。

@code('${DEMO_PATH}/share-sheet/demo/Picture.vue')

### 禁用

禁用的选项不可点击。

@code('${DEMO_PATH}/share-sheet/demo/Disabled.vue')

## API

### ShareSheetProps

`ShareSheetProps` 继承 `PopupProps` 并拥有以下属性：

| 属性              | 描述                                                      | 类型                                                               | 默认值 |
| ----------------- | --------------------------------------------------------- | ------------------------------------------------------------------ | ------ |
| root-class        | 组件根元素类名                                            | string                                                             | -      |
| root-style        | 组件根元素样式                                            | StyleValue                                                         | -      |
| item-list         | 面板选项列表                                              | ShareSheetItem[] \| ShareSheetItem[][]                             | []     |
| title             | 面板标题                                                  | string                                                             | -      |
| description       | 面板描述                                                  | string                                                             | -      |
| cancel            | 取消按钮内容                                              | string                                                             | -      |
| visible (v-model) | 面板是否可见                                              | boolean                                                            | -      |
| overlay-closable  | 点击遮罩后是否关闭                                        | boolean                                                            | true   |
| before-close      | 关闭前的回调，返回 `false` 可阻止关闭，支持返回 `Promise` | (type: 'close' \| 'cancel' \| 'select') => boolean \| Promise<any> | -      |

### ShareSheetEmits

| 事件           | 描述               | 类型                           |
| -------------- | ------------------ | ------------------------------ |
| update:visible | 分享面板显隐时触发 | (visible: boolean) => void     |
| close          | 点击遮罩时触发     | () => void                     |
| cancel         | 点击取消按钮时触发 | () => void                     |
| select         | 点击分享项时触发   | (item: ShareSheetItem) => void |

### ShareSheetItem

| 属性        | 描述                     | 类型    | 默认值 |
| ----------- | ------------------------ | ------- | ------ |
| name        | 名称                     | string  | -      |
| description | 标签                     | string  | -      |
| color       | 图标颜色                 | string  | -      |
| background  | 图标背景颜色             | string  | -      |
| icon        | 图标名称，可以是图片路径 | string  | -      |
| iconFamily  | 图标字体                 | string  | -      |
| disabled    | 禁用状态                 | boolean | false  |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
