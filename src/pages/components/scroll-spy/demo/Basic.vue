<template>
  <view>当前 anchor: {{ current }}</view>
  <sar-button root-style="margin: 10rpx 0" @click="current = 2">
    设置当前 anchor 为: 2
  </sar-button>
  <sar-scroll-spy
    v-model:current="current"
    root-style="height: 400rpx; border: 1px solid var(--sar-border-color)"
  >
    <template v-for="item in list" :key="item.name">
      <sar-scroll-spy-anchor :name="item.name" />
      <view class="title">{{ item.title }}</view>
      <view class="content">{{ item.content }}</view>
    </template>
  </sar-scroll-spy>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let id = 0

const list = ref(
  Array(4)
    .fill(0)
    .map(() => {
      id++
      return {
        title: 'title' + id,
        content: 'content' + id,
        name: id,
      }
    }),
)

const current = ref(1)
</script>

<style lang="scss" scoped>
.title {
  position: sticky;
  top: 0;
  padding: 10rpx;
  background-color: var(--sar-emphasis-bg);
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400rpx;
  background-color: var(--sar-tertiary-bg);
  margin: 20rpx;
}
</style>
