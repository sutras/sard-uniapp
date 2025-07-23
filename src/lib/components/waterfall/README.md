---
nav: 组件
title: Waterfall
subtitle: 瀑布流
group: 布局
version: 1.21+
---

## 介绍

按照元素高度自适应排列，形成参差不齐的多列布局。

## 引入

```ts
import Waterfall from 'sard-uniapp/components/waterfall/waterfall.vue'
```

## 代码演示

### 基础使用

瀑布流布局是使用绝对定位实现的，每一项内容需放置在 `WaterfallItem` 组件里面以便控制其位置；可放置任意内容，并不限定为具体模板。

如果里面包含图片或其他使其在挂载后仍然不确定高度的组件时，需在加载完后调用瀑布流项的 `load` 插槽中的 `onLoad` 回调，以便计算其渲染后的高度并进行准确定位。

瀑布流会按照渲染的顺序逐一将加载好的瀑布流项渲染出来；如果后面比前面要先加载完，也得等前面加载完才能渲染。因此，如果前面有一张很大的图片需要很久才能加载完，则会堵塞后面的渲染。

因此，一次性不要加载太多图片，图片的尺寸也要有所限制。

瀑布流组件的 `load` 事件会在所有项都加载完后触发，可以用来处理加载状态。

@code('${DEMO_PATH}/waterfall/demo/Basic.vue')

`SimulatedImage.vue`

@code('${DEMO_PATH}/waterfall/demo/SimulatedImage.vue')

### 已知宽高

如果接口已将图片宽高信息返回，可以使用 `WaterfallLoad` 组件处理 `onLoad` 回调，会在挂载时调用，无需等待图片加载完即可渲染，可极大提高用户体验。

`WaterfallLoad` 会根据 `width`、`height` 属性计算占用的空间。

@code('${DEMO_PATH}/waterfall/demo/KnownSize.vue')

### 真实案例

需同时监听 `image` 组件的 `load` 和 `error` 事件，确保 `onLoad` 回调函数能调用，无论图片加载成功或失败。

@code('${DEMO_PATH}/waterfall/demo/TrueCase.vue')

### 最大等待时间

为了避免因图片太大导致渲染阻塞，`WaterfallLoad` 组件提供了 `max-wait` 属性，在超过等待时间后取自定义的宽高进行渲染，无需等待图片加载完；加载时间小于等待时间时，则取图片实际的宽高进行渲染。

宽高只用于计算比例来进行等比缩放，而不是最终的展示尺寸。

@code('${DEMO_PATH}/waterfall/demo/MaxWait.vue')

### 大图

可使用 `column-gap` 和 `row-gap` 设置瀑布流项的间隔大小，单位为 px。

@code('${DEMO_PATH}/waterfall/demo/BigImage.vue')

### 自定义列数

可使用 `columns` 属性设置任意的列数。

@code('${DEMO_PATH}/waterfall/demo/Columns.vue')

### 结合下拉刷新与触底加载

可配合 `LoadMore` 和 `PullDownRefresh` 组件实现数据动态增减。

因瀑布流在数据加载完后仍需等待图片加载，因此提供了 `onLoad` 方法，传递到此方法中的函数会在图片加载完后调用，可用于取消加载状态。

@code('${DEMO_PATH}/waterfall/demo/Dynamic.vue')

## API

### WaterfallProps

| 属性       | 描述           | 类型       | 默认值 |
| ---------- | -------------- | ---------- | ------ |
| root-class | 组件根元素类名 | string     | -      |
| root-style | 组件根元素样式 | StyleValue | -      |
| columns    | 自定义列数     | number     | 2      |
| column-gap | 列间距，单位px | number     | 16     |
| row-gap    | 行间距，单位px | number     | 16     |

### WaterfallSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### WaterfallEmits

| 事件      | 描述                     | 类型       |
| --------- | ------------------------ | ---------- |
| load      | 所有瀑布流项加载完时触发 | () => void |
| loadstart | 瀑布流项项开始加载时触发 | () => void |

### WaterfallExpose

| 属性   | 描述                             | 类型                          |
| ------ | -------------------------------- | ----------------------------- |
| reflow | 重新排版                         | () => void                    |
| onLoad | 添加回调，会在所有项加载完时调用 | (handler: () => void) => void |

### WaterfallItemProps

| 属性       | 描述           | 类型       | 默认值 |
| ---------- | -------------- | ---------- | ------ |
| root-class | 组件根元素类名 | string     | -      |
| root-style | 组件根元素样式 | StyleValue | -      |

### WaterfallItemSlots

| 插槽    | 描述           | 属性                                        |
| ------- | -------------- | ------------------------------------------- |
| default | 自定义默认内容 | { onLoad: () => void; columnWidth: number } |

default 插槽属性说明：

- `onLoad`: 图片加载完后（无论成功或失败）需要调用此方法。
- `columnWidth`: 列宽。

### WaterfallLoadProps

| 属性       | 描述                 | 类型       | 默认值 |
| ---------- | -------------------- | ---------- | ------ |
| root-class | 组件根元素类名       | string     | -      |
| root-style | 组件根元素样式       | StyleValue | -      |
| max-wait   | 最大等待时间，单位ms | number     | 0      |
| width      | 自定义宽度           | number     | 320    |
| height     | 自定义高度           | number     | 240    |

### WaterfallLoadSlots

| 插槽    | 描述           | 属性                                                |
| ------- | -------------- | --------------------------------------------------- |
| default | 自定义默认内容 | { onLoad: (event: any) => void; overtime: boolean } |

default 插槽属性说明：

- `onLoad`: 图片加载完后（成功和失败）可以调用此方法，加载完时间比 `max-wait` 要大则超时。
- `overtime`: 是否超时。

### WaterfallEmits

| 事件 | 描述                                     | 类型       |
| ---- | ---------------------------------------- | ---------- |
| load | 加载完时触发，无论是正常加载完，还是超时 | () => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
