<template>
  <view :class="passwordInputClass" :style="passwordInputStyle">
    <view
      v-for="item in items"
      :key="item.index"
      :class="classNames(bem.e('item'), bem.em('item', 'active', item.active))"
    >
      <template v-if="item.index < innerValue.length">
        <view v-if="plainText" :class="bem.e('plaintext')">
          {{ innerValue[item.index] }}
        </view>
        <view v-else :class="bem.e('ciphertext')"></view>
      </template>
      <view
        v-if="innerFocused && item.index === innerValue.length"
        :class="bem.e('cursor')"
      ></view>
    </view>

    <view v-if="!customKeyboard" :class="bem.e('input-wrapper')">
      <input
        type="number"
        :class="bem.e('input')"
        :disabled="isDisabled || isReadonly"
        :value="innerValue"
        :maxlength="length"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { useFormContext, useFormItemContext } from '../form/common'
import {
  type PasswordInputProps,
  type PasswordInputEmits,
  passwordInputPropsDefaults,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<PasswordInputProps>(),
  passwordInputPropsDefaults,
)

const emit = defineEmits<PasswordInputEmits>()

const bem = createBem('password-input')

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
const innerValue = ref(props.modelValue ?? '')

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue ?? ''
    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const onInput = (event: any) => {
  const value = event.detail.value
  innerValue.value = value
  emit('update:model-value', value)
  return value
}

// focus
const innerFocused = ref(props.focused)

watch(
  () => props.focused,
  () => {
    innerFocused.value = props.focused
  },
)

const onFocus = () => {
  innerFocused.value = true
  emit('updat:focused', true)
}

const onBlur = () => {
  innerFocused.value = false
  emit('updat:focused', false)

  if (props.validateEvent) {
    formItemContext?.onBlur()
  }
}

const items = computed(() => {
  const valueLength = innerValue.value.length

  return Array(props.length)
    .fill(0)
    .map((_, i) => {
      return {
        index: i,
        active:
          innerFocused.value &&
          (i === valueLength ||
            (i === valueLength - 1 && i === props.length - 1)),
      }
    })
})

// others
const isTight = computed(() => {
  return (
    props.gap === 0 ||
    (typeof props.gap === 'string' && parseInt(props.gap) === 0)
  )
})

const passwordInputClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('readonly', isReadonly.value),
    bem.m('disabled', isDisabled.value),
    bem.m(props.type, !isTight.value),
    bem.m(`tight-${props.type}`, isTight.value),
    props.rootClass,
  )
})

const passwordInputStyle = computed(() => {
  return stringifyStyle(
    {
      gap: props.gap,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
