# DatetimePickerInput 日期时间输入框

## 介绍

组合了日期时间、弹出框、输入框组件，实现了便捷快速的日期选择功能。

## 引入

```ts
import DatetimePickerInput from '@sard/uniapp/dist/datetime-picker-input/datetime-picker-input.vue'
```

## 代码演示

### 基础使用

日期时间输入框组件接收日期时间组件相同的属性，另外可以通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示包裹日期时间的弹出框。

@code('${DEMO_PATH}/datetime-picker-input/demo/Basic.vue')

## API

### DatetimePickerInputProps

继承 [`DatetimePickerProps`](./#/components/datetime-picker#DatetimePickerProps) 并有以下额外属性：

| 属性              | 描述                                                                   | 类型    | 默认值 |
| ----------------- | ---------------------------------------------------------------------- | ------- | ------ |
| disabled          | 禁用状态                                                               | boolean | false  |
| readonly          | 只读状态                                                               | boolean | false  |
| clearable         | 是否显示清空按钮                                                       | boolean | false  |
| placeholder       | 输入框占位符内容                                                       | string  | -      |
| visible (v-model) | 是否显示弹出框                                                         | boolean | -      |
| title             | 弹出框标题，不设置则取 `placeholder` 值                                | string  | -      |
| outlet-format     | 输出到输入框的日期格式，不指定则根据 `type` 属性自动生成格式，规则如下 | string  | -      |
| validate-event    | 是否触发表单验证                                                       | boolean | true   |

### `type` 到 `outletFormat` 的映射：

```ts
const mapTypeFormat = {
  y: 'YYYY',
  yM: 'YYYY-MM',
  yMd: 'YYYY-MM-DD',
  yMdhm: 'YYYY-MM-DD HH:mm',
  yMdhms: 'YYYY-MM-DD HH:mm:ss',
  hm: 'HH:mm',
  hms: 'HH:mm:ss',
}
```

### outletFormat 格式

| 字符 | 描述             |
| ---- | ---------------- |
| YYYY | 四位年份         |
| YY   | 两位年份         |
| MM   | 两位月份         |
| M    | 一位月份         |
| DD   | 两位日期         |
| D    | 一位日期         |
| HH   | 两位二十四制小时 |
| H    | 一位二十四制小时 |
| hh   | 两位十二制小时   |
| h    | 一位十二制小时   |
| mm   | 两位分钟         |
| m    | 一位分钟         |
| ss   | 两位秒数         |
| s    | 一位秒数         |
| SSS  | 毫秒数           |

### DatetimePickerInputEmits

| 事件               | 描述                         | 类型                               |
| ------------------ | ---------------------------- | ---------------------------------- |
| update:model-value | 日期时间输入组件值改变时触发 | (value: Date \| undefined) => void |
| update:visible     | 弹出框显隐时触发             | (visible: boolean) => void         |
