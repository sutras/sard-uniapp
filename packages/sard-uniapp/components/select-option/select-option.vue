<template>
  <view
    :class="selectOptionClass"
    :style="selectOptionStyle"
    :id="optionId"
    @click="onClick"
  >
    <slot
      v-if="$slots.default"
      :disabled="isDisabled"
      :selected="isSelected"
    ></slot>
    <template v-else>
      <view :class="bem.e('label')">
        <slot name="label" :disabled="isDisabled" :selected="isSelected">
          {{ label }}
        </slot>
      </view>
      <view :class="bem.e('icon')">
        <sar-icon family="sari" name="success" />
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  reactive,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
  isEmptyBinding,
} from '../../utils'
import {
  type SelectOptionProps,
  type SelectOptionSlots,
  type SelectOptionEmits,
  type SelectOptionExpose,
  defaultSelectOptionProps,
} from './common'
import {
  type SelectOptionGroupContext,
  selectOptionGroupContextSymbol,
} from '../select-option-group/common'
import {
  type SelectContext,
  type SelectItem,
  selectContextSymbol,
} from '../select/common'
import SarIcon from '../icon/icon.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<SelectOptionProps>(),
  defaultSelectOptionProps(),
)

defineSlots<SelectOptionSlots>()

const emit = defineEmits<SelectOptionEmits>()

const bem = createBem('select-option')

// main
const optionId = uniqid()

const instance = getCurrentInstance()

const context = inject<SelectContext>(selectContextSymbol)!

if (!context) {
  throw new Error('SelectOption must be included in Select.')
}

const { multiple, multipleLimit, innerValue, toggle, register, unregister } =
  context

const groupContext = inject<SelectOptionGroupContext | null>(
  selectOptionGroupContextSymbol,
  null,
)

const isSelected = computed(() => {
  return multiple.value
    ? innerValue.value.includes(props.value)
    : !isEmptyBinding(innerValue.value) && innerValue.value === props.value
})

const isDisabled = computed(() => {
  return (
    groupContext?.disabled ||
    props.disabled ||
    (multiple.value &&
      multipleLimit.value > 0 &&
      innerValue.value.length >= multipleLimit.value &&
      !isSelected.value)
  )
})

const onClick = (event: any) => {
  if (!isDisabled.value) {
    toggle(props.value)
    emit('click', event)
  }
}

const getRect = () => {
  return getBoundingClientRect(`#${optionId}`, instance)
}

const selectItem: SelectItem = reactive({
  getRect,
  isSelected,
  value: () => props.value,
  disabled: isDisabled,
})

onMounted(() => {
  register(selectItem)
})

onUnmounted(() => {
  unregister(selectItem)
})

// others
defineExpose<SelectOptionExpose>({})

const selectOptionClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('selected', isSelected.value),
    bem.m('disabled', isDisabled.value),
    bem.m('plain', props.plain),
    props.rootClass,
  )
})

const selectOptionStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
