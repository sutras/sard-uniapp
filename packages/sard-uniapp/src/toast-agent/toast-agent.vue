<template>
  <Toast
    :root-style="innerProps.rootStyle"
    :root-class="innerProps.rootClass"
    :type="innerProps.type"
    :title="innerProps.title"
    v-model:visible="innerProps.visible"
    :position="innerProps.position"
    :overlay="innerProps.overlay"
    :transparent="innerProps.transparent"
    ref="elRef"
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
import Toast from '../toast/toast.vue'
import { type ToastExpose } from '../toast/common'
import { mapIdImperative, toastAgentProps } from './common'

const props = defineProps(toastAgentProps)

// main
const innerProps = ref({ ...props })

const elRef = ref<ToastExpose>()

const imperative = {
  show(newProps) {
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
