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
      <Loading size="inherit" color="inherit" :type="loadingType" />
    </view>
    <slot></slot>
  </button>
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
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../utils'
import Loading from '../loading/loading.vue'
import { useFormContext } from '../form/common'
import { buttonProps } from './common'

const props = defineProps(buttonProps)

const emit = defineEmits(['click'])

const bem = createBem('button')

// main
const formContext = useFormContext()

const isDisabled = computed(() => {
  return formContext?.disabled ?? props.disabled
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
@use './index.scss';
</style>
