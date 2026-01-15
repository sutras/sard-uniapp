---
nav: 组件
title: SlideVerify
subtitle: 滑动验证
group: 其他
version: 1.26+
---

## 介绍

根据提示滑动滑块到指定位置来完成验证。

## 引入

```ts
import SlideVerify from 'sard-uniapp/components/slide-verify/slide-verify.vue'
```

## 代码演示

### 基础使用

使用 `text`, `success-text` 属性设置文案。

使用 `verify` 属性进行验证，其为一个函数，接收用户操作结果，返回布尔类型或者 `Promise`，为真时验证成功，否则验证失败；
操作结果对象的 `actualPos` 属性是一个百分比数值，表示用户拖拽的距离，为100时表示拖拽到最右边。

验证完，可调用 `reset` 方法重置结果。

@code('${DEMO_PATH}/slide-verify/demo/Basic.vue')

### 显示目标

设置 `show-target` 属性显示目标；使用 `target-pos` 属性设置目标位置，类型为百分比数值，默认为 100；可比较操作结果对象的 `targetPos` 和 `actualPos` 属性值来判断是否拖拽到位。

@code('${DEMO_PATH}/slide-verify/demo/ShowTarget.vue')

### 错误时不重置

默认验证失败会自动重置结果，如果需要手动重置，可设置 `:reset-when-error="false"` 属性。

@code('${DEMO_PATH}/slide-verify/demo/ShowError.vue')

### 自定义主题色

可通过 css 变量 `--sar-slide-verify-theme-color` 来设置想要的主题色。

@code('${DEMO_PATH}/slide-verify/demo/Theme.vue')

### 自定义插槽内容

可通过 `text-before` 插槽在文案前面插入需要的内容。

@code('${DEMO_PATH}/slide-verify/demo/Slot.vue')

## API

### SlideVerifyProps

| 属性             | 描述                                                                                | 类型                                                        | 默认值 |
| ---------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------ |
| root-class       | 组件根元素类名                                                                      | string                                                      | -      |
| root-style       | 组件根元素样式                                                                      | StyleValue                                                  | -      |
| target-pos       | 目标位置，百分比数值，100表示最右边，0表示最左边                                    | number                                                      | 100    |
| text             | 默认状态下的文案                                                                    | string                                                      | -      |
| success-text     | 验证成功状态下的文案                                                                | string                                                      | -      |
| error-text       | 验证失败状态下的文案                                                                | string                                                      | -      |
| disabled         | 是否禁用                                                                            | boolean                                                     | false  |
| reset-when-error | 是否在验证失败时重置                                                                | boolean                                                     | true   |
| show-target      | 是否显示目标                                                                        | boolean                                                     | false  |
| verify           | 验证函数，接收操作结果，返回 `true` 或者 `Promise<true>` 表示验证成功，否则验证失败 | (result: SlideVerifyResult) => Promise\<boolean> \| boolean | -      |

#### SlideVerifyResult

```ts
interface SlideVerifyResult {
  targetPos: number
  actualPos: number
  startTime: number
  endTime: number
  trajectory: [x: number, y: number, t: number][]
}
```

| 属性       | 描述                                             |
| ---------- | ------------------------------------------------ |
| targetPos  | 目标位置百分比                                   |
| actualPos  | 实际拖拽位置百分比                               |
| startTime  | 拖拽开始时间戳                                   |
| endTime    | 拖拽结束时间戳                                   |
| trajectory | 拖拽轨迹点数组，记录每个轨迹点的屏幕坐标和时间戳 |

### SlideVerifySlots

| 插槽        | 描述                 | 属性 |
| ----------- | -------------------- | ---- |
| text-before | 自定义文案前面的内容 | -    |
| text-after  | 自定义文案后面的内容 | -    |

### SlideVerifyEmits

| 事件   | 描述                                                   | 类型                      |
| ------ | ------------------------------------------------------ | ------------------------- |
| change | 拖拽或重置使当前滑块变动时触发，接收当前拖拽的百分比值 | (percent: number) => void |

### SlideVerifyExpose

| 属性  | 描述         | 类型       |
| ----- | ------------ | ---------- |
| reset | 重置验证结果 | () => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
