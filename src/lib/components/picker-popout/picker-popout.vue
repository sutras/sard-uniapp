<template>
  <sar-popout
    v-model:visible="innerVisible"
    keep-render
    :title="title"
    :root-class="popoutClass"
    :root-style="popoutStyle"
    @confirm="onConfirm"
    @enter="onEnter"
  >
    <template #visible="{ already }">
      <sar-picker
        v-if="already"
        :model-value="popoutValue"
        :columns="columns"
        :option-keys="optionKeys"
        :immediate-change="immediateChange"
        @change="onChange"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import SarPopout from '../popout/popout.vue'
import SarPicker from '../picker/picker.vue'
import {
  type PickerPopoutProps,
  type PickerPopoutSlots,
  type PickerPopoutEmits,
  defaultPickerPopoutProps,
} from './common'
import { useFormItemContext } from '../form/common'
import { isNullish } from '../../utils'
import { defaultOptionKeys, getInitialValue } from '../picker/common'
import { computed } from 'vue'

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

// visible
const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

watch(innerVisible, () => {
  emit('update:visible', innerVisible.value)
})

// value
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

const popoutValue = ref(props.modelValue)

watch(innerValue, () => {
  popoutValue.value = innerValue.value
})

const onChange = (value: any) => {
  popoutValue.value = value
}

const onEnter = () => {
  if (
    !isNullish(innerValue.value) &&
    innerValue.value !== '' &&
    popoutValue.value !== innerValue.value
  ) {
    popoutValue.value = innerValue.value
  }
}

const onConfirm = () => {
  if (isNullish(popoutValue.value) || popoutValue.value === '') {
    popoutValue.value = getInitialValue(props.columns, fieldKeys.value)
  }

  if (popoutValue.value !== innerValue.value) {
    innerValue.value = popoutValue.value
    emit('update:model-value', innerValue.value)
    emit('change', innerValue.value)
  }
}
</script>
