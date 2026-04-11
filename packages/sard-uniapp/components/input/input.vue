<template>
  <view :class="inputClass" :style="inputStyle" @click="onClick">
    <view :class="bem.e('content')">
      <view
        v-if="internalPrepend !== 0 && $slots.prepend"
        :class="bem.e('prepend')"
      >
        <slot name="prepend"></slot>
      </view>
      <sar-textarea-base
        v-if="type === 'textarea'"
        v-bind="textareaProps"
        :value="innerValue"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @linechange="onLinechange"
        @confirm="onConfirm"
        @keyboardheightchange="onKeyboardheightchange"
      />
      <sar-input-base
        v-if="type !== 'textarea'"
        v-bind="inputProps"
        :value="innerValue"
        :password="showPassword"
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
      <view v-if="maxlength === -1">{{ innerValue.length }}</view>
      <view v-else>{{ innerValue.length }} / {{ maxlength }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  isWeb,
  uniqid,
} from '../../utils'
import SarIcon from '../icon/icon.vue'
import { useFormContext, useFormItemContext } from '../form/common'
import {
  type InputProps,
  type InputSlots,
  type InputEmits,
  defaultInputProps,
  lastFocusInput,
} from './common'
import { type CompactContext, compactContextSymbol } from '../compact/common'
import { popoutInputContextSymbol } from '../popout-input/common'
import SarInputBase from '../input-base/input-base.vue'
import SarTextareaBase from '../input-base/textarea-base.vue'
import { type InputBaseProps } from '../input-base/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<InputProps>(), defaultInputProps())

defineSlots<InputSlots>()

const emit = defineEmits<InputEmits>()

const bem = createBem('input')

// main
const formContext = useFormContext()
const formItemContext = useFormItemContext()
const popoutInputContext = inject(popoutInputContextSymbol, null)

const compactContext = inject<CompactContext | null>(compactContextSymbol, null)

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

  lastFocusInput.value = thisInput

  if (!isWeb) {
    if (props.maxlength >= 0) {
      value = value.slice(0, props.maxlength)
    }
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

const thisInput = uniqid()

const onFocus = (event: any) => {
  oldValue = innerValue.value
  innerFocused.value = true
  emit('focus', event)

  lastFocusInput.value = thisInput
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

watch(lastFocusInput, () => {
  innerFocused.value = lastFocusInput.value === thisInput
})

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

// max length
const maxLength = computed(() => {
  return isWeb ? props.maxlength : -1
})

// eye
const isPlainText = ref(false)

const eyeIcon = computed(() => (isPlainText.value ? 'eye' : 'eye-slash'))

const onEyeClick = () => {
  isPlainText.value = !isPlainText.value
}

const showPassword = computed(() => {
  return props.type === 'password' && isPlainText.value === false
})

const omittedType = computed(() => {
  return props.type === 'password' || props.type === 'textarea'
    ? 'text'
    : props.type
})

const mergedShowEye = computed(() => props.type === 'password' && props.showEye)

// others
const inputClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.size),
    bem.m('inlaid', props.inlaid),
    bem.m('borderless', props.borderless),
    bem.m('disabled', isDisabled.value),
    bem.m('readonly', isReadonly.value),
    bem.m('focused', innerFocused.value),
    bem.m(`compact-${compactContext?.direction}`, compactContext),
    bem.m('compact-block', compactContext?.block),
    bem.m('in-popout-input', popoutInputContext),
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
      fontSize: `var(--sar-input-control-font-size${props.size === 'small' ? '-sm' : props.size === 'large' ? '-lg' : ''})`,
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

const fieldCommonProps = computed<InputBaseProps>(() => {
  return {
    placeholder: props.placeholder,
    placeholderStyle: mergedPlaceholderStyle.value,
    placeholderClass: props.placeholderClass,
    disabled: isDisabled.value || isReadonly.value,
    maxlength: maxLength.value,
    focus: props.focus,
    cursorSpacing: props.cursorSpacing,
    cursor: props.cursor,
    confirmType: props.confirmType,
    confirmHold: props.confirmHold,
    selectionStart: props.selectionStart,
    selectionEnd: props.selectionEnd,
    adjustPosition: props.adjustPosition,
    holdKeyboard: props.holdKeyboard,
    ignoreCompositionEvent: props.ignoreCompositionEvent,
    inputmode: props.inputmode,
    enableNative: props.enableNative,
    autoBlur: props.autoBlur,
  }
})

const inputOnlyProps = computed(() => {
  return {
    type: omittedType.value,
    alwaysEmbed: props.alwaysEmbed,
    safePasswordCertPath: props.safePasswordCertPath,
    safePasswordLength: props.safePasswordLength,
    safePasswordTimeStamp: props.safePasswordTimeStamp,
    safePasswordNonce: props.safePasswordNonce,
    safePasswordSalt: props.safePasswordSalt,
    safePasswordCustomHash: props.safePasswordCustomHash,
    randomNumber: props.randomNumber,
    controlled: props.controlled,
    alwaysSystem: props.alwaysSystem,
  }
})

const inputProps = computed(() => {
  return {
    ...fieldCommonProps.value,
    ...inputOnlyProps.value,
    rootClass: classNames(bem.e('control'), bem.em('control', 'input')),
  }
})

const textareaOnlyProps = computed(() => {
  return {
    autoHeight: props.autoHeight,
    fixed: props.fixed,
    showConfirmBar: props.showConfirmBar,
    disableDefaultPadding: props.disableDefaultPadding,
  }
})

const textareaProps = computed(() => {
  return {
    ...fieldCommonProps.value,
    ...textareaOnlyProps.value,
    rootClass: classNames(
      bem.e('control'),
      bem.em('control', 'textarea'),
      bem.em('control', 'input-min-height', props.inputMinHeight),
    ),
    rootStyle: controlStyle.value,
  }
})
</script>

<style lang="scss">
@import './index.scss';
</style>
