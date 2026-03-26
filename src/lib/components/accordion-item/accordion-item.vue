<template>
  <view :class="accordionItemClass" :style="accordionItemStyle">
    <view :class="classNames(bem.e('header'))" @click="onClick">
      <view :class="bem.e('title')">
        <slot name="title">{{ title }}</slot>
      </view>
      <view v-if="extra || value || $slots.extra" :class="bem.e('extra')">
        <slot name="extra">{{ extra || value }}</slot>
      </view>
      <view :class="bem.e('arrow')">
        <slot name="arrow" :visible="visible">
          <sar-icon family="sari" :name="arrowName" />
        </slot>
      </view>
    </view>
    <sar-collapse :visible="visible">
      <view :class="bem.e('body')">
        <slot></slot>
      </view>
    </sar-collapse>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { classNames, stringifyStyle, createBem, isNullish } from '../../utils'
import {
  type AccordionItemProps,
  type AccordionItemSlots,
  type AccordionItemEmits,
  type AccoridonContext,
  accoridonContextSymbol,
} from '../accordion/common'
import SarCollapse from '../collapse/collapse.vue'
import SarIcon from '../icon/icon.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<AccordionItemProps>(), {})

defineSlots<AccordionItemSlots>()

const emit = defineEmits<AccordionItemEmits>()

const bem = createBem('accordion-item')

// main
const context = inject<AccoridonContext>(
  accoridonContextSymbol,
) as AccoridonContext

if (!context) {
  throw new Error('AccordionItem must be included in Accordion.')
}

const onClick = (event: any) => {
  if (!props.disabled && !isNullish(props.name)) {
    context.toggle(props.name)
  }
  emit('click', event)
}

const visible = computed(() => {
  return context.multiple
    ? (context.value || []).includes(props.name)
    : context.value === props.name
})

// others
const arrowName = computed(() => {
  return visible.value ? 'up' : 'down'
})

const accordionItemClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('disabled', props.disabled),
    bem.m('borderless', context.hideBorder),
    props.rootClass,
  )
})

const accordionItemStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
