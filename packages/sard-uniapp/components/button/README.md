# Button 按钮

### 介绍

按钮用于开始一个即时操作。

## 代码演示

### 基础按钮

```html
<sar-button>默认按钮</sar-button>
```

### 按钮类型

```html
<sar-button type="default">默认</sar-button>
<sar-button type="pale">淡颜色</sar-button>
<sar-button type="mild">温和</sar-button>
<sar-button type="outline">轮廓线</sar-button>
<sar-button type="text">文本</sar-button>
<sar-button type="pale-text">淡文本</sar-button>
```

### 按钮颜色

```html
<sar-button theme="primary">primary</sar-button>
<sar-button theme="success">success</sar-button>
<sar-button theme="info">info</sar-button>
<sar-button theme="warning">warning</sar-button>
<sar-button theme="danger">danger</sar-button>
```

### 自定义颜色

通过`styles`属性设置按钮的样式。

```html
<sar-button styles="background: fuchsia">default</sar-button>
<sar-button
  styles="background: rgba(255, 0, 255, 0.2); color: fuchsia"
  type="pale"
>
  pale
</sar-button>
<sar-button styles="color: fuchsia" type="mild">mild</sar-button>
<sar-button styles="color: fuchsia" type="outline">outline</sar-button>
<sar-button styles="color: fuchsia" type="text">text</sar-button>
<sar-button styles="color: fuchsia" type="pale-text"> pale-text </sar-button>
<sar-button styles="background: linear-gradient(to right, orange, fuchsia)">
  渐变色
</sar-button>
```

### 圆形按钮

```html
<sar-button round>default</sar-button>
<sar-button round type="pale">pale</sar-button>
<sar-button round type="mild">mild</sar-button>
<sar-button round type="outline">outline</sar-button>
<sar-button round type="text">text</sar-button>
<sar-button round type="pale-text">pale-text</sar-button>
```

### 禁用按钮

```html
<sar-button disabled>default</sar-button>
<sar-button disabled type="pale">pale</sar-button>
<sar-button disabled type="mild">mild</sar-button>
<sar-button disabled type="outline">outline</sar-button>
<sar-button disabled type="text">text</sar-button>
<sar-button disabled type="pale-text">pale-text</sar-button>
```

### 块级按钮

```html
<sar-button block>按钮</sar-button>
```

### 按钮尺寸

```html
<sar-button size="small">小尺寸</sar-button>
<sar-button>默认尺寸</sar-button>
<sar-button size="large">大尺寸</sar-button>
```

### 加载中

```html
<sar-button loading>primary</sar-button>
<sar-button loading loadingText="加载中">primary</sar-button>
<sar-button loading loadingText="加载中" loadingType="clock">
  primary
</sar-button>
```

## API

### ButtonProps

