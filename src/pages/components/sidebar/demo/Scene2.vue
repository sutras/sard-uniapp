<template>
  <doc-page emphasis padding="0" title="场景2">
    <sar-scroll-spy
      v-model:current="current"
      :root-style="{ height: scrollViewHeight }"
      :offset="44"
    >
      <view
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 150px;
          margin: 10px;
          font-size: 64rpx;
          background: var(--sar-tertiary-bg);
        "
      >
        Banner
      </view>

      <view
        style="
          position: sticky;
          top: 0;
          z-index: 10;
          background: var(--sar-emphasis-bg);
        "
      >
        <sar-tabs :current="0" scrollable :list="tabList"></sar-tabs>
      </view>

      <view style="display: flex">
        <sar-sidebar
          v-model:current="current"
          round
          :root-style="{
            position: 'sticky',
            top: stickyTop,
            height: `calc(${scrollViewHeight} - ${stickyTop})`,
          }"
          :scroll-into-view-options="{ endOffset: 80 }"
        >
          <sar-sidebar-item
            v-for="(item, i) in list"
            :key="i"
            :name="i"
            :title="item.title"
          />
          <view style="height: 160rpx"></view>
        </sar-sidebar>

        <view style="flex: 1; min-width: 0; margin: 0 20rpx">
          <view v-for="(item, i) in list" :key="i">
            <sar-scroll-spy-anchor
              :name="i"
              :root-style="{
                position: 'sticky',
                top: stickyTop,
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

          <view style="height: 160rpx"></view>
        </view>
      </view>
    </sar-scroll-spy>

    <view
      style="
        position: fixed;
        bottom: 30rpx;
        left: 30rpx;
        right: 30rpx;
        z-index: 10;
        height: 100rpx;
        border-radius: 12rpx;
        background: var(--sar-emphasis-bg);
        box-shadow: var(--sar-shadow-xl);
      "
    ></view>
  </doc-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
const navbarHeight = `calc(${statusBarHeight} + var(--sar-navbar-height))`
const scrollViewHeight = `calc(100vh - ${navbarHeight})`
const stickyTop = `var(--sar-tabs-tab-height)`

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
const tabList = [{ title: '标签0' }, { title: '标签1' }, { title: '标签2' }]
</script>
