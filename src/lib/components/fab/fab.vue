<template>
  <sar-overlay
    :visible="visible"
    :z-index="zIndex"
    background="var(--sar-fab-mask)"
    @click="onOverlayClick"
  />

  <view :class="fabClass" :style="fabStyle">
    <view
      :class="contentClass"
      :style="contentStyle"
      @transitionend="onTransitionEnd"
    >
      <view
        v-for="(item, index) in itemList"
        :key="index"
        :class="itemClass"
        @click="onItemClick(item, index)"
      >
        <view v-if="!hideName" :class="bem.e('item-name')">
          {{ item.name }}
        </view>
        <view
          :class="bem.e('item-btn')"
          :style="
            stringifyStyle({ background: item.background, color: item.color })
          "
        >
          <sar-icon :family="item.iconFamily" :name="item.icon" />
        </view>
      </view>
    </view>
    <view :class="itemEntryClass" @click="onItemEntryClick">
      <view :class="bem.e('item-btn')" :style="itemEntryBtnStyle">
        <sar-icon name="plus" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRef } from 'vue'
import { classNames, stringifyStyle, createBem, isNullish } from '../../utils'
import {
  type FabProps,
  type FabEmits,
  defaultFabProps,
  FabItem,
} from './common'
import { useTransition, useZIndex } from '../../use'
import SarIcon from '../icon/icon.vue'
import SarOverlay from '../overlay/overlay.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<FabProps>(), defaultFabProps())

const emit = defineEmits<FabEmits>()

const bem = createBem('fab')

// main
const visible = ref(false)

const [zIndex, increaseZIndex] = useZIndex()

const { realVisible, transitionClass, onTransitionEnd } = useTransition(
  reactive({
    visible,
    duration: toRef(() => props.duration),
    prefix: bem.m('zoom-'),
  }),
)

const onItemEntryClick = (event: any) => {
  if (props.itemList && props.itemList.length > 0) {
    visible.value = !visible.value
    if (visible.value) {
      increaseZIndex()
    }
  }
  emit('click', event)
}

const onItemClick = (item: FabItem, index: number) => {
  visible.value = false
  emit('select', item, index)
}

const onOverlayClick = () => {
  if (props.overlayClosable) {
    visible.value = false
  }
}

// others
const fabClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(isNullish(props.top) ? 'bottom' : 'top'),
    bem.m(isNullish(props.left) ? 'right' : 'left'),
    bem.m('visible', visible.value),
    props.rootClass,
  )
})

const fabStyle = computed(() => {
  return stringifyStyle(props.rootStyle, {
    zIndex: visible.value ? zIndex.value : null,
    top: props.top,
    left: props.left,
    right: !isNullish(props.left) ? 'auto' : props.right,
    bottom: !isNullish(props.top) ? 'auto' : props.bottom,
  })
})

const contentClass = computed(() => {
  return classNames(bem.e('content'), transitionClass.value)
})

const contentStyle = computed(() => {
  return stringifyStyle({
    display: realVisible.value ? 'flex' : 'none',
    transitionDuration: props.duration + 'ms',
    transformOrigin: `${isNullish(props.top) ? 'bottom' : 'top'} ${
      isNullish(props.left) ? 'right' : 'left'
    }`,
  })
})

const itemEntryClass = computed(() => {
  return classNames(bem.e('item'), bem.em('item', 'entry'))
})

const itemEntryBtnStyle = computed(() => {
  return stringifyStyle({
    color: props.color,
    background: props.background,
  })
})

const itemClass = computed(() => {
  return classNames(bem.e('item'))
})
</script>

<style lang="scss">
@import './index.scss';
</style>
