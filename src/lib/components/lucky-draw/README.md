---
nav: 组件
title: LuckyDraw
subtitle: 幸运抽奖
group:
  title: 活动组件
  order: 6
version: 1.2+
---

## 介绍

提供了几个组合式函数，封装了九宫格、幸运大转盘、老虎机等抽奖的主要逻辑，可用纯 css 实现抽奖组件。

## 引入

```ts
import { useLuckyGrid, useLuckyWheel, useSlotMachine } from 'sard-uniapp'
```

## 代码演示

### 九宫格

遍历 `useLuckyGrid` 返回的 `grids` 计算属性来渲染九宫格；`activeIndex` 计算属性用于判断当前活动的奖品。

点击按钮后调用 `play` 方法开始动画；

在确定抽中的奖品下标时调用 `stop` 方法开始减速动画；

在动画完全停止后调用 `complete` 回调函数展示抽中的奖品。

@code('${DEMO_PATH}/lucky-draw/demo/BasicGrid.vue')

utils.ts

@code('${DEMO_PATH}/lucky-draw/demo/utils.ts')

### 自定义宫格行列

`useLuckyGrid` 默认会生成 3x3 个格子，也可以自定义行列数。

宫格的外边缘格子下标从左上角以 0 开始逆时针递增，内部的格子下标从左到右、从上到下以 -1 开始递减。

`centerSize` 计算属性可用于获取中间格子的行列数。

@code('${DEMO_PATH}/lucky-draw/demo/GridSize.vue')

### 大转盘

大转盘与宫格抽奖逻辑类似。

`count` 选项用于指定奖品数量；

`useLuckyWheel` 函数返回的 `sectorDegrees` 计算属性为每个奖品所占的角度；

`degrees` 计算属性为整个大转盘当前旋转的角度。

@code('${DEMO_PATH}/lucky-draw/demo/Wheel.vue')

### 老虎机

老虎机可以一次性抽取多个奖品。

`columns` 选项用于指定列数以及每列的奖品数量；

`offset` 计算属性保存着每一列的百分比偏移量，每一列奖品容器的高度需和奖品高度一致；

为了实现首位相接的效果，还需在渲染的奖品列表的末尾加上第一个奖品。

@code('${DEMO_PATH}/lucky-draw/demo/SlotMechine.vue')

## API

### useLuckyGrid

```ts
function useLuckyGrid(options?: UseLuckyGridOptions): UseLuckyGridReturn
```

### UseLuckyGridOptions

| 属性       | 描述                           | 类型                         | 默认值              |
| ---------- | ------------------------------ | ---------------------------- | ------------------- |
| row        | 宫格行数                       | number \| Ref\<number>       | 3                   |
| column     | 宫格列数                       | number \| Ref\<number>       | 3                   |
| minSpeed   | 最小加速度                     | number \| Ref\<number>       | 0.1                 |
| maxSpeed   | 最大加速度                     | number \| Ref\<number>       | 0.4                 |
| accelTime  | 加速时间，单位毫秒             | number \| Ref\<number>       | 2500                |
| decelTime  | 减速时间，单位毫秒             | number \| Ref\<number>       | 2500                |
| easeIn     | 加速缓动公式                   | (progress: number) => number | (k) => k \* k       |
| easeOut    | 减速缓动公式                   | (progress: number) => number | (k) => k \* (2 - k) |
| startDelay | 加速运动前的等待时间，单位毫秒 | number \| Ref\<number>       | 0                   |
| endDelay   | 减速运动后的等待时间，单位毫秒 | number \| Ref\<number>       | 500                 |
| complete   | 完成抽奖动画后的回调           | (index: number) => void      | -                   |

### UseLuckyGridReturn

| 属性        | 描述                                           | 类型                                          |
| ----------- | ---------------------------------------------- | --------------------------------------------- |
| play        | 调用后开始抽奖                                 | () => void                                    |
| stop        | 调用后开始减速动画                             | (index?: number) => void                      |
| pause       | 调用后暂停动画                                 | () => void                                    |
| reset       | 调用后重置动画                                 | () => void                                    |
| playing     | 用于判断当前是否正在动画                       | ComputedRef<boolean>                          |
| activeIndex | 用于判断当前活动的下标                         | ComputedRef<number \| undefined>              |
| grids       | 用于渲染成宫格，并根据下标判断奖品和非奖品位置 | ComputedRef<number[]>                         |
| centerSize  | 用于渲染中间非奖品格子的行列数                 | ComputedRef<{ row: number; column: number; }> |

