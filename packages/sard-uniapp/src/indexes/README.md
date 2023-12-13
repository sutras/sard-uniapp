# Indexes 索引

## 介绍

用于页面中信息快速检索，可以根据目录中的页码快速找到所需的内容。

## 引入

```ts
import Indexes from '@sard/uniapp/dist/indexes/indexes.vue'
import IndexesAnchor from '@sard/uniapp/dist/indexes-anchor/indexes-anchor.vue'
```

## 代码演示

### 基础使用

按下或滑动索引侧边栏时，会自动滚动到对应的锚点位置。

@code('${DEMO_PATH}/indexes/demo/Basic.vue')

## API

### IndexesProps

| 属性       | 描述               | 类型             | 默认值 |
| ---------- | ------------------ | ---------------- | ------ |
| root-class | 组件根元素类名     | string           | -      |
| root-style | 组件根元素样式     | StyleValue       | -      |
| current    | 设置当前活动的锚点 | number \| string | -      |

### IndexesSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### IndexesEmits

| 事件   | 描述               | 类型                             |
| ------ | ------------------ | -------------------------------- |
| change | 索引发生变更时触发 | (name: number \| string) => void |

### IndexesAnchorProps

| 属性       | 描述           | 类型             | 默认值 |
| ---------- | -------------- | ---------------- | ------ |
| root-class | 组件根元素类名 | string           | -      |
| root-style | 组件根元素样式 | StyleValue       | -      |
| name       | 索引锚点名称   | number \| string | -      |

### IndexesAnchorSlots

| 插槽    | 描述                               | 属性 |
| ------- | ---------------------------------- | ---- |
| default | 自定义锚点内容，会覆盖 `name` 属性 | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
