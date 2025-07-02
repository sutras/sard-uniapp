<template>
  <sar-popout
    v-model:visible="innerVisible"
    :title="title"
    :root-class="popoutClass"
    :root-style="popoutStyle"
    @confirm="onConfirm"
  >
    <template #visible="{ already }">
      <view v-if="already">
        <sar-list-item v-if="searchable">
          <sar-input
            v-model="searchValue"
            :placeholder="filterPlaceholder"
            clearable
          >
            <template #prepend>
              <sar-icon family="sari" name="search" />
            </template>
          </sar-input>
        </sar-list-item>
        <view :class="containerClass">
          <scroll-view
            :class="scrollClass"
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
                    v-for="option in filteredOptions"
                    :key="option.value"
                    :title="option.label"
                    :hover="!option.disabled"
                    @click="select(option, toggle)"
                  >
                    <template #icon>
                      <sar-radio
                        readonly
                        :disabled="option.disabled"
                        :value="option.value"
                      />
                    </template>
                  </sar-list-item>
                </sar-list>
              </template>
            </sar-radio-group>
          </scroll-view>
        </view>
      </view>
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SarPopout from '../popout/popout.vue'
import SarRadioGroup from '../radio-group/radio-group.vue'
import SarRadio from '../radio/radio.vue'
import SarList from '../list/list.vue'
import SarListItem from '../list-item/list-item.vue'
import SarIcon from '../icon/icon.vue'
import SarInput from '../input/input.vue'
import { classNames, createBem, getMayPrimitiveOption } from '../../utils'
import {
  type RadioPopoutProps,
  type RadioPopoutSlots,
  type RadioPopoutEmits,
  defaultRadioPopoutProps,
} from './common'
import { defaultOptionKeys } from '../radio/common'
import { useScrollSide, useFormPopout } from '../../use'

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
const { innerVisible, popoutValue, onChange, onConfirm } = useFormPopout(
  props,
  emit,
)

const fieldKeys = computed(() => {
  return Object.assign({}, defaultOptionKeys, props.optionKeys)
})

const objectOptions = computed(() => {
  return props.options.map((option) => {
    return {
      label: getMayPrimitiveOption(option, fieldKeys.value.label),
      value: getMayPrimitiveOption(option, fieldKeys.value.value),
      disabled:
        getMayPrimitiveOption(option, fieldKeys.value.disabled) === true,
    }
  })
})

const select = (option: any, toggle: (value: any) => void) => {
  if (!option.disabled) {
    toggle(option.value)
  }
}

// search
const searchValue = ref('')

const filteredOptions = computed(() => {
  const searchString = searchValue.value
  if (!searchString) return objectOptions.value

  return objectOptions.value.filter((option) => {
    return option.label.includes(searchString)
  })
})

// scroll
const { scrollSide, onScroll, onScrolltoupper, onScrolltolower } =
  useScrollSide()

const containerClass = computed(() => {
  return classNames(
    bem.e('container'),
    bem.em('container', scrollSide.value, scrollSide.value),
  )
})

const scrollClass = computed(() => {
  return classNames(
    bem.e('scroll'),
    bem.em('scroll', 'searchable', props.searchable),
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
