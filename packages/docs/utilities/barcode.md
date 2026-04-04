---
title: 条形码
order: 2
group:
  title: 工具
version: 1.29+
---

## 介绍

生成条形码编码数据和布局信息。

## 使用

```ts
import { barcode, calculateBarcodeLayout } from 'sard-uniapp'

const encodings = barcode('123456789012', {
  format: 'EAN13',
})

const layout = calculateBarcodeLayout(encodings, () => 0)
```

## 接口

### barcode

```ts
function barcode(value: string, options?: BarcodeOptions): BarcodeEncoding[]
```

根据条形码类型返回编码后的条纹数据。不同格式可能会拆成多个编码段，例如 `EAN13` 和 `UPC-A`。

### calculateBarcodeLayout

```ts
function calculateBarcodeLayout(
  encodings: BarcodeEncoding[],
  measureText: (text: string, options: BarcodeRenderOptions) => number,
): BarcodeLayout
```

根据编码结果和文本测量函数，计算条形码渲染所需的宽高及各段布局。

### BarcodeOptions

<<< @lib/utils/barcode.ts#BarcodeOptions

### BarcodeEncoding

<<< @lib/utils/barcode.ts#BarcodeEncoding

### BarcodeRenderOptions

<<< @lib/utils/barcode.ts#BarcodeRenderOptions

### BarcodeLayout

<<< @lib/utils/barcode.ts#BarcodeLayout

### BarcodeLayoutSegment

<<< @lib/utils/barcode.ts#BarcodeLayoutSegment

### BarcodeFormat

```ts
type BarcodeFormat = 'CODE128' | 'EAN13' | 'UPC-A' | 'ITF14'
```

### BarcodeTextPosition

```ts
type BarcodeTextPosition = 'top' | 'bottom'
```

### CanvasTextAlign

```ts
type CanvasTextAlign = 'center' | 'end' | 'left' | 'right' | 'start'
```

### CanvasTextAlign

```ts
type CanvasFontStyle = 'normal' | 'italic' | 'oblique' | (string & {})
```

### CanvasFontWeight

```ts
type CanvasFontWeight =
  | 'normal'
  | 'bold'
  | number
  | 'lighter'
  | 'bolder'
  | (string & {})
```
