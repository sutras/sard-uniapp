<template>
  <view :class="switchClass" :style="switchStyle" @click="onClick">
    <view :class="bem.e('thumb')">
      <sar-loading v-if="innerLoading" size="0.5em" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarLoading from '../loading/loading.vue'
import { useFormContext, useFormItemContext } from '../form/common'
import {
  type SwitchProps,
  type SwitchEmits,
  switchPropsDefaults,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SwitchProps>(), switchPropsDefaults)

const emit = defineEmits<SwitchEmits>()

const bem = createBem('switch')

// main
const formContext = useFormContext()
const formItemContext = useFormItemContext()

const isDisabled = computed(() => {
  return formContext?.disabled ?? props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly ?? props.readonly
})

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue

    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const innerLoading = ref(props.loading)

watch(
  () => props.loading,
  () => {
    innerLoading.value = props.loading
  },
)

const isChecked = computed(() => {
  return innerValue.value === props.checkedValue
})

const onClick = async (event: any) => {
  emit('click', event)

  if (isDisabled.value || isReadonly.value || innerLoading.value) {
    return
  }

  const nextValue =
    innerValue.value === props.checkedValue
      ? props.uncheckedValue
      : props.checkedValue

  if (props.beforeUpdate) {
    try {
      innerLoading.value = true
      await props.beforeUpdate(nextValue)
    } catch {
      return
    } finally {
      innerLoading.value = false
    }
  }

  innerValue.value = nextValue
  emit('update:model-value', nextValue)
}

const switchClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('checked', isChecked.value),
    bem.m('readonly', isReadonly.value),
    bem.m('disabled', isDisabled.value),
    props.rootClass,
  )
})

const switchStyle = computed(() => {
  return stringifyStyle(
    {
      fontSize: props.size,
      backgroundColor: isChecked.value
        ? props.checkedColor
        : props.uncheckedColor,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
