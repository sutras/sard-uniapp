<template>
  <view :class="accordionItemClass" :style="accordionItemStyle">
    <view
      :class="
        classNames(bem.e('header'), bem.em('header', 'disabled', disabled))
      "
      @click="onClick"
    >
      <view :class="bem.e('title')">{{ title }}</view>
      <view v-if="value" :class="bem.e('value')">{{ value }}</view>
      <view :class="bem.e('icon')">
        <sar-icon :name="iconName" />
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
const iconName = computed(() => {
  return visible.value ? 'up' : 'down'
})

const accordionItemClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const accordionItemStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
