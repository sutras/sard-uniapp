<template>
  <input
    :class="rootClass"
    :style="rootStyle"
    :value="value"
    :placeholder="placeholder"
    :placeholder-style="placeholderStyle"
    :placeholder-class="placeholderClass"
    :disabled="disabled"
    :maxlength="maxlength"
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
    :type="type"
    :controlled="controlled"
    :password="password"
    :always-embed="alwaysEmbed"
    :safe-password-cert-path="safePasswordCertPath"
    :safe-password-length="safePasswordLength"
    :safe-password-time-stamp="safePasswordTimeStamp"
    :safe-password-nonce="safePasswordNonce"
    :safe-password-salt="safePasswordSalt"
    :safe-password-custom-hash="safePasswordCustomHash"
    :random-number="randomNumber"
    :always-system="alwaysSystem"
    autocomplete="off"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
    @confirm="onConfirm"
    @keyboardheightchange="onKeyboardheightchange"
  />
</template>

<script lang="ts" setup>
import { defaultInputBaseProps, InputBaseEmits, InputBaseProps } from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

withDefaults(defineProps<InputBaseProps>(), defaultInputBaseProps())

const emit = defineEmits<InputBaseEmits>()

const onInput = (event: any) => {
  emit('input', event)
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
