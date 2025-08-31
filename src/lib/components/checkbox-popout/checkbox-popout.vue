<template>
  <sar-popout
    v-model:visible="innerVisible"
    :title="title"
    :root-class="popoutClass"
    :root-style="popoutStyle"
    @confirm="onConfirm"
    @visible-hook="onVisibleHook"
  >
    <template v-if="showCheckAll" #title-prepend>
      <view :class="bem.e('check-all')">
        <sar-checkbox
          v-model:checked="allChecked"
          :indeterminate="isIndeterminate"
          @change="onAllChange"
        >
          {{ count }}
        </sar-checkbox>
      </view>
    </template>
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
            <sar-checkbox-group
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
                    <template v-if="iconPosition === 'left'" #icon>
                      <sar-checkbox
                        readonly
                        :disabled="option.disabled"
                        :value="option.value"
                        :validate-event="false"
                      />
                    </template>
                    <template v-if="iconPosition === 'right'" #value>
                      <sar-checkbox
                        readonly
                        :disabled="option.disabled"
                        :value="option.value"
                        :validate-event="false"
                      />
                    </template>
                  </sar-list-item>
                </sar-list>
              </template>
            </sar-checkbox-group>
          </scroll-view>
        </view>
      </view>
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SarPopout from '../popout/popout.vue'
import SarCheckboxGroup from '../checkbox-group/checkbox-group.vue'
import SarCheckbox from '../checkbox/checkbox.vue'
import SarList from '../list/list.vue'
import SarListItem from '../list-item/list-item.vue'
import SarInput from '../input/input.vue'
import SarIcon from '../icon/icon.vue'
import { classNames, createBem, getMayPrimitiveOption } from '../../utils'
import {
  type CheckboxPopoutProps,
  type CheckboxPopoutSlots,
  type CheckboxPopoutEmits,
  defaultCheckboxPopoutProps,
} from './common'
import { useScrollSide, useFormPopout, useIndeterminate } from '../../use'
import { defaultOptionKeys } from '../checkbox/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<CheckboxPopoutProps>(),
  defaultCheckboxPopoutProps(),
)

defineSlots<CheckboxPopoutSlots>()

const emit = defineEmits<CheckboxPopoutEmits>()

const bem = createBem('checkbox-popout')

// main
const { innerVisible, popoutValue, onChange, onConfirm, onVisibleHook } =
  useFormPopout(props, emit)

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

const { allChecked, isIndeterminate, onAllChange } = useIndeterminate(
  popoutValue,
  objectOptions,
)

// search
const searchValue = ref('')

const filteredOptions = computed(() => {
  const searchString = searchValue.value
  if (!searchString) return objectOptions.value

  return objectOptions.value.filter((option) => {
    return option.label.includes(searchString)
  })
})

// count
const count = computed(() => {
  return (popoutValue.value?.length || 0) + ' / ' + props.options.length
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
