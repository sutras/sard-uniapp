<template>
  <textarea
    :class="rootClass"
    :style="rootStyle"
    :value="value"
    :placeholder="placeholder"
    :placeholder-style="placeholderStyle"
    :placeholder-class="placeholderClass"
    :disabled="disabled"
    :maxlength="maxLength"
    :focus="focus"
    :cursor-spacing="cursorSpacing"
    :cursor="cursor"
    :confirm-type="confirmType"
    :confirm-hold="confirmHold"
    :selection-start="selectionStart"
    :selection-end="selectionEnd"
    :adjust-position="adjustPosition"
    :hold-keyboard="holdKeyboard"
    :ignore-composition-event="ignoreCompositionEvent"
    :inputmode="inputmode"
    :enableNative="enableNative"
    :auto-blur="autoBlur"
    :auto-height="autoHeight"
    :fixed="fixed"
    :show-confirm-bar="showConfirmBar"
    :disable-default-padding="disableDefaultPadding"
    :show-count="false"
    autocomplete="off"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
    @confirm="onConfirm"
    @keyboardheightchange="onKeyboardheightchange"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { isWeb } from '../../utils'
import {
  type TextareaBaseEmits,
  type TextareaBaseProps,
  defaultTextareaBaseProps,
} from '../input-base/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<TextareaBaseProps>(),
  defaultTextareaBaseProps(),
)

const emit = defineEmits<TextareaBaseEmits>()

// max length
const maxLength = computed(() => {
  return isWeb ? props.maxlength : -1
})

const onInput = (event: any) => {
  let value = event.detail.value

  if (!isWeb) {
    if (props.maxlength >= 0) {
      value = value.slice(0, props.maxlength)
    }
  }

  emit('input', value)

  return value
}

const onFocus = (event: any) => {
  emit('focus', event)
}

const onBlur = (event: any) => {
  emit('blur', event)
}

const onConfirm = (event: any) => {
  emit('confirm', event)
}

const onKeyboardheightchange = (event: any) => {
  emit('keyboardheightchange', event)
}
</script>
