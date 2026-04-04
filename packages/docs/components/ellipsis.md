---
title: Ellipsis
subtitle: 文本省略
group: 数据展示
version: 1.29+
---

## 介绍

对长文本进行省略，支持展开和收起，并可自定义展示行数、省略位置和省略符号。

## 引入

```ts
import Ellipsis from 'sard-uniapp/components/ellipsis/ellipsis.vue'
```

## 代码演示

### 基础用法

使用 `content` 属性设置内容，默认展示 1 行，超过 1 行显示省略号。

<<< @demo/ellipsis/demo/Basic.vue

### 展开/收起

当设置 `expand-text` 和 `collapse-text` 时，超过行数支持展开和收起。

<<< @demo/ellipsis/demo/Expand.vue

### 自定义展示行数

通过设置 `rows` 限制展示行数。

<<< @demo/ellipsis/demo/Rows.vue

### 自定义省略符号

通过 `dots` 属性可以自定义省略符号。

<<< @demo/ellipsis/demo/Dots.vue

### 自定义省略位置

通过设置 `position` 控制省略位置，支持头部省略、中部省略和尾部省略，默认尾部省略。

<<< @demo/ellipsis/demo/Position.vue

### 动态切换

演示属性改变时重新渲染的效果。

<<< @demo/ellipsis/demo/Dynamic.vue

## API

### EllipsisProps

| 属性          | 描述           | 类型             | 默认值  |
| ------------- | -------------- | ---------------- | ------- |
| root-class    | 组件根元素类名 | string           | -       |
| root-style    | 组件根元素样式 | StyleValue       | -       |
| content       | 文本内容       | string           | `''`    |
| rows          | 展示行数       | number           | `1`     |
| position      | 省略位置       | EllipsisPosition | `'end'` |
| dots          | 省略符号       | string           | `'...'` |
| expand-text   | 展开按钮文本   | string           | -       |
| collapse-text | 收起按钮文本   | string           | -       |
| expanded      | 是否默认展开   | boolean          | `false` |

### EllipsisEmits

| 事件            | 描述               | 类型                          |
| --------------- | ------------------ | ----------------------------- |
| update:expanded | 展开状态变化时触发 | `(expanded: boolean) => void` |
| change          | 点击切换按钮时触发 | `(expanded: boolean) => void` |

### EllipsisPosition

```ts
type EllipsisPosition = 'start' | 'middle' | 'end'
```

## 主题定制

### CSS 变量

<<< @comp/ellipsis/variables.scss#variables
