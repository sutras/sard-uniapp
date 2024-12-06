---
nav: 组件
title: Badge
subtitle: 徽标
group: 数据展示
---

## 介绍

用于在各组件右上角显示消息数量以吸引用户处理。

## 引入

```ts
import Badge from 'sard-uniapp/components/badge/badge.vue'
```

## 代码演示

### 基础使用

徽标组件会使用一个容器包裹子元素，并将徽标定位到右上角位置。`value` 属性用于展示徽标的值。

@code('${DEMO_PATH}/badge/demo/Basic.vue')

### 最大值

默认超过 99 的值会显示 99+，可以通过 `max` 配置最大显示数值

@code('${DEMO_PATH}/badge/demo/Max.vue')

### 值为 0 时不隐藏

默认情况下值为 0 时会隐藏徽标，可通过 `showZero` 属性让其值为 0 时依然显示。

@code('${DEMO_PATH}/badge/demo/ShowZero.vue')

### 圆点显示

使用 `dot` 属性可让徽标显示为小圆点。

@code('${DEMO_PATH}/badge/demo/Dot.vue')

### 自定义颜色

可使用 `color` 属性配置徽标背景色，使用 `textColor` 配置徽标文本颜色。

@code('${DEMO_PATH}/badge/demo/Color.vue')

### 独立展示

当 `Badge` 不包裹任何东西时，不会进行定位。

@code('${DEMO_PATH}/badge/demo/OnlyBadge.vue')

### 自定义内容

可以使用 `value` 插槽定义任何内容。

@code('${DEMO_PATH}/badge/demo/Custom.vue')

### 不包裹组件

通常使用徽标包裹组件， 如果要在结构固定的组件里添加徽标，不好包裹组件，可以给组件加个相对定位，让组件包裹徽标，并添加 `fixed` 属性以便定位徽标到右上角。

@code('${DEMO_PATH}/badge/demo/UnWrap.vue')

## API

### BadgeProps

| 属性       | 描述                                                        | 类型             | 默认值 |
| ---------- | ----------------------------------------------------------- | ---------------- | ------ |
| root-class | 组件根元素类名                                              | string           | -      |
| root-style | 组件根元素样式                                              | StyleValue       | -      |
| value      | 展示的数字                                                  | number \| string | 0      |
| max        | 默认超过 99 的值会显示 99+，可以通过 max 设置最大显示数值   | number           | 99     |
| show-zero  | 值为 0 时，会隐藏，可通过 `show-zero` 让其值为 0 时依然显示 | boolean          | false  |
| color      | 自定义背景颜色                                              | string           | -      |
| text-color | 自定义文本颜色                                              | string           | -      |
| dot        | 显示圆点                                                    | boolean          | false  |
| fixed      | 是否定位到右上角                                            | boolean          | false  |

### BadgeSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 要被包裹的内容 | -    |
| value   | 自定义徽标内容 | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
