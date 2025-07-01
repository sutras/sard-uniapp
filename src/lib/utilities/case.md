---
nav: 工具
title: 命名格式
group:
  title: 工具
version: 1.20+
---

## 介绍

提供了命名格式转换工具。

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
