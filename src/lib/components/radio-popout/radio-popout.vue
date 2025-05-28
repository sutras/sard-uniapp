<template>
  <sar-popout
    v-model:visible="innerVisible"
    :title="title"
    :root-class="popoutClass"
    :root-style="popoutStyle"
    @confirm="onConfirm"
  >
    <template #visible="{ already }">
      <view v-if="already" :class="containerClass">
        <scroll-view
          :class="bem.e('scroll')"
          scroll-y
          trap-scroll
          :upper-threshold="0"
          :lower-threshold="0"
          :throttle="false"
          @scroll="onScroll"
          @scrolltoupper="onScrolltoupper"
          @scrolltolower="onScrolltolower"
        >
          <sar-radio-group
            :size="size"
            :type="type"
            :checkedColor="checkedColor"
            :direction="direction"
            :validate-event="false"
            :model-value="popoutValue"
            @change="onChange"
          >
            <template #custom="{ toggle }">
              <sar-list inlaid>
                <sar-list-item
                  v-for="option in options"
                  :key="getMayPrimitiveOption(option, fieldKeys.value)"
                  :title="getMayPrimitiveOption(option, fieldKeys.label)"
                  hover
                  @click="
                    toggle(getMayPrimitiveOption(option, fieldKeys.value))
                  "
                >
                  <template #value>
                    <sar-radio
                      readonly
                      :value="getMayPrimitiveOption(option, fieldKeys.value)"
                    />
                  </template>
                </sar-list-item>
              </sar-list>
            </template>
          </sar-radio-group>
        </scroll-view>
      </view>
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SarPopout from '../popout/popout.vue'
import SarRadioGroup from '../radio-group/radio-group.vue'
import SarRadio from '../radio/radio.vue'
import SarList from '../list/list.vue'
import SarListItem from '../list-item/list-item.vue'
import { classNames, createBem, getMayPrimitiveOption } from '../../utils'
import {
  type RadioPopoutProps,
  type RadioPopoutSlots,
  type RadioPopoutEmits,
  defaultRadioPopoutProps,
} from './common'
import { useFormItemContext } from '../form'
import { defaultOptionKeys } from '../radio/common'
import { useScrollSide } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<RadioPopoutProps>(),
  defaultRadioPopoutProps(),
)

defineSlots<RadioPopoutSlots>()

const emit = defineEmits<RadioPopoutEmits>()

const bem = createBem('radio-popout')

// main

// visible
const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

watch(innerVisible, () => {
  emit('update:visible', innerVisible.value)
})

// value
const formItemContext = useFormItemContext()

const fieldKeys = computed(() => {
  return Object.assign({}, defaultOptionKeys, props.optionKeys)
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

const popoutValue = ref(props.modelValue)

watch(innerValue, () => {
  popoutValue.value = innerValue.value
})

const onChange = (value: any) => {
  popoutValue.value = value
}

const onConfirm = () => {
  if (popoutValue.value !== innerValue.value) {
    innerValue.value = popoutValue.value
    emit('update:model-value', innerValue.value)
    emit('change', innerValue.value)
  }
}

// scroll
const { scrollSide, onScroll, onScrolltoupper, onScrolltolower } =
  useScrollSide()

const containerClass = computed(() => {
  return classNames(
    bem.e('container'),
    bem.em('container', scrollSide.value, scrollSide.value),
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
