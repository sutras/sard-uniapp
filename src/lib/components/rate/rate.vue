<template>
  <view :class="rateClass" :style="rateStyle">
    <view
      :class="bem.e('content')"
      :style="contentStyle"
      :id="rateId"
      @touchstart="onTouchStart"
      @touchmove.stop.prevent="onTouchMove"
      @mousedown="onMouseDown"
    >
      <view
        v-for="(item, i) in starList"
        :key="i"
        :class="bem.e('item')"
        :id="i === 0 ? firstStarId : undefined"
        :style="
          stringifyStyle({
            fontSize: size,
          })
        "
        @click="onClick($event, i)"
      >
        <view
          :class="bem.e('star-void')"
          :style="
            stringifyStyle({
              color: isDisabled ? undefined : voidColor,
            })
          "
        >
          <template v-if="voidText">
            {{ voidText }}
          </template>
          <sar-icon v-else :name="voidIcon" :family="iconFamily" />
        </view>
        <view
          :class="bem.e('star')"
          :style="
            stringifyStyle({
              color: isDisabled ? undefined : color,
              width: item.width,
            })
          "
        >
          <template v-if="text">
            {{ text }}
          </template>
          <sar-icon v-else :name="icon" :family="iconFamily" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
  type NodeRect,
} from '../../utils'
import SarIcon from '../icon/icon.vue'
import { useFormContext, useFormItemContext } from '../form/common'
import { type RateProps, type RateEmits, defaultRateProps } from './common'
import { useMouseDown } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<RateProps>(), defaultRateProps)

const emit = defineEmits<RateEmits>()

const bem = createBem('rate')

// main
const formContext = useFormContext()
const formItemContext = useFormItemContext()

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || props.readonly
})

const innerValue = ref(props.modelValue ?? 0)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue ?? 0

    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const rateId = uniqid()
const firstStarId = uniqid()
const instance = getCurrentInstance()
const rateRect = ref<NodeRect>()
const firstStarRect = ref<NodeRect>()

const starList = computed(() => {
  return Array(props.count)
    .fill(0)
    .map((_, index) => {
      const diff = index + 1 - innerValue.value
      const width =
        (diff <= 0 ? 1 : diff > 1 ? 0 : innerValue.value % 1) * 100 + '%'

      return {
        width,
      }
    })
})

const onClick = async (event: MouseEvent | TouchEvent, index: number) => {
  if (isReadonly.value || isDisabled.value) {
    return
  }

  let nextValue: number

  if (props.allowHalf) {
    const { left: rateLeft, width: rateWidth } = await getBoundingClientRect(
      `#${rateId}`,
      instance,
    )
    const { width: starWidth } = await getBoundingClientRect(
      `#${firstStarId}`,
      instance,
    )

    const { clientX } = 'touches' in event ? event.touches[0] : event
    const offsetX = clientX - rateLeft
    const gap = (rateWidth - props.count * starWidth) / (props.count - 1)
    const itemOffsetLeft = index * (starWidth + gap)
    const isHalf = offsetX - itemOffsetLeft <= starWidth / 2
    nextValue = index + (isHalf ? 0.5 : 1)
  } else {
    nextValue = index + 1
  }

  if (props.clearable && nextValue === innerValue.value) {
    nextValue = 0
  }

  if (nextValue !== undefined && nextValue !== innerValue.value) {
    innerValue.value = nextValue
    emit('update:model-value', nextValue)
    emit('change', nextValue)
  }
}

const onTouchStart = () => {
  if (isReadonly.value || isDisabled.value) {
    return
  }

  getBoundingClientRect(`#${rateId}`, instance).then((rect) => {
    rateRect.value = rect
  })
  getBoundingClientRect(`#${firstStarId}`, instance).then((rect) => {
    firstStarRect.value = rect
  })
}

const onTouchMove = (event: TouchEvent) => {
  if (isReadonly.value || isDisabled.value) {
    return
  }

  if (!rateRect.value || !firstStarRect.value) {
    return
  }

  const { left: rateLeft, width: rateWidth } = rateRect.value

  const { clientX } = event.touches[0]
  const offsetX = clientX - rateLeft
  let nextValue: number | undefined

  if (offsetX < 0) {
    nextValue = 0
  } else {
    const { width: starWidth } = firstStarRect.value
    const gap = (rateWidth - props.count * starWidth) / (props.count - 1)

    for (let i = props.count - 1; i >= 0; i--) {
      const left = i * (gap + starWidth)

      if (offsetX >= left) {
        const index =
          i + (props.allowHalf && offsetX <= left + starWidth / 2 ? 0.5 : 1)
        nextValue = index
        break
      }
    }
  }

  if (nextValue !== undefined && nextValue !== innerValue.value) {
    innerValue.value = nextValue
    emit('update:model-value', nextValue)
    emit('change', nextValue)
  }
}

const onMouseDown = useMouseDown(onTouchStart, onTouchMove)

// others
const rateClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('disabled', isDisabled.value),
    bem.m('readonly', isReadonly.value),
    props.rootClass,
  )
})

const rateStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const contentStyle = computed(() => {
  return stringifyStyle({
    gap: props.gap,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
