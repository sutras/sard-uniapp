<template>
  <view :class="navbarClass" :style="navbarStyle">
    <view :class="bem.e('fixation')">
      <sar-status-bar v-if="statusBar" />
      <view :class="bem.e('wrapper')">
        <view v-if="$slots.left || showBack" :class="bem.e('left')">
          <sar-navbar-item
            v-if="showBack"
            icon="left"
            :text="backText"
            @click="onBack"
          />
          <slot name="left"></slot>
        </view>
        <view :class="bem.e('content')">
          <slot>
            <view :class="bem.e('title')">
              <slot name="title">
                {{ title }}
              </slot>
            </view>
          </slot>
        </view>
        <view v-if="$slots.right" :class="bem.e('right')">
          <slot name="right"></slot>
        </view>
      </view>
    </view>
    <sar-navbar-pit v-if="fixed" :status-bar="statusBar" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { type NavbarEmits, type NavbarProps, type NavbarSlots } from './common'
import SarNavbarItem from '../navbar-item/navbar-item.vue'
import SarStatusBar from '../status-bar/status-bar.vue'
import SarNavbarPit from '../navbar-pit/navbar-pit.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<NavbarProps>(), {})

const slots = defineSlots<NavbarSlots>()

const emit = defineEmits<NavbarEmits>()

const bem = createBem('navbar')

// main
const onBack = (event: any) => {
  emit('back', event)
}

// others
const navbarClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('flow', props.flow),
    bem.m('custom', !!slots.default),
    bem.m('fixed', props.fixed),
    props.rootClass,
  )
})

const navbarStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
