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
import { computed, ref } from 'vue'
import SarDialog from '../dialog/dialog.vue'
import {
  type DialogAgentProps,
  type DialogImperative,
  defaultDialogAgentProps,
  imperativeName,
} from './common'
import { useImperative } from '../../use/useImperative'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<DialogAgentProps>(),
  defaultDialogAgentProps,
)

// main
const innerProps = ref({ ...props })

const imperative: DialogImperative = {
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

useImperative(
  imperativeName,
  imperative,
  computed(() => innerProps.value.id),
)
</script>
