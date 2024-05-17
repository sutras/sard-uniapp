<template>
  <sar-toast
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

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import SarToast from '../toast/toast.vue'
import { type ToastExpose } from '../toast/common'
import {
  type ToastAgentProps,
  mapIdImperatives,
  toastAgentPropsDefaults,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ToastAgentProps>(),
  toastAgentPropsDefaults,
)

// main
const innerProps = ref({ ...props })

const elRef = ref<ToastExpose>()

const imperative = {
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

onMounted(() => {
  const id = innerProps.value.id
  if (id) {
    mapIdImperatives[id] ??= []
    mapIdImperatives[id].push(imperative)
  }
})

onUnmounted(() => {
  const id = innerProps.value.id
  if (id) {
    const imperatives = mapIdImperatives[id]
    const index = imperatives.indexOf(imperative)
    if (index !== -1) {
      imperatives.splice(imperatives.indexOf(imperative), 1)
    }
  }
})
</script>
