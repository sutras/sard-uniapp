<template>
  <button
    :class="buttonClass"
    :style="buttonStyle"
    :disabled="isDisabled || loading"
    :hover-class="bem.m('hover')"
    @click="onClick"
  >
    <view
      v-if="loading"
      :class="
        classNames(
          bem.e('loading'),
          bem.em('loading', 'with-slot', !!$slots.default),
        )
      "
    >
      <sar-loading :type="loadingType" />
    </view>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarLoading from '../loading/loading.vue'
import { useFormContext } from '../form/common'
import {
  type ButtonProps,
  type ButtonSlots,
  type ButtonEmits,
  buttonPropsDefaults,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<ButtonProps>(), buttonPropsDefaults)

defineSlots<ButtonSlots>()

const emit = defineEmits<ButtonEmits>()

const bem = createBem('button')

// main
const formContext = useFormContext()

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const onClick = (event: any) => {
  emit('click', event)
}

// others
const buttonClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.size),
    bem.m(props.type),
    bem.m(`${props.type}-${props.theme}`),
    bem.m('round', props.round),
    bem.m('disabled', isDisabled.value),
    bem.m('loading', props.loading),
    props.rootClass,
  )
})

const buttonStyle = computed(() => {
  return stringifyStyle(
    {
      color: props.color,
      background: props.background,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
