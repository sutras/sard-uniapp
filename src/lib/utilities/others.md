---
nav: 工具
title: 其他
order: 2
group:
  title: 工具
---

## 使用

```ts
import { shuffle } from 'sard-uniapp'

shuffle([1, 2, 3])
```

## 接口

### arrayEqual

```ts
function arrayEqual(arr1: any[], arr2: any[]): boolean
```

判断两数组是否相等，浅比较，元素个数和位置都要相等才为真。

### shuffle

```ts
function shuffle<T>(array: T[]): T[]
```

打乱并返回数组，会修改原数组。

### arrayMove

```ts
function arrayMove<T>(array: T[], fromIndex: number, toIndex: number): T[]
```

移动数组中的元素，会返回移动后的新数组。

### omit

```ts
function omit<T extends object, U extends keyof T>(
  object: T,
  paths: U[],
): Omit<T, U>
```

此方法创建一个对象，该对象由自己不可省略的属性组成。

### deepClone

```ts
function deepClone(target: any): any
```

深度克隆对象，仅克隆数组和无格式对象，其他类型会被直接返回。

### extend

```ts
function extend(...args: any[]): any
```

深拷贝其他对象到第一个对象并返回，会修改第一个对象。

### chainGet

```ts
function chainGet(object: any, chain?: string | string[]): any
```

链式获取对象值。

参数

- `object`: 被获取的对象
- `chain`: 通过点分割的字符串或者字符串数组

### chainSet

```ts
function chainSet(object: any, chain: string | string[], value: any): void
```

链式设置对象值。

参数

- `object`: 被设置的对象
- `chain`: 通过点分割的字符串或者字符串数组
- `value`: 设置的值
