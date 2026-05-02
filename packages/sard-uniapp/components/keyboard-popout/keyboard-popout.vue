<template>
  <sar-popout
    v-model:visible="innerVisible"
    keep-render
    :title="title"
    :root-class="popoutClass"
    :root-style="popoutStyle"
    type="compact"
    :transparent="transparent"
    :show-cancel="showCancel"
    :show-confirm="showConfirm"
    @cancel="emit('cancel')"
    @confirm="emit('confirm')"
    @back-press="emit('back-press')"
    @visible-hook="onVisibleHook"
  >
    <slot></slot>
    <template #visible="{ already }">
      <sar-keyboard
        v-if="already"
        v-bind="omittedProps"
        ref="keyboardRef"
        @input="emit('input', $event)"
        @delete="emit('delete')"
        @toggle="emit('toggle', $event)"
        @update:mode="emit('update:mode', $event)"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SarPopout from '../popout/popout.vue'
import SarKeyboard from '../keyboard/keyboard.vue'
import {
  type KeyboardPopoutProps,
  type KeyboardPopoutSlots,
  type KeyboardPopoutEmits,
  type KeyboardPopoutExpose,
  defaultKeyboardPopoutProps,
} from './common'
import {
  omitFormPopoutProps,
  useTwoWayVisible,
  type TransitionHookName,
} from '../../use'
import { type KeyBoardExpose, type KeyboardPlateMode } from '../keyboard/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<KeyboardPopoutProps>(),
  defaultKeyboardPopoutProps(),
)

defineSlots<KeyboardPopoutSlots>()

const emit = defineEmits<KeyboardPopoutEmits>()

// main
const omittedProps = omitFormPopoutProps(props)

const { visible: innerVisible } = useTwoWayVisible(props, emit)

const keyboardRef = ref<KeyBoardExpose>()

const onVisibleHook = (name: TransitionHookName) => {
  if (name === 'enter' && props.type === 'random') {
    keyboardRef.value?.shuffle()
  }
  emit('visible-hook', name)
  emit(name as any)
}

defineExpose<KeyboardPopoutExpose>({
  shuffle() {
    keyboardRef.value?.shuffle()
  },
  toggle(mode?: KeyboardPlateMode) {
    keyboardRef.value?.toggle(mode)
  },
})
</script>

<style lang="scss">
@import './index.scss';
</style>
