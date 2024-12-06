---
nav: 组件
title: Input
subtitle: 输入框
group: 表单组件
---

## 介绍

接收用户输入的文本信息。

## 引入

```ts
import Input from 'sard-uniapp/components/input/input.vue'
```

## 代码演示

### 基础使用

可以通过 `v-model` 绑定输入框的值，通过 `placeholder` 设置占位提示文字。

@code('${DEMO_PATH}/input/demo/Basic.vue')

### 自定义样式

可以对其尺寸、颜色、背景色、边框等样式进行设置。

@code('${DEMO_PATH}/input/demo/Style.vue')

### 类型

据 `type` 属性定义不同类型的输入框，默认值为 `text。`

@code('${DEMO_PATH}/input/demo/Type.vue')

### 可清除的

设置了 `clearable` 属性后，在输入框有值时会显示清除按钮。

@code('${DEMO_PATH}/input/demo/Clearable.vue')

### 聚焦时显示清除按钮

只在输入框获取焦点时显示清除按钮。

@code('${DEMO_PATH}/input/demo/ShowClearOnlyFocus.vue')

### 只读和禁用

只读或禁用时无法输入。

@code('${DEMO_PATH}/input/demo/DisabledReadOnly.vue')

### 插槽

可以通过前置或后置插槽添加额外的内容。

@code('${DEMO_PATH}/input/demo/Slot.vue')

### 去除边框

清除边框后页面看起来会很清爽。

@code('${DEMO_PATH}/input/demo/Borderless.vue')

### 嵌入的

`inlaid` 用于清除边框和内边距，以便可以嵌入到其他组件内。

@code('${DEMO_PATH}/input/demo/Inlaid.vue')

### 多行文本

设置 `type="textarea"` 可以换行输入。

@code('${DEMO_PATH}/input/demo/Multiple.vue')

### 自动高度

设置自动高度可以让文本域随输入内容变多而增高。
另外可以设置 `minHeight` 设置文本域的最小高度。

@code('${DEMO_PATH}/input/demo/AutoHeight.vue')

### 字数提示

设置 `showCount` 属性可以显示当前输入的字数和总字数；
设置 `maxlength` 可以限制输入的最大字数。

@code('${DEMO_PATH}/input/demo/ShowCount.vue')

## API

### InputProps

