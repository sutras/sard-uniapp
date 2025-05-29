<template>
  <sar-popup
    :visible="visible"
    :effect="effect"
    @overlay-click="onOverlayClick"
  >
    <view :class="bem.e('content')">
      <sar-button @click="onClick">跳转</sar-button>
    </view>
  </sar-popup>

  <sar-list card>
    <sar-list-item hover arrow title="顶部划出" @click="show('slide-top')" />
    <sar-list-item hover arrow title="右边划出" @click="show('slide-right')" />
    <sar-list-item hover arrow title="底部划出" @click="show('slide-bottom')" />
    <sar-list-item hover arrow title="左边划出" @click="show('slide-left')" />
    <sar-list-item hover arrow title="缩放" @click="show('zoom')" />
    <sar-list-item hover arrow title="淡入淡出" @click="show('fade')" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createBem } from '@/utils'
import { PopupProps } from 'sard-uniapp'

const bem = createBem('popup')

const visible = ref(false)
const effect = ref<PopupProps['effect']>('fade')

const show = (e: PopupProps['effect']) => {
  visible.value = true
  effect.value = e
}

const onOverlayClick = () => {
  visible.value = false
}

const onClick = () => {
  uni.navigateTo({
    url: `/pages/components/form/index`,
  })
}
</script>

<style lang="scss">
@import '@/style/index.scss';

@include bem(popup) {
  @include e(content) {
    flex: 1;
    padding: 40rpx;
    background-color: var(--sar-emphasis-bg);
  }
}
</style>
