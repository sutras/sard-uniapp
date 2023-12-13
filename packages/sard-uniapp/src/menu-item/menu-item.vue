<template>
  <view :class="menuItemClass" @click="onClick">
    <view
      v-if="icon || (withIcon && direction === 'vertical')"
      :class="bem.e('icon')"
    >
      <Icon v-if="icon" :name="icon" :family="iconFamily" />
    </view>
    <view :class="bem.e('text')">
      {{ text }}
    </view>
  </view>
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
import { classNames, createBem } from '../utils'
import Icon from '../icon/icon.vue'
import { menuItemProps } from '../menu/common'

const props = defineProps(menuItemProps)

const emit = defineEmits(['click'])

const bem = createBem('menu')

// main
const onClick = (event) => {
  emit('click', event)
}

// others
const menuItemClass = computed(() => {
  return classNames(bem.e('item'), bem.em('item', 'disabled', props.disabled))
})
</script>

<style lang="scss">
@use './index.scss';
</style>
