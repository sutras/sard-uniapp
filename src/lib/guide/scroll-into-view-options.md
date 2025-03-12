---
nav: 指引
title: ScrollIntoViewOptions
order: 0
group:
  title: 工具
---

## 选项

| 属性        | 描述                              | 类型                   | 默认值    |
| ----------- | --------------------------------- | ---------------------- | --------- |
| position    | 元素在视窗中的位置                | ScrollIntoViewPosition | 'nearest' |
| startOffset | 元素距离视窗顶部的偏移量，单位 px | number                 | 0         |
| endOffset   | 元素距离视窗底部的偏移量，单位 px | number                 | 0         |
| duration    | 页面滚动持续时间，单位 ms         | number                 | 150       |

```ts
export type ScrollIntoViewPosition = 'start' | 'center' | 'end' | 'nearest'
```
