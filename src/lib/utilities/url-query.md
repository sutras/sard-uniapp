---
nav: 工具
title: URL查询参数
group:
  title: 工具
version: 1.20+
---

## 介绍

提供了和 `URLSearchParams` 一样接口的 `URLQuery` 类用于操作 `URL` 的查询参数。

## 使用

```ts
import { URLQuery } from 'sard-uniapp'

const query = new URLQuery('foo=123&bar=456')
```

## 接口

### 构造函数

```ts
constructor URLQuery(init?: string[][] | Record<string, string> | string | URLQuery): URLQuery
```

返回一个 `URLQuery` 对象。

### 实例属性

#### size

```ts
(getter) URLQuery.size: number
```

返回 `URLQuery` 对象中查询参数的总个数。

### 实例方法

#### \[Symbol.iterator]()

返回一个 `iterator`，允许以键/值对在查询字符串中出现的顺序迭代包含在该对象的键/值对。

#### append()

```ts
(method) URLQuery.append(name: string, value: string): void
```

插入一个指定的键/值对作为新的查询参数。

#### delete()

```ts
(method) URLQuery.delete(name: string, value?: string): void
```

从查询参数列表里删除指定的查询参数及其对应的值。

#### entries()

```ts
(method) URLQuery.entries(): ArrayIterator<string[]>
```

返回一个 `iterator` 可以遍历所有键/值对的对象。

#### forEach()

```ts
(method) URLQuery.forEach(callbackfn: (value: string, key: string, parent: URLQuery) => void, thisArg?: any): void
```

通过回调函数迭代此对象中包含的所有值。

#### get()

```ts
(method) URLQuery.get(name: string): string | null
```

获取指定查询参数的第一个值。

#### getAll()

```ts
(method) URLQuery.getAll(name: string): string[]
```

获取指定查询参数的所有值，返回是一个数组。

#### has()

```ts
(method) URLQuery.has(name: string, value?: string): boolean
```

返回 `Boolean` 判断是否存在此查询参数。

#### keys()

```ts
(method) URLQuery.keys(): Generator<string, void, unknown>
```

返回 `iterator` 此对象包含了键/值对的所有键名。

#### set()

```ts
(method) URLQuery.set(name: string, value: string): void
```

设置一个查询参数的新值，假如原来有多个值将删除其他所有的值。

#### sort()

```ts
(method) URLQuery.sort(): void
```

按键名排序。

#### toString()

```ts
(method) URLQuery.toString(): string
```

返回查询参数组成的字符串，可直接使用在 `URL` 上。

#### values()

```ts
(method) URLQuery.values(): Generator<string, void, unknown>
```

返回 `iterator` 此对象包含了键/值对的所有值。
