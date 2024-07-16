# Alert 警告提示<sup>1.3+</sup>

## 介绍

突出显示要重点提示用户的信息。警告提示会一直显示，除非用户手动关闭。

## 引入

```ts
import Alert from 'sard-uniapp/components/alert/alert.vue'
```

## 代码演示

### 基础使用

@code('${DEMO_PATH}/alert/demo/Basic.vue')

### 类型

使用 `type` 属性设置不同的类型。

@code('${DEMO_PATH}/alert/demo/Type.vue')

### 显示图标

设置 `show-icon` 属性显示图标。

@code('${DEMO_PATH}/alert/demo/ShowIcon.vue')

### 可关闭的

设置 `closable` 属性显示关闭按钮。

@code('${DEMO_PATH}/alert/demo/Closable.vue')

## API

### AlertProps

| 属性       | 描述             | 类型                                            | 默认值    |
| ---------- | ---------------- | ----------------------------------------------- | --------- |
| root-class | 组件根元素类名   | string                                          | -         |
| root-style | 组件根元素样式   | StyleValue                                      | -         |
| type       | 警告提示样式类型 | 'primary' \| 'success' \| 'warning' \| 'danger' | 'primary' |
| show-icon  | 是否显示图标     | StyleValue                                      | -         |
| closable   | 是否显示关闭按钮 | boolean                                         | false     |
| color      | 字体颜色         | string                                          | -         |
| background | 背景颜色         | string                                          | -         |

### AlertSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
| icon    | 自定义图标     | -    |

### AlertEmits

| 事件  | 描述             | 类型       |
| ----- | ---------------- | ---------- |
| close | 点击关闭按钮触发 | () => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
