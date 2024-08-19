<template>
  <view :class="radioClass" :style="stringifyStyle(rootStyle)" @click="onClick">
    <view :class="iconClass" :style="iconStyle">
      <slot name="icon" :checked="innerChecked">
        <sar-check-icon
          shape="circle"
          :type="checkIconType"
          :disabled="isDisabled"
        />
      </slot>
    </view>
    <view v-if="$slots.default || label" :class="labelClass">
      <slot>{{ label }}</slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, provide, inject, watch, ref } from 'vue'
import { classNames, createBem, stringifyStyle } from '../../utils'
import {
  type RadioProps,
  type RadioSlots,
  type RadioEmits,
  type RadioContext,
  radioContextSymbol,
} from './common'
import SarCheckIcon from '../check-icon/check-icon.vue'
import { useFormContext } from '../form/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<RadioProps>(), {})

defineSlots<RadioSlots>()

const emit = defineEmits<RadioEmits>()

const bem = createBem('radio')

// main
const groupContext = inject<RadioContext | null>(radioContextSymbol, null)
const formContext = useFormContext()

const innerChecked = ref(
  groupContext ? groupContext.value === props.value : props.checked,
)

const isDisabled = computed(() => {
  return formContext?.disabled || groupContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || groupContext?.readonly || props.readonly
})

if (groupContext) {
  watch(
    () => groupContext.value,
    () => {
      innerChecked.value = groupContext.value === props.value
    },
  )
} else {
  watch(
    () => props.checked,
    () => {
      innerChecked.value = props.checked
    },
  )
}

const onClick = (event: any) => {
  if (!isDisabled.value && !isReadonly.value) {
    if (groupContext) {
      groupContext.toggle(props.value)
    } else {
      innerChecked.value = true
    }
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

const checkIconType = computed(() => {
  const type = props.type ?? groupContext?.type ?? 'circle'
  return innerChecked.value ? (type === 'circle' ? 'check' : 'dot') : 'empty'
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
