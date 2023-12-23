<template>
  <view :class="dropdownClass" :style="dropdownStyle">
    <view :class="bem.e('shadow')" />
    <slot></slot>
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
import { computed, ref, provide, toRef, unref, toRaw, reactive, Ref } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type DropdownContext,
  dropdownContextSymbol,
  dropdownProps,
} from './common'

const props = defineProps(dropdownProps)

const bem = createBem('dropdown')

// main
const items = ref(new Map()) as Ref<
  Map<any, Parameters<DropdownContext['register']>[1]>
>

const someVisible = computed(() => {
  return [...items.value.values()].some((item) => unref(item.visible))
})

const hideOthers: DropdownContext['hideOthers'] = (instance) => {
  items.value.forEach((expose, ins) => {
    if (toRaw(ins) !== instance) {
      expose.hide()
    }
  })
}

const register: DropdownContext['register'] = (instance, imperative) => {
  items.value.set(instance, imperative)
}

const unregister: DropdownContext['unregister'] = (instance) => {
  items.value.delete(instance)
}

provide<DropdownContext>(
  dropdownContextSymbol,
  reactive({
    direction: toRef(props, 'direction'),
    disabled: toRef(props, 'disabled'),
    awayClosable: toRef(props, 'awayClosable'),
    overlayClosable: toRef(props, 'overlayClosable'),
    duration: toRef(props, 'duration'),
    hideOthers,
    register,
    unregister,
  }),
)

// others
const dropdownClass = computed(() => {
  return classNames(bem.b(), bem.m('show', someVisible.value), props.rootClass)
})

const dropdownStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
