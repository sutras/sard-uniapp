<template>
  <view :class="fabItemClass" :style="fabItemStyle" @click="onClick">
    <view
      v-if="!isVisibleEmpty(name) && !context.hideName"
      :class="bem.e('name')"
    >
      {{ name }}
    </view>
    <view
      :class="bem.e('btn')"
      :style="stringifyStyle({ background: background, color: color })"
    >
      <slot>
        <sar-icon :family="iconFamily" :name="icon" />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  isVisibleEmpty,
} from '../../utils'
import {
  type FabItemProps,
  type FabItemSlots,
  type FabItemEmits,
  type FabItemExpose,
  defaultFabItemProps,
} from './common'
import { type FabContext, fabContextSymbol } from '../fab/common'
import SarIcon from '../icon/icon.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<FabItemProps>(), defaultFabItemProps)

defineSlots<FabItemSlots>()

const emit = defineEmits<FabItemEmits>()

const bem = createBem('fab-item')

// main
const context = inject<FabContext>(fabContextSymbol)!

const onClick = (event: any) => {
  if (!props.isEntry) {
    context.onItemClick(props.item || {}, props.index || 0)
  }
  emit('click', event)
}

// others
defineExpose<FabItemExpose>({})

const fabItemClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('left', context.isLeft),
    bem.m('entry', props.isEntry),
    props.rootClass,
  )
})

const fabItemStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
