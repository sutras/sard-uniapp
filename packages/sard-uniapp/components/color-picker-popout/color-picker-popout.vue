<template>
  <sar-popout
    v-model:visible="innerVisible"
    :title="title"
    :show-confirm="showConfirm"
    :root-class="popoutClass"
    :root-style="popoutStyle"
    @confirm="onConfirm"
    @visible-hook="onVisibleHook"
  >
    <template #visible="{ already }">
      <sar-color-picker
        v-if="already"
        v-bind="omittedProps"
        :model-value="popoutValue"
        @change="onChange"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import SarColorPicker from '../color-picker/color-picker.vue'
import SarPopout from '../popout/popout.vue'
import {
  type ColorPickerPopoutProps,
  type ColorPickerPopoutSlots,
  type ColorPickerPopoutEmits,
  type ColorPickerPopoutExpose,
  defaultColorPickerPopoutProps,
} from './common'
import { omitFormPopoutProps, useFormPopout } from '../../use'
import { defaultColorPickerValue, isEmptyBinding } from '../../utils'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ColorPickerPopoutProps>(),
  defaultColorPickerPopoutProps(),
)

defineSlots<ColorPickerPopoutSlots>()

const emit = defineEmits<ColorPickerPopoutEmits>()

const omittedProps = omitFormPopoutProps(props)

const { innerVisible, popoutValue, onChange, onConfirm, onVisibleHook } =
  useFormPopout(props, emit, {
    onConfirmBefore() {
      if (isEmptyBinding(popoutValue.value)) {
        popoutValue.value = defaultColorPickerValue
      }
    },
  })

defineExpose<ColorPickerPopoutExpose>({})
</script>
