# Button 按钮

## 介绍

按钮用于开始一个即时操作。

## 引入

```ts
import Button from 'sard-uniapp/components/button/button.vue'
```

## 代码演示

### 按钮类型

`type`属性用于配置按钮的类型。

@code('${DEMO_PATH}/button/demo/Type.vue')

### 按钮主题色

`Button`组件内置了几个主题色，可以使用`theme`属性来配置。

@code('${DEMO_PATH}/button/demo/Theme.vue')

### 自定义颜色

如果内置主题色不合适，可以自定义主题色。使用`color`和`background`属性定义字体颜色和背景色。

@code('${DEMO_PATH}/button/demo/Color.vue')

### 圆形按钮

使用`round`属性设置为圆形按钮。

@code('${DEMO_PATH}/button/demo/Round.vue')

### 禁用按钮

禁用状态的按钮不可点击。

@code('${DEMO_PATH}/button/demo/Disabled.vue')

### 按钮尺寸

内置三种尺寸以供选择。

@code('${DEMO_PATH}/button/demo/Size.vue')

### 加载中

加载中的按钮不可点击。

@code('${DEMO_PATH}/button/demo/Loading.vue')

## API

### ButtonProps

| 属性         | 描述           | 类型                                                                     | 默认值     |
| ------------ | -------------- | ------------------------------------------------------------------------ | ---------- |
| root-class   | 组件根元素类名 | string                                                                   | -          |
| root-style   | 组件根元素样式 | StyleValue                                                               | -          |
| type         | 按钮类型       | 'default' \| 'pale' \| 'mild' \| 'outline' \| 'text' \| 'pale-text'      | 'default'  |
| theme        | 按钮主题色     | 'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'danger' | 'primary'  |
| size         | 按钮尺寸       | 'mini' \| 'small' \| 'medium' \| 'large'                                 | 'medium'   |
| round        | 圆角按钮       | boolean                                                                  | false      |
| disabled     | 禁用按钮       | boolean                                                                  | false      |
| loading      | 加载状态       | boolean                                                                  | false      |
| loading-type | 加载类型       | 'clock' \| 'circular'                                                    | 'circular' |
| color        | 自定义文字颜色 | string                                                                   | -          |
| background   | 自定义背景颜色 | string                                                                   | -          |

### ButtonSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### ButtonEmits

| 事件  | 描述                                   | 类型                 |
| ----- | -------------------------------------- | -------------------- |
| click | 点击按钮时触发，加载和禁用状态不会触发 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
