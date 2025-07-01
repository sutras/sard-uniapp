---
nav: 组件
title: Sidebar
subtitle: 侧边导航
group: 导航组件
version: 1.12+
---

## 介绍

垂直标签导航，用于在不同的区域之间进行切换。

## 引入

```ts
import Sidebar from 'sard-uniapp/components/sidebar/sidebar.vue'
import SidebarItem from 'sard-uniapp/components/sidebar-item/sidebar-item.vue'
```

## 代码演示

### 基础使用

使用 `v-model:current` 绑定当前选中项的 `name`，`name` 必须且唯一。

@code('${DEMO_PATH}/sidebar/demo/Basic.vue')

### 圆角

设置 `round` 属性会使选中项上下角变圆。

@code('${DEMO_PATH}/sidebar/demo/Round.vue')

### 线条

设置 `line` 属性会使选中项左边显示线条。

@code('${DEMO_PATH}/sidebar/demo/Line.vue')

### 禁用

禁用的导航项无法点击。

@code('${DEMO_PATH}/sidebar/demo/Disabled.vue')

### 自定义

使用默认插槽自定义内容。

@code('${DEMO_PATH}/sidebar/demo/Custom.vue')

### 场景应用

#### 场景 1

此场景结合了 `Sidebar` 和 `ScrollSpy` 组件，绑定了同一个 `current` 属性进行双向联动。

@code('${DEMO_PATH}/sidebar/demo/Scene1.vue')

#### 场景 2

相较于 场景 1，此场景在页面顶部添加了 banner 块和标签栏，且标签栏粘性定位于顶部。

@code('${DEMO_PATH}/sidebar/demo/Scene2.vue')

## API

### SidebarProps

| 属性                     | 描述                       | 类型                                                           | 默认值                                              |
| ------------------------ | -------------------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| root-class               | 组件根元素类名             | string                                                         | -                                                   |
| root-style               | 组件根元素样式             | StyleValue                                                     | -                                                   |
| current                  | 当前绑定导航项的名称       | string \| number                                               | -                                                   |
| round                    | 当前导航项是否显示为圆角   | boolean                                                        | false                                               |
| line                     | 当前导航项是否添加左边线条 | boolean                                                        | false                                               |
| scroll-into-view-options | 自定义滚动配置选项         | [ScrollIntoViewOptions](../utilities/scroll-into-view-options) | {position: 'nearest', startOffset: 0, endOffset: 0} |

### SidebarSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### SidebarEmits

| 事件           | 描述                 | 类型                             |
| -------------- | -------------------- | -------------------------------- |
| update:current | 当前导航项改变时触发 | (name: string \| number) => void |
| change         | 当前导航项改变时触发 | (name: string \| number) => void |

### SidebarItemProps

| 属性       | 描述                 | 类型             | 默认值 |
| ---------- | -------------------- | ---------------- | ------ |
| root-class | 组件根元素类名       | string           | -      |
| root-style | 组件根元素样式       | StyleValue       | -      |
| title      | 导航项显示的标题内容 | string           | -      |
| name       | 导航项唯一名称，必需 | string \| number | -      |
| disabled   | 是否禁用表单项       | boolean          | false  |

### SidebarItemSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### SidebarItemEmits

| 事件  | 描述             | 类型                 |
| ----- | ---------------- | -------------------- |
| click | 点击导航项时触发 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
