# Template 默认模板

## 介绍

template

## 引入

```ts
import Template from 'sard-uniapp/components/template/template.vue'
```

## 代码演示

### 基础使用

@code('${DEMO_PATH}/template/demo/Basic.vue')

## API

### TemplateProps

| 属性       | 描述           | 类型       | 默认值 |
| ---------- | -------------- | ---------- | ------ |
| root-class | 组件根元素类名 | string     | -      |
| root-style | 组件根元素样式 | StyleValue | -      |

### TemplateSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### TemplateEmits

| 事件  | 描述       | 类型                 |
| ----- | ---------- | -------------------- |
| click | 点击时触发 | (event: any) => void |

### TemplateExpose

| 属性  | 描述         | 类型       |
| ----- | ------------ | ---------- |
| reset | 重置滚动时长 | () => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
