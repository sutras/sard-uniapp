# Cell 单元格

### 介绍

表示列表中单个展示项，结合单元格组常用于个人中心、设置等页面列表。

### 引入

```js
import { Cell } from 'sard'
```

## 代码演示

## API

### CellProps

| 属性           | 描述                           | 类型                              | 默认值  |
| -------------- | ------------------------------ | --------------------------------- | ------- |
| title          | 左侧标题                       | React.ReactNode                   | -       |
| label          | 标题下方的描述信息             | React.ReactNode                   | -       |
| value          | 右侧值                         | React.ReactNode                   | -       |
| isLink         | 是否展示右侧箭头并开启点击反馈 | boolean                           | false   |
| arrowDirection | 箭头方向                       | 'up' \| 'right' \| 'down'         | 'right' |
| arrow          | 自定义箭头                     | React.ReactNode                   | -       |
| icon           | 左侧图标                       | React.ReactNode                   | -       |
| inset          | 内嵌图标                       | boolean                           | false   |
| onClick        | 点击单元格时触发               | (event: React.MouseEvent) => void | -       |

### CellSlots

| 名称    | 描述             | props |
| ------- | ---------------- | ----- |
| default | 自定义单元格内容 | {}    |
| icon    | 自定义图标内容   | {}    |
| title   | 自定义标题内容   | {}    |
| label   | 自定义标签内容   | {}    |
| value   | 自定义值内容     | {}    |
| arrow   | 自定义箭头内容   | {}    |

### CellGroupProps

| 属性   | 描述                 | 类型            | 默认值 |
| ------ | -------------------- | --------------- | ------ |
| title  | 单元格组标题         | React.ReactNode | -      |
| label  | 单元格组底部描述信息 | React.ReactNode | -      |
| inlaid | 嵌入式状态           | boolean         | false  |

### CellGroupSlots

| 名称    | 描述                   | props |
| ------- | ---------------------- | ----- |
| default | 自定义单元格组内容     | {}    |
| title   | 自定义单元格组标题内容 | {}    |
| label   | 自定义单元格组标签内容 | {}    |

## 主题定制

### CSS 变量

%{variables}
