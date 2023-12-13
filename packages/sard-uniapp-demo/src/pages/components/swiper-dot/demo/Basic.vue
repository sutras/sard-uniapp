<template>
  <view style="position: relative">
    <swiper
      :current="current"
      @change="current = $event.detail.current"
      autoplay
      :interval="3000"
    >
      <swiper-item class="slide slide1">1</swiper-item>
      <swiper-item class="slide slide2">2</swiper-item>
      <swiper-item class="slide slide3">3</swiper-item>
    </swiper>
    <sar-swiper-dot
      :current="current"
      :type="type"
      :list="list"
      field="title"
    />
  </view>

  <sar-radio-group v-model="type" root-style="margin-top: 40rpx">
    <template #custom="{ toggle }">
      <sar-list card>
        <sar-list-item
          v-for="(item, i) in typeList"
          :key="i"
          :title="item"
          hover
          @click="toggle(item)"
        >
          <template #icon>
            <sar-radio readonly :value="item" />
          </template>
        </sar-list-item>
      </sar-list>
    </template>
  </sar-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type SwiperDotProps } from '@sard/uniapp'

const current = ref(0)
const list = [
  {
    title: '老夫聊发少年狂，左牵黄，右擎苍，锦帽貂裘，千骑卷平冈。',
  },
  {
    title: '为报倾城随太守，亲射虎，看孙郎。',
  },
  {
    title:
      '酒酣胸胆尚开张。鬓微霜，又何妨！持节云中，何日遣冯唐？会挽雕弓如满月，西北望，射天狼。',
  },
]
const type = ref<SwiperDotProps['type']>('dot')
const typeList = ['dot', 'dot-bar', 'index', 'title', 'fraction']
</script>

<style lang="scss" scoped>
.slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 120rpx;
  font-weight: bold;
  color: var(--sar-white);
}
.slide1 {
  background-color: rgba(var(--sar-red-rgb), 0.3);
}
.slide2 {
  background-color: rgba(var(--sar-green-rgb), 0.3);
}
.slide3 {
  background-color: rgba(var(--sar-blue-rgb), 0.3);
}
</style>
