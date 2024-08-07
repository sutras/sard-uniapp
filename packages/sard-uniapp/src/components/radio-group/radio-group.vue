<template>
  <view
    :class="classNames(bem.b(), bem.m(direction), rootClass)"
    :style="stringifyStyle(rootStyle)"
  >
    <slot
      v-if="$slots.custom"
      name="custom"
      :toggle="toggle"
      :value="innerValue"
    ></slot>
    <slot v-else>
      <template v-if="options">
        <sar-radio
          v-for="option in options"
          :key="isPrimitive(option) ? option : option[fieldKeys.value]"
          :value="isPrimitive(option) ? option : option[fieldKeys.value]"
          :validate-event="false"
        >
          {{ isPrimitive(option) ? option : option[fieldKeys.label] }}
        </sar-radio>
      </template>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { ref, watch, provide, toRef, reactive, computed } from 'vue'
import {
  type RadioGroupProps,
  type RadioGroupSlots,
  type RadioGroupEmits,
  type RadioContext,
  radioContextSymbol,
  radioGroupPropsDefaults,
  defaultOptionKeys,
} from '../radio/common'
import { classNames, stringifyStyle, createBem, isPrimitive } from '../../utils'
import { useFormItemContext } from '../form/common'
import SarRadio from '../radio/radio.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<RadioGroupProps>(),
  radioGroupPropsDefaults,
)

defineSlots<RadioGroupSlots>()

const emit = defineEmits<RadioGroupEmits>()

const bem = createBem('radio-group')

// main
const formItemContext = useFormItemContext()

const fieldKeys = computed(() => {
  return Object.assign({}, defaultOptionKeys, props.optionKeys)
})

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue

    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const toggle: RadioContext['toggle'] = (value) => {
  emit('update:model-value', value)
}

provide<RadioContext>(
  radioContextSymbol,
  reactive({
    disabled: toRef(props, 'disabled'),
    readonly: toRef(props, 'readonly'),
    size: toRef(props, 'size'),
    type: toRef(props, 'type'),
    checkedColor: toRef(props, 'checkedColor'),
    value: innerValue,
    toggle,
  }),
)
</script>

<style lang="scss">
@import './index.scss';
</style>
