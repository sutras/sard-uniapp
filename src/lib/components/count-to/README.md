---
nav: 组件
title: CountTo
subtitle: 数字滚动
group: 数据展示
version: 1.2+
---

## 介绍

从某一个数值动态递增或递减到另一个数值。

## 引入

```ts
import CountTo from 'sard-uniapp/components/count-to/count-to.vue'
```

## 代码演示

### 基础使用

给 `value` 属性一个数字值即可启动滚动功能。

@code('${DEMO_PATH}/count-to/demo/Basic.vue')

### 小数位数

使用 `precision` 属性设置小数位数。

@code('${DEMO_PATH}/count-to/demo/Precision.vue')

### 分隔符

使用 `separator` 属性设置千分位分隔符。

@code('${DEMO_PATH}/count-to/demo/Separator.vue')

### 持续时间

使用 `duration` 属性设置滚动时长。

@code('${DEMO_PATH}/count-to/demo/Duration.vue')

### 随机数字

`value` 属性改变时会自动滚动到最新的值。

@code('${DEMO_PATH}/count-to/demo/Random.vue')

## API

### CountToProps

| 属性           | 描述                                   | 类型   | 默认值 |
| -------------- | -------------------------------------- | ------ | ------ |
| value          | 滚动到的目标数值                       | number | 0      |
| precision      | 精度，即小数位数                       | number | 0      |
| separator      | 千分位分隔符                           | string | -      |
| separatorDigit | 默认每三位插入一个分隔符，也可以自定义 | number | 3      |
| duration       | 滚动到目标值持续时间，单位 ms          | number | 2000   |
