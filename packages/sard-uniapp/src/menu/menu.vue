<template>
  <view :class="menuClass" :style="menuStyle">
    <MenuItem
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
import { classNames, stringifyStyle, createBem } from '../utils'
import MenuItem from '../menu-item/menu-item.vue'
import { menuProps, type MenuOption } from './common'

const props = defineProps(menuProps)

const emit = defineEmits(['select'])

const bem = createBem('menu')

// main
const onClick = (option: MenuOption) => {
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
@use './index.scss';
</style>
