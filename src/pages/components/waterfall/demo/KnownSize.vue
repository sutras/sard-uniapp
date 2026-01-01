<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="已知宽高">
    <sar-waterfall class="mx-32">
      <sar-waterfall-item v-for="(item, index) in list" :key="index">
        <template #default="{ onLoad }">
          <sar-waterfall-load
            :width="item.img.width"
            :height="item.img.height"
            @load="onLoad"
          >
            <SimulatedImage class="w-full h-full pt-0" :meta="item.img" />
          </sar-waterfall-load>
          <view class="mt-10">{{ item.title }}</view>
        </template>
      </sar-waterfall-item>
    </sar-waterfall>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { random } from 'sard-uniapp'
import { onMounted, ref } from 'vue'
import SimulatedImage from './SimulatedImage.vue'
import { text } from '../../read-more/demo/data'

interface ListItem {
  title: string
  img: {
    width: number
    height: number
  }
}

const list = ref<ListItem[]>([])

const getData = () => {
  return new Promise<ListItem[]>((resolve) => {
    const data = Array(20)
      .fill(0)
      .map(() => {
        const min = 20
        const max = 50
        const startIndex = random(0, text.length - max)
        const length = random(min, max)
        return {
          title: text.slice(startIndex, startIndex + length),
          img: {
            width: random(100, 500),
            height: random(100, 500),
          },
        }
      })
    resolve(data)
  })
}

onMounted(async () => {
  list.value.push(...(await getData()))
})
const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
