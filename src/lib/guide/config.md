---
nav: 指引
title: 全局配置
order: 2
group:
  title: 进阶
---

## 介绍

有些组件的属性设置了默认值，如果需要自定义这些默认值，可在入口文件中通过 `setConfig` 函数进行设置。

例如，下面将按钮的默认类型设为 `outline`：

```ts
// main.ts
import { setConfig } from 'sard-uniapp'

setConfig({
  button: {
    type: 'outline',
  },
})
```

## 批量设置默认动画时长

`ActionSheet`、`Dialog`、`Notify` 等这些组件都有一个进出场动画，通常默认动画时长为 `300` 毫秒，如果要自定义默认时长，除了一个个列出来进行设置之外，还可以通过 `getDurationConfig` 函数简化设置：

```ts
// main.ts
import { setConfig, getDurationConfig } from 'sard-uniapp'

setConfig(getDurationConfig(0))
```

`getDurationConfig` 接收一个时长数值，返回 `setConfig` 参数配置对象。

`setConfig` 可以接受任意个参数。例如，下面设置了除 `Toast` 组件外，其他组件的动画时长都为 0。

```ts
setConfig(getDurationConfig(0), {
  toast: {
    duration: 300,
  },
})
```

## 完整默认配置

@code('${COMP_PATH}/config/index.ts#defaultConfig')
