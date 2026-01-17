<template>
  <view :class="menuClass" :style="menuStyle">
    <sar-menu-item
      v-for="(option, i) in options"
      :key="i"
      :text="option.text"
      :icon="option.icon"
      :icon-family="option.iconFamily"
      :disabled="option.disabled"
      :with-icon="withIcon"
      :direction="direction"
      @click="onClick(option)"
    />
  </view>
</template>

<script setup lang="ts" generic="T extends MenuOption">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarMenuItem from '../menu-item/menu-item.vue'
import {
  type MenuProps,
  type MenuEmits,
  type MenuOption,
  defaultMenuProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<MenuProps<T>>(), defaultMenuProps)

const emit = defineEmits<MenuEmits<T>>()

const bem = createBem('menu')

// main
const onClick = (option: T) => {
  if (!option.disabled) {
    emit('select', option)
  }
}

const withIcon = computed(() => {
  return props.options.some((option) => !!option.icon)
})

// others
const menuClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.direction),
    bem.m(props.theme),
    bem.m('with-icon', withIcon.value),
    props.rootClass,
  )
})

const menuStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
