---
nav: 工具
title: 几何
group:
  title: 工具
---

## 介绍

几何相关的一些工具。

## 使用

```ts
import { getTwoPointsDistance } from 'sard-uniapp'

getTwoPointsDistance({ x: 50, y: 50 }, { x: 120, y: 160 })
```

## 接口

### getScrollIntoViewValue

```ts
/**
 *                      page
 *                     ╱
 *    ╭───────────────╮    viewport
 *  ╭─│─ ─ ─ ─ ─ ─ ─ ─│─╮ ╱
 *  │ │ ╭───────────╮ │ │
 *  │ │ │  element  │ │ │
 *  │ │ ╰───────────╯ │ │
 *  ╰─│─ ─ ─ ─ ─ ─ ─ ─│─╯
 *    │               │
 *    │               │
 *    ╰───────────────╯
 */
function getScrollIntoViewValue(
  viewportHeight: number,
  viewportScrollTop: number,
  elementHeight: number,
  elementOffsetTop: number,
  options?: ScrollIntoViewValueOptions,
): number
```

根据最后位置计算 page 滚动到顶部的值。

也可计算水平方向的滚动值。

参数

- `viewportHeight`: viewport 高度
- `viewportScrollTop`: viewport 垂直滚动值
- `elementHeight`: element 高度
- `elementOffsetTop`: element 距离页面顶部距离
- `options.position`: element 在 viewport 中的位置，可选：'start' | 'center' | 'end' | 'nearest'
- `options.startOffset`: element 距离视窗顶部的偏移量
- `options.endOffset`: element 距离视窗底部的偏移量

返回值：viewport 新的垂直滚动值。

#### ScrollIntoViewValueOptions

```ts
interface ScrollIntoViewValueOptions {
  position?: ScrollIntoViewPosition
  startOffset?: number
  endOffset?: number
}
```

#### ScrollIntoViewPosition

```ts
type ScrollIntoViewPosition = 'start' | 'center' | 'end' | 'nearest'
```

### matchScrollVisible

```ts
function matchScrollVisible(
  rects: NodeRect[],
  callback: (index: number) => unknown,
  options?: MatchScrollVisibleOptions,
): Promise<unknown>
```

匹配元素列表中第一个位于滚动盒子可视区域的元素。

参数

- `rects`: NodeRect 类型数组
- `callback`: 匹配成功时调用，会接收匹配的元素的下标
- `options.offset`: 偏移量
- `options.errorValue`: 容错值

#### NodeRect

```ts
interface NodeRect {
  top: number
  right: number
  bottom: number
  left: number
  height: number
  width: number
}
```

#### MatchScrollVisibleOptions

```ts
interface MatchScrollVisibleOptions {
  offset?: number
  errorValue?: number
}
```

### getAspectFillSize

```ts
function getAspectFillSize(
  origWidth: number,
  origHeight: number,
  containerWidth: number,
  containerHeight: number,
): [number, number]
```

保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。

参数

- `origWidth`: 原图片宽度
- `origHeight`: 原图片高度
- `containerWidth`: 容器宽度
- `containerHeight`: 容器宽度

返回值：缩放后的图片的宽高。

### getAspectFitSize

```ts
function getAspectFitSize(
  origWidth: number,
  origHeight: number,
  containerWidth: number,
  containerHeight: number,
): [number, number]
```

保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。

参数

- `origWidth`: 原图片宽度
- `origHeight`: 原图片高度
- `containerWidth`: 容器宽度
- `containerHeight`: 容器宽度

返回值：缩放后的图片的宽高。

### getTwoPointsDistance

```ts
function getTwoPointsDistance(p1: Point, p2: Point): number
```

获取两点间的距离。

#### Point

```ts
interface Point {
  x: number
  y: number
}
```
