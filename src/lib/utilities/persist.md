---
nav: 工具
title: 数据持久化
order: -1
group:
  title: 工程化
version: 1.20+
---

## 介绍

在一个项目当中，数据持久化是比较常用且重要的功能。在页面刷新或重新进入到应用时，可以恢复原来的个性化配置、减少网络请求、降低服务器压力等。

`uniapp` 提供了本地数据缓存相关的接口，`sard-uniapp` 在此基础上扩展了以下功能：

- 添加了命名空间，减少冲突；
- 将数据读取到内存，提高读取效率；
- 新增了数据过期时间；
- 自动序列化和反序列化数据；
- 更简短的调用方法名；
- 可清空命名空间下的所有数据。

## 使用

创建 `Persist` 实例：

```ts
import { Persist } from 'sard-uniapp'

const persist = new Persist('Sard')
```

设置：

```ts
persist.set('token', 'ASDFGHJK')
```

设置一个小时有效期：

```ts
persist.set('token', 'ASDFGHJK', 60 * 60)
```

获取：

```ts
persist.get('token')
```

删除：

```ts
persist.remove('token')
```

清空：

```ts
persist.clear()
```

## 接口

### Persist 构造函数

```ts
constructor Persist(name: string): Persist
```

### get 方法

```ts
Persist.get(key: string): any
```

读取到的数据会自动反序列化；如果找不到数据，或者数据过期，则返回 `undefined`。

### set 方法

```ts
Persist.set(key: string, value: any, ttl?: number): void
```

- 参数 `value` 可以为任何可以被 `JSON.stringify` 序列化的数据；
- 参数 `ttl` 如果设置为0，表示永远不过期；默认值：0；

### remove 方法

```ts
Persist.remove(key: string): void
```

### clear

```ts
Persist.clear(): void
```

只会清空当前命名空间下的数据。
