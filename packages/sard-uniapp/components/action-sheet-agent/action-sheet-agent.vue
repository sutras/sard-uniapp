<template>
  <sar-action-sheet
    :root-style="innerProps.rootStyle"
    :root-class="innerProps.rootClass"
    :description="innerProps.description"
    :item-list="innerProps.itemList"
    :cancel="innerProps.cancel"
    :show-cancel="innerProps.showCancel"
    :visible="innerProps.visible"
    :overlay-closable="innerProps.overlayClosable"
    :before-close="innerProps.beforeClose"
    :duration="innerProps.duration"
    :internal-cancel="$slots.cancel ? 1 : 0"
    :internal-description="$slots.description ? 1 : 0"
    :internal-default="$slots.default ? 1 : 0"
    :internal-context="context"
    @update:visible="onUpdateVisible"
    @select="onSelect"
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
  >
    <template #description>
      <slot name="description"></slot>
    </template>
    <template #cancel>
      <slot name="cancel"></slot>
    </template>
    <slot></slot>
  </sar-action-sheet>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue'
import SarActionSheet from '../action-sheet/action-sheet.vue'
import {
  type ActionSheetAgentEmits,
  type ActionSheetAgentProps,
  type ActionSheetAgentSlots,
  type ActionSheetImperative,
  defaultActionSheetAgentProps,
  imperativeName,
} from './common'
import { type TransitionHookName, useImperative } from '../../use'
import { type ActionSheetItemProps } from '../action-sheet/common'
import { useActionSheet } from '../action-sheet/context'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ActionSheetAgentProps>(),
  defaultActionSheetAgentProps(),
)

defineSlots<ActionSheetAgentSlots>()

const emit = defineEmits<ActionSheetAgentEmits>()

// main
const innerProps = ref({ ...props }) as unknown as Ref<ActionSheetAgentProps>

const imperative: ActionSheetImperative = {
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

const onSelect = (item: ActionSheetItemProps, index: number) => {
  emit('select', item, index)
  innerProps.value.onSelect?.(item, index)
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

const context = useActionSheet()

useImperative(
  imperativeName,
  imperative,
  computed(() => innerProps.value.id!),
)
</script>
