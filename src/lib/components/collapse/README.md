---
nav: 组件
title: Collapse
subtitle: 折叠
group: 数据展示
---

## 介绍

可以展开/折叠内容区域。

## 引入

```ts
import Collapse from 'sard-uniapp/components/collapse/collapse.vue'
```

## 代码演示

### 基础使用

折叠组件是其他可折叠组件的基础组件。
使用 `visible` 属性控制折叠框展开或折叠。

@code('${DEMO_PATH}/collapse/demo/Basic.vue')

## API

### CollapseProps

| 属性                                | 描述                   | 类型    | 默认值 |
| ----------------------------------- | ---------------------- | ------- | ------ |
| visible                             | 是否可见               | boolean | false  |
| lazy <sup>1.25.9+</sup>             | 是否延迟渲染折叠内容   | boolean | false  |
| destroy-on-close <sup>1.25.9+</sup> | 关闭时是否销毁折叠内容 | boolean | false  |

### CollapseSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
