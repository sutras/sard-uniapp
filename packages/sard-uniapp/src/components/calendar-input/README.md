# CalendarInput 日历输入框

## 介绍

组合了日历、弹出框、输入框组件，实现了便捷快速的日历选择功能。

## 引入

```ts
import CalendarInput from 'sard-uniapp/components/calendar-input/calendar-input.vue'
```

## 代码演示

### 基础使用

日历输入框组件接收日历组件相同的属性，另外可以通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示包裹日历的弹出框。

@code('${DEMO_PATH}/calendar-input/demo/Basic.vue')

### 类型

@code('${DEMO_PATH}/calendar-input/demo/Type.vue')

## API

### CalendarInputProps

继承 [`CalendarProps`](./#/components/calendar#CalendarProps) 并有以下额外属性：

| 属性              | 描述                                     | 类型    | 默认值 |
| ----------------- | ---------------------------------------- | ------- | ------ |
| disabled          | 禁用状态                                 | boolean | false  |
| readonly          | 只读状态                                 | boolean | false  |
| clearable         | 是否显示清空按钮                         | boolean | false  |
| placeholder       | 输入框占位符内容                         | string  | -      |
| visible (v-model) | 是否显示弹出框                           | boolean | -      |
| title             | 弹出框标题，不设置则取 `placeholder` 值  | string  | -      |
| show-confirm      | 是否显示确定按钮，隐藏按钮可用于快捷选择 | boolean | true   |
| validate-event    | 是否触发表单验证                         | boolean | true   |

### CalendarInputEmits

| 事件               | 描述                     | 类型                                         |
| ------------------ | ------------------------ | -------------------------------------------- |
| update:model-value | 日历输入组件值改变时触发 | (value: Date \| Date[] \| undefined) => void |
| update:visible     | 弹出框显隐时触发         | (visible: boolean) => void                   |
