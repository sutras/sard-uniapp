<template>
  <sar-popup
    effect="slide-bottom"
    :visible="innerVisible"
    :duration="duration"
    @overlay-click="onOverlayClick"
    @visible-hook="onVisibleHook"
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
      <template v-if="mergedShowCancel">
        <view :class="bem.e('gap')"></view>
        <view :class="bem.e('cancel')" @click="onCancel">
          {{ cancel || t('cancel') }}
        </view>
      </template>
    </view>
  </sar-popup>
</template>

<script setup lang="ts">
import { computed, reactive, readonly, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  noop,
  isFunction,
  isObject,
} from '../../utils'
import SarPopup from '../popup/popup.vue'
import SarLoading from '../loading/loading.vue'
import {
  type ActionSheetItem,
  type ActionSheetProps,
  type ActionSheetEmits,
  defaultActionSheetProps,
} from './common'
import { type TransitionHookName } from '../../use'
import { useTranslate } from '../locale'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ActionSheetProps>(),
  defaultActionSheetProps,
)

const emit = defineEmits<ActionSheetEmits>()

const bem = createBem('action-sheet')

const { t } = useTranslate('actionSheet')

// main
const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

const mergedShowCancel = computed(() => props.showCancel || props.cancel)

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
function perhapsClose(type: 'select', item: ActionSheetItem, index: number): any
function perhapsClose(
  type: 'close' | 'cancel' | 'select',
  item?: ActionSheetItem,
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

const onSelect = (item: ActionSheetItem, index: number) => {
  if (!item.disabled && !item.loading) {
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
