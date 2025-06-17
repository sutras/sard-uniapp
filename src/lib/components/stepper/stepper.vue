<template>
  <view :class="stepperClass" :style="stepperStyle">
    <view
      :class="
        classNames(
          bem.e('button'),
          bem.em('button', 'disabled', isDisabled || isMin),
          bem.em('button', 'readonly', isReadonly),
          bem.em('button', 'decrease'),
        )
      "
      @click="onButtonClick(-1, isMin)"
      @touchstart="onTouchStart(-1)"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
      @mousedown="onMouseDown(-1)"
    >
      <sar-icon family="sari" name="minus" />
    </view>
    <input
      :class="bem.e('input')"
      :type="inputType"
      :placeholder="placeholder"
      :placeholder-class="bem.e('placeholder')"
      :value="inputValue"
      :disabled="isDisabled || isReadonly"
      :style="inputStyle"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />
    <view
      :class="
        classNames(
          bem.e('button'),
          bem.em('button', 'disabled', isDisabled || isMax),
          bem.em('button', 'readonly', isReadonly),
          bem.em('button', 'increase'),
        )
      "
      @click="onButtonClick(1, isMax)"
      @touchstart="onTouchStart(1)"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
      @mousedown="onMouseDown(1)"
    >
      <sar-icon family="sari" name="plus" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  isNullish,
  minmax,
} from '../../utils'
import SarIcon from '../icon/icon.vue'
import { useFormContext, useFormItemContext } from '../form/common'
import {
  type StepperProps,
  type StepperEmits,
  defaultStepperProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<StepperProps>(), defaultStepperProps)

const emit = defineEmits<StepperEmits>()

const bem = createBem('stepper')

// main
const formContext = useFormContext()
const formItemContext = useFormItemContext()

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || props.readonly
})

// 输入框
const innerValue = ref(props.modelValue)
const inputValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
    inputValue.value = props.modelValue

    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const setInnerValue = (value: number | undefined) => {
  innerValue.value = value
  emit('update:model-value', value)
  emit('change', value)
}

const setValueEnsureSafe = (value: number) => {
  setInnerValue(value)
  inputValue.value = value
}

const normalizedValue = (value: number) => {
  value = minmax(value, props.min, props.max)
  if (props.precision !== undefined) {
    value = +value.toFixed(props.precision)
  }
  return value
}

const getValueOnClear = () => {
  return props.valueOnClear === 'min'
    ? props.min
    : props.valueOnClear === 'max'
      ? props.max
      : props.valueOnClear
}

const onInput = (event: any) => {
  const value = event.detail.value
  inputValue.value = value
  if (value === '') {
    setInnerValue(getValueOnClear())
  }
}

const onBlur = (event: any) => {
  if (inputValue.value !== '') {
    const nextValue = Number(inputValue.value)
    if (isNaN(nextValue)) {
      inputValue.value = ''
      setInnerValue(getValueOnClear())
    } else {
      setValueEnsureSafe(normalizedValue(nextValue))
    }
  }
  emit('blur', event)
}

const onFocus = (event: any) => {
  emit('focus', event)
}

// 按钮
const isMin = computed(() => {
  return !isNullish(innerValue.value) && Number(innerValue.value) <= props.min
})
const isMax = computed(() => {
  return !isNullish(innerValue.value) && Number(innerValue.value) >= props.max
})

const setByStep = (delta: number) => {
  setValueEnsureSafe(
    normalizedValue((Number(innerValue.value) || 0) + props.step * delta),
  )
}

const onButtonClick = (delta: number, arrived: boolean) => {
  if (!isDisabled.value && !isReadonly.value && !arrived) {
    setByStep(delta)
  }
}

// 长按
let pressTimer: ReturnType<typeof setTimeout>
let isPressing = false

const onLongPress = (delta: number) => {
  if (isPressing) {
    setByStep(delta)
    setTimeout(() => {
      onLongPress(delta)
    }, props.interval)
  }
}

const onTouchStart = (delta: number) => {
  if (
    !props.press ||
    isDisabled.value ||
    isReadonly.value ||
    (delta === -1 && isMin.value) ||
    (delta === 1 && isMax.value)
  ) {
    return
  }

  clearTimeout(pressTimer)
  isPressing = false

  pressTimer = setTimeout(() => {
    isPressing = true
    onLongPress(delta)
  }, props.pressTime)
}

const onTouchEnd = () => {
  clearTimeout(pressTimer)
  isPressing = false
}

// pc长按
const onMouseDown = (delta: number) => {
  // #ifdef WEB
  onTouchStart(delta)

  const upHandler = () => {
    onTouchEnd()
    document.removeEventListener('mouseup', upHandler)
  }
  document.addEventListener('mouseup', upHandler)
  // #endif
}

// others
const stepperClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.size),
    bem.m('disabled', isDisabled.value),
    bem.m('readonly', isReadonly.value),
    props.rootClass,
  )
})

const stepperStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
