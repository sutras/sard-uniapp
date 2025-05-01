<template>
  <sar-toast
    ref="elRef"
    v-model:visible="innerProps.visible"
    :root-style="innerProps.rootStyle"
    :root-class="innerProps.rootClass"
    :type="innerProps.type"
    :title="innerProps.title"
    :position="innerProps.position"
    :overlay="innerProps.overlay"
    :transparent="innerProps.transparent"
    :timeout="innerProps.timeout"
    :duration="innerProps.duration"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SarToast from '../toast/toast.vue'
import { type ToastExpose } from '../toast/common'
import {
  type ToastAgentProps,
  type ToastImperative,
  imperativeName,
  defaultToastAgentProps,
} from './common'
import { useImperative } from '../../use/useImperative'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ToastAgentProps>(),
  defaultToastAgentProps(),
)

// main
const innerProps = ref({ ...props })

const elRef = ref<ToastExpose>()

const imperative: ToastImperative = {
  show(newProps: Record<string, any>) {
    innerProps.value = {
      ...props,
      ...newProps,
      visible: true,
    }

    elRef.value?.reHideLater()
  },
  hide() {
    innerProps.value = {
      ...innerProps.value,
      visible: false,
    }

    elRef.value?.cancelHide()
  },
}

useImperative(
  imperativeName,
  imperative,
  computed(() => innerProps.value.id),
)
</script>
