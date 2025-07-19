<template>
  <sar-popup
    effect="slide-bottom"
    :visible="innerVisible"
    :duration="duration"
    @overlay-click="onOverlayClick"
    @visible-hook="onVisibleHook"
  >
    <view :class="shareSheetClass" :style="shareSheetStyle">
      <view v-if="title || description" :class="bem.e('header')">
        <view v-if="title" :class="bem.e('title')">
          {{ title }}
        </view>
        <view v-if="description" :class="bem.e('description')">
          {{ description }}
        </view>
      </view>
      <view :class="bem.e('body')">
        <view v-for="(row, i) in finalItemList" :key="i" :class="bem.e('row')">
          <scroll-view scroll-x>
            <view :class="bem.e('row-content')">
              <view
                v-for="(item, j) in row"
                :key="j"
                :class="
                  classNames(
                    bem.e('item'),
                    bem.em('item', 'disabled', item.disabled),
                  )
                "
                @click="onSelect(item)"
              >
                <view
                  :class="bem.e('icon-wrapper')"
                  :style="
                    stringifyStyle({
                      backgroundColor: item.background,
                      color: item.color,
                    })
                  "
                >
                  <image
                    v-if="isImg(item.icon)"
                    :src="item.icon"
                    mode="aspectFill"
                    :class="bem.e('image')"
                  />
                  <sar-icon
                    v-else
                    :name="item.icon"
                    :family="item.iconFamily"
                  />
                </view>
                <view :class="bem.e('item-name')">{{ item.name }}</view>
                <view :class="bem.e('item-description')">
                  {{ item.description }}
                </view>
              </view>
            </view>
          </scroll-view>
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
import {
  classNames,
  stringifyStyle,
  createBem,
  noop,
  isFileUrl,
  isFunction,
  isObject,
} from '../../utils'
import SarPopup from '../popup/popup.vue'
import SarIcon from '../icon/icon.vue'
import {
  type ShareSheetProps,
  type ShareSheetEmits,
  type ShareSheetItem,
  defaultShareSheetProps,
} from './common'
import { type TransitionHookName } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ShareSheetProps>(),
  defaultShareSheetProps,
)

const emit = defineEmits<ShareSheetEmits>()

const bem = createBem('share-sheet')

// main
const finalItemList = computed(() => {
  const itemList = props.itemList
  if (!Array.isArray(itemList)) {
    return [] as ShareSheetItem[][]
  }

  if (!Array.isArray(itemList[0])) {
    return [itemList] as ShareSheetItem[][]
  }

  return itemList as ShareSheetItem[][]
})

const innerVisible = ref(props.visible)

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

const onSelect = (item: ShareSheetItem) => {
  if (!item.disabled) {
    emit('select', item)
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

const isImg = (url: any) => {
  return typeof url === 'string' && isFileUrl(url)
}

// others
const shareSheetClass = computed(() => {
  return classNames(bem.b(), bem.m('titled', !!props.title), props.rootClass)
})

const shareSheetStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
