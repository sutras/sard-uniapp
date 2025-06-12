---
nav: 组件
title: Tag
subtitle: 标签
group: 数据展示
---

## 介绍

用于分类或概括事物属性的标签。

## 引入

```ts
import Tag from 'sard-uniapp/components/tag/tag.vue'
```

## 代码演示

### 基础使用

通过 `theme` 属性设置标签颜色。

@code('${DEMO_PATH}/tag/demo/Basic.vue')

### 镂空

通过 `plain` 属性设置为空心样式。

@code('${DEMO_PATH}/tag/demo/Plain.vue')

### 圆角

通过 `round` 属性设置为圆角样式。

@code('${DEMO_PATH}/tag/demo/Round.vue')

### 标记样式（半圆角）

通过 `mark` 属性设置为标记样式(半圆角)。

@code('${DEMO_PATH}/tag/demo/Mark.vue')

### 尺寸

通过 `size` 属性调整标签大小。

@code('${DEMO_PATH}/tag/demo/Size.vue')

### 自定义样式

通过 `color` 和 `textColor` 属性设置标签颜色。

@code('${DEMO_PATH}/tag/demo/Style.vue')

### 可关闭的

通过 `closeable` 属性添加关闭按钮，点击关闭按钮时会触发 `close` 事件。

@code('${DEMO_PATH}/tag/demo/Closable.vue')

## API

### TagProps

| 属性       | 描述           | 类型                                                                     | 默认值    |
| ---------- | -------------- | ------------------------------------------------------------------------ | --------- |
| root-class | 组件根元素类名 | string                                                                   | -         |
| root-style | 组件根元素样式 | StyleValue                                                               | -         |
| theme      | 主题色         | 'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'danger' | 'primary' |
| round      | 圆角按标签     | boolean                                                                  | false     |
| plain      | 镂空标签       | boolean                                                                  | false     |
| mark       | 标记标签       | boolean \| 'left' \| 'right'                                             | false     |
| size       | 标签尺寸       | 'small' \| 'medium' \| 'large'                                           | 'medium'  |
| color      | 标签颜色       | string                                                                   | -         |
| text-color | 文本颜色       | string                                                                   | -         |
| closable   | 是否可关闭     | boolean                                                                  | false     |

### TagSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### TagEmits

| 事件  | 描述               | 类型                 |
| ----- | ------------------ | -------------------- |
| click | 点击标签时触发     | (event: any) => void |
| close | 点击关闭按钮时触发 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
