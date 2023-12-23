# Style 样式

## 介绍

`sard-uniapp` 为了避免视觉传达差异，各组件用到的一些公用的颜色值、字号、圆角等统一进行了定义，并将变量值添加到 `page` 元素以便引用和自定义样式覆盖。

可以通过 `CSS` 变量 来组织样式，通过覆盖这些 `CSS` 变量，可以实现定制样式、动态切换主题等效果。

## 主题定制

### CSS 变量

@code('./variables.scss#variables')

### CSS 变量 - 暗黑模式

@code('./variables-dark.scss#variables')
