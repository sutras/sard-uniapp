<template>
  <sar-overlay
    :root-style="innerProps.rootStyle"
    :root-class="innerProps.rootClass"
    :visible="innerProps.visible"
    :z-index="innerProps.zIndex"
    :duration="innerProps.duration"
    :background="innerProps.background"
    :transparent="innerProps.transparent"
    @click="onClick"
  >
    <slot></slot>
  </sar-overlay>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue'
import SarOverlay from '../overlay/overlay.vue'
import {
  type OverlayAgentEmits,
  type OverlayAgentProps,
  type OverlayImperative,
  defaultOverlayAgentProps,
  imperativeName,
} from './common'
import { useImperative } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<OverlayAgentProps>(),
  defaultOverlayAgentProps(),
)

const emit = defineEmits<OverlayAgentEmits>()

const innerProps = ref({ ...props }) as unknown as Ref<OverlayAgentProps>

const imperative: OverlayImperative = {
  show(newProps: Record<string, any>) {
    innerProps.value = {
      ...props,
      ...newProps,
      visible: true,
    }
    emit('before-enter')
    innerProps.value.onBeforeEnter?.()
    emit('enter')
    innerProps.value.onEnter?.()
    emit('after-enter')
    innerProps.value.onAfterEnter?.()
  },
  hide() {
    emit('before-leave')
    innerProps.value.onBeforeLeave?.()
    emit('leave')
    innerProps.value.onLeave?.()
    innerProps.value = {
      ...innerProps.value,
      visible: false,
    }
    emit('after-leave')
    innerProps.value.onAfterLeave?.()
  },
}

const onClick = (event: any) => {
  emit('click', event)
  innerProps.value.onClick?.()
}

useImperative(
  imperativeName,
  imperative,
  computed(() => innerProps.value.id!),
)
</script>
