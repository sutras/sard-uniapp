# BackTop 回到顶部 <sup>1.6+</sup>

## 介绍

返回页面顶部的操作按钮。

## 引入

```ts
import BackTop from 'sard-uniapp/components/back-top/back-top.vue'
```

## 代码演示

### 基础使用

返回页面顶部时，`BackTop` 组件需要配合 `usePageBackTop` 组合式函数使用。

`BackTop` 组件需要绑定 `usePageBackTop` 返回的 `scrollTop` 属性值和 `onClick` 回调。

另外，为了让 `uniapp` 编译器能够初始化 `onPageScroll` 页面钩子，需要显式在页面组件调用 `onPageScroll` 组合式函数。

@code('${DEMO_PATH}/back-top/demo/Basic.vue')

### scroll-view 组件滚动

返回 `scroll-view` 顶部时，`BackTop` 组件需要配合 `useScrollViewBackTop` 组合式函数使用。

`BackTop` 组件需要绑定 `useScrollViewBackTop` 返回的 `scrollTop` 属性值和 `onClick` 回调。

`scroll-view` 组件需要绑定 `useScrollViewBackTop` 返回的 `scrollTop` 属性值和 `onScroll` 回调。

@code('${DEMO_PATH}/back-top/demo/ScrollView.vue')

### 按钮位置

通过设置 `right` 和 `bottom` 属性可以自定义按钮距离右下角的距离。

@code('${DEMO_PATH}/back-top/demo/Position.vue')

### 滚动时长

`usePageBackTop` 组合式函数可以接收一个数值类型参数，表示滚动到页面顶部的动画时长。

`scroll-view` 默认没有滚动动画，通过设置 `scroll-with-animation` 属性可以添加滚动动画。

@code('${DEMO_PATH}/back-top/demo/Duration.vue')

### 可见时的高度

默认情况下，当页面或 `scroll-view` 滚动到一定距离时，按钮才会显示。

可以设置 `visible-height` 为 0 让按钮一直显示。

@code('${DEMO_PATH}/back-top/demo/VisibleHeight.vue')

### 自定义按钮内容

使用默认插槽自定义组件展示的内容。

@code('${DEMO_PATH}/back-top/demo/CustomContent.vue')

## API

### BackTopProps

| 属性           | 描述                                                  | 类型       | 默认值 |
| -------------- | ----------------------------------------------------- | ---------- | ------ |
| root-class     | 组件根元素类名                                        | string     | -      |
| root-style     | 组件根元素样式                                        | StyleValue | -      |
| scroll-top     | 当前页面或 scroll-view 滚动的高度                     | number     | 0      |
| visible-height | 回到顶部按钮显示时的页面或 scroll-view 滚动的最小高度 | number     | 200    |
| right          | 回到顶部按钮距离右边的距离                            | string     | -      |
| bottom         | 回到顶部按钮距离底部的距离                            | string     | -      |

### BackTopSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### BackTopEmits

| 事件  | 描述       | 类型                 |
| ----- | ---------- | -------------------- |
| click | 点击时触发 | (event: any) => void |

### usePageBackTop

```ts
function usePageBackTop(duration?: number): {
  scrollTop: Ref<number>
  onClick: () => void
}
```

| 参数     | 描述                  | 类型   | 默认值 |
| -------- | --------------------- | ------ | ------ |
| duration | 滚动动画时长，单位 ms | number | 300    |

| 返回对象的属性 | 描述                                            | 类型         |
| -------------- | ----------------------------------------------- | ------------ |
| scrollTop      | 需要绑定到 `BackTop` 组件 `scroll-top` 属性的值 | Ref\<number> |
| onClick        | 需要绑定到 `BackTop` 组件 `click` 事件的回调    | () => void   |

### useScrollViewBackTop

```ts
function useScrollViewBackTop(): {
  scrollTop: Ref<number>
  onScroll: (event: any) => void
  onClick: () => void
}
```

| 返回对象的属性 | 描述                                                            | 类型                 |
| -------------- | --------------------------------------------------------------- | -------------------- |
| scrollTop      | 需要绑定到 `BackTop` 和 `ScrollView` 组件 `scroll-top` 属性的值 | Ref\<number>         |
| onScroll       | 需要绑定到 `ScrollView` 组件 `scroll` 事件的回调                | (event: any) => void |
| onClick        | 需要绑定到 `BackTop` 组件 `click` 事件的回调                    | () => void           |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
