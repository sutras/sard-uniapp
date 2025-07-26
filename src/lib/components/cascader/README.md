---
nav: 组件
title: Cascader
subtitle: 级联选择
group: 表单组件
---

## 介绍

用于在多层级数据中进行选择，常用于省市区、组织架构选择。

## 引入

```ts
import { Cascader } from 'sard'
```

## 代码演示

### 基础使用

通过 `v-model` 绑定当前值，通过 `options` 配置选项数据。

@code('${DEMO_PATH}/cascader/demo/Basic.vue')

### 选择即改变

设置 `change-on-select` 属性，允许只选中父级选项。

@code('${DEMO_PATH}/cascader/demo/ChangeOnSelect.vue')

### 异步加载

通过监听 `@select` 事件，获取当前选中的选项，将异步获取的数据作为 `children` 属性值， 再把组件的 `options` 更新一下，使组件重新渲染。如果选项的 `children` 是需要用户点击时再通过接口获取的， 此选项的 `children` 需初始化为空数组。

@code('${DEMO_PATH}/cascader/demo/Async.vue')

### 自定义面板上方内容

使用 `top` 插槽可以在面板顶部展示当前面板的一些信息。

@code('${DEMO_PATH}/cascader/demo/OptionTop.vue')

### 禁选选项

禁用的选项不可点击。

@code('${DEMO_PATH}/cascader/demo/Disabled.vue')

### 绑定所有级别的值 <sup>1.23+</sup>

如果要绑定所有级别的值，即绑定数组值，而不单单是最后一级，可以使用 `all-levels` 属性。

@code('${DEMO_PATH}/cascader/demo/AllLevels.vue')

## API

### CascaderProps

| 属性                              | 描述                                     | 类型                                     | 默认值           |
| --------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------- |
| root-class                        | 组件根元素类名                           | string                                   | -                |
| root-style                        | 组件根元素样式                           | StyleValue                               | -                |
| model-value (v-model)             | 选中项的值                               | string \| number \| (string \| number)[] | -                |
| options                           | 可选项数据源                             | CascaderOption[]                         | []               |
| field-keys                        | 自定义 `options` 中的字段                | CascaderFieldKeys                        | defaultFieldKeys |
| hint-text                         | 未选中时的提示文案                       | string                                   | '请选择'         |
| label-render                      | 自定义可选项渲染                         | (option: CascaderOption) => string       | -                |
| change-on-select <sup>1.14+</sup> | 点击每级选项都会触发变化                 | boolean                                  | false            |
| all-levels <sup>1.23+</sup>       | 是否绑定所有级别的值，而不单单是最后一级 | boolean                                  | false            |

### CascaderSlots

| 插槽 | 描述               | 属性                 |
| ---- | ------------------ | -------------------- |
| top  | 自定义面板上方内容 | { tabIndex: number } |

### CascaderEmits

| 事件                     | 描述                   | 类型                                                                                         |
| ------------------------ | ---------------------- | -------------------------------------------------------------------------------------------- |
| update:model-value       | 全部选项选择完成后触发 | (value: string \| number \| (string \| number)[], selectedOptions: CascaderOption[]) => void |
| change <sup>1.9.2+</sup> | 全部选项选择完成后触发 | (value: string \| number \| (string \| number)[], selectedOptions: CascaderOption[]) => void |
| select                   | 选中某一项时触发       | (option: CascaderOption, tabIndex: number) => void                                           |

### CascaderOption

```ts
interface CascaderOption {
  label?: string
  value?: string | number
  disabled?: boolean
  children?: CascaderOption[]
  [key: PropertyKey]: any
}
```

### CascaderFieldKeys

```ts
interface CascaderFieldKeys {
  label?: string
  value?: string
  disabled?: string
  children?: string
}
```

### defaultFieldKeys

```ts
const defaultFieldKeys: CascaderFieldKeys = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
  children: 'children',
}
```

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
