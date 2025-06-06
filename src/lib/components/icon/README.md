---
nav: 组件
title: Icon
subtitle: 图标
group: 基础组件
---

## 介绍

基于字体的图标集。

## 引入

```ts
import Icon from 'sard-uniapp/components/icon/icon.vue'
```

## 代码演示

### 基础使用

使用`name`属性指定要显示的图标。

@code('${DEMO_PATH}/icon/demo/Basic.vue')

### 尺寸

使用`size`属性设置图标大小。

@code('${DEMO_PATH}/icon/demo/Size.vue')

### 颜色

使用`color`属性设置图标颜色。

@code('${DEMO_PATH}/icon/demo/Color.vue')

### 图片类型图标

名称里面带有`/`字符会被当作图片处理。

@code('${DEMO_PATH}/icon/demo/Image.vue')

### 自定义图标

组件库内置有用于内部组件的必须的少量的图标，在实际的应用中，通常需要引入自定义的特定风格的图标库或第三方图标库。

下面演示如何引入 <a href="https://www.iconfont.cn/" target="_blank">`iconfont`</a> 中的图标库（以此文档案例使用的`demo-icons`图标库来演示）：

1. 进入到 `iconfont` 中的 `demo-icons` 项目并进行以下配置配置：

   - FontClass/Symbol 前缀: `demo-icons-`
   - Font Family: `demo-icons`
   - 字体格式: 只勾选 `TTF` 和 `Base64`
   - 保存

2. 点击更新代码
3. 打开生成的在线 `CSS` 文件
4. 将里面的内容复制下来，粘贴到本地的 css 文件（取名 `demo-icons.css`）
5. 在 `App.vue` 文件导入 `demo-icons.css` 文件:

```html
<style lang="scss">
  @use './demo-icons.css';
</style>
```

6.  使用`demo-icons`图标库中的图标：

@code('${DEMO_PATH}/icon/demo/Custom.vue')

### 冒号分隔 <sup>1.18+</sup>

除了通过 `family` 指定图标字体，还可以将图标字体和图标名称通过冒号分隔符组合在一起，统一通过 `name` 进行设置。

@code('${DEMO_PATH}/icon/demo/Colon.vue')

### 内置图标

点击右边演示的图标可以复制图标名称。

## API

### IconProps

| 属性       | 描述                                                    | 类型       | 默认值 |
| ---------- | ------------------------------------------------------- | ---------- | ------ |
| root-class | 组件根元素类名                                          | string     | -      |
| root-style | 组件根元素样式                                          | StyleValue | -      |
| name       | 图标名称或图片链接，如果名称带有`/`，会被认为是图片图标 | string     | ''     |
| family     | 字体名称                                                | string     | 'sari' |
| size       | 图标大小                                                | string     | -      |
| color      | 图标颜色                                                | string     | -      |
