# Notify 通知

## 介绍

在页面顶部展示消息通知。

## 引入

```ts
import Notify from 'sard-uniapp/components/notify/notify.vue'
import NotifyAgent from 'sard-uniapp/components/notify-agent/notify-agent.vue'
import { notify } from 'sard-uniapp'
```

## 代码演示

### 基础使用

先在页面放置代理组件。

```tsx
<sar-notify-agent />
```

接着便可以使用 `notify` 等方法显示提示。

@code('${DEMO_PATH}/notify/demo/Basic.vue')

### 类型

支持 `primary、success、warning、error` 四种通知类型，默认为 `primary`

@code('${DEMO_PATH}/notify/demo/Type.vue')

### 自定义颜色

通过 `color` 属性设置文本颜色，通过 `background` 属性设置背景色。

@code('${DEMO_PATH}/notify/demo/Color.vue')

### 自定义时长

`duration` 设为 0 后会一直显示。

@code('${DEMO_PATH}/notify/demo/Duration.vue')

### 自定义位置

通知允许在屏幕上边或下边展示。

@code('${DEMO_PATH}/notify/demo/Placement.vue')

## API

### NotifyProps

| 属性              | 描述                                  | 类型                                           | 默认值    |
| ----------------- | ------------------------------------- | ---------------------------------------------- | --------- |
| type              | 加载类型                              | 'primary' \| 'success' \| 'warning' \| 'error' | 'primary' |
| message           | 通知内容                              | string                                         | -         |
| color             | 字体颜色                              | string                                         | -         |
| background        | 背景色                                | string                                         | -         |
| visible (v-model) | 是否显示通知                          | boolean                                        | -         |
| position          | 通知放置的位置                        | 'top' \| 'bottom'                              | 'top'     |
| timeout           | 展示时长(ms)，值为 0 时，通知不会消失 | number                                         | 3000      |
| duration          | 显隐动画时长，单位 ms                 | number                                         | 300       |

### NotifyAgentProps / NotifyOptions

继承 `NotifyProps` 并有以下额外属性。

| 属性 | 描述          | 类型   | 默认值   |
| ---- | ------------- | ------ | -------- |
| id   | 通知组件的 id | string | 'notify' |

### 命令式方法

| 名称           | 描述                       | 类型                     |
| -------------- | -------------------------- | ------------------------ |
| notify         | 显示通知                   | NotifyFunction           |
| notify.success | 显示成功类型通知           | NotifySimpleShowFunction |
| notify.warning | 显示警告类型通知           | NotifySimpleShowFunction |
| notify.error   | 显示错误类型通知           | NotifySimpleShowFunction |
| notify.hide    | 隐藏指定 `id` 的命令式通知 | (id = 'notify') => void  |
| notify.hideAll | 隐藏所有命令式通知         | () => void               |

### NotifyFunction

```ts
type NotifyFunction = NotifySimpleShowFunction & {
  success: NotifySimpleShowFunction
  warning: NotifySimpleShowFunction
  error: NotifySimpleShowFunction
  hide: (id?: string) => void
  hideAll: () => void
}
```

### NotifySimpleShowFunction

```ts
interface NotifySimpleShowFunction {
  (options: NotifyOptions): void
  (message: string, options?: NotifyOptions): void
}
```

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
