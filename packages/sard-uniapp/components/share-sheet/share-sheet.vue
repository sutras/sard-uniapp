<template>
  <sar-popup
    effect="slide-bottom"
    :visible="innerVisible"
    :duration="duration"
    back-press="close"
    @overlay-click="onOverlayClick"
    @visible-hook="onVisibleHook"
    @back-press="onBackPress"
  >
    <view :class="shareSheetClass" :style="shareSheetStyle">
      <template v-if="showTitle || showDescription">
        <view :class="bem.e('header')">
          <view v-if="showTitle" :class="bem.e('title')">
            <slot v-if="hasTitleSlot" name="title"></slot>
            <template v-else>{{ title }}</template>
          </view>
          <view v-if="showDescription" :class="bem.e('description')">
            <slot v-if="hasDescriptionSlot" name="description"></slot>
            <template v-else>{{ description }}</template>
          </view>
        </view>
      </template>

      <view :class="bem.e('body')">
        <template v-if="finalItemList.length > 0">
          <sar-share-sheet-row v-for="(row, i) in finalItemList" :key="i">
            <sar-share-sheet-item
              v-for="(item, j) in row"
              :key="j"
              v-bind="item"
            />
          </sar-share-sheet-row>
        </template>
        <slot></slot>
      </view>

      <template v-if="mergedShowCancel">
        <view :class="bem.e('gap')"></view>
        <view :class="bem.e('cancel')" @click="onCancel">
          <slot v-if="hasCancelSlot" name="cancel"></slot>
          <template v-else>
            {{ cancel || t('cancel') }}
          </template>
        </view>
      </template>
    </view>
  </sar-popup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  noop,
  isFunction,
  isObject,
  isNumber,
} from '../../utils'
import SarPopup from '../popup/popup.vue'
import {
  type ShareSheetProps,
  type ShareSheetEmits,
  type ShareSheetSlots,
  defaultShareSheetProps,
} from './common'
import type { ShareSheetItemProps } from '../share-sheet-item/common'
import SarShareSheetRow from '../share-sheet-row/share-sheet-row.vue'
import SarShareSheetItem from '../share-sheet-item/share-sheet-item.vue'
import { type TransitionHookName } from '../../use'
import { useShareSheet } from './context'
import { useTranslate } from '../locale'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ShareSheetProps>(),
  defaultShareSheetProps(),
)

const slots = defineSlots<ShareSheetSlots>()

const emit = defineEmits<ShareSheetEmits>()

const bem = createBem('share-sheet')

const { t } = useTranslate('shareSheet')

// main
const hasCancelSlot = computed(
  () =>
    !!(isNumber(props.internalCancel) ? props.internalCancel : slots.cancel),
)

const mergedShowCancel = computed(() => {
  return !!(props.showCancel || props.cancel || hasCancelSlot.value)
})

const hasTitleSlot = computed(
  () => !!(isNumber(props.internalTitle) ? props.internalTitle : slots.title),
)

const showTitle = computed(() => {
  return !!(props.title || hasTitleSlot.value)
})

const hasDescriptionSlot = computed(
  () =>
    !!(isNumber(props.internalDescription)
      ? props.internalDescription
      : slots.description),
)

const showDescription = computed(() => {
  return !!(props.description || hasDescriptionSlot.value)
})

// visible

const innerVisible = ref(props.visible)

const finalItemList = computed(() => {
  const itemList = props.itemList
  if (!Array.isArray(itemList)) {
    return [] as ShareSheetItemProps[][]
  }

  if (!Array.isArray(itemList[0])) {
    return [itemList] as ShareSheetItemProps[][]
  }

  return itemList as ShareSheetItemProps[][]
})

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

const perhapsClose = (type: 'close' | 'cancel' | 'select') => {
  if (isFunction(props.beforeClose)) {
    const result = props.beforeClose(type)
    if (isObject(result) && isFunction(result.then)) {
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

const onSelect = (item: ShareSheetItemProps) => {
  if (!item.disabled) {
    emit('select', { ...item })
    perhapsClose('select')
  }
}

const onCancel = () => {
  emit('cancel')
  perhapsClose('cancel')
}

const onVisibleHook = (name: TransitionHookName) => {
  emit('visible-hook', name)
  emit(name as any)
}

const onBackPress = () => {
  innerVisible.value = false
  emit('update:visible', false)
}

// context
const context = props.internalContext || useShareSheet()

context.setSelectCallback(onSelect)

// others
const shareSheetClass = computed(() => {
  return classNames(bem.b(), bem.m('titled', showTitle.value), props.rootClass)
})

const shareSheetStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
