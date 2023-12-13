<template>
  <view :class="checkboxClass" :style="checkboxStyle" @click="onClick">
    <view :class="iconClass" :style="iconStyle">
      <slot name="icon" :checked="innerChecked">
        <Icon v-if="!$slots.icon" :name="iconName" />
      </slot>
    </view>
    <view v-if="$slots.default || label" :class="labelClass">
      <slot>{{ label }}</slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, provide, inject, ref, watch } from 'vue'
import { classNames, createBem, stringifyStyle } from '../utils'
import {
  type CheckboxContext,
  checkboxContextSymbol,
  mapTypeIcon,
  checkboxProps,
} from './common'
import Icon from '../icon/icon.vue'
import { useFormContext, useFormItemContext } from '../form/common'

const props = defineProps(checkboxProps)

const emit = defineEmits(['click', 'update:checked'])

const bem = createBem('checkbox')

// main
const groupContext = inject<CheckboxContext | null>(checkboxContextSymbol, null)
const formContext = useFormContext()
const formItemContext = useFormItemContext()

const isDisabled = computed(() => {
  return formContext?.disabled ?? props.disabled ?? groupContext?.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly ?? props.readonly ?? groupContext?.readonly
})

const innerChecked = ref(
  groupContext ? groupContext.value.includes(props.value) : props.checked,
)

if (groupContext) {
  watch(
    () => groupContext.value,
    () => {
      innerChecked.value = groupContext.value.includes(props.value)
    },
  )
} else {
  watch(
    () => props.checked,
    () => {
      innerChecked.value = props.checked
    },
  )
  watch(innerChecked, () => {
    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  })
}

const onClick = (event: any) => {
  if (!isDisabled.value && !isReadonly.value) {
    if (groupContext) {
      groupContext.toggle(props.value)
    } else {
      innerChecked.value = !innerChecked.value
      emit('update:checked', innerChecked.value)
    }
  }
  emit('click', event)
}

provide(checkboxContextSymbol, null)

// others
const checkboxClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('checked', innerChecked.value),
    bem.m('disabled', isDisabled.value),
    bem.m('readonly', isReadonly.value),
    props.rootClass,
  )
})

const checkboxStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const iconName = computed(() => {
  const type = props.type ?? groupContext?.type ?? 'square'
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
@use './index.scss';
</style>
