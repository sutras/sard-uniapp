<template>
  <sar-list v-for="group in menus" card :key="group.title" :title="group.title">
    <sar-list-item
      v-for="comp in group.children"
      :key="comp.title"
      :title="comp.title"
      hover
      arrow
      @click="navigateTo(comp.name)"
    ></sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
const menus = [
  {
    title: '基础组件',
    children: [
      {
        title: 'Button 按钮',
        name: 'button',
      },
      {
        title: 'Icon 图标',
        name: 'icon',
      },
    ],
  },
  {
    title: '布局',
    children: [
      {
        title: 'Grid 宫格',
        name: 'grid',
      },
      {
        title: 'Layout 布局',
        name: 'layout',
      },
    ],
  },
  {
    title: '表单组件',
    children: [
      {
        title: 'Calendar 日历',
        name: 'calendar',
      },
      {
        title: 'CalendarInput 日历输入框',
        name: 'calendar-input',
      },
      {
        title: 'Cascader 级联选择',
        name: 'cascader',
      },
      {
        title: 'CascaderInput 级联输入框',
        name: 'cascader-input',
      },
      {
        title: 'Checkbox 复选框',
        name: 'checkbox',
      },
      {
        title: 'DatetimePicker 日期时间选择器',
        name: 'datetime-picker',
      },
      {
        title: 'DatetimePickerInput 日期时间输入框',
        name: 'datetime-picker-input',
      },
      {
        title: 'Form 表单',
        name: 'form',
      },
      {
        title: 'Input 输入框',
        name: 'input',
      },
      {
        title: 'Keyboard 键盘',
        name: 'keyboard',
      },
      {
        title: 'PasswordInput 密码输入框',
        name: 'password-input',
      },
      {
        title: 'Picker 选择器',
        name: 'picker',
      },
      {
        title: 'PickerInput 选择器输入框',
        name: 'picker-input',
      },
      {
        title: 'PopoutInput 弹出式输入框',
        name: 'popout-input',
      },
      {
        title: 'Radio 单选按钮',
        name: 'radio',
      },
      {
        title: 'Rate 评分',
        name: 'rate',
      },
      {
        title: 'Search 搜索',
        name: 'search',
      },
      {
        title: 'Slider 滑动器选择器',
        name: 'slider',
      },
      {
        title: 'Stepper 步进器',
        name: 'stepper',
      },
      {
        title: 'Switch 开关',
        name: 'switch',
      },
      {
        title: 'Upload 上传',
        name: 'upload',
      },
    ],
  },
  {
    title: '数据展示',
    children: [
      {
        title: 'Avatar 头像',
        name: 'avatar',
      },
      {
        title: 'Accordion 手风琴',
        name: 'accordion',
      },
      {
        title: 'Badge 徽标',
        name: 'badge',
      },
      {
        title: 'Card 卡片',
        name: 'card',
      },
      {
        title: 'Collapse 折叠',
        name: 'collapse',
      },
      {
        title: 'CountDown 倒计时',
        name: 'count-down',
      },
      {
        title: 'CountTo 数字滚动',
        name: 'count-to',
      },
      {
        title: 'List 列表',
        name: 'list',
      },
      {
        title: 'LuckyDraw 幸运抽奖',
        name: 'lucky-draw',
      },
      {
        title: 'Empty 空状态',
        name: 'empty',
      },
      {
        title: 'NoticeBar 公告栏',
        name: 'notice-bar',
      },
      {
        title: 'Popout 弹出框',
        name: 'popout',
      },
      {
        title: 'Popover 气泡弹出框',
        name: 'popover',
      },
      {
        title: 'Popup 弹出层',
        name: 'popup',
      },
      {
        title: 'ProgressBar 条形进度条',
        name: 'progress-bar',
      },
      {
        title: 'ProgressCircle 环形进度条',
        name: 'progress-circle',
      },
      {
        title: 'SwiperDot 轮播图指示点',
        name: 'swiper-dot',
      },
      {
        title: 'Tag 标签',
        name: 'tag',
      },
    ],
  },
  {
    title: '导航组件',
    children: [
      {
        title: 'Dropdown 下拉菜单',
        name: 'dropdown',
      },
      {
        title: 'Indexes 索引',
        name: 'indexes',
      },
      {
        title: 'Navbar 头部导航',
        name: 'navbar',
      },
      {
        title: 'Pagination 分页',
        name: 'pagination',
      },
      {
        title: 'Steps 步骤条',
        name: 'steps',
      },
      {
        title: 'Tabbar 标签栏',
        name: 'tabbar',
      },
      {
        title: 'Tabs 标签页',
        name: 'tabs',
      },
    ],
  },
  {
    title: '反馈组件',
    children: [
      {
        title: 'ActionSheet 动作面板',
        name: 'action-sheet',
      },
      {
        title: 'Dialog 对话框',
        name: 'dialog',
      },
      {
        title: 'Loading 加载',
        name: 'loading',
      },
      {
        title: 'LoadMore 加载更多',
        name: 'load-more',
      },
      {
        title: 'Notify 消息通知',
        name: 'notify',
      },
      {
        title: 'Overlay 遮罩层',
        name: 'overlay',
      },
      {
        title: 'PullDownRefresh 下拉刷新',
        name: 'pull-down-refresh',
      },
      {
        title: 'Result 结果',
        name: 'result',
      },
      {
        title: 'ShareSheet 分享面板',
        name: 'share-sheet',
      },
      {
        title: 'Skeleton 骨架屏',
        name: 'skeleton',
      },
      {
        title: 'Toast 轻提示',
        name: 'toast',
      },
    ],
  },
  {
    title: '活动组件',
    children: [
      {
        title: 'LuckyDraw 幸运抽奖',
        name: 'lucky-draw',
      },
      {
        title: 'Marquee 跑马灯',
        name: 'marquee',
      },
    ],
  },
]

const navigateTo = (name: string) => {
  uni.navigateTo({
    url: `/pages/components/${name}/index`,
  })
}
</script>

<style lang="scss"></style>
