---
nav: 组件
title: Steps
subtitle: 步骤条
group: 导航组件
---

## 介绍

引导用户按照流程完成任务的分步导航条。

## 引入

```ts
import Steps from 'sard-uniapp/components/steps/steps.vue'
```

## 代码演示

### 基础使用

使用 `current` 属性指定步骤的下标，小于这个下标的步骤状态为 `finish`，等于这个下标的步骤状态为 `process`，大于这个下标的步骤状态为 `wait`。

@code('${DEMO_PATH}/steps/demo/Basic.vue')

### 居中

居中每个步骤的图标和文案。

@code('${DEMO_PATH}/steps/demo/Center.vue')

### 垂直步骤条

设置 `direction="vertical"` 可以垂直排列。

@code('${DEMO_PATH}/steps/demo/Vertical.vue')

### 垂直居中

将图标和文案垂直居中。

@code('${DEMO_PATH}/steps/demo/VerticalCenter.vue')

### 自定义图标

使用 `finishIcon, processIcon, waitIcon, errorIcon` 属性设置不通状态下的图标。

@code('${DEMO_PATH}/steps/demo/Icon.vue')

### 自定义颜色

使用 `css` 变量设置元素样式。

@code('${DEMO_PATH}/steps/demo/Color.vue')

### 当前步骤状态

可以设置当前处理中的步骤的状态为 `finish` 来模拟只有“未处理”和“已处理”两个状态的步骤条。

@code('${DEMO_PATH}/steps/demo/Status.vue')

### 错误步骤

可以设置当前处理中的步骤的状态为 `error` 表示步骤运行错误。

@code('${DEMO_PATH}/steps/demo/ErrorStatus.vue')

### 自定义各步骤状态

每个步骤都可以使用 `status` 属性设置其状态。

@code('${DEMO_PATH}/steps/demo/StepStatus.vue')

## API

### StepsProps

| 属性         | 描述                 | 类型                       | 默认值       |
| ------------ | -------------------- | -------------------------- | ------------ |
| root-class   | 组件根元素类名       | string                     | -            |
| root-style   | 组件根元素样式       | StyleValue                 | -            |
| current      | 当前步骤对应的索引值 | number                     | 0            |
| item-list    | 所有步骤的数据       | StepsItem[]                | []           |
| center       | 是否居中             | boolean                    | false        |
| direction    | 排列方向             | 'vertical' \| 'horizontal' | 'horizontal' |
| status       | 指定当前步骤的状态   | StepsStatus                | -            |
| icon-family  | 图标字体             | string                     | -            |
| icon-size    | 图标字号             | string                     | -            |
| finish-icon  | 已完成状态的图标名称 | string                     | -            |
| process-icon | 处理中状态的图标名称 | string                     | -            |
| wait-icon    | 等待中状态的图标名称 | string                     | -            |
| error-icon   | 错误状态的图标名称   | string                     | -            |

### StepsItem

| 属性        | 描述       | 类型        | 默认值 |
| ----------- | ---------- | ----------- | ------ |
| status      | 自定义状态 | StepsStatus | -      |
| name        | 步骤名称   | string      | -      |
| description | 步骤描述   | string      | -      |

### StepsStatus

```ts
type StepsStatus = 'wait' | 'process' | 'error' | 'finish'
```

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