| 属性                      | 描述                                                                                 | 类型                                                                                                           | 默认值 |
| ------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | ------ |
| root-class                | 组件根元素类名                                                                       | string                                                                                                         | -      |
| root-style                | 组件根元素样式                                                                       | StyleValue                                                                                                     | -      |
| model-value (v-model)     | 输入框值                                                                             | string \| number                                                                                               | -      |
| clearable                 | 是否显示清空按钮                                                                     | boolean                                                                                                        | false  |
| show-clear-only-focus     | 是否只在聚焦时显示清空按钮                                                           | boolean                                                                                                        | false  |
| show-count                | 是否展示字数                                                                         | boolean                                                                                                        | false  |
| inlaid                    | 嵌入式状态                                                                           | boolean                                                                                                        | false  |
| borderless                | 是否隐藏边框                                                                         | boolean                                                                                                        | false  |
| readonly                  | 只读状态                                                                             | boolean                                                                                                        | false  |
| focused                   | 是否显示获焦样式，用于结合自定义键盘使用时显示高亮效果                               | boolean                                                                                                        | false  |
| min-height                | 输入框最小高度                                                                       | string                                                                                                         | -      |
| placeholder               | 输入框占位符内容                                                                     | string                                                                                                         | -      |
| placeholder-style         | 输入框占位符样式                                                                     | string                                                                                                         | -      |
| placeholder-class         | 输入框占位符类名                                                                     | string                                                                                                         | -      |
| disabled                  | 禁用状态                                                                             | boolean                                                                                                        | false  |
| maxlength                 | 最大输入长度，设置为 -1 的时候不限制最大长度                                         | number                                                                                                         | 140    |
| focus                     | 获取焦点                                                                             | boolean                                                                                                        | -      |
| cursor-spacing            | 指定光标与键盘的距离                                                                 | number                                                                                                         | 30     |
| cursor                    | 指定 focus 时的光标位置                                                              | number                                                                                                         | -1     |
| confirm-type              | 设置键盘右下角按钮的文字                                                             | "send" \| "search" \| "next" \| "go" \| "done"                                                                 | 'done' |
| confirm-hold              | 点击键盘右下角按钮时是否保持键盘不收起                                               | boolean                                                                                                        | false  |
| selection-start           | 光标起始位置                                                                         | number                                                                                                         | -1     |
| selection-end             | 光标结束位置                                                                         | number                                                                                                         | -1     |
| adjust-position           | 键盘弹起时，是否自动上推页面                                                         | boolean                                                                                                        | true   |
| hold-keyboard             | focus 时，点击页面的时候不收起键盘                                                   | boolean                                                                                                        | false  |
| auto-blur                 | 键盘收起时，是否自动失去焦点                                                         | boolean                                                                                                        | false  |
| ignore-composition-event  | 是否忽略组件内对文本合成系统事件的处理                                               | boolean                                                                                                        | true   |
| inputmode                 | 用户在编辑元素或其内容时可能输入的数据类型的提示                                     | 'none' \| 'text' \| 'decimal' \| 'numeric' \| 'tel' \| 'search' \| 'email' \| 'url'                            | 'text' |
| auto-height               | 文本域自动高度                                                                       | boolean                                                                                                        | false  |
| fixed                     | 如果 `textarea` 是在一个 `position:fixed` 的区域，需要显示指定属性 `fixed` 为 `true` | boolean                                                                                                        | false  |
| show-confirm-bar          | 是否显示键盘上方带有”完成“按钮那一栏                                                 | boolean                                                                                                        | true   |
| disable-default-padding   | 是否去掉 iOS 下的默认内边距                                                          | boolean                                                                                                        | false  |
| type                      | 输入框类型                                                                           | 'text' \| 'password' \| 'textarea' \| 'number' \|'idcard' \| 'digit' \| 'tel' \| 'safe-password' \| 'nickname' | 'text' |
| always-embed              | 强制 input 处于同层状态                                                              | boolean                                                                                                        | -      |
| safe-password-cert-path   | 安全键盘加密公钥的路径，只支持包内路径                                               | string                                                                                                         | -      |
| safe-password-length      | 安全键盘输入密码长度                                                                 | number                                                                                                         | -      |
| safe-password-time-stamp  | 安全键盘加密时间戳                                                                   | number                                                                                                         | -      |
| safe-password-nonce       | 安全键盘加密盐值                                                                     | string                                                                                                         | -      |
| safe-password-salt        | 安全键盘计算 `hash` 盐值，若指定 `custom-hash` 则无效                                | string                                                                                                         | -      |
| safe-password-custom-hash | 安全键盘计算 `hash` 的算法表达式                                                     | string                                                                                                         | -      |
| random-number             | 当 `type` 为 `number, digit, idcard` 数字键盘是否随机排列                            | boolean                                                                                                        | false  |
| controlled                | 是否为受控组件。为 `true` 时，value 内容会完全受 `setData` 控制                      | boolean                                                                                                        | false  |
| always-system             | 是否强制使用系统键盘和 `Web-view `创建的 `input` 元素                                | boolean                                                                                                        | false  |
| validate-event            | 是否触发表单验证                                                                     | boolean                                                                                                        | true   |

### InputSlots

| 插槽    | 描述                 | 属性 |
| ------- | -------------------- | ---- |
| prepend | 自定义输入框前面内容 | -    |
| append  | 自定义输入框后面内容 | -    |

### InputEmits

| 事件                 | 描述                       | 类型                    |
| -------------------- | -------------------------- | ----------------------- |
| update:model-value   | 输入框值改变时触发         | (value: string) => void |
| clear                | 点击清除按钮时触发         | () => void              |
| focus                | 聚焦时触发                 | (event: any) => void    |
| blur                 | 失焦时触发                 | (event: any) => void    |
| linechange           | 输入框行数变化时触发       | (event: any) => void    |
| confirm              | 点击完成时触发             | (event: any) => void    |
| keyboardheightchange | 键盘高度发生变化的时候触发 | (event: any) => void    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
