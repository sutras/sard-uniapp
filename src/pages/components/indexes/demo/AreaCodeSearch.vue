<template>
  <sar-popout
    v-model:visible="innerVisible"
    title="搜索区号"
    :show-footer="false"
    @visible-hook="onVisibleHook"
  >
    <sar-search
      v-model="searchValue"
      placeholder="搜索"
      shape="round"
      :focus="focused"
    />
    <scroll-view scroll-y style="height: 70vh">
      <sar-list inlaid>
        <sar-list-item
          v-for="item in searchResult"
          :key="item.title"
          hover
          @click="onSelect(item)"
        >
          <template #title>
            <view>
              <template v-for="(frag, i) in item.titleFrag" :key="i">
                <text
                  :style="`color: ${i % 2 !== 0 ? 'var(--sar-primary)' : ''}`"
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
  </sar-popout>
</template>

<script setup lang="ts">
import { throttle, TransitionHookName } from 'sard-uniapp'
import areaCode from 'tel-area-code'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  visible?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'select', code: string): void
}>()

// search
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

// visible
const innerVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  },
})

const focused = ref(false)

const onVisibleHook = (hook: TransitionHookName) => {
  if (hook === 'enter') {
    searchValue.value = ''
  }

  if (hook === 'after-enter') {
    setTimeout(() => {
      focused.value = true
    }, 150)
  } else if (hook === 'before-leave') {
    focused.value = false
  }
}

const onSelect = (item: SearchItem) => {
  innerVisible.value = false
  emit('select', item.code)
}
</script>
