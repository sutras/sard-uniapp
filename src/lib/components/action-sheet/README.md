---
nav: 组件
title: ActionSheet
subtitle: 动作面板
group:
  title: 反馈组件
  order: 5
---

## 介绍

从底部向上弹出动作菜单。

## 引入

```ts
import ActionSheet from 'sard-uniapp/components/action-sheet/action-sheet.vue'
```

## 代码演示

### 基础使用

使用 `v-model:visible` 属性控制显隐，使用 `itemList` 属性配置动作项。

@code('${DEMO_PATH}/action-sheet/demo/Basic.vue')

### 取消按钮

使用 `cancel` 属性展示取消按钮。

@code('${DEMO_PATH}/action-sheet/demo/Cancel.vue')

### 描述信息

使用 `description` 属性对整个动作面板做一个解释说明。使用动作项的 `description` 属性对某个动作做一个解释说明。

@code('${DEMO_PATH}/action-sheet/demo/Description.vue')

### 动作状态

每个动作项都可以配置 `color`、`disabled`、`loading` 等属性来展示当前的状态。

@code('${DEMO_PATH}/action-sheet/demo/Status.vue')

## API

### ActionSheetProps

| 属性             | 描述                                                                 | 类型                                           | 默认值 |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------- | ------ |
| root-class       | 组件根元素类名                                                       | string                                         | -      |
| root-style       | 组件根元素样式                                                       | StyleValue                                     | -      |
| description      | 动作面板描述说明                                                     | string                                         | -      |
| item-list        | 面板项列表                                                           | ActionSheetItem[]                              | []     |
| cancel           | 取消按钮文字                                                         | string                                         | -      |
| visible          | 是否显示动作面板                                                     | boolean                                        | false  |
| overlay-closable | 点击遮罩后是否关闭                                                   | boolean                                        | true   |
| before-close     | 关闭前的回调，返回 `false` 或 `rejected` 状态的 `Promise` 可阻止关闭 | (type: 'close' \| 'cancel' \| 'select') => any | -      |
| duration         | 显隐动画时长，单位 ms                                                | number                                         | 300    |

### ActionSheetItem

| 属性        | 描述           | 类型    | 默认值 |
| ----------- | -------------- | ------- | ------ |
| name        | 动作名称       | string  | -      |
| description | 动作的描述说明 | string  | -      |
| color       | 字体颜色       | string  | -      |
| disabled    | 禁用状态       | boolean | false  |
| loading     | 加载状态       | boolean | false  |

### ActionSheetEmits

| 事件           | 描述               | 类型                                           |
| -------------- | ------------------ | ---------------------------------------------- |
| update:visible | 动作面板显隐时触发 | (visible: boolean) => void                     |
| close          | 点击遮罩时触发     | () => void                                     |
| cancel         | 点击取消按钮时触发 | () => void                                     |
| select         | 点击动作按钮时触发 | (item: ActionSheetItem, index: number) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
