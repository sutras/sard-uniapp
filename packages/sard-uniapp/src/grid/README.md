# Grid 宫格

## 介绍

将多个类目进行等宽排列，用于内容展示或者页面导航。

## 引入

```ts
import Grid from '@sard/uniapp/dist/grid/grid.vue'
import GridItem from '@sard/uniapp/dist/grid-item/grid-item.vue'
```

## 代码演示

### 基础使用

使用`text`属性设置文本内容，使用`icon`属性设置图标。

@code('${DEMO_PATH}/grid/demo/Basic.vue')

### 自定义列数

默认一行展示四个格子，可以通过`columns`自定义列数。

@code('${DEMO_PATH}/grid/demo/Columns.vue')

### 正方形格子

设置`square`属性后，格子的高度会和宽度保持一致。

@code('${DEMO_PATH}/grid/demo/Square.vue')

### 格子间距

通过`gap`属性设置格子之间的距离。

@code('${DEMO_PATH}/grid/demo/Gap.vue')

### 显示边框

显示边框后看起来分割更明显。

@code('${DEMO_PATH}/grid/demo/Border.vue')

### 内容横排

将`direction`属性设置为`horizontal`可以让宫格的内容呈横向排列。

@code('${DEMO_PATH}/grid/demo/Horizontal.vue')

### 内容翻转

将文本和图标的位置调换。

@code('${DEMO_PATH}/grid/demo/Reverse.vue')

### 可点击的

添加点击态。

@code('${DEMO_PATH}/grid/demo/Clickable.vue')

### 自定义内容

通过默认插槽可以自定义格子展示的内容。

@code('${DEMO_PATH}/grid/demo/Custom.vue')

## API

### GridProps

| 属性       | 描述                     | 类型                       | 默认值     |
| ---------- | ------------------------ | -------------------------- | ---------- |
| root-class | 组件根元素类名           | string                     | -          |
| root-style | 组件根元素样式           | StyleValue                 | -          |
| columns    | 列数                     | number                     | 4          |
| gap        | 格子间距                 | string                     | 0          |
| bordered   | 是否显示边框             | boolean                    | false      |
| square     | 是否将格子显示为正方形   | boolean                    | false      |
| clickable  | 格子是否可点击           | boolean                    | false      |
| reverse    | 是否调换图标和文本的位置 | boolean                    | false      |
| direction  | 格子排列方向             | 'horizontal' \| 'vertical' | 'vertical' |

### GridSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### GridItemProps

| 属性        | 描述                     | 类型       | 默认值 |
| ----------- | ------------------------ | ---------- | ------ |
| root-class  | 组件根元素类名           | string     | -      |
| root-style  | 组件根元素样式           | StyleValue | -      |
| text        | 自定义文字内容           | string     | -      |
| icon        | 图标名称，可以为图片路径 | string     | -      |
| icon-size   | 图标尺寸                 | string     | -      |
| icon-color  | 图标颜色                 | string     | -      |
| icon-family | 图标字体名称             | string     | -      |

### GridItemSlots

| 插槽    | 描述                             | 属性 |
| ------- | -------------------------------- | ---- |
| default | 自定义默认内容，会覆盖文字和图标 | -    |
| text    | 自定义文字内容，会覆盖`text`属性 | -    |
| icon    | 自定义图标内容，会覆盖`icon`属性 | -    |

### GridItemEmits

| 事件  | 描述           | 类型                 |
| ----- | -------------- | -------------------- |
| click | 点击格子时触发 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
