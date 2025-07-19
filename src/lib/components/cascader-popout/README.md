---
nav: 组件
title: CascaderPopout
subtitle: 级联弹出框
group: 表单组件
version: 1.16+
---

## 介绍

组合了级联选择、弹出框组件，实现了便捷快速的级联选择功能。

## 引入

```ts
import CascaderPopout from 'sard-uniapp/components/cascader-popout/cascader-popout.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `v-model:visible` 控制弹出框显隐。

@code('${DEMO_PATH}/cascader-popout/demo/Basic.vue')

## API

### CascaderPopoutProps

继承 [`CascaderProps`](./cascader#CascaderProps) 并有以下额外属性：

| 属性              | 描述                                     | 类型       | 默认值 |
| ----------------- | ---------------------------------------- | ---------- | ------ |
| popout-class      | 弹窗框根元素类名                         | string     | -      |
| popout-style      | 弹窗框根元素样式                         | StyleValue | -      |
| visible (v-model) | 是否显示弹出框                           | boolean    | -      |
| title             | 弹出框标题                               | string     | -      |
| show-confirm      | 是否显示确定按钮，隐藏按钮可用于快捷选择 | boolean    | true   |
| validate-event    | 是否触发表单验证                         | boolean    | true   |

### CascaderPopoutSlots

继承 [`CascaderSlots`](./cascader#CascaderSlots)

### CascaderPopoutEmits

| 事件                               | 描述                        | 类型                                                                 |
| ---------------------------------- | --------------------------- | -------------------------------------------------------------------- |
| update:model-value                 | 级联输入组件值改变时触发    | (value: string \| number, selectedOptions: CascaderOption[]) => void |
| change                             | 级联输入组件值改变时触发    | (value: string \| number, selectedOptions: CascaderOption[]) => void |
| select                             | 选择级联选择某一项时触发    | (option: CascaderOption, tabIndex: number) => void                   |
| update:visible                     | 弹出框显隐时触发            | (visible: boolean) => void                                           |
| confirm <sup>1.22.1+</sup>         | 点击确定按钮时触发          | () => void                                                           |
| visible-hook <sup>1.22.1+</sup>    | 入场/退场动画状态改变时触发 | (name: TransitionHookName) => void                                   |
| before-enter <sup>1.22.1+</sup>    | 入场动画开始前触发          | () => void                                                           |
| enter <sup>1.22.1+</sup>           | 入场动画开始时触发          | () => void                                                           |
| after-enter <sup>1.22.1+</sup>     | 入场动画结束时触发          | () => void                                                           |
| enter-cancelled <sup>1.22.1+</sup> | 入场动画取消时触发          | () => void                                                           |
| before-leave <sup>1.22.1+</sup>    | 退场动画开始前触发          | () => void                                                           |
| leave <sup>1.22.1+</sup>           | 退场动画开始时触发          | () => void                                                           |
| after-leave <sup>1.22.1+</sup>     | 退场动画结束时触发          | () => void                                                           |
| leave-cancelled <sup>1.22.1+</sup> | 退场动画取消时触发          | () => void                                                           |
