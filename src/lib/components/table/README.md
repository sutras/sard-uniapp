---
nav: 组件
title: Table
subtitle: 表格
group: 数据展示
version: 1.9+
---

## 介绍

用于展示多条结构类似的数据。

## 引入

```ts
import Table from 'sard-uniapp/components/table/table.vue'
import TableRow from 'sard-uniapp/components/table-row/table-row.vue'
import TableCell from 'sard-uniapp/components/table-cell/table-cell.vue'
```

## 代码演示

### 基础使用

表格组件是通过 `flex` 布局实现的，`sar-table-row` 组件表示一行，`sar-table-cell` 组件表示一个单元格。
给 `sar-table-cell` 组件设置 `bold` 属性进行加粗以表示表头。

@code('${DEMO_PATH}/table/demo/Basic.vue')

`data.ts`

@code('${DEMO_PATH}/table/demo/data.ts')

### 边框

给 `sar-table` 组件添加 `bordered` 属性可以设置单元格的边框。

@code('${DEMO_PATH}/table/demo/Border.vue')

### 下边框

给 `sar-table` 组件添加 `underline` 属性可以设置单元格的下边框。

@code('${DEMO_PATH}/table/demo/Underline.vue')

### 有条纹的

可以自由的给 `sar-table-row` 组件添加背景色。

@code('${DEMO_PATH}/table/demo/Striped.vue')

### 单元格条纹

也可以自由的给其他元素添加背景色来定制样式。

@code('${DEMO_PATH}/table/demo/CellStriped.vue')

### 自定义宽度

因为表格组件时通过 `flex` 布局实现的，因此需要给同一列的单元格设置相同的宽度以便上下的单元格宽度可以对齐。

通过 `sar-table-cell` 组件的 `width` 属性可以设置任意宽度。可以是带有单位的，也可以不带有单位，但需要注意的是，要么全部带有单位，要么全部不带有单位，内部会使用 `parseFloat()` 将宽度值转换为 `flex-grow` 属性的值，以便在任意宽度屏幕上等比平分空间。

@code('${DEMO_PATH}/table/demo/Width.vue')

### 固定表头

给 `sar-table` 组件设置 `height` 属性，并给第一个 `sar-table-row` 组件设置 `fixed` 属性即可将其固定到表格的顶部。

@code('${DEMO_PATH}/table/demo/FixedHeader.vue')

### 固定列

给 `sar-table-cell` 组件设置 `fixed` 或 `fixed="left"` 属性可以将其固定在左边，设置 `fixed="right"` 可以将其固定在右边。

@code('${DEMO_PATH}/table/demo/FixedColumn.vue')

### 固定表头和列

可以同时固定表头和列。

@code('${DEMO_PATH}/table/demo/Fixed.vue')

### 满屏表格

可以使用 `calc()` 函数、`--window-top` 导航高度变量、`vh` 相对视窗单位来设置表格的高度以实现满屏的表格效果。

@code('${DEMO_PATH}/table/demo/FullScreen.vue')

`level-data.ts`

@code('${DEMO_PATH}/table/demo/level-data.ts')

### 多级表头

使用 `sar-table-row` 和 `sar-table-cell` 的“你中有我我中有你”可以实现多级表头。需要注意单元格都需要设置指定宽度以便对齐。

@code('${DEMO_PATH}/table/demo/MultilevelHeader.vue')

### 合并行或列

不同于 `HTMLTableCellElement` 使用 `rowSpan` 和 `colSpan` 属性合并行或列。在 `sar-table` 中需要使用 `flex` 布局的思维来合并单元格。且同一列的单元格需要设置相同的宽度，跨多列的单元格宽度为其跨越的列的宽度的和。

@code('${DEMO_PATH}/table/demo/Merge.vue')

## API

### TableProps

| 属性       | 描述                         | 类型       | 默认值 |
| ---------- | ---------------------------- | ---------- | ------ |
| root-class | 组件根元素类名               | string     | -      |
| root-style | 组件根元素样式               | StyleValue | -      |
| bordered   | 给单元格添加边框             | boolean    | false  |
| underline  | 给单元格添加下边框           | boolean    | false  |
| height     | 设置表格高度以便可以固定表头 | string     | -      |

### TableSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### TableRowProps

| 属性       | 描述             | 类型       | 默认值 |
| ---------- | ---------------- | ---------- | ------ |
| root-class | 组件根元素类名   | string     | -      |
| root-style | 组件根元素样式   | StyleValue | -      |
| fixed      | 固定列到表格顶部 | boolean    | false  |

### TableRowSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### TableCellProps

| 属性       | 描述                                     | 类型                         | 默认值 |
| ---------- | ---------------------------------------- | ---------------------------- | ------ |
| root-class | 组件根元素类名                           | string                       | -      |
| root-style | 组件根元素样式                           | StyleValue                   | -      |
| fixed      | 固定单元到表格左边或右边，true 表示左边  | boolean \| 'left' \| 'right' | -      |
| width      | 设置单元格宽度占比，可以带单位或不带单位 | string                       | '1'    |
| bold       | 单元格字体加粗                           | boolean                      | false  |

### TableCellSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')

### CSS 变量 - 暗黑模式

@code('./variables-dark.scss#variables')
