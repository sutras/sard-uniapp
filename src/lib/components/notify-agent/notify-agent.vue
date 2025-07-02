<template>
  <sar-notify
    ref="elRef"
    :visible="innerProps.visible"
    :root-style="innerProps.rootStyle"
    :root-class="innerProps.rootClass"
    :type="innerProps.type"
    :message="innerProps.message"
    :color="innerProps.color"
    :background="innerProps.background"
    :position="innerProps.position"
    :timeout="innerProps.timeout"
    :duration="innerProps.duration"
    :status-bar="innerProps.statusBar"
    @click="onClick"
    @update:visible="onUpdateVisible"
    @visible-hook="onVisibleHook"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SarNotify from '../notify/notify.vue'
import { type NotifyExpose } from '../notify/common'
import {
  type NotifyAgentProps,
  type NotifyImperative,
  type NotifyAgentEmits,
  imperativeName,
  defaultNotifyAgentProps,
} from './common'
import { type TransitionHookName, useImperative } from '../../use'

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

const emit = defineEmits<NotifyAgentEmits>()

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

const onClick = (event: any) => {
  emit('click', event)
}

const onUpdateVisible = (visible: boolean) => {
  innerProps.value.visible = visible
  emit('update:visible', visible)
}

const onVisibleHook = (name: TransitionHookName) => {
  emit('visible-hook', name)
  innerProps.value.onVisibleHook?.(name)
}

const onBeforeEnter = () => {
  emit('before-enter')
  innerProps.value.onBeforeEnter?.()
}

const onEnter = () => {
  emit('enter')
  innerProps.value.onEnter?.()
}

const onAfterEnter = () => {
  emit('after-enter')
  innerProps.value.onAfterEnter?.()
}

const onEnterCancelled = () => {
  emit('enter-cancelled')
  innerProps.value.onEnterCancelled?.()
}

const onBeforeLeave = () => {
  emit('before-leave')
  innerProps.value.onBeforeLeave?.()
}

const onLeave = () => {
  emit('leave')
  innerProps.value.onLeave?.()
}

const onAfterLeave = () => {
  emit('after-leave')
  innerProps.value.onAfterLeave?.()
}

const onLeaveCancelled = () => {
  emit('leave-cancelled')
  innerProps.value.onLeaveCancelled?.()
}

useImperative(
  imperativeName,
  imperative,
  computed(() => innerProps.value.id),
)
</script>
