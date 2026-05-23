<template>
  <view
    :class="classNames(bem.b(), bem.m('emphasis', emphasis))"
    :style="{
      padding: padding || '',
      height: height || '',
      paddingBottom: paddingBottom || '',
    }"
  >
    <sar-toast-agent />
    <sar-dialog-agent />
    <sar-notify-agent status-bar />
    <sar-action-sheet-agent />
    <sar-share-sheet-agent />
    <sar-navbar
      :title="title"
      show-back
      fixed
      :flow="isAlipay"
      status-bar
      :root-style="{
        '--sar-navbar-bg': navbarBg || 'var(--sar-body-bg)',
        '--sar-navbar-item-color': 'var(--sar-body-color)',
      }"
      @back="onBack"
    >
      <template #right>
        <sar-popover :options="langOptions" @select="onSelect">
          <sar-popover-reference>
            <sar-navbar-item
              :root-style="{ '--sar-navbar-item-color': 'var(--sar-primary)' }"
              :text="localeText"
            />
          </sar-popover-reference>
        </sar-popover>
      </template>
    </sar-navbar>
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { createBem } from '@/utils'
import { classNames, isAlipay, MenuOption, useLocale } from 'sard-uniapp'
import { computed } from 'vue'

defineProps<{
  emphasis?: boolean
  title?: string
  navbarBg?: string
  padding?: string
  paddingBottom?: string
  height?: string
}>()

const bem = createBem('page')

const locale = useLocale()!

const onBack = () => {
  uni.navigateBack()
}

const langOptions = [
  { text: '中文', value: 'zhCN' },
  { text: 'English', value: 'enUS' },
  { text: 'العربية', value: 'arSA' },
]

const localeText = computed(
  () => langOptions.find((item) => item.value === locale.value)!.text,
)

const onSelect = (option: MenuOption) => {
  locale.value = option.value
}
</script>

<style lang="scss">
@import '@/style/index.scss';

@include bem(page) {
  @include b() {
    box-sizing: border-box;
    padding: 20rpx 0 calc(20rpx + env(safe-area-inset-bottom));
    min-height: calc(100vh - var(--sar-navbar-height));
  }

  @include m(emphasis) {
    background-color: var(--sar-emphasis-bg);
  }
}
</style>
