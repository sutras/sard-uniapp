<template>
  <doc-page emphasis title="场景1" padding="0">
    <sar-scroll-spy
      v-model:current="current"
      :root-style="{ height: scrollViewHeight }"
    >
      <view style="display: flex">
        <sar-sidebar
          v-model:current="current"
          round
          :root-style="{
            position: 'sticky',
            top: 0,
            height: scrollViewHeight,
          }"
        >
          <sar-sidebar-item
            v-for="(item, i) in list"
            :key="i"
            :name="i"
            :title="item.title"
          />
        </sar-sidebar>

        <view style="flex: 1; min-width: 0; margin: 0 20rpx">
          <view v-for="(item, i) in list" :key="i">
            <sar-scroll-spy-anchor
              :name="i"
              :root-style="{
                position: 'sticky',
                top: 0,
                padding: '10rpx 0',
                background: 'var(--sar-emphasis-bg)',
              }"
            >
              {{ item.title }}
            </sar-scroll-spy-anchor>
            <view>
              <view
                v-for="(_, i) in item.children"
                :key="i"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 200rpx;
                  margin-bottom: 10rpx;
                  background: var(--sar-tertiary-bg);
                "
              >
                {{ i }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </sar-scroll-spy>
  </doc-page>
</template>

<script setup lang="ts">
import { getWindowInfo } from '@/lib'
import { ref } from 'vue'

const statusBarHeight = getWindowInfo().statusBarHeight + 'px'
const navbarHeight = `calc(${statusBarHeight} + var(--sar-navbar-height))`
const scrollViewHeight = `calc(100vh - ${navbarHeight})`

const list = ref(
  Array(20)
    .fill(0)
    .map((_, i) => {
      return {
        title: '标签' + i,
        children: Array(3).fill(0),
      }
    }),
)

const current = ref(0)
</script>
