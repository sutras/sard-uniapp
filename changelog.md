## [1.22.1](https://github.com/sutras/sard-uniapp/compare/v1.22.0...v1.22.1) (2025-07-19)


### Features

* 基于 popout 组件的带有确定按钮的组件添加 confirm 事件 ([d88f36f](https://github.com/sutras/sard-uniapp/commit/d88f36fd2f23a33eb56b2c7fd1f3919558a4f857))
* 所有基于 Popup 和 Popout 组件的组件都添加入场/退场相关事件 ([5178b00](https://github.com/sutras/sard-uniapp/commit/5178b00e0e4b092304013b5639a7f85c52ba65b3))



# [1.22.0](https://github.com/sutras/sard-uniapp/compare/v1.21.1...v1.22.0) (2025-07-15)


### Bug Fixes

* 使popup组件在app端能传送到根节点 ([5008ce7](https://github.com/sutras/sard-uniapp/commit/5008ce7d72f2167b2c8c40b7b9cef16c4420ad69))


### Features

* *-input 类组件新增 inputProps 属性 ([837ed51](https://github.com/sutras/sard-uniapp/commit/837ed514a684c8547e0a23b410912eda6fd8435b))
* *-input 类组件新增arrow插槽和arrow, arrow-family属性 ([6555241](https://github.com/sutras/sard-uniapp/commit/655524171dd619461f4acfccbc3b7f753fc6e1d5))
* accordion 组件新增 hide-border 属性 ([ae3a093](https://github.com/sutras/sard-uniapp/commit/ae3a093df01ab788dee6e51cac551d7d352974dd))
* form-item 新增 error 插槽 ([b377e8e](https://github.com/sutras/sard-uniapp/commit/b377e8e082fcab3e03006a999bed2c2015910f67))
* input 组件新增 show-eye 属性 ([351a56e](https://github.com/sutras/sard-uniapp/commit/351a56ec77fabc44edb788b2e9e06ffdfb5a7cef))
* picker-input 新增 arrow 属性和 arrow 插槽 ([f9fc77f](https://github.com/sutras/sard-uniapp/commit/f9fc77f31fe58f879d97d9fd8c16efced2f4626e))
* popout-input 新增 arrow-family 属性 ([a97f280](https://github.com/sutras/sard-uniapp/commit/a97f28082ab6811dcc1731a01b13446880b3e8e1))
* popup-input 新增 arrow 属性和 arrow 插槽 ([4756536](https://github.com/sutras/sard-uniapp/commit/475653631e0142f9d9779908b5f2919e997abb22))
* **Popup:** 增加 close-on-click-overlay，支持点击遮罩关闭弹出层；visible 支持 v-model ([28e7d27](https://github.com/sutras/sard-uniapp/commit/28e7d2748b02679ca2a744522237fd69f6dedd38))
* 新增 dnd 组件 ([f9629a1](https://github.com/sutras/sard-uniapp/commit/f9629a10baa9b536f5d2ad07f0ef2b8b520d350a))
* 新增overlayClosable属性 ([d615537](https://github.com/sutras/sard-uniapp/commit/d61553721d0e3321ffc6ff8ec53e238c7b88117c))



## [1.21.1](https://github.com/sutras/sard-uniapp/compare/v1.21.0...v1.21.1) (2025-07-05)


### Bug Fixes

* 修复 request 查询参数拼接问题 ([53df30d](https://github.com/sutras/sard-uniapp/commit/53df30d0e8bf0a3c362ca97f06cc8a178458d359))
* 替代废弃的 uni.getSystemInfoSync 接口 ([7b7d391](https://github.com/sutras/sard-uniapp/commit/7b7d391e86e0baf2fce8b550f7d9b5441c2cb40a))



# [1.21.0](https://github.com/sutras/sard-uniapp/compare/v1.20.2...v1.21.0) (2025-07-04)


### Bug Fixes

* upload组件修改beforeChoose，多返回一个参数sourceType，用于区分当前选择项 ([d440c7e](https://github.com/sutras/sard-uniapp/commit/d440c7e166db4987507e642bda8d3fb6aa2a4c9b))
* 修复 fab 图标设置失败问题 ([da00f11](https://github.com/sutras/sard-uniapp/commit/da00f11ce8cd19ab712572d106ce94856739a228))


### Features

* list 新增隐藏边框属性 ([6fbab69](https://github.com/sutras/sard-uniapp/commit/6fbab69ad4e637bc1bb12dea360e12413e398c74))
* upload组件选择前置允许配置 ([5f2a753](https://github.com/sutras/sard-uniapp/commit/5f2a7538f985a85226e52c19aa11699fa1c6aa9f))
* 新增瀑布流组件 ([8da700b](https://github.com/sutras/sard-uniapp/commit/8da700b367a63725f074d4431ac72e26b3e64cae))



## [1.20.2](https://github.com/sutras/sard-uniapp/compare/v1.20.1...v1.20.2) (2025-07-02)


### Features

* dialog, notify, toast 新增事件 ([54e5c4b](https://github.com/sutras/sard-uniapp/commit/54e5c4b8c8240df6dd77edb01bfee9e8ecabae96))



## [1.20.1](https://github.com/sutras/sard-uniapp/compare/v1.20.0...v1.20.1) (2025-07-02)


### Bug Fixes

* 修复upload图片预览失败和remove按钮层级过高问题 ([ea29178](https://github.com/sutras/sard-uniapp/commit/ea291785fe2197d46091a8d10e6da7fdab9d6624))



# [1.20.0](https://github.com/sutras/sard-uniapp/compare/v1.19.5...v1.20.0) (2025-07-01)


### Features

* card 组件新增边框相关css变量 ([b838d88](https://github.com/sutras/sard-uniapp/commit/b838d88930f8200a5ed832e888a11cc8f5942233))
* checkbox-popout 新增搜索和全选功能 ([9457fdd](https://github.com/sutras/sard-uniapp/commit/9457fdd7476f5a6f82a43239c55f8d968ebfd4c9))
* radio-popout 组件新增搜索功能 ([fade336](https://github.com/sutras/sard-uniapp/commit/fade336615fe9402dd4ff81bff8900ef915cb314))
* upload h5 显示真实文件名 ([635805f](https://github.com/sutras/sard-uniapp/commit/635805fec8df90411f190c6a1345f59c47af16e9))
* upload 组件新增 item-click 事件 ([cc01b3f](https://github.com/sutras/sard-uniapp/commit/cc01b3f9283dadae8def7b14d0d65cad40ebc3c9))
* 修复slider在支付宝端点击问题 ([76e9fd4](https://github.com/sutras/sard-uniapp/commit/76e9fd4fe75515b2ec3cf4ceed08fec87ff1388b))
* 扩大 DatetimeRangePickerPopout 绑定值的适应性范围,允许绑定空数组 ([087aa7f](https://github.com/sutras/sard-uniapp/commit/087aa7f3fe2a07cba8333a96ef5842426f26e81b))
* 新增 case 相关工具函数 ([1c3acaa](https://github.com/sutras/sard-uniapp/commit/1c3acaac5a0a95eb57dd7632055843cd9fe6401c))
* 新增 read-more 组件 ([12637b8](https://github.com/sutras/sard-uniapp/commit/12637b897649fb641eff6672df7c79db9128ab69))
* 新增 ResizeSensor 组件 ([7f8697e](https://github.com/sutras/sard-uniapp/commit/7f8697ee1f26dcd5cc55ed3e83c1c40664febc64))
* 新增 ScrollList 组件 ([dacce49](https://github.com/sutras/sard-uniapp/commit/dacce49043332f3a6c143228c23bb92f2285211a))
* 新增 sticky 和 sticky-box 组件 ([e99ef87](https://github.com/sutras/sard-uniapp/commit/e99ef87c4918b1f84142755c19c7e306abaccfb6))
* 新增工程化相关工具 ([09fc190](https://github.com/sutras/sard-uniapp/commit/09fc190a66da6a83cf1b3dd2919ca6132ba6e354))
* 新增日期相关工具 ([51807f4](https://github.com/sutras/sard-uniapp/commit/51807f4a190b5ee3525146c5d7384cc178109796))



## [1.19.5](https://github.com/sutras/sard-uniapp/compare/v1.19.4...v1.19.5) (2025-06-22)


### Features

* 新增useLocaleProvide, useLocale钩子函数 ([a374df8](https://github.com/sutras/sard-uniapp/commit/a374df85f75c1b76e24e1f99ef58c1377ed7b4a5))



## [1.19.4](https://github.com/sutras/sard-uniapp/compare/v1.19.3...v1.19.4) (2025-06-19)


### Features

* calendar 允许修改范围文案 ([ba4debe](https://github.com/sutras/sard-uniapp/commit/ba4debefe74e8a7e9f9ea42141dd421ccc00a082))



## [1.19.3](https://github.com/sutras/sard-uniapp/compare/v1.19.2...v1.19.3) (2025-06-17)


### Features

* dropdown 新增 togglable 属性 ([e46291e](https://github.com/sutras/sard-uniapp/commit/e46291e99307ad977801153547b593ef97a56ee8))
* icon 添加 separate 属性 ([b20d069](https://github.com/sutras/sard-uniapp/commit/b20d0697ec4ef16fabf50e4bae3eab6908d6a572))



## [1.19.2](https://github.com/sutras/sard-uniapp/compare/v1.19.1...v1.19.2) (2025-06-14)


### Bug Fixes

* picker 值为空时滚到第一个位置 ([f033ccc](https://github.com/sutras/sard-uniapp/commit/f033ccc713ec1260d1cb761769ab31ccbc39d808))
* 修复 picker-popout 首次选择不能获取选项列表问题 ([50cebc7](https://github.com/sutras/sard-uniapp/commit/50cebc75c036c8b0bf7ed32cb46338d68716385d))


### Features

* *-input 系列组件新增valueOnClear属性 ([42275cd](https://github.com/sutras/sard-uniapp/commit/42275cd5beec09d7d5fe669c560ae6ad7dfc1b13))
* calendar-popout组件新增title和title-prepend插槽 ([f6f8404](https://github.com/sutras/sard-uniapp/commit/f6f84042f2924f6547bb6273078ada5e08039fd5))
* upload 组件新增 beforeChoose 属性 ([22e3137](https://github.com/sutras/sard-uniapp/commit/22e3137c72e3a16f298dcabbffd2db43268f8a74))
* 增加 tag 组件的 mark 属性，支持 'left' 和 'right' 值以控制标记方向 ([77f9fb7](https://github.com/sutras/sard-uniapp/commit/77f9fb724040d99f7aa2612ccd03c8c6f175de52))
* 新增css变量 ([f1b081e](https://github.com/sutras/sard-uniapp/commit/f1b081ef65c66794dec1d7b4bc6d769676cbdf7f))
* 新增图标属性和长按菜单功能 ([62c0d7f](https://github.com/sutras/sard-uniapp/commit/62c0d7f9d4e085f91c0c745f85b02d90d0cd246e))



## [1.19.1](https://github.com/sutras/sard-uniapp/compare/v1.19.0...v1.19.1) (2025-06-11)


### Features

* dropdown 新增 before-close 属性 ([fca24ac](https://github.com/sutras/sard-uniapp/commit/fca24ac536bc3840fbc9562fde4992f864968080))



# [1.19.0](https://github.com/sutras/sard-uniapp/compare/v1.18.0...v1.19.0) (2025-06-10)


### Bug Fixes

* 修复 dialog 命令式回调选项参数问题 ([5af4fd8](https://github.com/sutras/sard-uniapp/commit/5af4fd81b6528501f2103b8db1b40a14f6186926))
* 修复 form fields 错乱删除问题 ([8250da9](https://github.com/sutras/sard-uniapp/commit/8250da9770152a4f6a93e873c70c01e13c91ce56))
* 修复cascader组件因值不存在时不显示列表的问题 ([4bae371](https://github.com/sutras/sard-uniapp/commit/4bae37167ccd88db3286d3bc233dfa250cfad4f9))
* 修复picker最后一列在安卓偏移问题 ([a041836](https://github.com/sutras/sard-uniapp/commit/a04183687b4291c04a0c5381dbc8fbf0b0f5afba))


### Features

* button 新增 square 属性 ([41db4ac](https://github.com/sutras/sard-uniapp/commit/41db4acd6804f52e02cff5eeb3eaaf005dfc7f5e))
* dropdown 新增 before-close 属性 ([3407a6b](https://github.com/sutras/sard-uniapp/commit/3407a6b5a9cb4038c7d63de9bfdb81498e6afd76))
* 新增 swipe-action 组件 ([9a390c6](https://github.com/sutras/sard-uniapp/commit/9a390c61d036a016d2ee8d706130589e3ca4009c))



# [1.18.0](https://github.com/sutras/sard-uniapp/compare/v1.17.1...v1.18.0) (2025-06-06)


### Features

* datetime-picker 组件新增农历类型 ([7b0f305](https://github.com/sutras/sard-uniapp/commit/7b0f305f57ff43f322ef4a398f95415a5a9e01e0))
* dropdown-item 组件新增显隐动画相关事件 ([83e8c52](https://github.com/sutras/sard-uniapp/commit/83e8c52e996bdc4901ea446b30d9273d0e5e956d))
* icon支持冒号分隔符名称属性 ([7ffcd90](https://github.com/sutras/sard-uniapp/commit/7ffcd9056e006cc353aadf5cb2831edde9515719))



## [1.17.1](https://github.com/sutras/sard-uniapp/compare/v1.17.0...v1.17.1) (2025-05-30)


### Bug Fixes

* 修复Popup在H5 attrs 透传问题 ([4de8765](https://github.com/sutras/sard-uniapp/commit/4de87657580cb6525c1025bc3862d4f4eef3afb1))


### Features

* steps组件新增自定义内容插槽 ([5f17466](https://github.com/sutras/sard-uniapp/commit/5f17466c9370d21f699f0ec691e0ea5f74888188))



# [1.17.0](https://github.com/sutras/sard-uniapp/compare/v1.16.0...v1.17.0) (2025-05-29)


### Bug Fixes

* 修复popup在h5弹出状态跳转页面仍显示的问题 ([1187368](https://github.com/sutras/sard-uniapp/commit/11873685cc8017ec42b4ad02c4d74754d5d3fc6c))


### Features

* picker 组件新增 custom 插槽 ([218d384](https://github.com/sutras/sard-uniapp/commit/218d3841459d65dec29d6cf35fd6fea7c713cca5))
* tree 组件新增单选功能 ([a1fb8a2](https://github.com/sutras/sard-uniapp/commit/a1fb8a2c54ac7fc32e3dab2a416636553893bc2f))



# [1.16.0](https://github.com/sutras/sard-uniapp/compare/v1.15.4...v1.16.0) (2025-05-28)


### Features

* 新增7个 *Input 对应的 *Popout 组件 ([c3645d4](https://github.com/sutras/sard-uniapp/commit/c3645d47c397ed729e43a518ac7036ed29e818e3))
* 新增TabbarPit组件, Tabbar 组件新增fixed和safe-area-inset-bottom属性 ([b9f3197](https://github.com/sutras/sard-uniapp/commit/b9f319799609c82489a71a7f8aec287b6f08b672))



## [1.15.4](https://github.com/sutras/sard-uniapp/compare/v1.15.3...v1.15.4) (2025-05-27)


### Bug Fixes

* 降低peerDependencies vue的版本 ([518e2aa](https://github.com/sutras/sard-uniapp/commit/518e2aa76c1607b7894ca4902a5583f3995259f2))



## [1.15.3](https://github.com/sutras/sard-uniapp/compare/v1.15.2...v1.15.3) (2025-05-24)


### Bug Fixes

* tabs组件允许name为boolean类型 ([6897055](https://github.com/sutras/sard-uniapp/commit/68970555842b6f51649e3c96c5e770390e6e7c40))



## [1.15.2](https://github.com/sutras/sard-uniapp/compare/v1.15.1...v1.15.2) (2025-05-24)


### Bug Fixes

* 内部icon设置固定family ([3c73574](https://github.com/sutras/sard-uniapp/commit/3c735740a6cf33bcb9933c6d0915f2cbfbdd1b37))



## [1.15.1](https://github.com/sutras/sard-uniapp/compare/v1.15.0...v1.15.1) (2025-05-21)


### Features

* dialog beforeClose 新增 loading 参数 ([715a961](https://github.com/sutras/sard-uniapp/commit/715a961ad6de63d68111b95af292bfb22e209434))



## [1.14.4](https://github.com/sutras/sard-uniapp/compare/v1.14.3...v1.14.4) (2025-05-16)


### Bug Fixes

* 修复 crop-image 弹出问题 ([d7bec84](https://github.com/sutras/sard-uniapp/commit/d7bec84ab9746d3f535b1e85187108aeb3872079))



## [1.14.3](https://github.com/sutras/sard-uniapp/compare/v1.14.2...v1.14.3) (2025-05-14)


### Bug Fixes

* 修复dropdown弹出框问题 ([5eeaf2e](https://github.com/sutras/sard-uniapp/commit/5eeaf2edf2a9a02978848fbbd68fc91a00901618))



## [1.14.2](https://github.com/sutras/sard-uniapp/compare/v1.14.1...v1.14.2) (2025-05-14)


### Bug Fixes

* 使 *-input 弹出式输入框组件只有一个根节点 ([91fe1c0](https://github.com/sutras/sard-uniapp/commit/91fe1c0af91cf0aef3f3e7429483613a743e0520))



## [1.14.1](https://github.com/sutras/sard-uniapp/compare/v1.14.0...v1.14.1) (2025-05-13)


### Bug Fixes

* 修复 popup 组件 transform+fixed 渲染问题 ([5d0bf10](https://github.com/sutras/sard-uniapp/commit/5d0bf106df39e9c48c84bd7f76c71bb9306070c9))



# [1.14.0](https://github.com/sutras/sard-uniapp/compare/v1.13.3...v1.14.0) (2025-05-12)


### Features

* cascader 新增 change-on-select 属性 ([71c1329](https://github.com/sutras/sard-uniapp/commit/71c13291780eea13ac7c198ae31a39e0dc49d531))



## [1.13.3](https://github.com/sutras/sard-uniapp/compare/v1.13.2...v1.13.3) (2025-05-12)


### Bug Fixes

* 修复tabs组件初始触发change事件问题 ([f9a408b](https://github.com/sutras/sard-uniapp/commit/f9a408b77cd83dbe62498145daf197b958886c0d))



## [1.13.2](https://github.com/sutras/sard-uniapp/compare/v1.13.1...v1.13.2) (2025-05-06)


### Bug Fixes

* 修复progress-bar inside 时显示问题 ([1e633ed](https://github.com/sutras/sard-uniapp/commit/1e633ed67b41558a122675bc9f35aeda76ecb569))



## [1.13.1](https://github.com/sutras/sard-uniapp/compare/v1.13.0...v1.13.1) (2025-05-01)


### Bug Fixes

* 修复notify显示问题 ([30d3f36](https://github.com/sutras/sard-uniapp/commit/30d3f36c2a9ca31fb2c9103b7195ccdf79bcbbb4))



# [1.13.0](https://github.com/sutras/sard-uniapp/compare/v1.12.5...v1.13.0) (2025-04-29)


### Features

* button 组件新增 icon 功能 ([ff69d30](https://github.com/sutras/sard-uniapp/commit/ff69d302b76c897acc4b639ed82708c6b45a00f1))
* 新增 divider 组件 ([410fe89](https://github.com/sutras/sard-uniapp/commit/410fe895d91a0e811ea9631bb17059fdb10d44b0))
* 新增 FloatingPanel 组件 ([ddb6561](https://github.com/sutras/sard-uniapp/commit/ddb6561ef72cc279a00b890703693298a20086f1))



## [1.12.5](https://github.com/sutras/sard-uniapp/compare/v1.12.4...v1.12.5) (2025-04-21)


### Bug Fixes

* 修复 table 组件 sass 导入问题 ([238257e](https://github.com/sutras/sard-uniapp/commit/238257e1f7bf69c93e62688ebc7e11e8e1553e94))



## [1.12.4](https://github.com/sutras/sard-uniapp/compare/v1.12.3...v1.12.4) (2025-04-14)


### Features

* tabbar-item 组件 icon 插槽新增 active 属性 ([4ccd9cc](https://github.com/sutras/sard-uniapp/commit/4ccd9cce425b57e434943cc410a47e4d12c78d6e))



## [1.12.3](https://github.com/sutras/sard-uniapp/compare/v1.12.2...v1.12.3) (2025-04-03)


### Features

* card 组件新增点击态 ([0eef48e](https://github.com/sutras/sard-uniapp/commit/0eef48e9be15f12f43bc3b28c85ef86d0684c3e1))



## [1.12.2](https://github.com/sutras/sard-uniapp/compare/v1.12.1...v1.12.2) (2025-04-02)


### Features

* tabs 等组件新增 change 事件, card 新增 click 事件 ([20fa21c](https://github.com/sutras/sard-uniapp/commit/20fa21c6b8de0992959befe2971708743c9f3d01))



## [1.12.1](https://github.com/sutras/sard-uniapp/compare/v1.12.0...v1.12.1) (2025-03-29)


### Bug Fixes

* 移除 crop-image 组件 toast 提示，新增button组件 inline 属性 ([64e6474](https://github.com/sutras/sard-uniapp/commit/64e6474ca99b75cc95e99dfdd0d0ef91cac95322))



# [1.12.0](https://github.com/sutras/sard-uniapp/compare/v1.11.2...v1.12.0) (2025-03-25)


### Bug Fixes

* **cascader:** 允许空字符串作为未选择初始值 ([428b3c5](https://github.com/sutras/sard-uniapp/commit/428b3c58bb08fad50dc0e235757e480372ea9ffa))
* 修复 table 组件右边固定阴影显示问题 ([c6f0e88](https://github.com/sutras/sard-uniapp/commit/c6f0e887fdb5028d4f252790b01845e6be6dd59d))
* 修复cascader在支付宝端的展示问题 ([3e713ac](https://github.com/sutras/sard-uniapp/commit/3e713ac2d2399e3e998a87cc2541b73c9137c836))
* 修复因uniapp会修改元素id导致获取不到元素的问题 ([45b8070](https://github.com/sutras/sard-uniapp/commit/45b80701b829ddd1aa00f0dcbb031da6eab01742))


### Features

* button 组件新增 block 属性 ([6b59144](https://github.com/sutras/sard-uniapp/commit/6b59144df3b15a12f9d4d19c711070a7f6d823a7))
* grid 组件新增 badge 相关属性 ([4f697a3](https://github.com/sutras/sard-uniapp/commit/4f697a39debe00d14397c3a6db56bf1d661a101e))
* navbar组件新增属性,修改样式 ([e6039b4](https://github.com/sutras/sard-uniapp/commit/e6039b4b1835a4062c9ce0a173e4666a8eb4fcc6))
* 新增 crop-image 组件 ([9bd948a](https://github.com/sutras/sard-uniapp/commit/9bd948a8dafce3d3d3c11200e4cbba3d5c19466c))
* 新增 ScrollSpy 组件 ([cefa8b4](https://github.com/sutras/sard-uniapp/commit/cefa8b429b2be108ef01f2dbf7edfafe90203dc0))
* 新增 Sidebar 组件 ([608ec0d](https://github.com/sutras/sard-uniapp/commit/608ec0da2f48e537d40b3c098880ebbba8ac2e2b))
* 新增 signature 组件 ([f75489d](https://github.com/sutras/sard-uniapp/commit/f75489d835c502f97218935a6f26f54f05ba6b0a))
* 新增 status-bar 组件 ([e005b0c](https://github.com/sutras/sard-uniapp/commit/e005b0c1a5d7ec1725a47d5f21f24b0652d27de9))
* 新增 zIndex 全局配置 ([7945ae9](https://github.com/sutras/sard-uniapp/commit/7945ae93a0f83be4cf9a090584e2235a58401f05))



## [1.11.2](https://github.com/sutras/sard-uniapp/compare/v1.11.1...v1.11.2) (2025-03-06)


### Bug Fixes

* 修复tree组件递归引用问题 ([0a789c6](https://github.com/sutras/sard-uniapp/commit/0a789c612bb6038d23e95bb3dbc154a4be1dc808))



## [1.11.1](https://github.com/sutras/sard-uniapp/compare/v1.11.0...v1.11.1) (2025-03-06)


### Bug Fixes

* 修复日期时间选择器min, max联动问题 ([fd6c351](https://github.com/sutras/sard-uniapp/commit/fd6c3511154ae736c471013d68f8addc74d06d2f))



# [1.11.0](https://github.com/sutras/sard-uniapp/compare/v1.10.4...v1.11.0) (2025-03-04)


### Bug Fixes

* **datetime-picker:** 修改min, max属性后更新列数据 ([9b6b3f4](https://github.com/sutras/sard-uniapp/commit/9b6b3f4316028cd6453ce9a8b126d01e5d8473f8))


### Features

* 新增 DatetimeRangePicker 和 DatetimeRangePickerInput 组件 ([8b3d6ee](https://github.com/sutras/sard-uniapp/commit/8b3d6ee7e844ebbe78f3b7232bc7a7e9ace27ecd))



## [1.10.4](https://github.com/sutras/sard-uniapp/compare/v1.10.3...v1.10.4) (2025-02-19)


### Bug Fixes

* 使用 [@import](https://github.com/import) 导入scss, 兼容mp-alipay ([3e1b7b6](https://github.com/sutras/sard-uniapp/commit/3e1b7b69ed73f1b3421b2082bd25ed8df1f98a49))



## [1.10.3](https://github.com/sutras/sard-uniapp/compare/v1.10.1...v1.10.3) (2025-02-19)


### Bug Fixes

* 修复 cascader, cascader-input 组件 ([1ac846d](https://github.com/sutras/sard-uniapp/commit/1ac846d66bc91b5b7ed6bb5144e41b5e5082b58e))
* 确保 DatetimePickerInput value 格式化, 移除sass警告 ([0ded8f9](https://github.com/sutras/sard-uniapp/commit/0ded8f9e33a176ddd5f0f2c5dbd90a2c79dfc163))



## [1.10.1](https://github.com/sutras/sard-uniapp/compare/v1.10.0...v1.10.1) (2025-01-08)


### Bug Fixes

* 修复全局配置问题 ([b05a52e](https://github.com/sutras/sard-uniapp/commit/b05a52e80e2fa14a4851c3fddfb64506f04325a7))



# [1.10.0](https://github.com/sutras/sard-uniapp/compare/v1.9.2...v1.10.0) (2025-01-01)


### Features

* 新增 Space 组件, 新增 Dialog 组件的按钮配置, 新增 valueFormat 属性, 修复已知问题 ([69825ef](https://github.com/sutras/sard-uniapp/commit/69825efbc99a2767acb314fb8763f7f015d3ee3b))



## [1.9.2](https://github.com/sutras/sard-uniapp/compare/v1.9.1...v1.9.2) (2024-12-22)


### Features

* 表单组件新增change事件 ([cc56e51](https://github.com/sutras/sard-uniapp/commit/cc56e5121e825e65ee573291ed07df18ad9d2d49))



## [1.9.1](https://github.com/sutras/sard-uniapp/compare/v1.9.0...v1.9.1) (2024-12-22)


### Bug Fixes

* 修复qrcode 在app端报错的问题 ([486a95f](https://github.com/sutras/sard-uniapp/commit/486a95fb0fa14acdb3df96958216dbca84d148c4))



# [1.9.0](https://github.com/sutras/sard-uniapp/compare/v1.8.2...v1.9.0) (2024-12-22)


### Features

* 新增表格组件 ([6649af4](https://github.com/sutras/sard-uniapp/commit/6649af4096b07d8b77d6fcd1f70abe8562cacd8b))



## [1.8.2](https://github.com/sutras/sard-uniapp/compare/v1.8.1...v1.8.2) (2024-12-06)


### Bug Fixes

* **PopoutInput:** 只读时隐藏箭头 ([28f29ac](https://github.com/sutras/sard-uniapp/commit/28f29ac4274f8d74e0f61bf62f04fcc1d8b4f64d))



## [1.8.1](https://github.com/sutras/sard-uniapp/compare/v1.8.0...v1.8.1) (2024-10-22)


### Bug Fixes

* 修复局部导入组件未注册问题 ([225ff82](https://github.com/sutras/sard-uniapp/commit/225ff82510cd0c41fe932d0207bcfa2e824e9478))



# [1.8.0](https://github.com/sutras/sard-uniapp/compare/v1.7.1...v1.8.0) (2024-10-21)


### Features

* 按钮添加小程序能力 ([a887361](https://github.com/sutras/sard-uniapp/commit/a887361fd35e758b271f23c3ad6a6d0404b19969))



## [1.7.1](https://github.com/sutras/sard-uniapp/compare/v1.7.0...v1.7.1) (2024-09-20)


### Bug Fixes

* 修复 input 获取焦点时的光标位置 ([820f248](https://github.com/sutras/sard-uniapp/commit/820f24898f47ff99c414d39f10ab5b9fcf05678b))



# [1.7.0](https://github.com/sutras/sard-uniapp/compare/v1.6.1...v1.7.0) (2024-09-18)


### Features

* 新增全局配置 ([dbc6444](https://github.com/sutras/sard-uniapp/commit/dbc64443ec9528cc039be6631be927fc30592967))



## [1.6.1](https://github.com/sutras/sard-uniapp/compare/v1.6.0...v1.6.1) (2024-08-30)


### Bug Fixes

* count-down stop timer before unmount ([5a0feb2](https://github.com/sutras/sard-uniapp/commit/5a0feb243384bd21022f930412161af36bd58ae1))
* fix type of 'confirm-hold' in sard-input ([fd6209d](https://github.com/sutras/sard-uniapp/commit/fd6209d31a75a72d60c04cb7da927ca36b211594))



# [1.6.0](https://github.com/sutras/sard-uniapp/compare/v1.4.1...v1.6.0) (2024-08-19)


### Features

* 新增Fab, FloatingBubble 组件, 优化构建流程 close [#39](https://github.com/sutras/sard-uniapp/issues/39) ([fe28b0a](https://github.com/sutras/sard-uniapp/commit/fe28b0aeb3a60f8b4d3f74a7d16ceb0fb4ccf295))
* 新增Tree, Timeline, BackTop 组件 close [#36](https://github.com/sutras/sard-uniapp/issues/36), close [#41](https://github.com/sutras/sard-uniapp/issues/41), close 43 ([f0a0504](https://github.com/sutras/sard-uniapp/commit/f0a0504f03a8eac84f926e2e01a61bc31de59057))



## [1.4.1](https://github.com/sutras/sard-uniapp/compare/v1.4.0...v1.4.1) (2024-08-02)


### Features

* search组件新增clear, focus, blur事件 ([5c4f9fe](https://github.com/sutras/sard-uniapp/commit/5c4f9febfc320acc38147e37779e964825f88692))



# [1.4.0](https://github.com/sutras/sard-uniapp/compare/v1.3.0...v1.4.0) (2024-08-01)


### Features

* add qrcode ([4c74b1e](https://github.com/sutras/sard-uniapp/commit/4c74b1e6c0618178699d78b7b39c6a66ac2ecce4))



# [1.3.0](https://github.com/sutras/sard-uniapp/compare/v1.2.2...v1.3.0) (2024-07-16)


### Features

* 新增radio-input, checkbox-input, alert组件 ([4d2198e](https://github.com/sutras/sard-uniapp/commit/4d2198ec97915630d025ed820fcedc5978e1748d))



## [1.2.2](https://github.com/sutras/sard-uniapp/compare/v1.2.0...v1.2.2) (2024-07-13)


### Bug Fixes

* lwa copy ([d2ecc78](https://github.com/sutras/sard-uniapp/commit/d2ecc788d364440f3a2b396b6222f7df96e40fa0))
* 修复pnpm非扁平化依赖包下lwa依赖问题 close [#32](https://github.com/sutras/sard-uniapp/issues/32) ([904e6bd](https://github.com/sutras/sard-uniapp/commit/904e6bd15fc8d6a8fe6b329f26509cbbdc975700))



# [1.2.0](https://github.com/sutras/sard-uniapp/compare/v1.1.7...v1.2.0) (2024-07-11)


### Features

* 新增Marquee, LuckyDraw, CountTo组件 ([ce825ae](https://github.com/sutras/sard-uniapp/commit/ce825ae7cac423c75bcc036bf59916af5bd1ed8b))



## [1.1.7](https://github.com/sutras/sard-uniapp/compare/v1.1.6...v1.1.7) (2024-05-20)


### Bug Fixes

* 修复表单内组件的禁用和只读问题 close [#27](https://github.com/sutras/sard-uniapp/issues/27) ([733f010](https://github.com/sutras/sard-uniapp/commit/733f010348cfb48e4d0c9470c7b9d977f082809c))



## [1.1.6](https://github.com/sutras/sard-uniapp/compare/v1.1.5...v1.1.6) (2024-05-19)


### Bug Fixes

* 修复 notify 组件显示问题、优化文档 ([34f09a6](https://github.com/sutras/sard-uniapp/commit/34f09a662ebceb1f610eb658a9b2089ee31290f7))



## [1.1.5](https://github.com/sutras/sard-uniapp/compare/v1.1.4...v1.1.5) (2024-05-18)


### Bug Fixes

* 修复toast&dialog不显示问题 ([37255c5](https://github.com/sutras/sard-uniapp/commit/37255c5994e5416b41997f7b336ec13593fafdb7))



## [1.1.4](https://github.com/sutras/sard-uniapp/compare/v1.1.3...v1.1.4) (2024-05-17)


### Bug Fixes

* 修复input组件字数统计, dialog&toast组件不能显示的问题 close [#26](https://github.com/sutras/sard-uniapp/issues/26),[#24](https://github.com/sutras/sard-uniapp/issues/24) ([fb31059](https://github.com/sutras/sard-uniapp/commit/fb31059cb4937cc4d2e47433905d485a38db92c4))



## [1.1.3](https://github.com/sutras/sard-uniapp/compare/v1.1.2...v1.1.3) (2024-05-11)


### Bug Fixes

* 修复下拉刷新组件有时不触发的问题 close [#18](https://github.com/sutras/sard-uniapp/issues/18) ([5ec5044](https://github.com/sutras/sard-uniapp/commit/5ec5044ffd58238651d380cb7d4debeea3bf6d80))



## [1.1.2](https://github.com/sutras/sard-uniapp/compare/v1.1.1...v1.1.2) (2024-05-10)


### Bug Fixes

* 移除属性选择器  close [#23](https://github.com/sutras/sard-uniapp/issues/23) ([b3c0450](https://github.com/sutras/sard-uniapp/commit/b3c045022188366be5552bc84170dba2a432fd56))



## [1.1.1](https://github.com/sutras/sard-uniapp/compare/v1.1.0...v1.1.1) (2024-05-05)


### Bug Fixes

* 修复upload-preview的image在h5环境下，没有宽度导致图片显示不全 ([71383d3](https://github.com/sutras/sard-uniapp/commit/71383d3cd338796aa9118613e993fa89f20e9897))
* 修复upload组件图片预览问题 ([0552838](https://github.com/sutras/sard-uniapp/commit/0552838b427bdc58c82ae21cb70e73b7cc9b743c))



# [1.1.0](https://github.com/sutras/sard-uniapp/compare/v1.1.0-rc.2...v1.1.0) (2024-05-02)


### Bug Fixes

* 修复input组件字数统计问题 close [#19](https://github.com/sutras/sard-uniapp/issues/19) ([4a63701](https://github.com/sutras/sard-uniapp/commit/4a63701223abe8aee49efbbf9212ec8ce8358dae))



# [1.1.0-rc.2](https://github.com/sutras/sard-uniapp/compare/v1.1.0-rc.1...v1.1.0-rc.2) (2024-04-27)



# [1.1.0-rc.1](https://github.com/sutras/sard-uniapp/compare/v1.1.0-beta.1...v1.1.0-rc.1) (2024-04-08)


### Features

* 新增load-more组件, stepper组件新增size属性 ([d8184c7](https://github.com/sutras/sard-uniapp/commit/d8184c7cc3ad7eb98b86511d3b1ec5b1cd1f3453))



# [1.1.0-beta.1](https://github.com/sutras/sard-uniapp/compare/v1.0.5...v1.1.0-beta.1) (2024-04-06)


### Features

* 新增pull-down-refresh组件, slider组件新增时间, 重构loading组件, 其他优化 ([c6dc6e4](https://github.com/sutras/sard-uniapp/commit/c6dc6e41c49a84e85310d64efd1889cd9a18aa0a))



## [1.0.5](https://github.com/sutras/sard-uniapp/compare/v1.0.4...v1.0.5) (2024-03-30)


### Bug Fixes

* 修复打包组件缺少文件的问题 ([915a6af](https://github.com/sutras/sard-uniapp/commit/915a6af9619a0c5fdafb8477bc96fd71ceabd512))



## [1.0.4](https://github.com/sutras/sard-uniapp/compare/v1.0.2...v1.0.4) (2024-01-12)


### Bug Fixes

* **sard-uniapp:** 修复打包缺少tag组件的bug ([663ffde](https://github.com/sutras/sard-uniapp/commit/663ffdeb7b5cbdc527ee89e503cf1787a7ff2097))



## [1.0.2](https://github.com/sutras/sard-uniapp/compare/8e6385edfd0406aba96920eb1ee68432f1c714f9...v1.0.2) (2023-12-23)


### Bug Fixes

* **global:** fixed bugs ([eee4541](https://github.com/sutras/sard-uniapp/commit/eee4541b05b5f5f7bfa08e36d9dbead784b24861))


### Features

* **global:** 新增组件 ([5c65aab](https://github.com/sutras/sard-uniapp/commit/5c65aab0860885324b93cac83817905f3a0df66c))
* 新增基础组件 ([8e6385e](https://github.com/sutras/sard-uniapp/commit/8e6385edfd0406aba96920eb1ee68432f1c714f9))



