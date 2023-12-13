# Switch 开关

## 介绍

用于打开/关闭两种状态间的切换。

## 引入

```ts
import Switch from '@sard/uniapp/dist/switch/switch.vue'
```

## 代码演示

### 基础使用

通过 `v-model` 绑定开关的选中状态，`true` 表示开，`false` 表示关。

@code('${DEMO_PATH}/switch/demo/Basic.vue')

### 自定义尺寸

使用 `size` 属性设置开关尺寸。

@code('${DEMO_PATH}/switch/demo/Size.vue')

### 自定义颜色

使用 `checkedColor` 属性设置打开时的颜色，使用 `uncheckedColor` 属性设置关闭时的颜色。

@code('${DEMO_PATH}/switch/demo/Color.vue')

### 不同状态的值

可以设置 `checkedValue` 和 `uncheckedValue` 属性代替默认的 `true` 和 `false`。

@code('${DEMO_PATH}/switch/demo/Value.vue')

### 只读和禁用

只读或禁用时不可操作。

@code('${DEMO_PATH}/switch/demo/DisabledReadOnly.vue')

### 加载状态

当提供 `beforeUpdate` 函数，会在 `fulfilled` 状态后才切换，期间显示加载状态。

@code('${DEMO_PATH}/switch/demo/Loading.vue')

## API

### SwitchProps

| 属性                  | 描述             | 类型                          | 默认值 |
| --------------------- | ---------------- | ----------------------------- | ------ |
| root-class            | 组件根元素类名   | string                        | -      |
| root-style            | 组件根元素样式   | StyleValue                    | -      |
| model-value (v-model) | 开关选中状态     | any                           | -      |
| disabled              | 禁用状态         | boolean                       | false  |
| readonly              | 只读状态         | boolean                       | false  |
| loading (v-model)     | 加载状态         | boolean                       | -      |
| size                  | 开关大小         | string                        | -      |
| checked-color         | 开启时的颜色     | string                        | -      |
| unchecked-color       | 关闭时的颜色     | string                        | -      |
| checked-value         | 开启时的值       | any                           | true   |
| unchecked-value       | 关闭时的值       | any                           | false  |
| before-update         | 用于异步切换     | (value: any) => Promise\<any> | -      |
| validate-event        | 是否触发表单验证 | boolean                       | true   |

### SwitchEmits

| 事件               | 描述                                   | 类型                       |
| ------------------ | -------------------------------------- | -------------------------- |
| click              | 点击按钮时触发，加载和禁用状态不会触发 | (event: any) => void       |
| update:model-value | 开关状态切换时触发                     | (value: any) => void       |
| update:loading     | 加载状态切换时触发                     | (loading: boolean) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
