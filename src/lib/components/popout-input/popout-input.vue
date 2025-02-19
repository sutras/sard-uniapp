<template>
  <view :class="popoutInputClass" :style="popoutInputStyle">
    <sar-input
      inlaid
      :model-value="innerValue"
      @change="onChange"
      :placeholder="placeholder"
      :readonly="isReadonly"
      :disabled="isDisabled"
      :clearable="clearable"
      :validate-event="false"
      :type="multiline ? 'textarea' : undefined"
      :auto-height="multiline"
      :input-min-height="multiline"
      @clear="onClear"
    >
      <template #append>
        <view :class="bem.e('append')">
          <view :class="bem.e('loading')" v-if="loading">
            <sar-loading />
          </view>
          <view v-if="!isReadonly" :class="bem.e('arrow')">
            <sar-icon name="caret-right" />
          </view>
        </view>
      </template>
      <template #addon>
        <view
          :class="bem.e('seal')"
          @mousedown="onSealMouseDown"
          @touchstart="onSealTouchStart"
          @touchend="onSealTouchEnd"
          @touchcancel="onSealTouchEnd"
          @click="onClick"
        />
      </template>
    </sar-input>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarInput from '../input/input.vue'
import SarIcon from '../icon/icon.vue'
import { useFormContext } from '../form/common'
import { type PopoutInputProps, type PopoutInputEmits } from './common'
import SarLoading from '../loading/loading.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<PopoutInputProps>(), {})

const emit = defineEmits<PopoutInputEmits>()

const bem = createBem('popout-input')

// main
const formContext = useFormContext()

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || props.readonly
})

// value
const innerValue = ref(props.modelValue)

const setInnerValue = (value: string) => {
  innerValue.value = value
  emit('update:model-value', value)
  emit('change', value)
}

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
  },
)

const onChange = (value: string) => {
  setInnerValue(value)
}

const onClear = () => {
  setInnerValue('')
  emit('clear')
}

// seal
const isSealDown = ref(false)
const interoperable = computed(() => {
  return !isDisabled.value && !isReadonly.value && !props.loading
})

const onSealTouchStart = () => {
  if (interoperable.value) {
    isSealDown.value = true
  }
}

const onSealTouchEnd = () => {
  if (interoperable.value) {
    isSealDown.value = false
  }
}

const onSealMouseDown = () => {
  // #ifdef WEB
  onSealTouchStart()

  const upHandler = () => {
    onSealTouchEnd()
    document.removeEventListener('mouseup', upHandler)
  }
  document.addEventListener('mouseup', upHandler)
  // #endif
}

const onClick = (event: any) => {
  if (interoperable.value) {
    emit('click', event)
  }
}

// others
const popoutInputClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('down', isSealDown.value),
    bem.m('loading', props.loading),
    bem.m('readonly', isReadonly.value),
    bem.m('disabled', isDisabled.value),
    props.rootClass,
  )
})

const popoutInputStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@use './index.scss';
</style>
