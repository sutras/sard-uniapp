---
nav: 组件
title: ShareSheet
subtitle: 分享面板
group: 反馈组件
---

## 介绍

从底部向上弹出分享菜单。

## 引入

```ts
import ShareSheet from 'sard-uniapp/components/share-sheet/share-sheet.vue'
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

继承 [`PopupProps`](./popup#PopupProps) 并有以下额外属性：

| 属性              | 描述                                                                 | 类型                                                                | 默认值 |
| ----------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------- | ------ |
| root-class        | 组件根元素类名                                                       | string                                                              | -      |
| root-style        | 组件根元素样式                                                       | StyleValue                                                          | -      |
| item-list         | 面板选项列表                                                         | ShareSheetItem[] \| ShareSheetItem[][]                              | []     |
| title             | 面板标题                                                             | string                                                              | -      |
| description       | 面板描述                                                             | string                                                              | -      |
| cancel            | 取消按钮内容                                                         | string                                                              | -      |
| visible (v-model) | 面板是否可见                                                         | boolean                                                             | -      |
| overlay-closable  | 点击遮罩后是否关闭                                                   | boolean                                                             | true   |
| before-close      | 关闭前的回调，返回 `false` 或 `rejected` 状态的 `Promise` 可阻止关闭 | (type: 'close' \| 'cancel' \| 'select') => boolean \| Promise\<any> | -      |
| duration          | 显隐动画时长，单位 ms                                                | number                                                              | 300    |

### ShareSheetEmits

| 事件                               | 描述                        | 类型                               |
| ---------------------------------- | --------------------------- | ---------------------------------- |
| update:visible                     | 分享面板显隐时触发          | (visible: boolean) => void         |
| close                              | 点击遮罩时触发              | () => void                         |
| cancel                             | 点击取消按钮时触发          | () => void                         |
| select                             | 点击分享项时触发            | (item: ShareSheetItem) => void     |
| visible-hook <sup>1.22.1+</sup>    | 入场/退场动画状态改变时触发 | (name: TransitionHookName) => void |
| before-enter <sup>1.22.1+</sup>    | 入场动画开始前触发          | () => void                         |
| enter <sup>1.22.1+</sup>           | 入场动画开始时触发          | () => void                         |
| after-enter <sup>1.22.1+</sup>     | 入场动画结束时触发          | () => void                         |
| enter-cancelled <sup>1.22.1+</sup> | 入场动画取消时触发          | () => void                         |
| before-leave <sup>1.22.1+</sup>    | 退场动画开始前触发          | () => void                         |
| leave <sup>1.22.1+</sup>           | 退场动画开始时触发          | () => void                         |
| after-leave <sup>1.22.1+</sup>     | 退场动画结束时触发          | () => void                         |
| leave-cancelled <sup>1.22.1+</sup> | 退场动画取消时触发          | () => void                         |

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
