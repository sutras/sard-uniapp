<template>
  <sar-share-sheet
    :root-style="innerProps.rootStyle"
    :root-class="innerProps.rootClass"
    :title="innerProps.title"
    :description="innerProps.description"
    :item-list="innerProps.itemList"
    :cancel="innerProps.cancel"
    :visible="innerProps.visible"
    :overlay-closable="innerProps.overlayClosable"
    :before-close="innerProps.beforeClose"
    :duration="innerProps.duration"
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
    <template #title>
      <slot name="title" />
    </template>
    <template #description>
      <slot name="description" />
    </template>
    <template #cancel>
      <slot name="cancel" />
    </template>
    <slot />
  </sar-share-sheet>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue'
import SarShareSheet from '../share-sheet/share-sheet.vue'
import {
  type ShareSheetAgentEmits,
  type ShareSheetAgentProps,
  type ShareSheetImperative,
  defaultShareSheetAgentProps,
  imperativeName,
} from './common'
import { type TransitionHookName, useImperative } from '../../use'
import type { ShareSheetItemProps } from '../share-sheet-item/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ShareSheetAgentProps>(),
  defaultShareSheetAgentProps(),
)

const emit = defineEmits<ShareSheetAgentEmits>()

const innerProps = ref({ ...props }) as unknown as Ref<ShareSheetAgentProps>

const imperative: ShareSheetImperative = {
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

const onSelect = (item: ShareSheetItemProps) => {
  emit('select', item)
  innerProps.value.onSelect?.(item)
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
  computed(() => innerProps.value.id!),
)
</script>
