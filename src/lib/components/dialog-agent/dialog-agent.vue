<template>
  <sar-dialog v-bind="innerProps" v-model:visible="innerProps.visible" />
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
  defaultDialogAgentProps(),
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
