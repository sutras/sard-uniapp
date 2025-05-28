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
                  v-for="option in options"
                  :key="getMayPrimitiveOption(option, fieldKeys.value)"
                  :title="getMayPrimitiveOption(option, fieldKeys.label)"
                  hover
                  @click="
                    toggle(getMayPrimitiveOption(option, fieldKeys.value))
                  "
                >
                  <template #value>
                    <sar-checkbox
                      readonly
                      :value="getMayPrimitiveOption(option, fieldKeys.value)"
                      :validate-event="false"
                    />
                  </template>
                </sar-list-item>
              </sar-list>
            </template>
          </sar-checkbox-group>
        </scroll-view>
      </view>
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SarPopout from '../popout/popout.vue'
import SarCheckboxGroup from '../checkbox-group/checkbox-group.vue'
import SarCheckbox from '../checkbox/checkbox.vue'
import SarList from '../list/list.vue'
import SarListItem from '../list-item/list-item.vue'
import { classNames, createBem, getMayPrimitiveOption } from '../../utils'
import {
  type CheckboxPopoutProps,
  type CheckboxPopoutSlots,
  type CheckboxPopoutEmits,
  defaultCheckboxPopoutProps,
} from './common'
import { useScrollSide, useFormPopout } from '../../use'
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
const { innerVisible, popoutValue, onChange, onConfirm } = useFormPopout(
  props,
  emit,
)

const fieldKeys = computed(() => {
  return Object.assign({}, defaultOptionKeys, props.optionKeys)
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
</script>

<style lang="scss">
@import './index.scss';
</style>
