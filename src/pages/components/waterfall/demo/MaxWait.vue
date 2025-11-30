<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="最大等待时间">
    <sar-waterfall class="mx-32" @load="onLoad">
      <sar-waterfall-item v-for="(item, index) in list" :key="index">
        <template #default="{ onLoad }">
          <sar-waterfall-load
            :width="100"
            :height="100"
            :max-wait="300"
            @load="onLoad"
          >
            <template #default="{ onLoad, overtime }">
              <image
                mode="aspectFill"
                class="flex w-full h-full"
                :src="item.url"
                @load="onLoad"
                @error="onLoad"
              />
              <sar-tag
                v-if="overtime"
                theme="danger"
                mark="right"
                class="absolute top-0 left-0"
              >
                超时
              </sar-tag>
            </template>
          </sar-waterfall-load>
          <view class="mt-10 text-base">{{ item.title }}</view>
        </template>
      </sar-waterfall-item>
    </sar-waterfall>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock } from 'sard-uniapp'
import { random, shuffle, toast } from 'sard-uniapp'
import { nextTick, onMounted, ref } from 'vue'
import { text } from '../../read-more/demo/data'

interface ListItem {
  title: string
  url: string
}

const list = ref<ListItem[]>([])

const getData = () => {
  return new Promise<ListItem[]>((resolve) => {
    const data = Array(20)
      .fill(0)
      .map((_, i) => {
        const min = 20
        const max = 50
        const startIndex = random(0, text.length - max)
        const length = random(min, max)
        return {
          title: text.slice(startIndex, startIndex + length),
          url: `https://fastly.jsdelivr.net/npm/@sard/assets/images/cat${(i % 12) + 1}.jpg`,
        }
      })
    resolve(data)
  })
}

const onLoad = () => {
  toast.hide()
}

onMounted(async () => {
  nextTick(() => {
    toast.loading('加载中')
  })
  list.value.push(...shuffle(await getData()))
})
const { isLocked } = useCurrentPageLock()
</script>
