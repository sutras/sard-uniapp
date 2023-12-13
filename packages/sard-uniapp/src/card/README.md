# Card 卡片

## 介绍

以矩形的形式呈现相关信息或内容，包含标题、内容和相关元素。

## 引入

```ts
import Card from '@sard/uniapp/dist/card/card.vue'
```

## 代码演示

### 基础使用

展示带标题和内容的卡片。

@code('${DEMO_PATH}/card/demo/Basic.vue')

### 基础使用

设置 `extra` 属性可以在标题右边放置额外内容。

@code('${DEMO_PATH}/card/demo/Extra.vue')

### 只有主体

如果不设置标题和额外内容，则不会渲染头部。

@code('${DEMO_PATH}/card/demo/OnlyBody.vue')

### 底部

可以设置 `footer` 属性在主体下面放置内容。

@code('${DEMO_PATH}/card/demo/Footer.vue')

## API

### CardProps

| 属性       | 描述           | 类型       | 默认值 |
| ---------- | -------------- | ---------- | ------ |
| root-class | 组件根元素类名 | string     | -      |
| root-style | 组件根元素样式 | StyleValue | -      |
| title      | 头部左边内容   | string     | -      |
| extra      | 头部右边内容   | string     | -      |
| footer     | 底部内容       | string     | -      |

### CardSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
| title   | 自定义标题内容 | -    |
| extra   | 自定义额外内容 | -    |
| footer  | 自定义底部内容 | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
