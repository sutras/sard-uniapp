<template>
  <view :class="tabsClass" :style="tabsStyle">
    <scroll-view
      :id="scrollId"
      :class="bem.e('scroll')"
      :scroll-x="scrollable"
      :scroll-left="scrollLeft"
      :scroll-with-animation="scrollInitialized"
    >
      <view :class="bem.e('container')">
        <view :id="wrapperId" :class="bem.e('wrapper')">
          <slot>
            <sar-tab
              v-for="(item, index) in list"
              :key="index"
              :title="item.title"
              :name="item.name ?? index"
              :disabled="item.disabled"
              :root-style="item.rootStyle"
              :root-class="item.rootClass"
            />
          </slot>
          <view
            v-if="type === 'line'"
            :class="bem.e('line')"
            :style="lineStyle"
          />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  provide,
  watch,
  getCurrentInstance,
  reactive,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
  type NodeRect,
} from '../../utils'
import {
  type TabsProps,
  type TabsSlots,
  type TabsEmits,
  type TabContext,
  tabContextSymbol,
  defaultTabsProps,
} from './common'
import SarTab from '../tab/tab.vue'
import { usePopupEnter } from '../popup/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<TabsProps>(), defaultTabsProps)

defineSlots<TabsSlots>()

const emit = defineEmits<TabsEmits>()

const bem = createBem('tabs')

// main
const scrollToTab = async (name: string | number) => {
  if (!needScrollToTab.value || !tabMap[name]) {
    return
  }

  const [scrollRect, wrapperRect, tabRect] = await Promise.all([
    getBoundingClientRect(`#${scrollId}`, instance),
    getBoundingClientRect(`#${wrapperId}`, instance),
    tabMap[name].getRect(),
  ])

  scrollLeft.value =
    tabRect.left - wrapperRect.left - (scrollRect.width - tabRect.width) / 2

  if (props.type === 'line') {
    lineLeft.value = tabRect.left - wrapperRect.left + tabRect.width / 2
  }

  if (!scrollInitialized.value) {
    setTimeout(() => {
      scrollInitialized.value = true
      // 确保小程序端已渲染完毕
    }, 30)
  }
}

const scrollToTabQueue = ref()

watch(scrollToTabQueue, () => {
  setTimeout(() => {
    if (scrollToTabQueue.value !== undefined) {
      scrollToTab(scrollToTabQueue.value)
      scrollToTabQueue.value = undefined
    }
  }, 30)
})

const innerCurrent = ref(props.current)
const instance = getCurrentInstance()
const scrollId = uniqid()
const wrapperId = uniqid()
const lineLeft = ref(0)
const scrollLeft = ref(0)
const scrollInitialized = ref(false)
const tabMap: Record<string, { getRect: () => Promise<NodeRect> }> = {}

const needScrollToTab = computed(() => {
  return props.type === 'line' || (props.type === 'pill' && props.scrollable)
})

watch(
  () => props.current,
  () => {
    if (props.current !== innerCurrent.value) {
      innerCurrent.value = props.current
      scrollToTabQueue.value = innerCurrent.value
    }
  },
)

watch(
  () => props.list,
  () => {
    // 确保线条跟随tab
    scrollToTabQueue.value = innerCurrent.value
  },
)

usePopupEnter(() => {
  scrollToTabQueue.value = innerCurrent.value
})

provide<TabContext>(
  tabContextSymbol,
  reactive({
    current: innerCurrent,
    register(name, expose) {
      tabMap[name] = expose
    },
    unregister(name) {
      delete tabMap[name]
    },
    select(name, initial?: boolean) {
      innerCurrent.value = name
      scrollToTabQueue.value = name
      if (!initial) {
        emit('update:current', name)
        emit('change', name)
      }
    },
  }),
)

// others
const tabsClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.type),
    bem.m('scrollable', props.scrollable),
    props.rootClass,
  )
})

const tabsStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const lineStyle = computed(() => {
  return stringifyStyle({
    left: lineLeft.value + 'px',
    transitionDuration: scrollInitialized.value ? null : '0s',
    opacity: scrollInitialized.value ? null : 0,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
