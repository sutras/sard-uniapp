# Tabbar 标签栏

## 介绍

固定在页面底部的导航栏，用于切换不同的页面。

## 引入

```ts
import Tabbar from 'sard-uniapp/components/tabbar/tabbar.vue'
import TabbarItem from 'sard-uniapp/components/tabbar-item/tabbar-item.vue'
```

## 代码演示

### 基础使用

使用 `current` 属性控制选中的标签。

@code('${DEMO_PATH}/tabbar/demo/Basic.vue')

### 自定义图标

通过 `icon` 属性自定义图标。

@code('${DEMO_PATH}/tabbar/demo/Icon.vue')

### 自定义颜色

使用 `color` 属性设置未选中标签的颜色。
使用 `activeColor` 属性设置选中标签的颜色。

@code('${DEMO_PATH}/tabbar/demo/Color.vue')

### 徽标

使用 `badge` 属性设置徽标。

@code('${DEMO_PATH}/tabbar/demo/Badge.vue')

## API

### TabbarProps

| 属性              | 描述                       | 类型             | 默认值 |
| ----------------- | -------------------------- | ---------------- | ------ |
| root-class        | 组件根元素类名             | string           | -      |
| root-style        | 组件根元素样式             | StyleValue       | -      |
| current (v-model) | 当前选中标签的 `name` 属性 | number \| string | -      |
| color             | 未选中标签的颜色           | string           | -      |
| active-color      | 选中标签的颜色             | string           | -      |
| bordered          | 是否显示外边框             | boolean          | true   |

### TabbarSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### TabbarEmits

| 事件           | 描述           | 类型                                |
| -------------- | -------------- | ----------------------------------- |
| update:current | 切换标签时触发 | (current: number \| string) => void |

### TabbarItemProps

| 属性        | 描述             | 类型             | 默认值 |
| ----------- | ---------------- | ---------------- | ------ |
| root-class  | 组件根元素类名   | string           | -      |
| root-style  | 组件根元素样式   | StyleValue       | -      |
| name        | 标签唯一标识符   | string \| number | -      |
| text        | 要显示的标签文本 | string           | -      |
| icon        | 图标名称         | string           | -      |
| icon-family | 图标字体         | string           | -      |
| icon-size   | 图标大小         | string           | -      |
| badge       | 显示的徽标值     | number \| string | -      |
| dot         | 是否显示小红点   | boolean          | -      |

### TabbarItemSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义文本内容 | -    |
| icon    | 自定义图标     | -    |

### TabbarItemEmits

| 事件  | 描述           | 类型                 |
| ----- | -------------- | -------------------- |
| click | 点击标签时触发 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
