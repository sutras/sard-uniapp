<template>
  <view
    :class="listItemClass"
    :style="stringifyStyle(rootStyle)"
    @click="onClick"
  >
    <slot>
      <view v-if="isRenderVisible($slots.icon || icon)" :class="bem.e('icon')">
        <slot name="icon">
          <sar-icon
            :name="icon"
            :color="iconColor"
            :size="iconSize"
            :family="iconFamily"
          />
        </slot>
      </view>
      <view :class="bem.e('title')">
        <slot name="title">{{ title }}</slot>
        <view
          v-if="isRenderVisible($slots.description || description)"
          :class="bem.e('description')"
        >
          <slot name="description">{{ description }}</slot>
        </view>
      </view>

      <view
        v-if="isRenderVisible($slots.value || value)"
        :class="bem.e('value')"
      >
        <slot name="value">{{ value }}</slot>
      </view>
      <slot name="arrow">
        <view v-if="arrow" :class="bem.e('arrow')">
          <sar-icon :name="arrowDirection" />
        </view>
      </slot>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  classNames,
  stringifyStyle,
  isRenderVisible,
  createBem,
} from '../../utils'
import SarIcon from '../icon/icon.vue'
import {
  type ListItemProps,
  type ListItemSlots,
  type ListItemEmits,
  defaultListItemProps,
} from '../list/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<ListItemProps>(), defaultListItemProps)

const slots = defineSlots<ListItemSlots>()

const emit = defineEmits<ListItemEmits>()

const bem = createBem('list-item')

// main
const onClick = (event: any) => {
  emit('click', event)
}

// others
const listItemClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('hover', props.hover),
    bem.m('custom', !!slots.default),
    props.rootClass,
  )
})
</script>

<style lang="scss">
@use './index.scss';
</style>
