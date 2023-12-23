# Avatar 头像

## 介绍

用图片、图标或字符等来展示头像、群、库等事物信息。

## 引入

```ts
import Avatar from 'sard-uniapp/components/avatar/avatar.vue'
```

## 代码演示

### 基础使用

默认展示一个人头图标。

@code('${DEMO_PATH}/avatar/demo/Basic.vue')

### 形状

设置 `shape="square" ` 将其改为带圆角的方形。

@code('${DEMO_PATH}/avatar/demo/Shape.vue')

### 尺寸

`size` 设置头像大小，`iconSize` 设置图标大小。

@code('${DEMO_PATH}/avatar/demo/Size.vue')

### 自定义样式

`background` 设置头像背景色，`color` 设置图标颜色。

@code('${DEMO_PATH}/avatar/demo/Style.vue')

### 图片类型

设置 `src` 图片路径将展示一个完全覆盖框框的图片。

@code('${DEMO_PATH}/avatar/demo/Picture.vue')

### 自定义内容

默认插槽配置的内容会代替默认的内容。

@code('${DEMO_PATH}/avatar/demo/Children.vue')

### 额外内容

`extra` 属性可以展示例如徽标等组件。要使徽标固定在圆角形状头像右上角边边上可以使用 `14.6447%` 的固定值。

@code('${DEMO_PATH}/avatar/demo/Extra.vue')

## API

### AvatarProps

| 属性       | 描述                   | 类型                 | 默认值   |
| ---------- | ---------------------- | -------------------- | -------- |
| root-class | 组件根元素类名         | string               | -        |
| root-style | 组件根元素样式         | StyleValue           | -        |
| shape      | 头像形状               | 'circle' \| 'square' | 'circle' |
| size       | 头像尺寸               | string               | -        |
| icon-size  | 图标尺寸               | string               | -        |
| src        | 图片类型头像的图片地址 | string               | -        |

### AvatarSlots

| 插槽    | 描述                     | 属性 |
| ------- | ------------------------ | ---- |
| default | 自定义默认内容           | -    |
| extra   | 额外内容，常用于展示徽标 | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
