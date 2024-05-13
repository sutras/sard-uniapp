<template>
  <view :class="radioClass" :style="stringifyStyle(rootStyle)" @click="onClick">
    <view :class="iconClass" :style="iconStyle">
      <slot name="icon" :checked="innerChecked">
        <sar-icon v-if="!$slots.icon" :name="iconName" />
      </slot>
    </view>
    <view v-if="$slots.default || label" :class="labelClass">
      <slot>{{ label }}</slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, provide, inject } from 'vue'
import { classNames, createBem, stringifyStyle } from '../../utils'
import {
  type RadioProps,
  type RadioSlots,
  type RadioEmits,
  type RadioContext,
  radioContextSymbol,
  mapTypeIcon,
  radioPropsDefaults,
} from './common'
import SarIcon from '../icon/icon.vue'
import { useFormContext } from '../form/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<RadioProps>(), radioPropsDefaults)

defineSlots<RadioSlots>()

const emit = defineEmits<RadioEmits>()

const bem = createBem('radio')

// main
const groupContext = inject<RadioContext | null>(radioContextSymbol, null)
const formContext = useFormContext()

const innerChecked = computed(() => {
  return !!groupContext && groupContext.value === props.value
})

const isDisabled = computed(() => {
  return formContext?.disabled ?? props.disabled ?? groupContext?.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly ?? props.readonly ?? groupContext?.readonly
})

const onClick = (event: any) => {
  if (!isDisabled.value && !isReadonly.value) {
    groupContext?.toggle(props.value)
  }
  emit('click', event)
}

provide(radioContextSymbol, null)

// others
const radioClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('checked', innerChecked.value),
    bem.m('disabled', isDisabled.value),
    bem.m('readonly', isReadonly.value),
    props.rootClass,
  )
})

const iconName = computed(() => {
  const type = props.type ?? groupContext?.type ?? 'circle'
  return mapTypeIcon[type][innerChecked.value ? 1 : 0]
})

const iconColor = computed(() => {
  return innerChecked.value && !isDisabled.value
    ? props.checkedColor ?? groupContext?.checkedColor
    : undefined
})

const iconClass = computed(() => {
  return classNames(
    bem.e('icon'),
    bem.em('icon', 'checked', innerChecked.value),
  )
})

const iconStyle = computed(() => {
  return stringifyStyle({
    fontSize: props.size ?? groupContext?.size,
    color: iconColor.value,
  })
})

const labelClass = computed(() => {
  return classNames(bem.e('label'))
})
</script>

<style lang="scss">
@import './index.scss';
</style>
