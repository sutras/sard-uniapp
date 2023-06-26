# Grid 栅格

### 介绍

基于行/列来划分区块以展示内容。栅格系统提供了 12 列容器来布局，需要配套使用 `Row` 和 `Col` 组件。

## 代码演示

### 基础使用

```html
<sar-row>
  <sar-col>
    <view class="grid-box">span</view>
  </sar-col>
  <sar-col>
    <view class="grid-box">span</view>
  </sar-col>
</sar-row>
<sar-row>
  <sar-col :span="4">
    <view class="grid-box">span-4</view>
  </sar-col>
  <sar-col :span="8">
    <view class="grid-box">span-8</view>
  </sar-col>
</sar-row>
<sar-row>
  <sar-col :span="3">
    <view class="grid-box">span-3</view>
  </sar-col>
  <sar-col>
    <view class="grid-box">span</view>
  </sar-col>
  <sar-col span="auto">
    <view class="grid-box">auto</view>
  </sar-col>
</sar-row>
```

### 列偏移

```html
<sar-row>
  <sar-col>
    <view class="grid-box">span</view>
  </sar-col>
  <sar-col :offset="3">
    <view class="grid-box">offset-3</view>
  </sar-col>
</sar-row>
```

### 水平对齐

```html
<sar-row justify="start">
  <sar-col :span="3">
    <view class="grid-box">span-3</view>
  </sar-col>
  <sar-col :span="3">
    <view class="grid-box">span-3</view>
  </sar-col>
</sar-row>
<sar-row justify="center">
  <sar-col :span="3">
    <view class="grid-box">span-3</view>
  </sar-col>
  <sar-col :span="3">
    <view class="grid-box">span-3</view>
  </sar-col>
</sar-row>
<sar-row justify="end">
  <sar-col :span="3">
    <view class="grid-box">span-3</view>
  </sar-col>
  <sar-col :span="3">
    <view class="grid-box">span-3</view>
  </sar-col>
</sar-row>
```

### 垂直对齐

```html
<view class="grid-align">
  <sar-row align="start">
    <sar-col>
      <view class="grid-box">span-3</view>
    </sar-col>
    <sar-col>
      <view class="grid-box">span-3</view>
    </sar-col>
  </sar-row>
  <sar-row align="center">
    <sar-col>
      <view class="grid-box">span-3</view>
    </sar-col>
    <sar-col>
      <view class="grid-box">span-3</view>
    </sar-col>
  </sar-row>
  <sar-row align="end">
    <sar-col>
      <view class="grid-box">span-3</view>
    </sar-col>
    <sar-col>
      <view class="grid-box">span-3</view>
    </sar-col>
  </sar-row>
</view>
```

### 列间距

```html
<sar-row :gutter="30">
  <sar-col>
    <view class="grid-box">span-3</view>
  </sar-col>
  <sar-col>
    <view class="grid-box">span-3</view>
  </sar-col>
</sar-row>
```

### 列顺序

```html
<sar-row>
  <sar-col>
    <view class="grid-box">col1</view>
  </sar-col>
  <sar-col :order="-1">
    <view class="grid-box">col2 order:-1</view>
  </sar-col>
</sar-row>
<sar-row>
  <sar-col :order="2">
    <view class="grid-box">col1 order:2</view>
  </sar-col>
  <sar-col :order="1">
    <view class="grid-box">col2 order:1</view>
  </sar-col>
  <sar-col>
    <view class="grid-box">col3</view>
  </sar-col>
</sar-row>
```

## API

### RowProps

| 属性    | 描述         | 类型                                                              | 默认值 |
| ------- | ------------ | ----------------------------------------------------------------- | ------ |
| gutter  | 列间距       | number \|string                                                   | 0      |
| justify | 水平对齐方式 | 'start' \| 'center' \| 'end' \| 'around' \| 'between' \| 'evenly' | -      |
| align   | 垂直对齐方式 | 'start' \| 'center' \| 'end' \| 'stretch'                         | -      |

### RowSlots

| 名称    | 描述            | props |
| ------- | --------------- | ----- |
| default | 自定义`row`内容 | {}    |

### ColProps

| 属性   | 描述           | 类型                       | 默认值 |
| ------ | -------------- | -------------------------- | ------ |
| span   | 列元素宽度     | number \| 'auto' \| 'none' | -      |
| offset | 列元素偏移距离 | number                     | -      |
| order  | 列元素顺序     | number                     | -      |

### ColSlots

| 名称    | 描述            | props |
| ------- | --------------- | ----- |
| default | 自定义`col`内容 | {}    |

## 主题定制

### CSS 变量

%{variables}
