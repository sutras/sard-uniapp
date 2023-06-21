# Button 按钮

### 介绍

按钮用于开始一个即时操作。

### 引入

```js
import { Button } from 'sard'
```

## 代码演示

## API

### ButtonProps

| 属性         | 描述                   | 类型                                                                     | 默认值    |
| ------------ | ---------------------- | ------------------------------------------------------------------------ | --------- |
| type         | 按钮类型               | 'default' \| 'pale' \| 'mild' \| 'outline' \| 'text' \| 'pale-text'      | 'default' |
| theme        | 按钮主题色             | 'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'danger' | 'primary' |
| size         | 按钮尺寸               | 'medium' \| 'small' \| 'large'                                           | 'medium'  |
| round        | 圆角按钮               | boolean                                                                  | false     |
| block        | 块级按钮               | boolean                                                                  | false     |
| disabled     | 禁用按钮               | boolean                                                                  | false     |
| loading      | 加载中状态             | boolean                                                                  | false     |
| loadingText  | 加载文本               | React.ReactNode                                                          | -         |
| loadingProps | `Loading` 组件 `props` | LoadingProps                                                             | -         |
| onClick      | 点击按钮时触发         | (event: React.MouseEvent) => void                                        | -         |
| htmlType     | 按钮原生类型           | 'submit' \| 'reset' \| 'button'                                          | 'button'  |

## 主题定制

### CSS 变量

%{variables}
