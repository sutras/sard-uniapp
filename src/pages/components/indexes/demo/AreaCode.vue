<template>
  <sar-popout
    v-model:visible="innerVisible"
    title="请选择区号"
    :show-footer="false"
    keep-render
  >
    <template #visible="{ already }">
      <template v-if="already">
        <sar-search
          root-style="cursor: pointer"
          placeholder="搜索"
          shape="round"
          readonly
          align="center"
          @click="searchVisible = true"
        />
        <sar-indexes root-style="height: 70vh">
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
      </template>
    </template>
  </sar-popout>

  <AreaCodeSearch v-model:visible="searchVisible" @select="onSelect" />
</template>

<script setup lang="ts">
import areaCode from 'tel-area-code'
import { computed, ref } from 'vue'
import AreaCodeSearch from './AreaCodeSearch.vue'

const props = defineProps<{
  visible?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'select', code: string): void
}>()

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

// visible
const innerVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  },
})

const searchVisible = ref(false)

const onSelect = (code: string) => {
  innerVisible.value = false
  emit('select', code)
}
</script>
