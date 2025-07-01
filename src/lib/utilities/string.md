---
nav: 工具
title: 字符串
group:
  title: 工具
version: 1.20+
---

## 介绍

提供字符串相关的工具函数。

## 使用

```ts
import { camelCase } from 'sard-uniapp'

camelCase('sard-uniapp') // sardUniapp
```

## 接口

### lowerFirst

```ts
function lowerFirst(string: string): string
```

将字符串首字母转换为小写格式。

### upperFirst

```ts
function upperFirst(string: string): string
```

将字符串首字母转换为大写格式。

### pascalCase

```ts
function pascalCase(string: string): string
```

将字符串转换为 PascalCase 格式（大驼峰）。

### camelCase

```ts
function camelCase(string: string): string
```

将字符串转换为 camelCase 格式（小驼峰）。

### capitalize

```ts
function capitalize(string: string): string
```

将字符串转换为 Capitalize 格式（首字母大写，其余小写）。

### kebabCase

```ts
function kebabCase(string: string): string
```

将字符串转换为 kebab-case 格式（使用连字符拼接单词）。

### snakeCase

```ts
function snakeCase(string: string): string
```

将字符串转换为 snake_case 格式（使用下划线拼接单词）。

### addSeparator

```ts
function addSeparator(
  num: number | string,
  separator?: string,
  digit?: number,
): string
```

每n位数字添加一个分隔符。

参数

- `num`: 要添加分隔符的数字
- `separator`: 分隔符，默认为英文逗号
- `digit`: 相隔的位数，默认为 3 位

### uniqid

```ts
function uniqid(prefix?: string): string
```

生成唯一ID，用于设置元素的ID，以便获取此元素。

参数

- prefix: ID前缀，默认为 `__sar_`

### classNames

```ts
function classNames(...args: ClassProp[]): string

type ClassProp =
  | string
  | number
  | null
  | undefined
  | Record<string, any>
  | ClassProp[]
```

把各种类型的参数拼接成字符串类名，解决小程序不支持 classObject 的问题。

### stringifyStyle

```ts
function stringifyStyle(...args: StyleProp[]): string

type StyleProp =
  | string
  | Record<any, any>
  | null
  | undefined
  | false
  | StyleProp[]
```

把样式对象拼接成字符串，解决小程序不支持styleObject的问题。
