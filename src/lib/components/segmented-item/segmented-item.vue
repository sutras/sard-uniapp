<template>
  <view
    :class="segmentedItemClass"
    :style="segmentedItemStyle"
    @click="onClick"
  >
    <slot>
      <view :class="bem.e('icon')">
        <sar-icon :name="icon" :family="iconFamily" :size="iconSize" />
      </view>
      <view v-if="label" :class="bem.e('label')">{{ label }}</view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type SegmentedItemProps,
  type SegmentedItemSlots,
  type SegmentedItemEmits,
  type SegmentedItemExpose,
  defaultSegmentedItemProps,
} from './common'
import {
  type SegmentedContext,
  segmentedContextSymbol,
} from '../segmented/common'
import SarIcon from '../icon/icon.vue'
import { useFormContext } from '../form'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<SegmentedItemProps>(),
  defaultSegmentedItemProps,
)

defineSlots<SegmentedItemSlots>()

const emit = defineEmits<SegmentedItemEmits>()

const bem = createBem('segmented-item')

// main
const context = inject<SegmentedContext | null>(segmentedContextSymbol, null)

if (!context) {
  throw new Error('SegmentedItem must be included in Segmented.')
}

const formContext = useFormContext()

const isSelected = computed(() => {
  return context.value === props.value
})

const isDisabled = computed(() => {
  return formContext?.disabled || context?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || context?.readonly || props.readonly
})

const onClick = (event: any) => {
  if (!isDisabled.value && !isReadonly.value) {
    context.toggle(props.value)
  }
  emit('click', event)
}

// others
defineExpose<SegmentedItemExpose>({})

const segmentedItemClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('selected', isSelected.value),
    bem.m('disabled', isDisabled.value),
    bem.m('readonly', isReadonly.value),
    bem.m('with-icon', !!props.icon),
    bem.m(context.size),
    bem.m(context.shape),
    props.rootClass,
  )
})

const segmentedItemStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
