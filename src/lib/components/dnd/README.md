---
nav: 组件
title: Dnd
subtitle: 拖放
group: 反馈组件
version: 1.22+
---

## 介绍

`Dnd (Drag and Drop)` 拖放组件用于列表的拖放排序。

`Dnd` 组件用于提供上下文；`DndItem` 组件用于展示拖放样式以及作为列表项容器；`DndHandle` 需放置在 `DndItem` 中，控制着拖拽区域，短按可进入拖拽状态，样式和内容可自定义。

## 引入

```ts
import Dnd from 'sard-uniapp/components/dnd/dnd.vue'
import DndItem from 'sard-uniapp/components/dnd-item/dnd-item.vue'
import DndHandle from 'sard-uniapp/components/dnd-handle/dnd-handle.vue'
```

## 代码演示

### 基础使用

通过 `v-model:list` 双向绑定列表，可在拖放时修改绑定数组的元素顺序；使用默认插槽的 `list` 参数渲染列表，需绑定 `itemInfo` 和 `key` 到 `DndItem` 组件；`key` 和数组元素的引用一一对应，无需自行处理循环组件时的唯一性问题；`data` 是原始数组的元素项。

下面演示了拖拽组件和列表组件的组合使用。因每个列表项被拖拽项包围分割，没了边框，因此需使用 `Divider` 组件添加边框。

@code('${DEMO_PATH}/dnd/demo/Basic.vue')

### 表单列表

下面演示了拖放组件组合表单组件实现的表单列表增删改以及拖放排序的效果。

@code('${DEMO_PATH}/dnd/demo/FormList.vue')

### 嵌套拖拽

拖拽里面也可以包含嵌套。

@warning

小程序端暂不支持嵌套拖拽，如果你有解决方案，可以提交 PR。

@endwarning

@code('${DEMO_PATH}/dnd/demo/Nested.vue')

## API

### DndProps\<T>

| 属性       | 描述           | 类型       | 默认值 |
| ---------- | -------------- | ---------- | ------ |
| root-class | 组件根元素类名 | string     | -      |
| root-style | 组件根元素样式 | StyleValue | -      |
| list       | 组件根元素样式 | T[]        | -      |

### DndSlots\<T>

| 插槽    | 描述           | 属性                       |
| ------- | -------------- | -------------------------- |
| default | 自定义默认内容 | {list: DndListItem\<T>[] } |

### DndEmits\<T>

| 事件            | 描述                         | 类型                                                        |
| --------------- | ---------------------------- | ----------------------------------------------------------- |
| item-drag-start | 拖拽开始时触发               | (event: { itemIndex: number }) => void                      |
| item-drag-move  | 拖拽项在拖拽范围内移动时触发 | (event: { itemIndex: number; insertIndex: number }) => void |
| item-drop       | 拖拽被释放时触发             | (event: { itemIndex: number; insertIndex: number }) => void |
| update:list     | 拖拽被释放时触发             | (list: T[]) => void                                         |

### DndItemProps

| 属性       | 描述           | 类型        | 默认值 |
| ---------- | -------------- | ----------- | ------ |
| root-class | 组件根元素类名 | string      | -      |
| root-style | 组件根元素样式 | StyleValue  | -      |
| item-info  | 组件根元素样式 | DndItemInfo | -      |

### DndItemSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### DndHandleProps

| 属性       | 描述           | 类型       | 默认值 |
| ---------- | -------------- | ---------- | ------ |
| root-class | 组件根元素类名 | string     | -      |
| root-style | 组件根元素样式 | StyleValue | -      |

### DndHandleSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### DndListItem\<T>

```ts
export interface DndListItem<T> {
  data: UnwrapRef<T>
  itemInfo: DndItemInfo
  key: string
}
```

### DndItemInfo

```ts
export interface DndItemInfo {
  offset: number
  dragging: boolean
}
```

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
