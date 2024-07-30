# Keyboard 数字键盘

## 介绍

虚拟键盘，用于输入支付密码、验证码、车牌号等场景。

## 引入

```ts
import Keyboard from 'sard-uniapp/components/keyboard/keyboard.vue'
```

## 代码演示

### 数字键盘

展示 0-9 的数字按键和删除按键。

@code('${DEMO_PATH}/keyboard/demo/Number.vue')

### 带小数点的数字键盘

允许输入小数。

@code('${DEMO_PATH}/keyboard/demo/Digit.vue')

### 身份证键盘

由 0-9 和 X 组成。

@code('${DEMO_PATH}/keyboard/demo/Idcard.vue')

### 随机数字键盘

展示乱序的数字按键。

@code('${DEMO_PATH}/keyboard/demo/Random.vue')

### 车牌号键盘

用于输入车牌号。

@code('${DEMO_PATH}/keyboard/demo/Plate.vue')

## API

### KeyboardProps

| 属性       | 描述           | 类型                                                   | 默认值   |
| ---------- | -------------- | ------------------------------------------------------ | -------- |
| root-class | 组件根元素类名 | string                                                 | -        |
| root-style | 组件根元素样式 | StyleValue                                             | -        |
| type       | 键盘类型       | 'number' \| 'digit' \| 'idcard' \| 'random' \| 'plate' | 'number' |

### KeyboardEmits

| 事件      | 描述                 | 类型                  |
| --------- | -------------------- | --------------------- |
| input     | 可输入按键点击时触发 | (key: string) => void |
| delete    | 点击删除按钮时触发   | () => void            |

### KeyBoardExpose

| 属性    | 描述                   | 类型       |
| ------- | ---------------------- | ---------- |
| shuffle | 重新打乱随机键盘按键   | () => void |
| toggle  | 切换车牌号的中英文按键 | () => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')

### CSS 变量 - 暗黑模式

@code('./variables-dark.scss#variables')
