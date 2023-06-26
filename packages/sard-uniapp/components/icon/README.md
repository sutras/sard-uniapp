# Icon 图标

### 介绍

基于字体的图标集。

## 代码演示

### 基础使用

```html
<sar-icon prefix="sari" name="search" />
```

### 尺寸

```html
<sar-icon prefix="sari" name="search" size="2em" />
```

### 颜色

```html
<sar-icon prefix="sari" name="search" color="orange" />
```

### 图片类型图标

名称里面带有`/`字符会被当作图片处理。

```html
<sar-icon prefix="sari" name="/static/logo.svg" />
```

### 内置图标

```html
<sar-icon prefix="sari" name="fail" />
<sar-icon prefix="sari" name="success" />
<sar-icon prefix="sari" name="close" />
<sar-icon prefix="sari" name="question" />
<sar-icon prefix="sari" name="info" />
<sar-icon prefix="sari" name="minus" />
<sar-icon prefix="sari" name="plus" />
<sar-icon prefix="sari" name="up" />
<sar-icon prefix="sari" name="down" />
<sar-icon prefix="sari" name="left" />
<sar-icon prefix="sari" name="right" />
<sar-icon prefix="sari" name="search" />
<sar-icon prefix="sari" name="person" />
```

## API

### IconProps

| 属性   | 描述                                                     | 类型   | 默认值 |
| ------ | -------------------------------------------------------- | ------ | ------ |
| name   | 图标名称或图片链接，如果名称带有`/`，会被认为是图片图标  | string | ''     |
| prefix | 类名前缀，会作为独立类名，并拼接上 `name` 形成另一个类名 | string | -      |
| size   | 图标大小                                                 | string | -      |
| color  | 图标颜色                                                 | string | -      |

## 主题定制

### CSS 变量

%{variables}
