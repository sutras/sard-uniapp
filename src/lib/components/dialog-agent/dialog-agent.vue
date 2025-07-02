<template>
  <sar-dialog
    :root-style="innerProps.rootStyle"
    :root-class="innerProps.rootClass"
    :popup-style="innerProps.popupStyle"
    :popup-class="innerProps.popupClass"
    :visible="innerProps.visible"
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
    :duration="innerProps.duration"
    :cancel-props="innerProps.cancelProps"
    :confirm-props="innerProps.confirmProps"
    @update:visible="onUpdateVisible"
    @confirm="onConfirm"
    @close="onClose"
    @cancel="onCancel"
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
import SarDialog from '../dialog/dialog.vue'
import {
  type DialogAgentEmits,
  type DialogAgentProps,
  type DialogImperative,
  defaultDialogAgentProps,
  imperativeName,
} from './common'
import { type TransitionHookName, useImperative } from '../../use'

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

const emit = defineEmits<DialogAgentEmits>()

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

const onConfirm = () => {
  emit('confirm')
  innerProps.value.onConfirm?.()
}

const onClose = () => {
  emit('close')
  innerProps.value.onClose?.()
}

const onCancel = () => {
  emit('cancel')
  innerProps.value.onCancel?.()
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
