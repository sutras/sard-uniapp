<template>
  <view :class="menuItemClass" @click="onClick">
    <view
      v-if="icon || (withIcon && direction === 'vertical')"
      :class="bem.e('icon')"
    >
      <sar-icon v-if="icon" :name="icon" :family="iconFamily" />
    </view>
    <view :class="bem.e('text')">
      {{ text }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, createBem } from '../../utils'
import SarIcon from '../icon/icon.vue'
import { type MenuItemEmits, type MenuItemProps } from '../menu/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<MenuItemProps>(), {})

const emit = defineEmits<MenuItemEmits>()

const bem = createBem('menu')

// main
const onClick = (event: any) => {
  emit('click', event)
}

// others
const menuItemClass = computed(() => {
  return classNames(bem.e('item'), bem.em('item', 'disabled', props.disabled))
})
</script>

<style lang="scss">
@import './index.scss';
</style>
