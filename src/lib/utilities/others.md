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

### debounce

```ts
function debounce(
  func: (...args: any[]) => any,
  wait: any,
  options?: DebounceOptions,
): {
  (this: any, ...args: any[]): any
  cancel: () => void
  flush: () => any
  pending: () => boolean
}

interface DebounceOptions {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}
```

创建一个防抖函数，该函数会在最后一次调用后延迟 `wait` 毫秒才执行 `func`。防抖函数提供 `cancel` 方法用于取消延迟的 `func` 调用，以及 `flush` 方法用于立即执行。可通过选项配置是否在延迟周期的开始和/或结束时调用 `func`。调用时会使用最后一次传递给防抖函数的参数，后续调用将返回上一次 `func` 的执行结果。

注意

- 当 `leading` 和 `trailing` 选项均为 `true` 时，只有在延迟期间被多次调用的情况下，才会在延迟结束时触发 `func`。
- 若 `wait` 为 0 且 `leading` 为 `false`，`func` 会延迟到下一个事件循环执行（类似于 `setTimeout` 设为 0 的效果）

参数

- `func`: 需要防抖处理的函数。
- `wait`: 延迟毫秒数，默认 0。
- `options.leading`: 是否在延迟开始时立即调用，默认为 `false`。
- `options.maxWait`: 允许延迟的最大时间（毫秒）。
- `options.trailing`: 是否在延迟结束时调用，默认为 `true`。

返回值：返回新的防抖函数。

### throttle

```ts
function throttle(
  func: (...args: any[]) => any,
  wait: any,
  options?: DebounceOptions,
): {
  (this: any, ...args: any[]): any
  cancel: () => void
  flush: () => any
  pending: () => boolean
}

interface DebounceOptions {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}
```

创建一个节流函数，该函数在每 `wait` 毫秒内最多只调用一次 `func。节流函数提供了` `cancel` 方法以取消延迟的 `func` 调用，以及 `flush` 方法立即执行它们。可通过选项指定是否在 `wait` 超时的开始前和/或结束后调用 `func`。调用 `func` 时会传入最后一次传递给节流函数的参数。后续对节流函数的调用将返回上一次 `func` 调用的结果。

注意

- 如果 `leading` 和 `trailing` 选项均为 `true`，则仅在节流函数在 `wait` 超时期间被多次调用时，才会在超时结束时调用 `func。`
- 如果 `wait` 为 0 且 `leading` 为 `false`，`func` 的调用会被推迟到下一个事件循环（类似于 `setTimeout` 延迟时间为 0 的情况）。

参数

- `func`: 需要进行节流的函数。
- `wait`: 节流的时间间隔（毫秒），默认为 0。
- `options.leading`: 是否在超时开始时立即调用函数，默认为 `true`。
- `options.trailing`: 是否在超时结束后调用函数，默认为 `true`。

返回值：返回新的节流函数。

### sleep

```ts
function sleep(time: number): Promise<void>
```

在异步流程中，暂停指定的时间。单位 ms。