| 属性                 | 描述                                                               | 类型                                                                | 默认值    |
| -------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- | --------- |
| type                 | 按钮类型                                                           | 'default' \| 'pale' \| 'mild' \| 'outline' \| 'text' \| 'pale-text' | 'default' |
| theme                | 按钮主题色                                                         | 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'           | 'primary' |
| size                 | 按钮尺寸                                                           | 'medium' \| 'small' \| 'large'                                      | 'medium'  |
| round                | 圆角按钮                                                           | boolean                                                             | false     |
| block                | 块级按钮                                                           | boolean                                                             | false     |
| disabled             | 禁用按钮                                                           | boolean                                                             | false     |
| loading              | 加载中状态                                                         | boolean                                                             | false     |
| loadingType          | 加载类型                                                           | loadingProps['type']                                                | -         |
| loadingText          | 加载文本                                                           | string                                                              | -         |
| formType             | 用于 \<form> 组件，点击分别会触发 \<form> 组件的 submit/reset 事件 | 'submit' \| 'reset'                                                 | -         |
| openType             | 开放能力                                                           | OpenType                                                            | -         |
| hoverStartTime       | 按住后多久出现点击态，单位毫秒                                     | number                                                              | -         |
| hoverStayTime        | 手指松开后点击态保留时间，单位毫秒                                 | number                                                              | -         |
| appParameter         | 打开 APP 时，向 APP 传递的参数，open-type=launchApp 时有效         | string                                                              | -         |
| hoverStopPropagation | 指定是否阻止本节点的祖先节点出现点击态                             | boolean                                                             | false     |
| lang                 | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。  | string                                                              | -         |
| sessionFrom          | 会话来源，open-type="contact"时有效                                | string                                                              | -         |
| sendMessageTitle     | 会话内消息卡片标题，open-type="contact"时有效                      | string                                                              | -         |
| sendMessagePath      | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效        | string                                                              | -         |
| sendMessageImg       | 会话内消息卡片图片，open-type="contact"时有效                      | string                                                              | -         |
| showMessageCard      | 是否显示会话内消息卡片，open-type="contact"时有效                  | string                                                              | -         |
| groupId              | 打开群资料卡时，传递的群号                                         | string                                                              | -         |
| guildId              | 打开频道页面时，传递的频道号                                       | string                                                              | -         |
| publicId             | 打开公众号资料卡时，传递的号码                                     | string                                                              | -         |
| dataImId             | 客服的抖音号                                                       | string                                                              | -         |
| dataImType           | IM 卡片类型                                                        | string                                                              | -         |
| dataGoodsId          | 商品的 id，仅支持泛知识课程库和生活服务商品库中的商品              | string                                                              | -         |
| dataOrderId          | 订单的 id，仅支持交易 2.0 订单                                     | string                                                              | -         |
| dataBizLine          | 商品类型，“1”代表生活服务，“2”代表泛知识。                         | string                                                              | -         |

### OpenType

```ts
type OpenType =
  | 'feedback'
  | 'share'
  | 'getUserInfo'
  | 'contact'
  | 'getPhoneNumber'
  | 'launchApp'
  | 'openSetting'
  | 'chooseAvatar'
  | 'uploadDouyinVideo'
  | 'im'
  | 'getAuthorize'
  | 'lifestyle'
  | 'contactShare'
  | 'openGroupProfile'
  | 'openGuildProfile'
  | 'openPublicProfile'
  | 'shareMessageToFriend'
  | 'addFriend'
  | 'addColorSign'
  | 'addGroupApp'
  | 'addToFavorites'
  | 'chooseAddress'
  | 'chooseInvoiceTitle'
  | 'login'
  | 'subscribe'
  | 'favorite'
  | 'watchLater'
  | 'openProfile'
```

### ButtonEmits

| 名称               | 描述                                                                                         | 参数         |
| ------------------ | -------------------------------------------------------------------------------------------- | ------------ |
| click              | 点击按钮时触发                                                                               | (event: any) |
| getphonenumber     | 获取用户手机号回调                                                                           | (event: any) |
| getuserinfo        | 用户点击该按钮时，会返回获取到的用户信息，从返回参数的 detail 中获取到的值同 uni.getUserInfo | (event: any) |
| error              | 当使用开放能力时，发生错误的回调                                                             | (event: any) |
| opensetting        | 在打开授权设置页并关闭后回调                                                                 | (event: any) |
| launchapp          | 从小程序打开 App 成功的回调                                                                  | (event: any) |
| contact            | 客服消息回调                                                                                 | (event: any) |
| chooseavatar       | 获取用户头像回调                                                                             | (event: any) |
| addgroupapp        | 添加群应用的回调                                                                             | (event: any) |
| chooseaddress      | 调起用户编辑并选择收货地址的回调                                                             | (event: any) |
| chooseinvoicetitle | 用户选择发票抬头的回调                                                                       | (event: any) |
| subscribe          | 订阅消息授权回调                                                                             | (event: any) |
| login              | 登录回调                                                                                     | (event: any) |
| im                 | 监听跳转 IM 的成功回调                                                                       | (event: any) |

### ButtonSlots

| 名称        | 描述               | props |
| ----------- | ------------------ | ----- |
| default     | 自定义按钮内容     | {}    |
| loadingText | 自定义加载文字内容 | {}    |

## 主题定制

### CSS 变量

%{variables}
