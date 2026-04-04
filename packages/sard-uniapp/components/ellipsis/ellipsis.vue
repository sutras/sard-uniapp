<template>
  <view :class="ellipsisClass" :style="ellipsisStyle">
    <view :class="bem.e('wrapper')">
      <view :class="contentClass" :style="contentStyle">
        <text>{{ displayContent }}</text>
        <text v-if="showAction" :class="bem.e('action')" @click="onToggle">
          {{ actionText }}
        </text>
      </view>
      <view :id="fullId" :class="bem.e('measure')">
        <text>{{ props.content }}</text>
      </view>
      <view :id="lineId" :class="bem.e('measure')">
        <text :class="bem.e('line')">{{ props.content }}</text>
      </view>
      <view :id="calcId" :class="bem.e('measure')">
        <text>{{ measureContent }}</text>
        <text v-if="hasAction" :class="bem.e('action')">
          {{ props.expandText }}
        </text>
      </view>
      <sar-resize-sensor @resize="onResize" />
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'
import {
  type Size,
  classNames,
  createBem,
  getBoundingClientRect,
  stringifyStyle,
  uniqid,
} from '../../utils'
import SarResizeSensor from '../resize-sensor/resize-sensor.vue'
import {
  type EllipsisEmits,
  type EllipsisExpose,
  type EllipsisPosition,
  type EllipsisProps,
  type EllipsisSlots,
  defaultEllipsisProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<EllipsisProps>(), defaultEllipsisProps())

defineSlots<EllipsisSlots>()

const emit = defineEmits<EllipsisEmits>()

const bem = createBem('ellipsis')

// main
const instance = getCurrentInstance()
const fullId = uniqid()
const lineId = uniqid()
const calcId = uniqid()

const innerExpanded = ref(props.expanded)
const isOverflow = ref(false)
const truncatedContent = ref(props.content)
const measureContent = ref(props.content)
const resizeWidth = ref(0)
const initialized = ref(false)
const isMeasuring = ref(true)

let updateToken = 0

const getCharacters = (content: string) => {
  return Array.from(content)
}

const buildEllipsisText = (
  content: string,
  keepCount: number,
  position: EllipsisPosition,
  dots: string,
) => {
  const characters = getCharacters(content)

  if (keepCount >= characters.length) {
    return content
  }

  if (keepCount <= 0) {
    return dots
  }

  if (position === 'start') {
    return dots + characters.slice(characters.length - keepCount).join('')
  }

  if (position === 'middle') {
    const leftCount = Math.ceil(keepCount / 2)
    const rightCount = Math.floor(keepCount / 2)
    return (
      characters.slice(0, leftCount).join('') +
      dots +
      characters.slice(characters.length - rightCount).join('')
    )
  }

  return characters.slice(0, keepCount).join('') + dots
}

const getHeight = async (id: string) => {
  return (await getBoundingClientRect(`#${id}`, instance)).height || 0
}

const update = async () => {
  const token = ++updateToken
  const content = props.content || ''
  isMeasuring.value = true

  if (!content) {
    truncatedContent.value = content
    measureContent.value = content
    isOverflow.value = false
    initialized.value = true
    if (token === updateToken) {
      isMeasuring.value = false
    }
    return
  }

  measureContent.value = content

  await nextTick()

  if (token !== updateToken) return

  const [fullHeight, lineHeight] = await Promise.all([
    getHeight(fullId),
    getHeight(lineId),
  ])

  if (token !== updateToken) return

  const clampHeight = lineHeight * props.rows
  const overflow = fullHeight - clampHeight > 0.5

  if (!overflow) {
    truncatedContent.value = content
    isOverflow.value = false
    initialized.value = true
    if (token === updateToken) {
      isMeasuring.value = false
    }
    return
  }

  const characters = getCharacters(content)
  let low = 0
  let high = characters.length
  let best = 0

  while (low <= high) {
    const middle = Math.floor((low + high) / 2)
    const nextText = buildEllipsisText(
      content,
      middle,
      props.position,
      props.dots,
    )

    measureContent.value = nextText
    await nextTick()

    if (token !== updateToken) return

    const height = await getHeight(calcId)

    if (token !== updateToken) return

    if (height <= clampHeight + 0.5) {
      best = middle
      low = middle + 1
    } else {
      high = middle - 1
    }
  }

  const nextTruncatedContent = buildEllipsisText(
    content,
    best,
    props.position,
    props.dots,
  )

  if (token !== updateToken) return

  truncatedContent.value = nextTruncatedContent
  isOverflow.value = true
  initialized.value = true
  if (token === updateToken) {
    isMeasuring.value = false
  }
}

const onResize = (size: Size) => {
  if (resizeWidth.value && Math.abs(size.width - resizeWidth.value) <= 0.5) {
    return
  }

  resizeWidth.value = size.width
  update()
}

const onToggle = () => {
  const expanded = !innerExpanded.value
  innerExpanded.value = expanded
  emit('update:expanded', expanded)
  emit('change', expanded)
}

watch(
  () => props.expanded,
  () => {
    innerExpanded.value = props.expanded
  },
)

watch(
  [
    () => props.content,
    () => props.rows,
    () => props.position,
    () => props.dots,
  ],
  () => {
    update()
  },
)

onMounted(() => {
  update()
})

defineExpose<EllipsisExpose>({
  update,
})

const displayContent = computed(() => {
  if (useClampFallback.value) {
    return props.content
  }

  if (innerExpanded.value || !isOverflow.value) {
    return props.content
  }

  return truncatedContent.value
})

const useClampFallback = computed(() => {
  return isMeasuring.value && !innerExpanded.value
})

const hasAction = computed(() => {
  return !!props.expandText && !!props.collapseText
})

const actionText = computed(() => {
  return innerExpanded.value ? props.collapseText : props.expandText
})

const showAction = computed(() => {
  if (useClampFallback.value) {
    return false
  }

  if (!isOverflow.value) {
    return false
  }

  return hasAction.value
})

const ellipsisClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const ellipsisStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const contentClass = computed(() => {
  return classNames(
    bem.e('content'),
    bem.em('content', 'clamp', useClampFallback.value),
  )
})

const contentStyle = computed(() => {
  if (useClampFallback.value) {
    return stringifyStyle({
      '-webkit-line-clamp': props.rows,
    })
  }

  return stringifyStyle({})
})
</script>

<style lang="scss">
@import './index.scss';
</style>
