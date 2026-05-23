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
    <view :class="actionSheetClass" :style="actionSheetStyle">
      <template v-if="showDescription">
        <view :class="bem.e('description')">
          <slot v-if="hasDescriptionSlot" name="description"></slot>
          <template v-else>{{ description }}</template>
        </view>
      </template>

      <view :class="bem.e('content')">
        <template v-if="itemList && itemList.length > 0">
          <sar-action-sheet-item
            v-for="(item, i) in itemList"
            :key="i"
            v-bind="item"
          />
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
import { reactive, readonly, ref, watch, computed } from 'vue'
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
import SarActionSheetItem from '../action-sheet-item/action-sheet-item.vue'
import {
  type ActionSheetItemProps,
  type ActionSheetProps,
  type ActionSheetEmits,
  type ActionSheetSlots,
  defaultActionSheetProps,
} from './common'
import { type TransitionHookName } from '../../use'
import { useTranslate } from '../locale'
import { useActionSheet } from './context'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ActionSheetProps>(),
  defaultActionSheetProps(),
)

const slots = defineSlots<ActionSheetSlots>()

const emit = defineEmits<ActionSheetEmits>()

const bem = createBem('action-sheet')

const { t } = useTranslate('actionSheet')

// main

const hasCancelSlot = computed(
  () =>
    !!(isNumber(props.internalCancel) ? props.internalCancel : slots.cancel),
)

const mergedShowCancel = computed(() => {
  return !!(props.showCancel || props.cancel || hasCancelSlot.value)
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

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

const loading = reactive({
  cancel: false,
  select: false,
  close: false,
})

const readonlyLoading = readonly(loading)

const asyncSet = new Set<{ valid: boolean }>()

watch(
  innerVisible,
  () => {
    if (innerVisible.value === false) {
      asyncSet.forEach((obj) => {
        obj.valid = false
      })
      Object.assign(loading, {
        cancel: false,
        select: false,
        close: false,
      })
    }
  },
  {
    flush: 'sync',
  },
)

function perhapsClose(type: 'close' | 'cancel'): any
function perhapsClose(
  type: 'select',
  item: ActionSheetItemProps,
  index: number,
): any
function perhapsClose(
  type: 'close' | 'cancel' | 'select',
  item?: ActionSheetItemProps,
  index?: number,
) {
  if (isFunction(props.beforeClose)) {
    const result =
      type === 'select'
        ? props.beforeClose(type, item!, index!, readonlyLoading)
        : props.beforeClose(type, readonlyLoading)
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
  if (props.overlayClosable) {
    emit('close')
    perhapsClose('close')
  }
}

const onSelect = (item: ActionSheetItemProps, index: number) => {
  if (!item.disabled && !item.loading) {
    item = { ...item }
    emit('select', item, index)
    perhapsClose('select', item, index)
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
const context = props.internalContext || useActionSheet()

context.setSelectCallback(onSelect)

// others
const actionSheetClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('headless', !showDescription.value),
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
