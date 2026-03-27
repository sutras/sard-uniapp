<template>
  <sar-popout
    v-model:visible="innerVisible"
    keep-render
    :title="title"
    :root-class="popoutClass"
    :root-style="popoutStyle"
    @confirm="onConfirm"
    @enter="onEnter"
    @visible-hook="onVisibleHook"
  >
    <template #visible="{ already }">
      <sar-picker
        v-if="already"
        v-bind="omittedProps"
        :model-value="popoutValue"
        :internal-custom="
          isNumber(internalCustom) ? internalCustom : $slots.custom ? 1 : 0
        "
        @change="onChange"
      >
        <template
          v-if="$slots.custom"
          #custom="{
            columns,
            maskClass,
            pickerViewClass,
            indicatorClass,
            value,
            onChange,
          }"
        >
          <slot
            name="custom"
            :columns="columns"
            :picker-view-class="pickerViewClass"
            :mask-class="maskClass"
            :indicator-class="indicatorClass"
            :value="value"
            :on-change="onChange"
          ></slot>
        </template>
      </sar-picker>
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import SarPopout from '../popout/popout.vue'
import SarPicker from '../picker/picker.vue'
import {
  type PickerPopoutProps,
  type PickerPopoutSlots,
  type PickerPopoutEmits,
  defaultPickerPopoutProps,
} from './common'
import { isEmptyArray, isEmptyBinding, isNumber } from '../../utils'
import { getInitialValue } from '../picker/common'
import { omitFormPopoutProps, useFormPopout, useOptionKeys } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<PickerPopoutProps>(),
  defaultPickerPopoutProps(),
)

defineSlots<PickerPopoutSlots>()

const emit = defineEmits<PickerPopoutEmits>()

// main
const useOptionKeysReturn = useOptionKeys(props)

const omittedProps = omitFormPopoutProps(props)

const {
  innerVisible,
  innerValue,
  popoutValue,
  onChange,
  onConfirm,
  onVisibleHook,
} = useFormPopout(props, emit, {
  onConfirmBefore() {
    if (isEmptyBinding(popoutValue.value) || isEmptyArray(popoutValue.value)) {
      const [initialValue, selectedOptions] = getInitialValue(
        props.columns,
        useOptionKeysReturn,
      )
      popoutValue.value = initialValue
      return [selectedOptions]
    }
  },
})

const onEnter = () => {
  if (
    !isEmptyBinding(innerValue.value) &&
    !isEmptyArray(innerValue.value) &&
    popoutValue.value !== innerValue.value
  ) {
    popoutValue.value = innerValue.value
  }
}
</script>
