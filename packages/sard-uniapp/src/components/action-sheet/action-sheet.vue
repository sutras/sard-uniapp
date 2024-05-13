<template>
  <sar-popup
    effect="slide-bottom"
    :visible="innerVisible"
    :duration="duration"
    @overlay-click="onOverlayClick"
  >
    <view :class="actionSheetClass" :style="actionSheetStyle">
      <view v-if="description" :class="bem.e('description')">
        {{ description }}
      </view>
      <view :class="bem.e('content')">
        <view
          v-for="(item, i) in itemList"
          :key="i"
          :class="
            classNames(
              bem.e('item'),
              bem.em('item', 'disabled', item.disabled),
              bem.em('item', 'loading', item.loading),
            )
          "
          :style="stringifyStyle({ color: item.color })"
          @click="onSelect(item, i)"
        >
          <template v-if="!item.loading">
            <view :class="bem.e('item-name')">
              {{ item.name }}
            </view>
            <view v-if="item.description" :class="bem.e('item-description')">
              {{ item.description }}
            </view>
          </template>
          <view v-else :class="bem.e('loading')">
            <sar-loading />
          </view>
        </view>
      </view>
      <template v-if="cancel">
        <view :class="bem.e('gap')"></view>
        <view :class="bem.e('cancel')" @click="onCancel">
          {{ cancel }}
        </view>
      </template>
    </view>
  </sar-popup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { classNames, stringifyStyle, createBem, noop } from '../../utils'
import SarPopup from '../popup/popup.vue'
import SarLoading from '../loading/loading.vue'
import {
  type ActionSheetItem,
  type ActionSheetProps,
  type ActionSheetEmits,
  actionSheetPropsDefaults,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ActionSheetProps>(),
  actionSheetPropsDefaults,
)

const emit = defineEmits<ActionSheetEmits>()

const bem = createBem('action-sheet')

// main
const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

const perhapsClose = (type: 'close' | 'cancel' | 'select') => {
  if (typeof props.beforeClose === 'function') {
    const result = props.beforeClose(type)
    if (result instanceof Promise) {
      return result
        .then(() => {
          innerVisible.value = false
          emit('update:visible', false)
        })
        .catch(noop)
    } else if (result === false) {
      return
    }
  }

  innerVisible.value = false
  emit('update:visible', false)
}

const onOverlayClick = () => {
  emit('close')
  if (props.overlayClosable) {
    perhapsClose('close')
  }
}

const onSelect = (item: ActionSheetItem, index: number) => {
  if (!item.disabled && !item.loading) {
    emit('select', item, index)
    perhapsClose('select')
  }
}

const onCancel = () => {
  emit('cancel')
  perhapsClose('cancel')
}

// others
const actionSheetClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('headless', !props.description),
    props.rootClass,
  )
})

const actionSheetStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
