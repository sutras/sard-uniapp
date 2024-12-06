---
nav: 组件
title: CountDown
subtitle: 倒计时
group: 数据展示
---

## 介绍

倒计时的展示 ，以便告知用户在一定时间后可以进行某些操作。

```ts
import CountDown from 'sard-uniapp/components/count-down/count-down.vue'
```

## 代码演示

## 引入

### 基础使用

使用 `time` 属性配置倒计时总时长（单位毫秒）。

@code('${DEMO_PATH}/count-down/demo/Basic.vue')

### 自定义格式

默认格式为 `HH:mm:ss` ，也可以使用 `format` 自定义人任意想要的格式。

@code('${DEMO_PATH}/count-down/demo/Format.vue')

### 毫秒级别的渲染

默认每隔一秒渲染一次，使用 `millisecond` 属性可以设置毫秒级别渲染。

@code('${DEMO_PATH}/count-down/demo/Millisecond.vue')

### 自定义样式

如果想获取时分秒等数据分别渲染不同的样式，可以使用默认插槽提供的 `time` 属性来获取数据（`time` 类型为：`CountDownCurrentTime`）。

@code('${DEMO_PATH}/count-down/demo/Style.vue')

### 手动控制

当倒计时结束时便会停止，通过组件提供的方法可以控制倒计时的开始、暂停或进行重置。

@code('${DEMO_PATH}/count-down/demo/Control.vue')

### 验证码倒计时

下面代码演示了获取验证码需求中倒计时配合按钮的使用。

@code('${DEMO_PATH}/count-down/demo/Captcha.vue')

## API

### CountDownProps

| 属性        | 描述                   | 类型    | 默认值     |
| ----------- | ---------------------- | ------- | ---------- |
| time        | 倒计时总时长，单位毫秒 | number  | 0          |
| auto-start  | 是否自动开始倒计时     | boolean | true       |
| format      | 时间格式               | string  | 'HH:mm:ss' |
| millisecond | 是否开启毫秒级别渲染   | boolean | false      |

### CountDownSlots

| 插槽    | 描述           | 属性                           |
| ------- | -------------- | ------------------------------ |
| default | 自定义默认内容 | { time: CountDownCurrentTime } |

### CountDownEmits

| 事件   | 描述             | 类型                                 |
| ------ | ---------------- | ------------------------------------ |
| change | 倒计时变化时触发 | (time: CountDownCurrentTime) => void |
| finish | 倒计时结束时触发 | () => void                           |

### CountDownExpose

| 属性  | 描述       | 类型       |
| ----- | ---------- | ---------- |
| start | 开始倒计时 | () => void |
| pause | 暂停倒计时 | () => void |
| reset | 重置倒计时 | () => void |

### CountDownCurrentTime

| 属性         | 描述                   | 类型   |
| ------------ | ---------------------- | ------ |
| milliseconds | 剩余毫秒               | number |
| seconds      | 剩余秒数               | number |
| minutes      | 剩余分钟               | number |
| hours        | 剩余小时               | number |
| days         | 剩余天数               | number |
| total        | 剩余总时间（单位毫秒） | number |
