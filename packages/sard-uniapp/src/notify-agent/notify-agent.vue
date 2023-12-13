<template>
  <Notify
    :root-style="innerProps.rootStyle"
    :root-class="innerProps.rootClass"
    v-model:visible="innerProps.visible"
    :type="innerProps.type"
    :message="innerProps.message"
    :color="innerProps.color"
    :background="innerProps.background"
    :position="innerProps.position"
    :duration="innerProps.duration"
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
import Notify from '../notify/notify.vue'
import { notifyAgentProps, mapIdImperative } from './common'
import { type NotifyExpose } from '../notify/common'

const props = defineProps(notifyAgentProps)

// main
const innerProps = ref({ ...props })

const elRef = ref<NotifyExpose>()

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
