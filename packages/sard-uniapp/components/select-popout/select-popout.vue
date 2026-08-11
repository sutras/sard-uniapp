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
        ref="selectRef"
        :model-value="popoutValue"
        :internal-default="internalDefault"
        @change="onChange"
        @select="onSelect"
        @update:filter-value="emit('update:filter-value', $event)"
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
import {
  type SelectContext,
  selectContextSymbol,
  type SelectExpose,
} from '../select/common'
import { computed, inject, ref } from 'vue'
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

const internalDefault = computed(() => {
  return isNumber(props.internalDefault)
    ? props.internalDefault
    : slots.default
      ? 1
      : 0
})

// provide
if (
  !inject<SelectContext | null>(selectContextSymbol, null) &&
  internalDefault.value === 1
) {
  useSelect(props)
}

// others
const selectRef = ref<SelectExpose>()

defineExpose<SelectPopoutExpose>({
  refresh: () => {
    selectRef.value?.refresh()
  },
})
</script>
