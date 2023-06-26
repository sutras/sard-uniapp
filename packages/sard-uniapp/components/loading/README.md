# Loading 加载

### 介绍

表示处理中的状态。

## 代码演示

### 基础使用

```html
<sar-loading />
```

### 加载类型

```html
<sar-loading type="circular" /> <sar-loading type="clock" />
```

### 加载文案

通过`text`属性或者默认插槽展示文字。

```html
<sar-loading text="text..."></sar-loading> <sar-loading>slot...</sar-loading>
```

### 垂直排布

```html
<sar-loading vertical>加载中...</sar-loading>
```

### 加载尺寸

`size`属性设置图标大小，`textSize`属性设置文字大小。

```html
<sar-loading size="24px" textSize="18px" text="加载中" />
```

### 自定义颜色

`color`属性设置图标颜色，`textColor`属性设置文字颜色。

```html
<sar-loading
  color="var(--sar-primary)"
  textColor="var(--sar-primary)"
  text="加载中"
/>
```

## API

### LoadingProps

| 属性      | 描述                   | 类型                  | 默认值     |
| --------- | ---------------------- | --------------------- | ---------- |
| type      | 加载类型               | 'clock' \| 'circular' | 'circular' |
| color     | 加载颜色               | string                | -          |
| size      | 图标尺寸               | string                | -          |
| text      | 图标文字               | string                | -          |
| textColor | 文字颜色               | string                | -          |
| textSize  | 文字尺寸               | string                | -          |
| vertical  | 是否垂直排列图标和文案 | boolean               | false      |

### LoadingSlots

| 名称    | 描述               | props |
| ------- | ------------------ | ----- |
| default | 自定义加载文字内容 | {}    |

## 主题定制

### CSS 变量

%{variables}
