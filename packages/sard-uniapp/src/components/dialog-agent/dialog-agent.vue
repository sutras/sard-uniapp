<template>
  <sar-dialog
    :root-style="innerProps.rootStyle"
    :root-class="innerProps.rootClass"
    v-model:visible="innerProps.visible"
    :title="innerProps.title"
    :message="innerProps.message"
    :headed="innerProps.headed"
    :button-type="innerProps.buttonType"
    :show-cancel="innerProps.showCancel"
    :cancel-text="innerProps.cancelText"
    :show-confirm="innerProps.showConfirm"
    :confirm-text="innerProps.confirmText"
    :overlay-closable="innerProps.overlayClosable"
    :before-close="innerProps.beforeClose"
  />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import SarDialog from '../dialog/dialog.vue'
import {
  type DialogAgentProps,
  dialogAgentPropsDefaults,
  mapIdImperative,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<DialogAgentProps>(),
  dialogAgentPropsDefaults,
)

// main
const innerProps = ref({ ...props })

const imperative = {
  show(newProps: Record<string, any>) {
    innerProps.value = {
      ...props,
      ...newProps,
      visible: true,
    }
  },
  hide() {
    innerProps.value = {
      ...innerProps.value,
      visible: false,
    }
  },
}

onMounted(() => {
  if (innerProps.value.id) {
    mapIdImperative[innerProps.value.id] = imperative
  }
})

onUnmounted(() => {
  if (innerProps.value.id) {
    delete mapIdImperative[innerProps.value.id]
  }
})
</script>
