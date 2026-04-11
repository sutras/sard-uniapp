
## <small>1.29.2 (2026-04-11)</small>

* Bug Fixes: 优化输入框在微信聚焦问题 ([8df22dd](https://github.com/sutras/sard-uniapp/commit/8df22dd))

## <small>1.29.1 (2026-04-08)</small>

* Bug Fixes: 修复打包时删除uniapp条件注释问题 ([016d5a8](https://github.com/sutras/sard-uniapp/commit/016d5a8))

## 1.29.0 (2026-04-05)

* Features: 新增 barcode 组件 ([e6b065e](https://github.com/sutras/sard-uniapp/commit/e6b065e))
* Features: 新增 ColorPicker, ColorPickerInput, ColorPickerPopout 组件 ([1576b6d](https://github.com/sutras/sard-uniapp/commit/1576b6d))
* Features: 新增 DateStrip ([7b8d24d](https://github.com/sutras/sard-uniapp/commit/7b8d24d))
* Features: 新增 Ellipsis 组件 ([8585cdb](https://github.com/sutras/sard-uniapp/commit/8585cdb))
* Code Refactoring: 使用vitepress重构文档 ([926e6a1](https://github.com/sutras/sard-uniapp/commit/926e6a1))
* Code Refactoring: 添加案例iframe ([4a905f8](https://github.com/sutras/sard-uniapp/commit/4a905f8))
* Code Refactoring: 重构开发服务脚本 ([2274073](https://github.com/sutras/sard-uniapp/commit/2274073))
* Code Refactoring: 重构构建脚本 ([53b436d](https://github.com/sutras/sard-uniapp/commit/53b436d))
* Code Refactoring: 重构部署命令 ([f95e64f](https://github.com/sutras/sard-uniapp/commit/f95e64f))
* Code Refactoring: 重构部署脚本 ([7c0bf0c](https://github.com/sutras/sard-uniapp/commit/7c0bf0c))
* Code Refactoring: 重构预览脚本 ([80cd166](https://github.com/sutras/sard-uniapp/commit/80cd166))

## 1.28.0 (2026-03-27)

* Bug Fixes: 优化form和switch布局 ([aae9bc1](https://github.com/sutras/sard-uniapp/commit/aae9bc1))
* Bug Fixes: 修复文字长度不一导致图标不对齐问题 ([2805d43](https://github.com/sutras/sard-uniapp/commit/2805d43))
* Bug Fixes: 设置icon对是否块级不影响 ([14ee315](https://github.com/sutras/sard-uniapp/commit/14ee315))
* Features: 使用text元素包裹message,以支持转义字符 ([b66c347](https://github.com/sutras/sard-uniapp/commit/b66c347))
* Features: 新增 Compact 组件 ([84b9dc4](https://github.com/sutras/sard-uniapp/commit/84b9dc4))
* Features: 新增 square 属性,添加默认圆角 ([45b59af](https://github.com/sutras/sard-uniapp/commit/45b59af))
* Features: 新增title, extra, arrow插槽 ([76f56d7](https://github.com/sutras/sard-uniapp/commit/76f56d7))
* Features: 新增分割线类型 ([0cd77cd](https://github.com/sutras/sard-uniapp/commit/0cd77cd))
* Code Refactoring: 将组件默认值迁移到每个组件里面 ([e567a22](https://github.com/sutras/sard-uniapp/commit/e567a22))

## <small>1.27.1 (2026-03-07)</small>

* Features: 新增show-confirm属性 ([017d4ba](https://github.com/sutras/sard-uniapp/commit/017d4ba))

## 1.27.0 (2026-02-23)

* Features: 新增 useLoadMore 钩子函数 ([fafa4ca](https://github.com/sutras/sard-uniapp/commit/fafa4ca))
* Features: 新增select, select-popout, select-input组件 ([be7db12](https://github.com/sutras/sard-uniapp/commit/be7db12))

## <small>1.26.3 (2026-02-05)</small>

* Features: 新增插槽 ([b939e4e](https://github.com/sutras/sard-uniapp/commit/b939e4e))
* Bug Fixes: 修复因max-rows设为-1导致被截断问题 ([363419a](https://github.com/sutras/sard-uniapp/commit/363419a))
* Code Refactoring: 添加圆角样式 ([3982569](https://github.com/sutras/sard-uniapp/commit/3982569))

## <small>1.26.2 (2026-01-23)</small>

* Bug Fixes: 修复弹出框关闭后页面无法滚动的问题 ([f5a7a92](https://github.com/sutras/sard-uniapp/commit/f5a7a92))

## <small>1.26.1 (2026-01-20)</small>

* Bug Fixes: 修复回流时获取不到高度导致重叠问题 ([41f434b](https://github.com/sutras/sard-uniapp/commit/41f434b))

## 1.26.0 (2026-01-17)

* Features: 支持异步编辑或拖拽节点 ([3819e01](https://github.com/sutras/sard-uniapp/commit/3819e01))
* Features: 支持自定义编辑选项和远程数据同步 ([7296096](https://github.com/sutras/sard-uniapp/commit/7296096))
* Features: 新增 PuzzleVerify 组件 ([3ef8c13](https://github.com/sutras/sard-uniapp/commit/3ef8c13))
* Features: 新增 RotateVerify 组件 ([cdd7441](https://github.com/sutras/sard-uniapp/commit/cdd7441))
* Features: 新增 SlideVerify 组件 ([06a8cd0](https://github.com/sutras/sard-uniapp/commit/06a8cd0))
* Bug Fixes: 修复h5端返回页面时布局堆叠问题 ([fa15a42](https://github.com/sutras/sard-uniapp/commit/fa15a42))
* Bug Fixes: 修复因组件销毁导致页面不能滚动的问题 ([9461ebd](https://github.com/sutras/sard-uniapp/commit/9461ebd))
* Bug Fixes: 解决微信小程序中插槽内的表单项丢失上下问的问题 ([cc72b74](https://github.com/sutras/sard-uniapp/commit/cc72b74))

## <small>1.25.11 (2026-01-13)</small>

* Bug Fixes: 修复绝对路径图片不能在小程序展示的问题 ([68d5649](https://github.com/sutras/sard-uniapp/commit/68d5649))

## <small>1.25.10 (2026-01-13)</small>

* Bug Fixes: 修复h5端当设置基础路径时图片加载失败问题 ([3676098](https://github.com/sutras/sard-uniapp/commit/3676098))

## <small>1.25.9 (2026-01-12)</small>

* Bug Fixes: 修复文字过长产生的错位问题, 新增 auto-height 属性 ([5cb9535](https://github.com/sutras/sard-uniapp/commit/5cb9535))

## <small>1.25.8 (2026-01-03)</small>

* Bug Fixes: 修复popup在h5端报错问题 ([ab1b409](https://github.com/sutras/sard-uniapp/commit/ab1b409))

## <small>1.25.7 (2026-01-01)</small>

* Bug Fixes: 修复notice-bar错位问题 ([f4a7e6b](https://github.com/sutras/sard-uniapp/commit/f4a7e6b))
* Features: app端允许页面返回时关闭弹出框 ([c538d7f](https://github.com/sutras/sard-uniapp/commit/c538d7f))
* Features: 小程序端允许页面返回操作关闭弹出框 ([a4fdc64](https://github.com/sutras/sard-uniapp/commit/a4fdc64))

## <small>1.25.6 (2025-12-27)</small>

* Features: 动作面板允许命令式使用 ([d17e03a](https://github.com/sutras/sard-uniapp/commit/d17e03a))

## <small>1.25.5 (2025-11-30)</small>

* Features: 兼容鸿蒙 ([53924d7](https://github.com/sutras/sard-uniapp/commit/53924d7))
* Features: 级联组件新增多选功能 ([7f104c1](https://github.com/sutras/sard-uniapp/commit/7f104c1))
* Features: 阻止页面滚动(弹窗中的滚动穿透) ([21b43c0](https://github.com/sutras/sard-uniapp/commit/21b43c0))
* Bug Fixes: 修复image动态展示时无法获取正确尺寸的问题 ([432d8b3](https://github.com/sutras/sard-uniapp/commit/432d8b3))

## <small>1.25.4 (2025-11-22)</small>

* Features: *-input 类组件新增input前置/后置插槽 ([98d879b](https://github.com/sutras/sard-uniapp/commit/98d879b))

## <small>1.25.3 (2025-11-12)</small>

* Bug Fixes: 修复ios微信端水印渲染失败问题 ([0bea433](https://github.com/sutras/sard-uniapp/commit/0bea433))

## <small>1.25.2 (2025-11-11)</small>

* Bug Fixes: 修复web端最大字数限制无效问题 ([8811d13](https://github.com/sutras/sard-uniapp/commit/8811d13))
* Bug Fixes: 节点值相同时优先绑定后代节点 ([3937b2d](https://github.com/sutras/sard-uniapp/commit/3937b2d))

## <small>1.25.1 (2025-11-07)</small>

* Features: 新增success事件 ([91195a9](https://github.com/sutras/sard-uniapp/commit/91195a9))
* Features: 添加越南语语言包 ([8f1611a](https://github.com/sutras/sard-uniapp/commit/8f1611a))
* Features: 添加遮罩相关属性 ([8ee1ad8](https://github.com/sutras/sard-uniapp/commit/8ee1ad8))

## 1.25.0 (2025-11-03)

* Features: 允许通过调用方法调起文件选择 ([a78a645](https://github.com/sutras/sard-uniapp/commit/a78a645))
* Features: 新增image组件 ([7c61f4d](https://github.com/sutras/sard-uniapp/commit/7c61f4d))
* Bug Fixes: 修复数组浅比较问题 ([7f04c96](https://github.com/sutras/sard-uniapp/commit/7f04c96))
* Bug Fixes: 修复根类名和样式设置错乱问题 ([f4ef355](https://github.com/sutras/sard-uniapp/commit/f4ef355))

## <small>1.24.7 (2025-10-02)</small>

* Features: 允许全局配置组件的任意属性 ([889ad5b](https://github.com/sutras/sard-uniapp/commit/889ad5b))
* Features: 新增 disabled 属性 ([0d20897](https://github.com/sutras/sard-uniapp/commit/0d20897))
* Features: 新增line插槽 ([1d05dd0](https://github.com/sutras/sard-uniapp/commit/1d05dd0))
* Features: 添加懒加载功能 ([f4c7d38](https://github.com/sutras/sard-uniapp/commit/f4c7d38))
* Bug Fixes: 修复FormItemPlain错误定位问题 ([3b35b05](https://github.com/sutras/sard-uniapp/commit/3b35b05))
* Bug Fixes: 修复因重复设置current导致不滚动的问题 ([cb6ba8c](https://github.com/sutras/sard-uniapp/commit/cb6ba8c))

## <small>1.24.6 (2025-09-23)</small>

* Bug Fixes: 修复getWindowInfo在支付宝端缺少safeAreaInsets的问题 ([cbd26d7](https://github.com/sutras/sard-uniapp/commit/cbd26d7))
* Bug Fixes: 将空数组视为空值, 修复级联选择初始选择问题 ([2fd8d18](https://github.com/sutras/sard-uniapp/commit/2fd8d18))
* Code Refactoring: 统一使用 background 替代 background-color ([e96fd83](https://github.com/sutras/sard-uniapp/commit/e96fd83))

## <small>1.24.5 (2025-09-20)</small>

* Features: 新增 avatar-group 组件 ([4954219](https://github.com/sutras/sard-uniapp/commit/4954219))
* Bug Fixes: 修复 支付宝getWindowInfo没有safeAreaInsets属性的问题 ([3d64401](https://github.com/sutras/sard-uniapp/commit/3d64401))
* Bug Fixes: 修复popout类组件不显示按钮的问题 ([47bcea9](https://github.com/sutras/sard-uniapp/commit/47bcea9))
* Bug Fixes: 修复倒计时小时溢出的问题 ([823faa1](https://github.com/sutras/sard-uniapp/commit/823faa1))

## <small>1.24.4 (2025-09-13)</small>

* Bug Fixes: 修复滚动报错问题 ([046fc16](https://github.com/sutras/sard-uniapp/commit/046fc16))

## <small>1.24.3 (2025-09-13)</small>

* Bug Fixes: 修复allLevels属性透传问题 ([ab36e14](https://github.com/sutras/sard-uniapp/commit/ab36e14))
* Bug Fixes: 修复web pc端展示默认导航时虚拟触摸事件clientY偏差问题 ([224c052](https://github.com/sutras/sard-uniapp/commit/224c052))
* Bug Fixes: 修复农历转公历错误的问题 ([9906925](https://github.com/sutras/sard-uniapp/commit/9906925))
* Features: 允许自定义按钮 ([312b425](https://github.com/sutras/sard-uniapp/commit/312b425))
* Features: 添加transparent属性的全局配置 ([ba14176](https://github.com/sutras/sard-uniapp/commit/ba14176))

## <small>1.24.2 (2025-09-06)</small>

* Features: 添加拖拽功能 ([4d24318](https://github.com/sutras/sard-uniapp/commit/4d24318))
* Bug Fixes: 修复行内嵌套块的问题 ([fd8112c](https://github.com/sutras/sard-uniapp/commit/fd8112c))
* Bug Fixes: 修正按钮插槽内容 ([7f29d80](https://github.com/sutras/sard-uniapp/commit/7f29d80))
* Bug Fixes: 阻止点击关闭时的事件冒泡 ([4220f31](https://github.com/sutras/sard-uniapp/commit/4220f31))

## <small>1.24.1 (2025-08-31)</small>

* Features: 为车牌键盘模式添加双向绑定支持 ([740f7bf](https://github.com/sutras/sard-uniapp/commit/740f7bf))
* Features: 新增checkbox-popout和radio-popout新增icon-position属性 ([32f458a](https://github.com/sutras/sard-uniapp/commit/32f458a))
* Features: 新增content-position属性 ([b588249](https://github.com/sutras/sard-uniapp/commit/b588249))
* Features: 新增node-click事件 ([a70e5d7](https://github.com/sutras/sard-uniapp/commit/a70e5d7))
* Features: 新增阿拉伯语支持 ([b0b2c60](https://github.com/sutras/sard-uniapp/commit/b0b2c60))

## 1.24.0 (2025-08-24)

* Features: card 组件新增 collapsed 属性 ([9e6ec3b](https://github.com/sutras/sard-uniapp/commit/9e6ec3b))
* Features: tree 组件新增 check 事件 ([4985f46](https://github.com/sutras/sard-uniapp/commit/4985f46))
* Features: 扩展键盘toggle方法支持传入mode参数 ([25c6767](https://github.com/sutras/sard-uniapp/commit/25c6767))
* Features: 新增 cool-icon 组件 ([ba51ef1](https://github.com/sutras/sard-uniapp/commit/ba51ef1))
* Features: 新增 segmented 组件 ([f70464a](https://github.com/sutras/sard-uniapp/commit/f70464a))
* Features: 新增 watermark 组件 ([ce36afd](https://github.com/sutras/sard-uniapp/commit/ce36afd))
* Features: 添加键盘模式配置支持 ([e1dda90](https://github.com/sutras/sard-uniapp/commit/e1dda90))
* Bug Fixes: *-input 类组件允许修改输入框箭头图标 ([2d2a719](https://github.com/sutras/sard-uniapp/commit/2d2a719))
* Bug Fixes: 修复arrow属性失效; ([f530c73](https://github.com/sutras/sard-uniapp/commit/f530c73))
* Bug Fixes: 修复arrow属性失效; ([5b67a7a](https://github.com/sutras/sard-uniapp/commit/5b67a7a))
* Performance Improvements: 压缩图片 ([8cd341f](https://github.com/sutras/sard-uniapp/commit/8cd341f))

## <small>1.23.5 (2025-08-12)</small>

* Features: 允许同时选择图片和视频 ([d478208](https://github.com/sutras/sard-uniapp/commit/d478208))
* Features: 添加 enableNative 属性以支持支付宝小程序 ([5c8b616](https://github.com/sutras/sard-uniapp/commit/5c8b616))

## <small>1.23.4 (2025-08-11)</small>

* Features: 新增 reverse 属性 ([0b98b59](https://github.com/sutras/sard-uniapp/commit/0b98b59))

## <small>1.23.3 (2025-08-09)</small>

* Bug Fixes: 将@use改为@import ([9cf83d2](https://github.com/sutras/sard-uniapp/commit/9cf83d2))
* Features: 可弹出表单组件新增 resettable 属性 ([dce34de](https://github.com/sutras/sard-uniapp/commit/dce34de))
* Features: 支持渐变色 ([20cd25a](https://github.com/sutras/sard-uniapp/commit/20cd25a))
* Features: 车牌键盘切换按钮添加toggle事件 ([5b3c88d](https://github.com/sutras/sard-uniapp/commit/5b3c88d))

## <small>1.23.2 (2025-07-30)</small>

* Bug Fixes: 修复异步加载数据回显问题 ([76615e4](https://github.com/sutras/sard-uniapp/commit/76615e4))
* Bug Fixes: 允许设置 loaidng 属性 ([5f1f91c](https://github.com/sutras/sard-uniapp/commit/5f1f91c))
* Features: navbar 新增 fixationStyle, fixationClasss 属性 ([bdc70f1](https://github.com/sutras/sard-uniapp/commit/bdc70f1))

## <small>1.23.1 (2025-07-28)</small>

* Bug Fixes: 修复 rate 清空问题 ([ac43638](https://github.com/sutras/sard-uniapp/commit/ac43638))

## 1.23.0 (2025-07-26)

* Features: cascader 新增 allLevels 属性 ([d40fc98](https://github.com/sutras/sard-uniapp/commit/d40fc98))
* Features: crop-image 组件新增 cancel 回调 ([572991f](https://github.com/sutras/sard-uniapp/commit/572991f))
* Features: 新增 FormPlain, FormItemPlain 组件 ([95c6721](https://github.com/sutras/sard-uniapp/commit/95c6721))

## <small>1.22.2 (2025-07-24)</small>

* Features: upload 新增默认插槽 ([73f3658](https://github.com/sutras/sard-uniapp/commit/73f3658))
* Bug Fixes: 优化支付宝端拖拽体验 ([351db34](https://github.com/sutras/sard-uniapp/commit/351db34))
* Bug Fixes: 修复支付宝端获取元素尺寸可能存在失败的问题 ([12c2dfb](https://github.com/sutras/sard-uniapp/commit/12c2dfb))
* Bug Fixes: 隐藏 list-item 单独使用时的上下文警告 ([18fe6bb](https://github.com/sutras/sard-uniapp/commit/18fe6bb))

## <small>1.22.1 (2025-07-19)</small>

* Features: 基于 popout 组件的带有确定按钮的组件添加 confirm 事件 ([d88f36f](https://github.com/sutras/sard-uniapp/commit/d88f36f))
* Features: 所有基于 Popup 和 Popout 组件的组件都添加入场/退场相关事件 ([5178b00](https://github.com/sutras/sard-uniapp/commit/5178b00))

## 1.22.0 (2025-07-15)

* Features: *-input 类组件新增 inputProps 属性 ([837ed51](https://github.com/sutras/sard-uniapp/commit/837ed51))
* Features: *-input 类组件新增arrow插槽和arrow, arrow-family属性 ([6555241](https://github.com/sutras/sard-uniapp/commit/6555241))
* Features: accordion 组件新增 hide-border 属性 ([ae3a093](https://github.com/sutras/sard-uniapp/commit/ae3a093))
* Features: form-item 新增 error 插槽 ([b377e8e](https://github.com/sutras/sard-uniapp/commit/b377e8e))
* Features: input 组件新增 show-eye 属性 ([351a56e](https://github.com/sutras/sard-uniapp/commit/351a56e))
* Features: picker-input 新增 arrow 属性和 arrow 插槽 ([f9fc77f](https://github.com/sutras/sard-uniapp/commit/f9fc77f))
* Features: popout-input 新增 arrow-family 属性 ([a97f280](https://github.com/sutras/sard-uniapp/commit/a97f280))
* Features: popup-input 新增 arrow 属性和 arrow 插槽 ([4756536](https://github.com/sutras/sard-uniapp/commit/4756536))
* Features: 增加 close-on-click-overlay，支持点击遮罩关闭弹出层；visible 支持 v-model ([28e7d27](https://github.com/sutras/sard-uniapp/commit/28e7d27))
* Features: 新增 dnd 组件 ([f9629a1](https://github.com/sutras/sard-uniapp/commit/f9629a1))
* Features: 新增overlayClosable属性 ([d615537](https://github.com/sutras/sard-uniapp/commit/d615537))
* Bug Fixes: 使popup组件在app端能传送到根节点 ([5008ce7](https://github.com/sutras/sard-uniapp/commit/5008ce7))

## <small>1.21.1 (2025-07-05)</small>

* Bug Fixes: 修复 request 查询参数拼接问题 ([53df30d](https://github.com/sutras/sard-uniapp/commit/53df30d))
* Bug Fixes: 替代废弃的 uni.getSystemInfoSync 接口 ([7b7d391](https://github.com/sutras/sard-uniapp/commit/7b7d391))

## 1.21.0 (2025-07-04)

* Features: list 新增隐藏边框属性 ([6fbab69](https://github.com/sutras/sard-uniapp/commit/6fbab69))
* Features: upload组件选择前置允许配置 ([5f2a753](https://github.com/sutras/sard-uniapp/commit/5f2a753))
* Features: 新增瀑布流组件 ([8da700b](https://github.com/sutras/sard-uniapp/commit/8da700b))
* Bug Fixes: upload组件修改beforeChoose，多返回一个参数sourceType，用于区分当前选择项 ([d440c7e](https://github.com/sutras/sard-uniapp/commit/d440c7e))
* Bug Fixes: 修复 fab 图标设置失败问题 ([da00f11](https://github.com/sutras/sard-uniapp/commit/da00f11))

## <small>1.20.2 (2025-07-02)</small>

* Features: dialog, notify, toast 新增事件 ([54e5c4b](https://github.com/sutras/sard-uniapp/commit/54e5c4b))

## <small>1.20.1 (2025-07-02)</small>

* Bug Fixes: 修复upload图片预览失败和remove按钮层级过高问题 ([ea29178](https://github.com/sutras/sard-uniapp/commit/ea29178))

## 1.20.0 (2025-07-01)

* Features: card 组件新增边框相关css变量 ([b838d88](https://github.com/sutras/sard-uniapp/commit/b838d88))
* Features: checkbox-popout 新增搜索和全选功能 ([9457fdd](https://github.com/sutras/sard-uniapp/commit/9457fdd))
* Features: radio-popout 组件新增搜索功能 ([fade336](https://github.com/sutras/sard-uniapp/commit/fade336))
* Features: upload h5 显示真实文件名 ([635805f](https://github.com/sutras/sard-uniapp/commit/635805f))
* Features: upload 组件新增 item-click 事件 ([cc01b3f](https://github.com/sutras/sard-uniapp/commit/cc01b3f))
* Features: 修复slider在支付宝端点击问题 ([76e9fd4](https://github.com/sutras/sard-uniapp/commit/76e9fd4))
* Features: 扩大 DatetimeRangePickerPopout 绑定值的适应性范围,允许绑定空数组 ([087aa7f](https://github.com/sutras/sard-uniapp/commit/087aa7f))
* Features: 新增 case 相关工具函数 ([1c3acaa](https://github.com/sutras/sard-uniapp/commit/1c3acaa))
* Features: 新增 read-more 组件 ([12637b8](https://github.com/sutras/sard-uniapp/commit/12637b8))
* Features: 新增 ResizeSensor 组件 ([7f8697e](https://github.com/sutras/sard-uniapp/commit/7f8697e))
* Features: 新增 ScrollList 组件 ([dacce49](https://github.com/sutras/sard-uniapp/commit/dacce49))
* Features: 新增 sticky 和 sticky-box 组件 ([e99ef87](https://github.com/sutras/sard-uniapp/commit/e99ef87))
* Features: 新增工程化相关工具 ([09fc190](https://github.com/sutras/sard-uniapp/commit/09fc190))
* Features: 新增日期相关工具 ([51807f4](https://github.com/sutras/sard-uniapp/commit/51807f4))
* Code Refactoring: 调整utils函数位置 ([b33691b](https://github.com/sutras/sard-uniapp/commit/b33691b))

## <small>1.19.5 (2025-06-22)</small>

* Features: 新增useLocaleProvide, useLocale钩子函数 ([a374df8](https://github.com/sutras/sard-uniapp/commit/a374df8))

## <small>1.19.4 (2025-06-19)</small>

* Features: calendar 允许修改范围文案 ([ba4debe](https://github.com/sutras/sard-uniapp/commit/ba4debe))

## <small>1.19.3 (2025-06-17)</small>

* Features: dropdown 新增 togglable 属性 ([e46291e](https://github.com/sutras/sard-uniapp/commit/e46291e))
* Features: icon 添加 separate 属性 ([b20d069](https://github.com/sutras/sard-uniapp/commit/b20d069))

## <small>1.19.2 (2025-06-14)</small>

* Bug Fixes: picker 值为空时滚到第一个位置 ([f033ccc](https://github.com/sutras/sard-uniapp/commit/f033ccc))
* Bug Fixes: 修复 picker-popout 首次选择不能获取选项列表问题 ([50cebc7](https://github.com/sutras/sard-uniapp/commit/50cebc7))
* Features: *-input 系列组件新增valueOnClear属性 ([42275cd](https://github.com/sutras/sard-uniapp/commit/42275cd))
* Features: calendar-popout组件新增title和title-prepend插槽 ([f6f8404](https://github.com/sutras/sard-uniapp/commit/f6f8404))
* Features: upload 组件新增 beforeChoose 属性 ([22e3137](https://github.com/sutras/sard-uniapp/commit/22e3137))
* Features: 增加 tag 组件的 mark 属性，支持 'left' 和 'right' 值以控制标记方向 ([77f9fb7](https://github.com/sutras/sard-uniapp/commit/77f9fb7))
* Features: 新增css变量 ([f1b081e](https://github.com/sutras/sard-uniapp/commit/f1b081e))
* Features: 新增图标属性和长按菜单功能 ([62c0d7f](https://github.com/sutras/sard-uniapp/commit/62c0d7f))

## <small>1.19.1 (2025-06-11)</small>

* Features: dropdown 新增 before-close 属性 ([fca24ac](https://github.com/sutras/sard-uniapp/commit/fca24ac))

## 1.19.0 (2025-06-10)

* Bug Fixes: 修复 dialog 命令式回调选项参数问题 ([5af4fd8](https://github.com/sutras/sard-uniapp/commit/5af4fd8))
* Bug Fixes: 修复 form fields 错乱删除问题 ([8250da9](https://github.com/sutras/sard-uniapp/commit/8250da9))
* Bug Fixes: 修复cascader组件因值不存在时不显示列表的问题 ([4bae371](https://github.com/sutras/sard-uniapp/commit/4bae371))
* Bug Fixes: 修复picker最后一列在安卓偏移问题 ([a041836](https://github.com/sutras/sard-uniapp/commit/a041836))
* Code Refactoring: 重构 useSetTimeout ([3f07b30](https://github.com/sutras/sard-uniapp/commit/3f07b30))
* Features: button 新增 square 属性 ([41db4ac](https://github.com/sutras/sard-uniapp/commit/41db4ac))
* Features: dropdown 新增 before-close 属性 ([3407a6b](https://github.com/sutras/sard-uniapp/commit/3407a6b))
* Features: 新增 swipe-action 组件 ([9a390c6](https://github.com/sutras/sard-uniapp/commit/9a390c6))

## 1.18.0 (2025-06-06)

* Features: datetime-picker 组件新增农历类型 ([7b0f305](https://github.com/sutras/sard-uniapp/commit/7b0f305))
* Features: dropdown-item 组件新增显隐动画相关事件 ([83e8c52](https://github.com/sutras/sard-uniapp/commit/83e8c52))
* Features: icon支持冒号分隔符名称属性 ([7ffcd90](https://github.com/sutras/sard-uniapp/commit/7ffcd90))

## <small>1.17.1 (2025-05-30)</small>

* Bug Fixes: 修复Popup在H5 attrs 透传问题 ([4de8765](https://github.com/sutras/sard-uniapp/commit/4de8765))
* Features: steps组件新增自定义内容插槽 ([5f17466](https://github.com/sutras/sard-uniapp/commit/5f17466))

## 1.17.0 (2025-05-29)

* Bug Fixes: 修复popup在h5弹出状态跳转页面仍显示的问题 ([1187368](https://github.com/sutras/sard-uniapp/commit/1187368))
* Features: picker 组件新增 custom 插槽 ([218d384](https://github.com/sutras/sard-uniapp/commit/218d384))
* Features: tree 组件新增单选功能 ([a1fb8a2](https://github.com/sutras/sard-uniapp/commit/a1fb8a2))

## 1.16.0 (2025-05-28)

* Features: 新增7个 *Input 对应的 *Popout 组件 ([c3645d4](https://github.com/sutras/sard-uniapp/commit/c3645d4))
* Features: 新增TabbarPit组件, Tabbar 组件新增fixed和safe-area-inset-bottom属性 ([b9f3197](https://github.com/sutras/sard-uniapp/commit/b9f3197))

## <small>1.15.4 (2025-05-27)</small>

* Bug Fixes: 降低peerDependencies vue的版本 ([518e2aa](https://github.com/sutras/sard-uniapp/commit/518e2aa))

## <small>1.15.3 (2025-05-24)</small>

* Bug Fixes: tabs组件允许name为boolean类型 ([6897055](https://github.com/sutras/sard-uniapp/commit/6897055))

## <small>1.15.2 (2025-05-24)</small>

* Bug Fixes: 内部icon设置固定family ([3c73574](https://github.com/sutras/sard-uniapp/commit/3c73574))

## <small>1.15.1 (2025-05-21)</small>

* Features: dialog beforeClose 新增 loading 参数 ([715a961](https://github.com/sutras/sard-uniapp/commit/715a961))

## <small>1.14.4 (2025-05-16)</small>

* Bug Fixes: 修复 crop-image 弹出问题 ([d7bec84](https://github.com/sutras/sard-uniapp/commit/d7bec84))

## <small>1.14.3 (2025-05-14)</small>

* Bug Fixes: 修复dropdown弹出框问题 ([5eeaf2e](https://github.com/sutras/sard-uniapp/commit/5eeaf2e))

## <small>1.14.2 (2025-05-14)</small>

* Bug Fixes: 使 *-input 弹出式输入框组件只有一个根节点 ([91fe1c0](https://github.com/sutras/sard-uniapp/commit/91fe1c0))

## <small>1.14.1 (2025-05-13)</small>

* Bug Fixes: 修复 popup 组件 transform+fixed 渲染问题 ([5d0bf10](https://github.com/sutras/sard-uniapp/commit/5d0bf10))

## 1.14.0 (2025-05-12)

* Features: cascader 新增 change-on-select 属性 ([71c1329](https://github.com/sutras/sard-uniapp/commit/71c1329))

## <small>1.13.3 (2025-05-12)</small>

* Bug Fixes: 修复tabs组件初始触发change事件问题 ([f9a408b](https://github.com/sutras/sard-uniapp/commit/f9a408b))

## <small>1.13.2 (2025-05-06)</small>

* Bug Fixes: 修复progress-bar inside 时显示问题 ([1e633ed](https://github.com/sutras/sard-uniapp/commit/1e633ed))

## <small>1.13.1 (2025-05-01)</small>

* Bug Fixes: 修复notify显示问题 ([30d3f36](https://github.com/sutras/sard-uniapp/commit/30d3f36))

## 1.13.0 (2025-04-29)

* Features: button 组件新增 icon 功能 ([ff69d30](https://github.com/sutras/sard-uniapp/commit/ff69d30))
* Features: 新增 divider 组件 ([410fe89](https://github.com/sutras/sard-uniapp/commit/410fe89))
* Features: 新增 FloatingPanel 组件 ([ddb6561](https://github.com/sutras/sard-uniapp/commit/ddb6561))

## <small>1.12.5 (2025-04-21)</small>

* Bug Fixes: 修复 table 组件 sass 导入问题 ([238257e](https://github.com/sutras/sard-uniapp/commit/238257e))

## <small>1.12.4 (2025-04-14)</small>

* Features: tabbar-item 组件 icon 插槽新增 active 属性 ([4ccd9cc](https://github.com/sutras/sard-uniapp/commit/4ccd9cc))

## <small>1.12.3 (2025-04-03)</small>

* Features: card 组件新增点击态 ([0eef48e](https://github.com/sutras/sard-uniapp/commit/0eef48e))

## <small>1.12.2 (2025-04-02)</small>

* Features: tabs 等组件新增 change 事件, card 新增 click 事件 ([20fa21c](https://github.com/sutras/sard-uniapp/commit/20fa21c))

## <small>1.12.1 (2025-03-29)</small>

* Bug Fixes: 移除 crop-image 组件 toast 提示，新增button组件 inline 属性 ([64e6474](https://github.com/sutras/sard-uniapp/commit/64e6474))

## 1.12.0 (2025-03-25)

* Bug Fixes: 修复 table 组件右边固定阴影显示问题 ([c6f0e88](https://github.com/sutras/sard-uniapp/commit/c6f0e88))
* Bug Fixes: 修复cascader在支付宝端的展示问题 ([3e713ac](https://github.com/sutras/sard-uniapp/commit/3e713ac))
* Bug Fixes: 修复因uniapp会修改元素id导致获取不到元素的问题 ([45b8070](https://github.com/sutras/sard-uniapp/commit/45b8070))
* Bug Fixes: 允许空字符串作为未选择初始值 ([428b3c5](https://github.com/sutras/sard-uniapp/commit/428b3c5))
* Features: button 组件新增 block 属性 ([6b59144](https://github.com/sutras/sard-uniapp/commit/6b59144))
* Features: grid 组件新增 badge 相关属性 ([4f697a3](https://github.com/sutras/sard-uniapp/commit/4f697a3))
* Features: navbar组件新增属性,修改样式 ([e6039b4](https://github.com/sutras/sard-uniapp/commit/e6039b4))
* Features: 新增 crop-image 组件 ([9bd948a](https://github.com/sutras/sard-uniapp/commit/9bd948a))
* Features: 新增 ScrollSpy 组件 ([cefa8b4](https://github.com/sutras/sard-uniapp/commit/cefa8b4))
* Features: 新增 Sidebar 组件 ([608ec0d](https://github.com/sutras/sard-uniapp/commit/608ec0d))
* Features: 新增 signature 组件 ([f75489d](https://github.com/sutras/sard-uniapp/commit/f75489d))
* Features: 新增 status-bar 组件 ([e005b0c](https://github.com/sutras/sard-uniapp/commit/e005b0c))
* Features: 新增 zIndex 全局配置 ([7945ae9](https://github.com/sutras/sard-uniapp/commit/7945ae9))

## <small>1.11.2 (2025-03-06)</small>

* Bug Fixes: 修复tree组件递归引用问题 ([0a789c6](https://github.com/sutras/sard-uniapp/commit/0a789c6))

## <small>1.11.1 (2025-03-06)</small>

* Bug Fixes: 修复日期时间选择器min, max联动问题 ([fd6c351](https://github.com/sutras/sard-uniapp/commit/fd6c351))

## 1.11.0 (2025-03-04)

* Features: 新增 DatetimeRangePicker 和 DatetimeRangePickerInput 组件 ([8b3d6ee](https://github.com/sutras/sard-uniapp/commit/8b3d6ee))
* Bug Fixes: 修改min, max属性后更新列数据 ([9b6b3f4](https://github.com/sutras/sard-uniapp/commit/9b6b3f4))

## <small>1.10.4 (2025-02-19)</small>

* Bug Fixes: 使用 @import 导入scss, 兼容mp-alipay ([3e1b7b6](https://github.com/sutras/sard-uniapp/commit/3e1b7b6))

## <small>1.10.3 (2025-02-19)</small>

* Bug Fixes: 修复 cascader, cascader-input 组件 ([1ac846d](https://github.com/sutras/sard-uniapp/commit/1ac846d))
* Bug Fixes: 确保 DatetimePickerInput value 格式化, 移除sass警告 ([0ded8f9](https://github.com/sutras/sard-uniapp/commit/0ded8f9))

## <small>1.10.1 (2025-01-08)</small>

* Bug Fixes: 修复全局配置问题 ([b05a52e](https://github.com/sutras/sard-uniapp/commit/b05a52e))

## 1.10.0 (2025-01-01)

* Features: 新增 Space 组件, 新增 Dialog 组件的按钮配置, 新增 valueFormat 属性, 修复已知问题 ([69825ef](https://github.com/sutras/sard-uniapp/commit/69825ef))

## <small>1.9.2 (2024-12-22)</small>

* Features: 表单组件新增change事件 ([cc56e51](https://github.com/sutras/sard-uniapp/commit/cc56e51))

## <small>1.9.1 (2024-12-22)</small>

* Bug Fixes: 修复qrcode 在app端报错的问题 ([486a95f](https://github.com/sutras/sard-uniapp/commit/486a95f))

## 1.9.0 (2024-12-22)

* Features: 新增表格组件 ([6649af4](https://github.com/sutras/sard-uniapp/commit/6649af4))

## <small>1.8.2 (2024-12-06)</small>

* Bug Fixes: 只读时隐藏箭头 ([28f29ac](https://github.com/sutras/sard-uniapp/commit/28f29ac))

## <small>1.8.1 (2024-10-22)</small>

* Bug Fixes: 修复局部导入组件未注册问题 ([225ff82](https://github.com/sutras/sard-uniapp/commit/225ff82))

## 1.8.0 (2024-10-21)

* Features: 按钮添加小程序能力 ([a887361](https://github.com/sutras/sard-uniapp/commit/a887361))

## <small>1.7.1 (2024-09-20)</small>

* Bug Fixes: 修复 input 获取焦点时的光标位置 ([820f248](https://github.com/sutras/sard-uniapp/commit/820f248))

## 1.7.0 (2024-09-18)

* Features: 新增全局配置 ([dbc6444](https://github.com/sutras/sard-uniapp/commit/dbc6444))

## <small>1.6.1 (2024-08-30)</small>

* Bug Fixes: count-down stop timer before unmount ([5a0feb2](https://github.com/sutras/sard-uniapp/commit/5a0feb2))
* Bug Fixes: fix type of 'confirm-hold' in sard-input ([fd6209d](https://github.com/sutras/sard-uniapp/commit/fd6209d))

## 1.6.0 (2024-08-19)

* Features: 新增Fab, FloatingBubble 组件, 优化构建流程 close #39 ([fe28b0a](https://github.com/sutras/sard-uniapp/commit/fe28b0a)), closes [#39](https://github.com/sutras/sard-uniapp/issues/39)
* Features: 新增Tree, Timeline, BackTop 组件 close #36, close #41, close 43 ([f0a0504](https://github.com/sutras/sard-uniapp/commit/f0a0504)), closes [#36](https://github.com/sutras/sard-uniapp/issues/36) [#41](https://github.com/sutras/sard-uniapp/issues/41)

## <small>1.4.1 (2024-08-02)</small>

* Features: search组件新增clear, focus, blur事件 ([5c4f9fe](https://github.com/sutras/sard-uniapp/commit/5c4f9fe))

## 1.4.0 (2024-08-01)

* Features: add qrcode ([4c74b1e](https://github.com/sutras/sard-uniapp/commit/4c74b1e))

## 1.3.0 (2024-07-16)

* Features: 新增radio-input, checkbox-input, alert组件 ([4d2198e](https://github.com/sutras/sard-uniapp/commit/4d2198e))

## <small>1.2.2 (2024-07-13)</small>

* Bug Fixes: lwa copy ([d2ecc78](https://github.com/sutras/sard-uniapp/commit/d2ecc78))
* Bug Fixes: 修复pnpm非扁平化依赖包下lwa依赖问题 close #32 ([904e6bd](https://github.com/sutras/sard-uniapp/commit/904e6bd)), closes [#32](https://github.com/sutras/sard-uniapp/issues/32)

## 1.2.0 (2024-07-11)

* Features: 新增Marquee, LuckyDraw, CountTo组件 ([ce825ae](https://github.com/sutras/sard-uniapp/commit/ce825ae))

## <small>1.1.7 (2024-05-20)</small>

* Bug Fixes: 修复表单内组件的禁用和只读问题 close #27 ([733f010](https://github.com/sutras/sard-uniapp/commit/733f010)), closes [#27](https://github.com/sutras/sard-uniapp/issues/27)

## <small>1.1.6 (2024-05-19)</small>

* Bug Fixes: 修复 notify 组件显示问题、优化文档 ([34f09a6](https://github.com/sutras/sard-uniapp/commit/34f09a6))

## <small>1.1.5 (2024-05-18)</small>

* Bug Fixes: 修复toast&dialog不显示问题 ([37255c5](https://github.com/sutras/sard-uniapp/commit/37255c5))

## <small>1.1.4 (2024-05-17)</small>

* Bug Fixes: 修复input组件字数统计, dialog&toast组件不能显示的问题 close #26,#24 ([fb31059](https://github.com/sutras/sard-uniapp/commit/fb31059)), closes [#26](https://github.com/sutras/sard-uniapp/issues/26) [#24](https://github.com/sutras/sard-uniapp/issues/24)

## <small>1.1.3 (2024-05-11)</small>

* Bug Fixes: 修复下拉刷新组件有时不触发的问题 close #18 ([5ec5044](https://github.com/sutras/sard-uniapp/commit/5ec5044)), closes [#18](https://github.com/sutras/sard-uniapp/issues/18)

## <small>1.1.2 (2024-05-10)</small>

* Bug Fixes: 移除属性选择器  close #23 ([b3c0450](https://github.com/sutras/sard-uniapp/commit/b3c0450)), closes [#23](https://github.com/sutras/sard-uniapp/issues/23)

## <small>1.1.1 (2024-05-05)</small>

* Bug Fixes: 修复upload-preview的image在h5环境下，没有宽度导致图片显示不全 ([71383d3](https://github.com/sutras/sard-uniapp/commit/71383d3))
* Bug Fixes: 修复upload组件图片预览问题 ([0552838](https://github.com/sutras/sard-uniapp/commit/0552838))

## 1.1.0 (2024-05-02)

* Bug Fixes: 修复input组件字数统计问题 close #19 ([4a63701](https://github.com/sutras/sard-uniapp/commit/4a63701)), closes [#19](https://github.com/sutras/sard-uniapp/issues/19)

## 1.1.0-rc.2 (2024-04-27)

## 1.1.0-rc.1 (2024-04-08)

* Features: 新增load-more组件, stepper组件新增size属性 ([d8184c7](https://github.com/sutras/sard-uniapp/commit/d8184c7))

## 1.1.0-beta.1 (2024-04-06)

* Features: 新增pull-down-refresh组件, slider组件新增时间, 重构loading组件, 其他优化 ([c6dc6e4](https://github.com/sutras/sard-uniapp/commit/c6dc6e4))

## <small>1.0.5 (2024-03-30)</small>

* Bug Fixes: 修复打包组件缺少文件的问题 ([915a6af](https://github.com/sutras/sard-uniapp/commit/915a6af))

## <small>1.0.4 (2024-01-12)</small>

* Bug Fixes: 修复打包缺少tag组件的bug ([663ffde](https://github.com/sutras/sard-uniapp/commit/663ffde))

## <small>1.0.2 (2023-12-23)</small>

* Bug Fixes: fixed bugs ([eee4541](https://github.com/sutras/sard-uniapp/commit/eee4541))
* Features: 新增基础组件 ([8e6385e](https://github.com/sutras/sard-uniapp/commit/8e6385e))
* Features: 新增组件 ([5c65aab](https://github.com/sutras/sard-uniapp/commit/5c65aab))
