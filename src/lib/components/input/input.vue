<template>
  <view :class="inputClass" :style="inputStyle" @click="onClick">
    <view :class="bem.e('content')">
      <view
        v-if="internalPrepend !== 0 && $slots.prepend"
        :class="bem.e('prepend')"
      >
        <slot name="prepend"></slot>
      </view>
      <textarea
        v-if="type === 'textarea'"
        :class="
          classNames(
            bem.e('control'),
            bem.em('control', 'textarea'),
            bem.em('control', 'input-min-height', inputMinHeight),
          )
        "
        v-bind="textareaProps"
        :show-count="false"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @linechange="onLinechange"
        @confirm="onConfirm"
        @keyboardheightchange="onKeyboardheightchange"
        :auto-height="autoHeight"
        :style="controlStyle"
      />
      <input
        v-if="type !== 'textarea' && showPassword"
        :class="classNames(bem.e('control'), bem.em('control', 'input'))"
        v-bind="inputProps"
        :password="true"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @confirm="onConfirm"
        @keyboardheightchange="onKeyboardheightchange"
      />
      <input
        v-if="type !== 'textarea' && !showPassword"
        :class="classNames(bem.e('control'), bem.em('control', 'input'))"
        v-bind="inputProps"
        :password="false"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @confirm="onConfirm"
        @keyboardheightchange="onKeyboardheightchange"
      />
      <view :class="bem.e('tools')">
        <view
          v-show="clearVisible"
          :class="bem.e('clear')"
          @click.stop="onClearClick"
          @mousedown="onClearMouseDown"
          @touchstart="onClearTouchStart"
          @touchend="onClearTouchEnd"
          @touchcancel="onClearTouchEnd"
        >
          <sar-icon family="sari" name="x-circle-fill" />
        </view>
        <view
          v-if="mergedShowEye"
          :class="bem.e('eye')"
          @click.stop="onEyeClick"
        >
          <sar-icon family="sari" :name="eyeIcon" />
        </view>
        <view v-if="$slots.append" :class="bem.e('append')">
          <slot name="append"></slot>
        </view>
      </view>
      <slot name="addon"></slot>
    </view>
    <view v-if="showCount" :class="bem.e('count')">
      {{ innerValue.length }} / {{ maxlength }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarIcon from '../icon/icon.vue'
import { useFormContext, useFormItemContext } from '../form/common'
import {
  type InputProps,
  type InputSlots,
  type InputEmits,
  defaultInputProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<InputProps>(), defaultInputProps)

defineSlots<InputSlots>()

const emit = defineEmits<InputEmits>()

const bem = createBem('input')

// main
const formContext = useFormContext()
const formItemContext = useFormItemContext()

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || props.readonly
})

// value
const innerValue = ref(String(props.modelValue ?? ''))

const setInnerValue = (value: string) => {
  innerValue.value = value
  emit('update:model-value', value)
  emit('input', value)
}

watch(
  () => props.modelValue,
  () => {
    innerValue.value = String(props.modelValue ?? '')
    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const onInput = (event: any) => {
  let value = event.detail.value
  if (props.maxlength >= 0) {
    value = value.slice(0, props.maxlength)
  }
  setInnerValue(value)
  return value
}

// focus
const innerFocused = ref(props.focus || props.focused)

watch([() => props.focus, () => props.focused], () => {
  innerFocused.value = props.focus || props.focused
})

let oldValue = ''

const onFocus = (event: any) => {
  oldValue = innerValue.value
  innerFocused.value = true
  emit('focus', event)
}

const onBlur = (event: any) => {
  innerFocused.value = false
  emit('blur', event)
  if (props.validateEvent) {
    formItemContext?.onBlur()
  }
  if (oldValue !== innerValue.value) {
    emit('change', innerValue.value)
  }
}

// clear
const clearVisible = computed(() => {
  const visibleBase =
    props.clearable &&
    innerValue.value &&
    !isDisabled.value &&
    !isReadonly.value

  return props.showClearOnlyFocus
    ? holdupClear.value || (innerFocused.value && visibleBase)
    : visibleBase
})

const holdupClear = ref(false)

const onClearTouchStart = () => {
  holdupClear.value = true
}

const onClearTouchEnd = () => {
  holdupClear.value = false
}

const onClearMouseDown = () => {
  // #ifdef WEB
  onClearTouchStart()

  const upHandler = () => {
    onClearTouchEnd()
    document.removeEventListener('mouseup', upHandler)
  }
  document.addEventListener('mouseup', upHandler)
  // #endif
}

const onClearClick = () => {
  setInnerValue('')
  emit('clear')
}

const onLinechange = (event: any) => {
  emit('linechange', event)
}

const onConfirm = (event: any) => {
  emit('confirm', event)
}

const onKeyboardheightchange = (event: any) => {
  emit('keyboardheightchange', event)
}

const onClick = (event: any) => {
  emit('click', event)
}

// eye
const isPlainText = ref(false)

const eyeIcon = computed(() => (isPlainText.value ? 'eye' : 'eye-slash'))

const onEyeClick = () => {
  isPlainText.value = !isPlainText.value
}

const showPassword = computed(() => {
  return props.type === 'password' && isPlainText.value === false
})

const mergedType = computed(() => {
  return showPassword.value
    ? 'password'
    : props.type === 'password'
      ? 'text'
      : props.type
})

const mergedShowEye = computed(() => props.type === 'password' && props.showEye)

// others
const inputClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('inlaid', props.inlaid),
    bem.m('borderless', props.borderless),
    bem.m('disabled', isDisabled.value),
    bem.m('readonly', isReadonly.value),
    bem.m('focused', innerFocused.value),
    props.rootClass,
  )
})

const inputStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const controlStyle = computed(() => {
  return stringifyStyle({
    minHeight: props.minHeight,
    height: !props.autoHeight && props.minHeight,
  })
})

const mergedPlaceholderStyle = computed(() => {
  return stringifyStyle(
    {
      color: 'var(--sar-input-placeholder-color)',
      fontSize: 'var(--sar-input-control-font-size)',
      lineHeight: 'var(--sar-input-control-line-height)',
    },
    props.inputMinHeight
      ? {
          minHeight: 'var(--sar-input-control-input-height)',
          lineHeight: 'var(--sar-input-control-input-height)',
        }
      : null,
    props.placeholderStyle,
  )
})

// 提取 textarea 的属性
const textareaProps = computed(() => {
  const commonProps = {
    value: innerValue.value,
    placeholder: props.placeholder,
    'placeholder-style': mergedPlaceholderStyle.value,
    'placeholder-class': props.placeholderClass,
    disabled: isDisabled.value || isReadonly.value,
    maxlength: props.maxlength,
    focus: props.focus,
    'cursor-spacing': props.cursorSpacing,
    cursor: props.cursor,
    'confirm-type': props.confirmType,
    'confirm-hold': props.confirmHold,
    'selection-start': props.selectionStart,
    'selection-end': props.selectionEnd,
    'adjust-position': props.adjustPosition,
    'hold-keyboard': props.holdKeyboard,
    'auto-blur': props.autoBlur,
    'ignore-composition-event': props.ignoreCompositionEvent,
    inputmode: props.inputmode,
    autocomplete: 'off',
    fixed: props.fixed,
    'show-confirm-bar': props.showConfirmBar,
    'disable-default-padding': props.disableDefaultPadding,
  }

  return {
    ...commonProps,
    // 支付宝小程序特有属性
    // #ifdef MP-ALIPAY
    enableNative: props.enableNative,
    // #endif
  }
})

// 提取 input 的属性
const inputProps = computed(() => {
  const commonProps = {
    value: innerValue.value,
    placeholder: props.placeholder,
    'placeholder-style': mergedPlaceholderStyle.value,
    'placeholder-class': props.placeholderClass,
    disabled: isDisabled.value || isReadonly.value,
    maxlength: props.maxlength,
    focus: props.focus,
    'cursor-spacing': props.cursorSpacing,
    cursor: props.cursor,
    'confirm-type': props.confirmType,
    'confirm-hold': props.confirmHold,
    'selection-start': props.selectionStart,
    'selection-end': props.selectionEnd,
    'adjust-position': props.adjustPosition,
    'hold-keyboard': props.holdKeyboard,
    'auto-blur': props.autoBlur,
    'ignore-composition-event': props.ignoreCompositionEvent,
    inputmode: props.inputmode,
    autocomplete: 'off',
    type: mergedType.value,
    'always-embed': props.alwaysEmbed,
    'safe-password-cert-path': props.safePasswordCertPath,
    'safe-password-length': props.safePasswordLength,
    'safe-password-time-stamp': props.safePasswordTimeStamp,
    'safe-password-nonce': props.safePasswordNonce,
    'safe-password-salt': props.safePasswordSalt,
    'safe-password-custom-hash': props.safePasswordCustomHash,
    'random-number': props.randomNumber,
    controlled: props.controlled,
    'always-system': props.alwaysSystem,
  }

  return {
    ...commonProps,
    // 支付宝小程序特有属性
    // #ifdef MP-ALIPAY
    enableNative: props.enableNative,
    // #endif
  }
})
</script>

<style lang="scss">
@import './index.scss';
</style>
