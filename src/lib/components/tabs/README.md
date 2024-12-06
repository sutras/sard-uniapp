---
nav: 组件
title: Tabs
subtitle: 标签页
group: 导航组件
---

## 介绍

选项卡切换组件。

## 引入

```ts
import Tabs from 'sard-uniapp/components/tabs/tabs.vue'
import Tab from 'sard-uniapp/components/tab/tab.vue'
```

## 代码演示

### 基础使用

通过 `v-model:current` 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。

@code('${DEMO_PATH}/tabs/demo/Basic.vue')

### 可滚动标签栏

设置 `scrollable` 后标签不再平分空间，并且可以实现水平滚动。

@code('${DEMO_PATH}/tabs/demo/Scrollable.vue')

### 禁用标签

禁用的标签无法手动选择。

@code('${DEMO_PATH}/tabs/demo/Disabled.vue')

### 药丸类型

设置 `type="pill"` 可以让标签显示为药丸风格。

@code('${DEMO_PATH}/tabs/demo/Pill.vue')

### 卡片类型

设置 `type="card"` 可以让标签显示为卡片风格。

@code('${DEMO_PATH}/tabs/demo/Card.vue')

### 自定义标签

除了通过 `list` 属性设置标签内容，还可以通过组件的方式自由地渲染任何内容。

@info
如果通过组件的方式渲染，必须设置 `name` 属性来代替默认的下标。
@endinfo

@code('${DEMO_PATH}/tabs/demo/CustomTab.vue')

## API

### TabsProps

| 属性              | 描述                                      | 类型                       | 默认值 |
| ----------------- | ----------------------------------------- | -------------------------- | ------ |
| root-class        | 组件根元素类名                            | string                     | -      |
| root-style        | 组件根元素样式                            | StyleValue                 | -      |
| current (v-model) | 当前选中的标签的 `name`，默认为标签的下标 | number \| string           | -      |
| list              | 标签数组，会被默认插槽覆盖                | TabProps[]                 | -      |
| type              | 标签类型                                  | 'line' \| 'pill' \| 'card' | 'line' |
| scrollable        | 是否可滚动                                | boolean                    | false  |

### TabsSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### TabsEmits

| 事件           | 描述                     | 类型                             |
| -------------- | ------------------------ | -------------------------------- |
| update:current | 当前激活的标签改变时触发 | (name: string \| number) => void |

### TabProps / TabOption

| 属性       | 描述                                                       | 类型             | 默认值 |
| ---------- | ---------------------------------------------------------- | ---------------- | ------ |
| root-class | 组件根元素类名                                             | string           | -      |
| root-style | 组件根元素样式                                             | StyleValue       | -      |
| title      | 标签显示的标题                                             | string           | -      |
| name       | 标签的唯一标识，默认为对应的下标，使用标签组件时要手动指定 | string \| number | -      |
| disabled   | 是否禁用标签                                               | boolean          | false  |

### TabSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### TabEmits

| 事件  | 描述                         | 类型                 |
| ----- | ---------------------------- | -------------------- |
| click | 点击标签时触发，不论是否禁用 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
