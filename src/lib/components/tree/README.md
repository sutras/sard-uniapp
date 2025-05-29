---
nav: 组件
title: Tree
subtitle: 树形
group: 数据展示
version: 1.6+
---

## 介绍

用于显示层次结构数据，可展开或折叠。

## 引入

```ts
import Tree from 'sard-uniapp/components/tree/tree.vue'
```

## 代码演示

### 基础使用

通过 `data` 属性设置数据，通过 `node-keys` 属性告知如何从传入的数据中获取每个节点的数据。

@code('${DEMO_PATH}/tree/demo/Basic.vue')

### 手风琴

对于同一级的节点，每次只能展开一个。

@code('${DEMO_PATH}/tree/demo/Accordion.vue')

### 可选择的

设置 `selectable` 属性可以显示复选框让用户选择节点，还可以禁用节点的选择。

节点的 `key` 属性是非常重要的（可以自定义 `key` 的键名），必须保证节点的 `key` 在所有节点中的唯一性。
如果没有设置 `key`，则由程序生成一个全局唯一的标识作为 `key`。

@code('${DEMO_PATH}/tree/demo/Selectable.vue')

### 严格选择

在显示复选框的情况下，设置 `check-strictly` 属性来严格遵循父子不互相关联规则。

@code('${DEMO_PATH}/tree/demo/CheckStrictly.vue')

### 默认展开以及默认选中

树节点可以在初始化阶段被设置为展开和选中。

@code('${DEMO_PATH}/tree/demo/DefaultExpandedAndChecked.vue')

### 单一选择

设置 `single-selectable` 属性即可实现单选，选择后会触发 `select` 事件，可使用 `current` 属性设置当前选择的节点。

@code('${DEMO_PATH}/tree/demo/Single.vue')

### 仅选择叶子节点

设置 `leaf-only` 属性让其仅能选择叶子节点。

此时，点击节点任意位置都能选择节点，而不仅仅是单选按钮，因为折叠和选择操作不冲突。

@code('${DEMO_PATH}/tree/demo/LeafOnly.vue')

### 可拖拽的

设置 `draggable` 属性使节点可拖拽，短按拖拽按钮便可进入拖拽状态；
单击拖拽按钮，还可以设置节点的层级。

@code('${DEMO_PATH}/tree/demo/Draggable.vue')

### 可编辑的

设置 `editable` 属性使节点可编辑（增删改），配合 `draggable` 属性便可以随意编辑树形数据。

@code('${DEMO_PATH}/tree/demo/Editable.vue')

### 树节点过滤

树节点是可以被过滤的。

调用 `filter` 方法来过滤树节点。方法的参数就是过滤关键字。
通过设置 `filter-method` 属性还可以实现自定义的过滤。

@code('${DEMO_PATH}/tree/demo/Filter.vue')

### 严格的树节点过滤

默认的过滤是宽松的，即匹配到一个节点后便停止后代节点的匹配，其后代节点都会被显示出来。

设置 `filter-mode="strict"` 进入严格模式，即所有节点都要进行匹配，只有匹配成功的节点才会显示出来。

@code('${DEMO_PATH}/tree/demo/StrictFilter.vue')

## API

### TreeProps

| 属性                               | 描述                                       | 类型                                            | 默认值          |
| ---------------------------------- | ------------------------------------------ | ----------------------------------------------- | --------------- |
| root-class                         | 组件根元素类名                             | string                                          | -               |
| root-style                         | 组件根元素样式                             | StyleValue                                      | -               |
| data                               | 树形数据                                   | TreeNode[]                                      | -               |
| node-keys                          | 节点对象的键名                             | TreeNodeKeys                                    | defaultNodeKeys |
| default-expand-all                 | 是否默认展开所有节点                       | boolean                                         | false           |
| default-expanded-keys              | 默认展开的节点的 key                       | (string \| number)[]                            | -               |
| accordion                          | 是否每次只展示一个同级树节点               | boolean                                         | false           |
| selectable                         | 节点是否可被选择（复选）                   | boolean                                         | false           |
| check-strictly                     | 可选时是否严格遵循父子不关联的做法（复选） | boolean                                         | false           |
| default-checked-keys               | 默认勾选的节点的 key 的数组（复选）        | (string \| number)[]                            | -               |
| single-selectable <sup>1.17+</sup> | 节点是否可被选择（单选）                   | boolean                                         | false           |
| leaf-only <sup>1.17+</sup>         | 是否只能选择叶子节点（单选）               | boolean                                         | false           |
| current (v-model) <sup>1.17+</sup> | 当前选择的节点的 key（单选）               | string \| number                                | -               |
| draggable                          | 是否可以拖拽节点                           | boolean                                         | false           |
| editable                           | 是否可编辑节点（增删改）                   | boolean                                         | false           |
| filter-mode                        | 节点过滤模式                               | 'lenient' \| 'strict'                           | 'lenient'       |
| filter-method                      | 自定义过滤方法                             | (value: string, node: TreeStateNode) => boolean | -               |

### TreeEmits

| 事件                            | 描述                   | 类型                                                 |
| ------------------------------- | ---------------------- | ---------------------------------------------------- |
| update:current <sup>1.17+</sup> | 选择节点后触发（单选） | (key: string \| number, node: TreeStateNode) => void |
| select <sup>1.17+</sup>         | 选择节点后触发（单选） | (key: string \| number, node: TreeStateNode) => void |

### TreeExpose

| 属性               | 描述                   | 类型                                               |
| ------------------ | ---------------------- | -------------------------------------------------- |
| getCheckedKeys     | 获取所有选中节点的 key | () => (string \| number)[]                         |
| getHalfCheckedKeys | 获取所有半选节点的 key | () => (string \| number)[]                         |
| setCheckedKeys     | 设置指定节点为选中状态 | (keys: (string \| number)[]) => void               |
| setChecked         | 设置节点是否选中       | (key: string \| number, checked: boolean) => void  |
| setExpandedKeys    | 设置指定节点为展开状态 | (keys: (string \| number)[]) => void               |
| setExpanded        | 设置节点是否展开       | (key: string \| number, expanded: boolean) => void |
| toggleExpanded     | 切换节点展开状态       | (key: string \| number) => void                    |
| addRootNode        | 添加根节点             | () => void                                         |
| getCleanTreeData   | 获取干净的当前树形数据 | () => TreeCleanNode[]                              |
| filter             | 过滤树节点             | (searchString: string) => void                     |

### TreeNode

```ts
interface TreeNode {
  title?: string | number
  key?: any
  children?: TreeNode[]
  disabled?: boolean
  [prop: string]: any
}
```

### TreeCleanNode

```ts
interface TreeCleanNode {
  title: string | number
  key: string | number
  children?: TreeCleanNode[]
}
```

### TreeStateNode

```ts
interface TreeStateNode {
  title: string | number
  key: string | number
  expanded: boolean
  checked: boolean
  children?: TreeStateNode[]
  parent: TreeStateNode | null
  indeterminate: boolean
  level: number
  offsetLevel: number
  visible: boolean
  disabled: boolean
}
```

### TreeNodeKeys

```ts
interface TreeNodeKeys {
  title?: string
  key?: string
  children?: string
}
```

### defaultNodeKeys

```ts
const defaultNodeKeys = {
  title: 'title',
  key: 'key',
  children: 'children',
}
```

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
