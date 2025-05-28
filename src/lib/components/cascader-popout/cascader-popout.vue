<template>
  <sar-popout
    v-model:visible="innerVisible"
    :title="title"
    :show-confirm="showConfirm"
    :root-class="popoutClass"
    :root-style="popoutStyle"
    @confirm="onConfirm"
  >
    <template #visible="{ already }">
      <sar-cascader
        v-if="already"
        :model-value="popoutValue"
        :options="options"
        :field-keys="fieldKeys"
        :hint-text="hintText"
        :change-on-select="changeOnSelect"
        :label-render="labelRender"
        @select="(option, tabIndex) => $emit('select', option, tabIndex)"
        @change="onChange"
      >
        <template #top="{ tabIndex }">
          <slot name="top" :tab-index="tabIndex"></slot>
        </template>
      </sar-cascader>
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import SarPopout from '../popout/popout.vue'
import SarCascader from '../cascader/cascader.vue'
import {
  type CascaderPopoutProps,
  type CascaderPopoutSlots,
  type CascaderPopoutEmits,
  defaultCascaderPopoutProps,
} from './common'
import { useFormItemContext } from '../form/common'
import { isNullish } from '../../utils'
import { type CascaderOption } from '../cascader/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<CascaderPopoutProps>(),
  defaultCascaderPopoutProps,
)

defineSlots<CascaderPopoutSlots>()

const emit = defineEmits<CascaderPopoutEmits>()

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
const popoutOptions = ref<CascaderOption[]>([])

watch(innerValue, () => {
  popoutValue.value = innerValue.value
})

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  popoutValue.value = value
  popoutOptions.value = selectedOptions

  if (!props.showConfirm && !isNullish(popoutValue.value)) {
    onConfirm()
    innerVisible.value = false
  }
}

const onConfirm = () => {
  if (popoutValue.value !== innerValue.value) {
    innerValue.value = popoutValue.value

    emit('update:model-value', innerValue.value, popoutOptions.value)
    emit('change', innerValue.value, popoutOptions.value)
  }
}
</script>
