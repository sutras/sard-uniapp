<template>
  <Dialog
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

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Dialog from '../dialog/dialog.vue'
import { dialogAgentProps, mapIdImperative } from './common'

const props = defineProps(dialogAgentProps)

// main
const innerProps = ref({ ...props })

const imperative = {
  show(newProps: Record<any, any>) {
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
