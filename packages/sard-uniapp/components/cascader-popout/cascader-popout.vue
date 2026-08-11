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
        v-bind="omittedProps"
        ref="cascaderRef"
        :model-value="popoutValue"
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
  type CascaderPopoutExpose,
  defaultCascaderPopoutProps,
} from './common'
import { isEmptyBinding } from '../../utils'
import { omitFormPopoutProps, useFormPopout } from '../../use'
import { ref } from 'vue'
import { type CascaderExpose } from '../cascader/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<CascaderPopoutProps>(),
  defaultCascaderPopoutProps(),
)

defineSlots<CascaderPopoutSlots>()

const emit = defineEmits<CascaderPopoutEmits>()

// main
const omittedProps = omitFormPopoutProps(props)

const { innerVisible, popoutValue, onChange, onConfirm, onVisibleHook } =
  useFormPopout(props, emit, {
    onChange() {
      if (!props.showConfirm && !isEmptyBinding(popoutValue.value)) {
        onConfirm(false)
        innerVisible.value = false
      }
    },
  })

const cascaderRef = ref<CascaderExpose>()

defineExpose<CascaderPopoutExpose>({
  initialize: () => {
    cascaderRef.value?.initialize()
  },
})
</script>
