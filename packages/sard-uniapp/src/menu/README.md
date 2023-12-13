# Menu 菜单

## 介绍

气泡弹出框的中的菜单。

## 引入

```ts
import Menu from '@sard/uniapp/dist/menu/menu.vue'
```

## API

### MenuProps

| 属性      | 描述         | 类型                       | 默认值     |
| --------- | ------------ | -------------------------- | ---------- |
| options   | 菜单选项     | MenuOption[]               | []         |
| direction | 菜单排列方向 | 'vertical' \| 'horizontal' | 'vertical' |
| theme     | 菜单主题色   | 'dark' \| 'light'          | 'light'    |

### MenuOption

| 属性       | 描述       | 类型    |
| ---------- | ---------- | ------- |
| text       | 菜单项文案 | string  |
| disabled   | 禁用菜单项 | boolean |
| icon       | 图标名称   | string  |
| iconFamily | 图标字体   | string  |

### MenuEmits

| 事件   | 描述             | 类型                         |
| ------ | ---------------- | ---------------------------- |
| select | 选择菜单项时触发 | (option: MenuOption) => void |

### MenuItemProps

| 属性        | 描述       | 类型    | 默认值 |
| ----------- | ---------- | ------- | ------ |
| text        | 菜单项文案 | string  | -      |
| disabled    | 禁用菜单项 | boolean | false  |
| icon        | 图标名称   | string  | -      |
| icon-family | 图标字体   | string  | -      |

### MenuItemEmits

| 事件  | 描述             | 类型                 |
| ----- | ---------------- | -------------------- |
| click | 点击菜单项时触发 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
