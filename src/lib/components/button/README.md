---
nav: 组件
title: Button
subtitle: 按钮
group:
  title: 基础组件
  order: 0
---

## 介绍

按钮用于开始一个即时操作。

## 引入

```ts
import Button from 'sard-uniapp/components/button/button.vue'
```

## 代码演示

### 按钮类型

`type`属性用于配置按钮的类型。

@code('${DEMO_PATH}/button/demo/Type.vue')

### 按钮主题色

`Button`组件内置了几个主题色，可以使用`theme`属性来配置。

@code('${DEMO_PATH}/button/demo/Theme.vue')

### 自定义颜色

如果内置主题色不合适，可以自定义主题色。使用`color`和`background`属性定义字体颜色和背景色。

@code('${DEMO_PATH}/button/demo/Color.vue')

### 圆形按钮

使用`round`属性设置为圆形按钮。

@code('${DEMO_PATH}/button/demo/Round.vue')

### 方形按钮

使用`square`属性设置为方形按钮。

@code('${DEMO_PATH}/button/demo/Square.vue')

### 禁用按钮

禁用状态的按钮不可点击。

@code('${DEMO_PATH}/button/demo/Disabled.vue')

### 按钮尺寸

内置三种尺寸以供选择。

@code('${DEMO_PATH}/button/demo/Size.vue')

### 加载中

加载中的按钮不可点击。

@code('${DEMO_PATH}/button/demo/Loading.vue')

### 行内块按钮

按钮默认是块级元素，可通过 `inline` 设为行内块元素。

@code('${DEMO_PATH}/button/demo/Block.vue')

### 图标按钮

可通过 `icon` 属性设置图标，相对于通过默认插槽添加图标，前者会有默认的样式，并可与 `loading` 相切换。在设置 `icon` 属性后，按钮会自动变为行内块。

@code('${DEMO_PATH}/button/demo/Icon.vue')

## API

### ButtonProps

| 属性                         | 描述                                          | 类型                                                                     | 默认值     |
| ---------------------------- | --------------------------------------------- | ------------------------------------------------------------------------ | ---------- |
| root-class                   | 组件根元素类名                                | string                                                                   | -          |
| root-style                   | 组件根元素样式                                | StyleValue                                                               | -          |
| type                         | 按钮类型                                      | 'default' \| 'pale' \| 'mild' \| 'outline' \| 'text' \| 'pale-text'      | 'default'  |
| theme                        | 按钮主题色                                    | 'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'danger' | 'primary'  |
| size                         | 按钮尺寸                                      | 'mini' \| 'small' \| 'medium' \| 'large'                                 | 'medium'   |
| round                        | 圆角按钮                                      | boolean                                                                  | false      |
| square <sup>1.19+</sup>      | 方形按钮                                      | boolean                                                                  | false      |
| disabled                     | 禁用按钮                                      | boolean                                                                  | false      |
| loading                      | 加载状态                                      | boolean                                                                  | false      |
| loading-type                 | 加载类型                                      | 'clock' \| 'circular'                                                    | 'circular' |
| color                        | 自定义文字颜色                                | string                                                                   | -          |
| background                   | 自定义背景颜色                                | string                                                                   | -          |
| block <sup>1.12+</sup>       | 将按钮设为块级元素                            | boolean                                                                  | true       |
| inline <sup>1.12.1+</sup>    | 设置为 true，则为行内块元素，否则取决于 block | boolean                                                                  | false      |
| icon <sup>1.13+</sup>        | 图标名称                                      | string                                                                   | -          |
| icon-family <sup>1.13+</sup> | 图标字体                                      | string                                                                   | -          |
| icon-size <sup>1.13+</sup>   | 图标尺寸                                      | string                                                                   | -          |

### ButtonProps（小程序能力）

<a href="https://uniapp.dcloud.net.cn/component/button.html" target="blank">uniapp 文档</a>。

| 属性                   | 描述                                                                                                                                                           | 类型    | 默认值       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------ |
| form-type              | 用于 \<form> 组件，点击分别会触发 \<form> 组件的 submit/reset 事件                                                                                             | string  | -            |
| open-type              | 开放能力                                                                                                                                                       | string  | -            |
| app-parameter          | 打开 APP 时，向 APP 传递的参数，open-type=launchApp 时有效                                                                                                     | string  | -            |
| hover-stop-propagation | 指定是否阻止本节点的祖先节点出现点击态                                                                                                                         | boolean | false        |
| lang                   | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。                                                                                              | string  | 'en'         |
| session-from           | 会话来源，open-type="contact"时有效                                                                                                                            | string  | -            |
| send-message-title     | 会话内消息卡片标题，open-type="contact"时有效                                                                                                                  | string  | 当前标题     |
| send-message-path      | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效                                                                                                    | string  | 当前分享路径 |
| send-message-img       | 会话内消息卡片图片，open-type="contact"时有效                                                                                                                  | string  | 截图         |
| show-message-card      | 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 | boolean | false        |
| group-id               | 打开群资料卡时，传递的群号                                                                                                                                     | string  | -            |
| guild-id               | 打开频道页面时，传递的频道号                                                                                                                                   | string  | -            |
| public-id              | 打开公众号资料卡时，传递的号码                                                                                                                                 | string  | -            |

### ButtonSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### ButtonEmits

| 事件  | 描述                                   | 类型                 |
| ----- | -------------------------------------- | -------------------- |
| click | 点击按钮时触发，加载和禁用状态不会触发 | (event: any) => void |

### ButtonEmits（小程序能力）

<a href="https://uniapp.dcloud.net.cn/component/button.html" target="blank">uniapp 文档</a>。

| 事件                      | 描述                                                                                         | 类型                 |
| ------------------------- | -------------------------------------------------------------------------------------------- | -------------------- |
| getphonenumber            | 获取用户手机号回调                                                                           | (event: any) => void |
| getuserinfo               | 用户点击该按钮时，会返回获取到的用户信息，从返回参数的 detail 中获取到的值同 uni.getUserInfo | (event: any) => void |
| error                     | 当使用开放能力时，发生错误的回调                                                             | (event: any) => void |
| opensetting               | 在打开授权设置页并关闭后回调                                                                 | (event: any) => void |
| launchapp                 | 从小程序打开 App 成功的回调                                                                  | (event: any) => void |
| contact                   | 客服消息回调                                                                                 | (event: any) => void |
| chooseavatar              | 获取用户头像回调                                                                             | (event: any) => void |
| agreeprivacyauthorization | 用户同意隐私协议事件回调，open-type="agreePrivacyAuthorization"时有效                        | (event: any) => void |
| addgroupapp               | 添加群应用的回调                                                                             | (event: any) => void |
| chooseaddress             | 调起用户编辑并选择收货地址的回调                                                             | (event: any) => void |
| chooseinvoicetitle        | 用户选择发票抬头的回调                                                                       | (event: any) => void |
| subscribe                 | 订阅消息授权回调                                                                             | (event: any) => void |
| login                     | 登录回调                                                                                     | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
