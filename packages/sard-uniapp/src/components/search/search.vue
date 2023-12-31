<template>
  <view :class="searchClass" :style="searchStyle">
    <view v-if="$slots.prepend" :class="bem.e('prepend')">
      <slot name="prepend"></slot>
    </view>
    <view :class="bem.e('input-wrapper')">
      <sar-input
        :model-value="innerValue"
        @update:model-value="onInput"
        clearable
        confirm-type="search"
        showClearOnlyFocus
        :readonly="readonly"
        :disabled="disabled"
        :placeholder="placeholder"
        borderless
        :root-class="inputClass"
        :root-style="inputStyle"
        @confirm="onConfirm"
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

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarInput from '../input/input.vue'
import SarIcon from '../icon/icon.vue'
import SarButton from '../button/button.vue'
import { searchProps } from './common'

const props = defineProps(searchProps)

const emit = defineEmits(['update:model-value', 'cancel', 'search'])

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
