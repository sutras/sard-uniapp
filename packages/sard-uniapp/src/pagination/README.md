# Pagination 分页

## 介绍

用于分割长列表，每次加载一页数据。

## 引入

```ts
import Pagination from '@sard/uniapp/dist/pagination/pagination.vue'
```

## 代码演示

### 基础使用

设置 `total` 属性后便会渲染出页码。

@code('${DEMO_PATH}/pagination/demo/Basic.vue')

### 显示省略号

设置 `ellipsis` 会显示省略号，默认点击省略号会向前或向后 5 页。

@code('${DEMO_PATH}/pagination/demo/Ellipsis.vue')

### 简单分页

设置 `type="simple"` 属性可以隐藏具体的页码。

@code('${DEMO_PATH}/pagination/demo/Simple.vue')

### 自定义

自定义前后按钮内容。

@code('${DEMO_PATH}/pagination/demo/Custom.vue')

## API

### PaginationProps

| 属性                | 描述                   | 类型                | 默认值  |
| ------------------- | ---------------------- | ------------------- | ------- |
| root-class          | 组件根元素类名         | string              | -       |
| root-style          | 组件根元素样式         | StyleValue          | -       |
| total               | 总记录数               | number              | 0       |
| page-size           | 每页记录数             | number              | 10      |
| current (v-model)   | 当前页码               | number              | -       |
| page-count          | 总页数，默认自动计算   | number              | -       |
| page-button-count   | 显示的页码按钮个数     | number              | 5       |
| hide-on-single-page | 只有一页时是否隐藏分页 | boolean             | false   |
| type                | 分页类型               | 'simple' \| 'multi' | 'multi' |
| ellipsis            | 是否显示省略号         | boolean             | false   |
| multi-count         | 点击省略号跳转的页数   | number              | 5       |

### PaginationSlots

| 插槽 | 描述                 | 属性 |
| ---- | -------------------- | ---- |
| prev | 自定义上一页按钮内容 | -    |
| next | 自定义下一页按钮内容 | -    |

### PaginationEmits

| 事件           | 描述           | 类型                   |
| -------------- | -------------- | ---------------------- |
| update:current | 页码改变时触发 | (page: number) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
