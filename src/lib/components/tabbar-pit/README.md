---
nav: 组件
title: TabbarPit
subtitle: 标签栏占位
group: 导航组件
version: 1.16+
---

## 介绍

配合Tabbar组件使用，用于占位。

## 引入

```ts
import TabbarPit from 'sard-uniapp/components/tabbar-pit/tabbar-pit.vue'
```

## 代码演示

### 基础使用

在页面放置，即可占据一个和 `Tabbar` 组件高度一致的坑。

@code('${DEMO_PATH}/tabbar-pit/demo/Basic.vue')

### 底部安全距离

如果要撑开一个 `Tabbar` 高度 + `env(safe-area-inset-bottom)`，可以设置 `safe-area-inset-bottom` 属性。

@code('${DEMO_PATH}/tabbar-pit/demo/SafeAreaInsetBottom.vue')

## API

### TabbarPitProps

| 属性                   | 描述                   | 类型       | 默认值 |
| ---------------------- | ---------------------- | ---------- | ------ |
| root-class             | 组件根元素类名         | string     | -      |
| root-style             | 组件根元素样式         | StyleValue | -      |
| safe-area-inset-bottom | 是否开启底部安全区适配 | boolean    | false  |
