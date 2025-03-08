<template>
  <sar-notify
    ref="elRef"
    v-bind="notifyProps"
    v-model:visible="notifyProps.visible"
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
  defaultNotifyAgentProps,
} from './common'
import { useImperative } from '../../use/useImperative'
import { omit } from '../../utils'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<NotifyAgentProps>(),
  defaultNotifyAgentProps(),
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

const notifyProps = computed(() => {
  return omit(innerProps.value, ['id'])
})

useImperative(
  imperativeName,
  imperative,
  computed(() => innerProps.value.id),
)
</script>
