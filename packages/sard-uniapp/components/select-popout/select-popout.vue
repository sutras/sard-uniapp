<template>
  <sar-popout
    v-model:visible="innerVisible"
    :title="$slots.title ? '' : title"
    :show-confirm="showConfirm"
    :root-class="popoutClass"
    :root-style="popoutStyle"
    @confirm="onConfirm"
    @visible-hook="onVisibleHook"
  >
    <template #visible="{ already }">
      <sar-select
        v-if="already"
        v-bind="omittedProps"
        :model-value="popoutValue"
        :internal-default="internalDefault"
        @change="onChange"
        @select="onSelect"
      >
        <slot></slot>
      </sar-select>
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import {
  type SelectPopoutProps,
  type SelectPopoutSlots,
  type SelectPopoutEmits,
  type SelectPopoutExpose,
  defaultSelectPopoutProps,
} from './common'
import { omitFormPopoutProps, useFormPopout } from '../../use'
import SarPopout from '../popout/popout.vue'
import SarSelect from '../select/select.vue'
import { useSelect } from '../select/useSelect'
import { SelectContext, selectContextSymbol } from '../select/common'
import { computed, inject } from 'vue'
import { isNumber } from '../../utils'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<SelectPopoutProps>(),
  defaultSelectPopoutProps(),
)

const slots = defineSlots<SelectPopoutSlots>()

const emit = defineEmits<SelectPopoutEmits>()

// main
const omittedProps = omitFormPopoutProps(props)

const { innerVisible, popoutValue, onChange, onConfirm, onVisibleHook } =
  useFormPopout(props, emit)

const onSelect = () => {
  if (!props.multiple && !props.showConfirm) {
    onConfirm(false)
    innerVisible.value = false
  }
}

const internalDefault = computed(() =>
  isNumber(props.internalDefault)
    ? props.internalDefault
    : slots.default
      ? 1
      : 0,
)

// provide
if (
  !inject<SelectContext | null>(selectContextSymbol, null) &&
  internalDefault.value === 1
) {
  useSelect(props)
}

// others
defineExpose<SelectPopoutExpose>({})
</script>
