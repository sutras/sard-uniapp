<template>
  <scroll-view
    scroll-y
    :scroll-top="scrollTop"
    :class="sidebarClass"
    :style="sidebarStyle"
    @scroll="onScroll"
  >
    <view :class="bem.e('content')">
      <slot></slot>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  provide,
  reactive,
  ref,
  toRef,
  watch,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  type NodeRect,
  getScrollIntoViewValue,
  uniqid,
  getBoundingClientRect,
  isNullish,
} from '../../utils'
import {
  type SidebarProps,
  type SidebarSlots,
  type SidebarEmits,
  type SidebarExpose,
  type SidebarContext,
  sidebarContextSymbol,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SidebarProps>(), {})

defineSlots<SidebarSlots>()

const emit = defineEmits<SidebarEmits>()

const bem = createBem('sidebar')

// main
const innerCurrent = ref(props.current)

const sidebarItemMap = new Map<string | number, () => Promise<NodeRect>>()

const scrollViewId = uniqid()

const scrollTop = ref(0)

const instance = getCurrentInstance()

let memoScrollTop = 0

const onScroll = (event: any) => {
  memoScrollTop = event.detail.scrollTop
}

const scrollIntoView = async (name: string | number) => {
  const getRect = sidebarItemMap.get(name)
  if (!getRect) {
    return
  }

  const itemRect = await getRect()

  const scrollViewRect = await getBoundingClientRect(
    `.${scrollViewId}`,
    instance,
  )

  const value = getScrollIntoViewValue(
    scrollViewRect.height,
    memoScrollTop,
    itemRect.height,
    itemRect.top - scrollViewRect.top + memoScrollTop,
    props.scrollIntoViewOptions,
  )

  scrollTop.value = value
}

watch(
  () => props.current,
  () => {
    if (!isNullish(props.current) && props.current !== innerCurrent.value) {
      innerCurrent.value = props.current
      scrollIntoView(props.current)
    }
  },
)

provide<SidebarContext>(
  sidebarContextSymbol,
  reactive({
    current: innerCurrent,
    round: toRef(() => props.round) as unknown as boolean,
    line: toRef(() => props.line) as unknown as boolean,
    register(name, getRect) {
      sidebarItemMap.set(name, getRect)
    },
    unregister(name) {
      sidebarItemMap.delete(name)
    },
    select(name) {
      if (name !== innerCurrent.value) {
        innerCurrent.value = name
        emit('update:current', name)
        emit('change', name)
      }
    },
  }),
)

// others
const sidebarClass = computed(() => {
  return classNames(bem.b(), props.rootClass, scrollViewId)
})

const sidebarStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

defineExpose<SidebarExpose>({})
</script>

<style lang="scss">
@import './index.scss';
</style>
