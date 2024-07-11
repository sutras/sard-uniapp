<template>
  <doc-page emphasis>
    <view
      style="
        display: flex;
        flex-direction: column;
        height: calc(100vh - var(--window-top));
      "
    >
      <sar-search
        v-model="searchValue"
        root-style="flex: none"
        placeholder="搜索"
        shape="round"
        focus
      />
      <view style="flex: 1; overflow: hidden">
        <scroll-view scroll-y style="height: 100%">
          <sar-list inlaid>
            <sar-list-item
              v-for="item in searchResult"
              :key="item.code"
              hover
              @click="onSelect(item)"
            >
              <template #title>
                <view>
                  <template v-for="(frag, i) in item.titleFrag" :key="i">
                    <text
                      :style="`color: ${
                        i % 2 !== 0 ? 'var(--sar-primary)' : ''
                      }`"
                    >
                      {{ frag }}
                    </text>
                  </template>
                </view>
              </template>
            </sar-list-item>
          </sar-list>
          <view style="height: env(safe-area-inset-bottom)"></view>
        </scroll-view>
      </view>
    </view>
  </doc-page>
</template>

<script setup lang="ts">
import { throttle } from 'sard-uniapp'
import areaCode from 'tel-area-code/data.json'
import { computed, getCurrentInstance, ref, watch } from 'vue'

interface SearchItem {
  title: string
  code: string
  pinyin: string
}

interface SearchResultItem extends SearchItem {
  titleFrag: string[]
}

const searchList = computed(() => {
  const list: SearchItem[] = []
  areaCode.forEach((item) => {
    list.push({
      title: `${item.name} +${item.code}`,
      code: item.code,
      pinyin: item.pinyin,
    })
  })
  list.sort((a, b) => a.pinyin[0].charCodeAt(0) - b.pinyin[0].charCodeAt(0))

  return list
})

const searchValue = ref('')
const searchResult = ref<SearchResultItem[]>([])

const search = throttle(() => {
  searchResult.value = searchValue.value
    ? searchList.value
        .filter((item) => item.title.includes(searchValue.value))
        .map((item) => ({
          ...item,
          titleFrag: item.title.split(
            new RegExp(`((?:${searchValue.value})+)`),
          ),
        }))
    : []
}, 350)

watch(searchValue, () => {
  search()
})

const eventChannel = (
  getCurrentInstance()?.proxy as any
).getOpenerEventChannel() as any

const onSelect = (item: SearchItem) => {
  uni.navigateBack({
    success: () => {
      eventChannel.emit('selectAreaCode', {
        code: item.code,
      })
    },
  })
}
</script>
