---
nav: 组件
title: Rate
subtitle: 评分
group: 表单组件
---

## 介绍

用于对事物进行评级操作。

## 引入

```ts
import Rate from 'sard-uniapp/components/rate/rate.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 绑定当前值。

@code('${DEMO_PATH}/rate/demo/Basic.vue')

### 半星

设置 `allowHalf` 属性后可以选中半星。

@code('${DEMO_PATH}/rate/demo/AllowHalf.vue')

### 自定义图标

通过 `icon` 属性设置选中时的图标，`voidIcon` 属性设置未选中时的图标。
或者通过 `text` 和 `voidText` 属性设置文字代替图标。

@code('${DEMO_PATH}/rate/demo/CustomIcon.vue')

### 自定义颜色

通过 `color` 属性设置选中时的颜色，`voidColor` 设置未选中时的颜色。

@code('${DEMO_PATH}/rate/demo/Color.vue')

### 自定义尺寸和间距

通过 `size` 属性设置图标大小。
通过 `gap` 属性设置图标间距。

@code('${DEMO_PATH}/rate/demo/Size.vue')

### 自定义数量

通过 `count` 属性设置星星总数。

@code('${DEMO_PATH}/rate/demo/Count.vue')

### 允许清空

当 `clearable` 属性设置为 `true`，再次点击相同的值时，可以将值重置为 0。

@code('${DEMO_PATH}/rate/demo/Clearable.vue')

### 只读和禁用

只读或禁用后不可操作。

@code('${DEMO_PATH}/rate/demo/DisabledReadOnly.vue')

## API

### RateProps

| 属性           | 描述                         | 类型       | 默认值 |
| -------------- | ---------------------------- | ---------- | ------ |
| root-class     | 组件根元素类名               | string     | -      |
| root-style     | 组件根元素样式               | StyleValue | -      |
| model-value    | 选中图标数                   | number     | -      |
| allow-half     | 是否允许半选                 | boolean    | false  |
| clearable      | 是否允许清空，划到最左边清空 | boolean    | false  |
| count          | 图标总数                     | number     | 5      |
| size           | 图标大小                     | string     | -      |
| gap            | 图标间距                     | string     | -      |
| icon-family    | 图标字体                     | string     | -      |
| icon           | 自定义选中时的图标           | string     | -      |
| void-icon      | 自定义未选中时的图标         | string     | -      |
| text           | 自定义选中时的文字           | string     | -      |
| void-text      | 自定义未选中时的文字         | string     | -      |
| color          | 选中时的颜色                 | string     | -      |
| void-color     | 未选中时的颜色               | string     | -      |
| disabled       | 禁用状态                     | boolean    | false  |
| readonly       | 只读状态                     | boolean    | false  |
| validate-event | 是否触发表单验证             | boolean    | true   |

### RateEmits

| 事件                     | 描述               | 类型                    |
| ------------------------ | ------------------ | ----------------------- |
| update:model-value       | 选中的值改变时触发 | (value: number) => void |
| change <sup>1.9.2+</sup> | 选中的值改变时触发 | (value: number) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
