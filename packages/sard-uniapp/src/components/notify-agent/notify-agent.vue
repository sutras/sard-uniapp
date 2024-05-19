<template>
  <sar-notify
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

<script setup lang="ts">
import { computed, ref } from 'vue'
import SarNotify from '../notify/notify.vue'
import { type NotifyExpose } from '../notify/common'
import {
  type NotifyAgentProps,
  type NotifyImperative,
  imperativeName,
  notifyAgentPropsDefaults,
} from './common'
import { useImperative } from '../../use/useImperative'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<NotifyAgentProps>(),
  notifyAgentPropsDefaults,
)

// main
const innerProps = ref({ ...props })

const elRef = ref<NotifyExpose>()

const imperative: NotifyImperative = {
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
