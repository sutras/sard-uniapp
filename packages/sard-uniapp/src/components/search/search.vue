<template>
  <view :class="searchClass" :style="searchStyle" @click="onClick">
    <view v-if="$slots.prepend" :class="bem.e('prepend')">
      <slot name="prepend"></slot>
    </view>
    <view :class="bem.e('input-wrapper')">
      <sar-input
        :model-value="innerValue"
        clearable
        confirm-type="search"
        showClearOnlyFocus
        :readonly="readonly"
        :disabled="disabled"
        :placeholder="placeholder"
        borderless
        :root-class="inputClass"
        :root-style="inputStyle"
        :focus="focus"
        @update:model-value="onInput"
        @confirm="onConfirm"
        @clear="onClear"
        @focus="onFocus"
        @blur="onBlur"
      >
        <template #prepend>
          <slot name="input-prepend">
            <sar-icon name="search" :root-class="bem.e('icon')" />
          </slot>
        </template>
        <template #append>
          <slot name="input-append"></slot>
        </template>
      </sar-input>
    </view>
    <view v-if="cancel || search || $slots.append" :class="bem.e('append')">
      <sar-button
        v-if="cancel"
        type="pale-text"
        root-style="height: auto"
        @click="onCancel"
      >
        {{ cancel }}
      </sar-button>
      <sar-button
        v-if="search"
        type="pale-text"
        root-style="height: auto"
        @click="onConfirm"
      >
        {{ search }}
      </sar-button>
      <slot name="append"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarInput from '../input/input.vue'
import SarIcon from '../icon/icon.vue'
import SarButton from '../button/button.vue'
import {
  type SearchProps,
  type SearchSlots,
  type SearchEmits,
  searchPropsDefaults,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SearchProps>(), searchPropsDefaults)

defineSlots<SearchSlots>()

const emit = defineEmits<SearchEmits>()

const bem = createBem('search')

// main
const innerValue = ref(props.modelValue ?? '')

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue ?? ''
  },
)

const onInput = (value: string) => {
  innerValue.value = value
  emit('update:model-value', value)
}

const onConfirm = () => {
  emit('search', innerValue.value)
}

const onCancel = () => {
  innerValue.value = ''
  emit('cancel')
}

const onClick = (event: any) => {
  emit('click', event)
}

const onClear = () => {
  emit('clear')
}

const onFocus = (event: any) => {
  emit('focus', event)
}

const onBlur = (event: any) => {
  emit('blur', event)
}

// others
const searchClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('show-action', props.cancel || props.search),
    bem.m('disabled', props.disabled),
    props.rootClass,
  )
})

const searchStyle = computed(() => {
  return stringifyStyle(
    {
      backgroundColor: props.background,
    },
    props.rootStyle,
  )
})

const inputClass = computed(() => {
  return classNames(bem.e('input'), bem.em('input', props.shape))
})

const inputStyle = computed(() => {
  return stringifyStyle({
    textAlign: props.align,
    color: props.inputColor,
    backgroundColor: props.inputBackground,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
