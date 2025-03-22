<template>
  <sar-crop-image v-bind="innerProps" v-model:visible="innerProps.visible" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SarCropImage from '../crop-image/crop-image.vue'
import {
  type CropImageAgentProps,
  type CropImageImperative,
  defaultCropImageAgentProps,
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
  defineProps<CropImageAgentProps>(),
  defaultCropImageAgentProps(),
)

// main
const innerProps = ref({ ...props })

const imperative: CropImageImperative = {
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
