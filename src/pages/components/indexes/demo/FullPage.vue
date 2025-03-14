<template>
  <doc-page title="Indexes 索引">
    <sar-indexes
      ref="indexesRef"
      :root-style="{
        height: indexesHeight,
      }"
    >
      <view v-for="section in sectionList" :key="section.anchor">
        <sar-indexes-anchor
          :name="section.anchor"
          root-style="height: 0; overflow: hidden;"
        />
        <sar-indexes-anchor>
          {{ section.anchor }}
        </sar-indexes-anchor>
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
    </sar-indexes>
  </doc-page>
</template>

<script setup lang="ts">
import { getWindowInfo, toast } from 'sard-uniapp'
import areaCode from 'tel-area-code'
import { ref } from 'vue'

const statusBarHeight = getWindowInfo().statusBarHeight + 'px'
const navbarHeight = `calc(${statusBarHeight} + var(--sar-navbar-height))`
const indexesHeight = `calc(100vh - ${navbarHeight})`

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

const onSelect = (code: string) => {
  toast(code)
}
</script>
