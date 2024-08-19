<template>
  <view :class="checkboxClass" :style="checkboxStyle" @click="onClick">
    <view :class="iconClass" :style="iconStyle">
      <slot name="icon" :checked="innerChecked">
        <sar-check-icon
          :shape="checkIconShape"
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
import { computed, provide, inject, ref, watch } from 'vue'
import { classNames, createBem, stringifyStyle } from '../../utils'
import {
  type CheckboxProps,
  type CheckboxSlots,
  type CheckboxEmits,
  type CheckboxContext,
  checkboxContextSymbol,
  checkboxPropsDefaults,
} from './common'
import SarCheckIcon from '../check-icon/check-icon.vue'
import { useFormContext, useFormItemContext } from '../form/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<CheckboxProps>(), checkboxPropsDefaults)

defineSlots<CheckboxSlots>()

const emit = defineEmits<CheckboxEmits>()

const bem = createBem('checkbox')

// main
const groupContext = inject<CheckboxContext | null>(checkboxContextSymbol, null)
const formContext = useFormContext()
const formItemContext = useFormItemContext()

const isDisabled = computed(() => {
  return formContext?.disabled || groupContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || groupContext?.readonly || props.readonly
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
      emit('change', innerChecked.value)
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

const checkIconShape = computed(() => {
  return props.type ?? groupContext?.type ?? 'square'
})

const checkIconType = computed(() => {
  return innerChecked.value ? 'check' : props.indeterminate ? 'dash' : 'empty'
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
    bem.em('icon', 'indeterminate', props.indeterminate),
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
