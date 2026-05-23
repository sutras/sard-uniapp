<template>
  <sar-popup
    :visible="innerProps.visible"
    :root-style="innerProps.rootStyle"
    :root-class="innerProps.rootClass"
    :duration="innerProps.duration"
    :effect="innerProps.effect"
    :overlay="innerProps.overlay"
    :overlay-class="innerProps.overlayClass"
    :overlay-style="innerProps.overlayStyle"
    :background="innerProps.background"
    :transparent="innerProps.transparent"
    :keep-render="innerProps.keepRender"
    :overlay-closable="innerProps.overlayClosable"
    :lock-scroll="innerProps.lockScroll"
    :back-press="innerProps.backPress"
    @overlay-click="onOverlayClick"
    @update:visible="onUpdateVisible"
    @back-press="onBackPress"
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
    <slot></slot>
  </sar-popup>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue'
import SarPopup from '../popup/popup.vue'
import {
  type PopupAgentProps,
  type PopupAgentEmits,
  type PopupImperative,
  type PopupAgentSlots,
  imperativeName,
  defaultPopupAgentProps,
} from './common'
import { type TransitionHookName, useImperative } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<PopupAgentProps>(),
  defaultPopupAgentProps(),
)

const emit = defineEmits<PopupAgentEmits>()

defineSlots<PopupAgentSlots>()

// main
const innerProps = ref({ ...props }) as unknown as Ref<PopupAgentProps>

const imperative: PopupImperative = {
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

const onOverlayClick = (event: any) => {
  emit('overlay-click', event)
  innerProps.value.onOverlayClick?.(event)
}

const onUpdateVisible = (visible: boolean) => {
  innerProps.value.visible = visible
  emit('update:visible', visible)
}

const onBackPress = () => {
  emit('back-press')
  innerProps.value.onBackPress?.()
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
