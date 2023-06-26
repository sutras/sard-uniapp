<template>
  <doc-card v-for="group in menus" :key="group.title" :title="group.title">
    <sar-cell-group inlaid>
      <sar-cell
        v-for="comp in group.children"
        :key="comp.title"
        :title="comp.title"
        isLink
        @click="navigateTo(comp.name)"
      ></sar-cell>
    </sar-cell-group>
  </doc-card>
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
      {
        title: 'Loading 加载',
        name: 'loading',
      },
      {
        title: 'Style 样式',
        name: 'style',
      },
    ],
  },
  {
    title: '布局',
    children: [
      {
        title: 'Grid 栅格',
        name: 'grid',
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
        title: 'Cascader 级联选择',
        name: 'cascader',
      },
      {
        title: 'Checkbox 复选框',
        name: 'checkbox',
      },
      {
        title: 'DatetimePicker 日期时间选择器',
        name: 'datetimePicker',
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
        title: 'NumberKeyboard 数字键盘',
        name: 'numberKeyboard',
      },
      {
        title: 'PasswordInput 密码输入框',
        name: 'passwordInput',
      },
      {
        title: 'Picker 选择器',
        name: 'picker',
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
        title: 'Slider 滑动器选择器',
        name: 'slider',
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
        title: 'Cell 单元格',
        name: 'cell',
      },
      {
        title: 'CountDown 倒计时',
        name: 'countDown',
      },
      {
        title: 'Empty 空状态',
        name: 'empty',
      },
      {
        title: 'ImagePreview 图片预览',
        name: 'imagePreview',
      },
      {
        title: 'ProgressBar 条形进度条',
        name: 'progressBar',
      },
      {
        title: 'ProgressCircle 环形进度条',
        name: 'progressCircle',
      },
      {
        title: 'Swiper 滑块视图容器',
        name: 'swiper',
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
        title: 'IndexBar 索引栏',
        name: 'indexBar',
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
        name: 'actionSheet',
      },
      {
        title: 'Dialog 对话框',
        name: 'dialog',
      },
      {
        title: 'Dropdown 下拉菜单',
        name: 'dropdown',
      },
      {
        title: 'Notify 通知栏',
        name: 'notify',
      },
      {
        title: 'Result 结果',
        name: 'result',
      },
      {
        title: 'ShareSheet 分享面板',
        name: 'shareSheet',
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
    title: '底层组件',
    children: [
      {
        title: 'Movable 可移动的',
        name: 'movable',
      },
      {
        title: 'Collapse 折叠',
        name: 'collapse',
      },
      {
        title: 'Popout 弹出框',
        name: 'popout',
      },
      {
        title: 'Popup 弹出层',
        name: 'popup',
      },
      {
        title: 'Transition 过渡',
        name: 'transition',
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
