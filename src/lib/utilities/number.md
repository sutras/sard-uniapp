---
nav: 工具
title: 数字
group:
  title: 工具
---

## 介绍

提供数字相关工具函数。

## 使用

```ts
import { random } from 'sard-uniapp'

random(0, 10)
```

## 接口

### clamp <sup>1.20+</sup>

```ts
function clamp(n: number, min: number, max: number): number
```

限定数值范围。

### random

```ts
function random(min: number, max: number): number
```

生成两数间的一个随机整数

### inRange <sup>1.20+</sup>

```ts
function inRange(n: number, min: number, max: number): boolean
```

判断一个数是否在指定范围内。

### round

```ts
function round(n: number, precision?: number): number
```

把一个数四舍五入到指定位数小数。

### getDecimalsLength

```ts
function getDecimalsLength(n: number | string): number
```

获取小数位数。

### mround

```ts
function mround(n: number, m: number): number
```

把一个数舍入到指定数的倍数。
