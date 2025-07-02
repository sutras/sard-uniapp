---
nav: 工具
title: 二维码
group:
  title: 工具
---

## 介绍

生成二维码数据。

## 使用

```ts
import { qrcode } from 'sard-uniapp'

qrcode('https://github.com/sutras/sard-uniapp')
```

## 接口

### qrcode

```ts
function qrcode(text: string, options?: QrcodeOptions): number[][]
```

接收字符串参数，将其转换为二维数组，0表示白色格子，1表示黑色格子。

### QrcodeOptions

```ts
interface QrcodeOptions {
  ecl?: ECL
}
```

### ECL

```ts
type ECL = 'L' | 'M' | 'Q' | 'H'
```

错误纠错级别，默认值 'M'。