### useLuckyWheel

```ts
function useLuckyWheel(options?: UseLuckyWheelOptions): UseLuckyWheelReturn
```

### UseLuckyWheelOptions

| 属性       | 描述                           | 类型                         | 默认值              |
| ---------- | ------------------------------ | ---------------------------- | ------------------- |
| count      | 奖品个数                       | number \| Ref\<number>       | 8                   |
| minSpeed   | 最小加速度                     | number \| Ref\<number>       | 0.01                |
| maxSpeed   | 最大加速度                     | number \| Ref\<number>       | 0.4                 |
| accelTime  | 加速时间，单位毫秒             | number \| Ref\<number>       | 2500                |
| decelTime  | 减速时间，单位毫秒             | number \| Ref\<number>       | 2500                |
| easeIn     | 加速缓动公式                   | (progress: number) => number | (k) => k \* k       |
| easeOut    | 减速缓动公式                   | (progress: number) => number | (k) => k \* (2 - k) |
| startDelay | 加速运动前的等待时间，单位毫秒 | number \| Ref\<number>       | 0                   |
| endDelay   | 减速运动后的等待时间，单位毫秒 | number \| Ref\<number>       | 300                 |
| complete   | 完成抽奖动画后的回调           | (index: number) => void      | -                   |

### UseLuckyWheelReturn

| 属性          | 描述                             | 类型                     |
| ------------- | -------------------------------- | ------------------------ |
| play          | 调用后开始抽奖                   | () => void               |
| stop          | 调用后开始减速动画               | (index?: number) => void |
| pause         | 调用后暂停动画                   | () => void               |
| reset         | 调用后重置动画                   | () => void               |
| playing       | 用于判断当前是否正在动画         | ComputedRef<boolean>     |
| sectorDegrees | 每个扇形奖品所占的角度，单位 deg | ComputedRef<number>      |
| degrees       | 当前转盘渲染的角度，单位 deg     | ComputedRef<number>      |

### useSlotMachine

```ts
function useSlotMachine(options: UseSlotMachineOptions): UseSlotMachineReturn
```

### UseSlotMachineOptions

| 属性         | 描述                           | 类型                                                    | 默认值              |
| ------------ | ------------------------------ | ------------------------------------------------------- | ------------------- |
| columns      | 奖品个数                       | number[] \| unknown[][] \| Ref<number[] \| unknown[][]> | []                  |
| staggerDelay | 列间交错延迟时间，单位毫秒     | number \| Ref\<number>                                  | 600                 |
| minSpeed     | 最小加速度                     | number \| Ref\<number>                                  | 0.01                |
| maxSpeed     | 最大加速度                     | number \| Ref\<number>                                  | 0.3                 |
| accelTime    | 加速时间，单位毫秒             | number \| Ref\<number>                                  | 2500                |
| decelTime    | 减速时间，单位毫秒             | number \| Ref\<number>                                  | 2500                |
| easeIn       | 加速缓动公式                   | (progress: number) => number                            | (k) => k \* k       |
| easeOut      | 减速缓动公式                   | (progress: number) => number                            | (k) => k \* (2 - k) |
| startDelay   | 加速运动前的等待时间，单位毫秒 | number \| Ref\<number>                                  | 0                   |
| endDelay     | 减速运动后的等待时间，单位毫秒 | number \| Ref\<number>                                  | 300                 |
| complete     | 完成抽奖动画后的回调           | (index: number[]) => void                               | -                   |

### UseSlotMachineReturn

| 属性    | 描述                     | 类型                       |
| ------- | ------------------------ | -------------------------- |
| play    | 调用后开始抽奖           | () => void                 |
| stop    | 调用后开始减速动画       | (index?: number[]) => void |
| pause   | 调用后暂停动画           | () => void                 |
| reset   | 调用后重置动画           | () => void                 |
| playing | 用于判断当前是否正在动画 | ComputedRef<boolean>       |
| offset  | 每一列的当前偏移量       | ComputedRef<number[]>      |
