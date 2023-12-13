# Locale 国际化

## 介绍

默认采用中文作为默认语言，允许切换不同语言。

## 语言切换

`@sard/uniapp` 提供了 `setLocale` 函数来切换当前使用的语言。

```ts
import { setLocale } from '@sard/uniapp'
import enUS from '@sard/uniapp/dist/locale/lang/en-US'

setLocale(enUS)
```

## 支持的语言列表

- 简体中文（zh-CN）
- 美国英语（en-US）
