<template>
  <doc-page emphasis title="AreaCode 选择国家/地区">
    <view
      style="
        display: flex;
        flex-direction: column;
        height: calc(100vh - var(--window-top));
      "
    >
      <sar-search
        root-style="flex: none; cursor: pointer"
        placeholder="搜索"
        shape="round"
        readonly
        align="center"
        @click="toAreaCodeSearch"
      />
      <sar-indexes root-style="flex: 1; overflow: hidden">
        <view v-for="section in sectionList" :key="section.anchor">
          <sar-indexes-anchor :name="section.anchor"></sar-indexes-anchor>
          <sar-list inlaid>
            <sar-list-item
              v-for="item in section.children"
              :key="item.code"
              :title="item.title"
              hover
              @click="onSelect(item.code)"
            />
          </sar-list>
        </view>
        <view style="height: env(safe-area-inset-bottom)"></view>
      </sar-indexes>
    </view>
  </doc-page>
</template>

<script setup lang="ts">
import areaCode from 'tel-area-code/data.json'
import { getCurrentInstance, ref } from 'vue'

interface SectionItem {
  title: string
  code: string
}

interface Section {
  anchor: string
  children: SectionItem[]
}

const getSectionList = () => {
  const list: Section[] = []
  const map: Record<string, Section> = {}
  areaCode.forEach((item) => {
    const firstLetter = item.pinyin[0]
    let section = map[firstLetter]
    if (!section) {
      section = map[firstLetter] = {
        anchor: firstLetter.toUpperCase(),
        children: [],
      }
      list.push(section)
    }
    section.children.push({
      title: `${item.name} +${item.code}`,
      code: item.code,
    })
  })
  list.sort((a, b) => a.anchor.charCodeAt(0) - b.anchor.charCodeAt(0))

  return list
}

const sectionList = ref<Section[]>(getSectionList())

const eventChannel = (
  getCurrentInstance()?.proxy as any
).getOpenerEventChannel() as any

const onSelect = (code: string) => {
  uni.navigateBack({
    success: () => {
      eventChannel.emit('selectAreaCode', {
        code,
      })
    },
  })
}

const toAreaCodeSearch = () => {
  uni.navigateTo({
    url: `/pages/components/indexes/demo/AreaCodeSearch`,
    events: {
      selectAreaCode: (data: any) => {
        onSelect(data.code)
      },
    },
  })
}
</script>
