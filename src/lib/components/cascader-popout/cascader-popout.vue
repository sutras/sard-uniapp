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
import SarPopout from '../popout/popout.vue'
import SarCascader from '../cascader/cascader.vue'
import {
  type CascaderPopoutProps,
  type CascaderPopoutSlots,
  type CascaderPopoutEmits,
  defaultCascaderPopoutProps,
} from './common'
import { isEmptyBinding } from '../../utils'
import { useFormPopout } from '../../use'

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
const { innerVisible, popoutValue, onChange, onConfirm, onVisibleHook } =
  useFormPopout(props, emit, {
    onChange() {
      if (!props.showConfirm && !isEmptyBinding(popoutValue.value)) {
        onConfirm(false)
        innerVisible.value = false
      }
    },
  })
</script>
