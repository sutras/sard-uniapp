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
      <template
        v-if="title || $slots.title || description || $slots.description"
      >
        <view :class="bem.e('header')">
          <view v-if="title || $slots.title" :class="bem.e('title')">
            <slot name="title">{{ title }}</slot>
          </view>
          <view
            v-if="description || $slots.description"
            :class="bem.e('description')"
          >
            <slot name="description">{{ description }}</slot>
          </view>
        </view>
      </template>

      <view :class="bem.e('body')">
        <template v-if="finalItemList.length > 0">
          <view
            v-for="(row, i) in finalItemList"
            :key="i"
            :class="bem.e('row')"
          >
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
        </template>
        <slot />
      </view>

      <template v-if="cancel || $slots.cancel">
        <view :class="bem.e('gap')"></view>
        <view :class="bem.e('cancel')" @click="onCancel">
          <slot name="cancel">{{ cancel }}</slot>
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
  type ShareSheetSlots,
  defaultShareSheetProps,
} from './common'
import type { ShareSheetItemProps } from '../share-sheet-item/common'
import { type TransitionHookName } from '../../use'
import { provideShareSheet } from './context'

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

// main
const innerVisible = ref(props.visible)
const itemListRef = ref<Array<ShareSheetItemProps>>([])

provideShareSheet({
  onItemSelect: (item) => {
    onSelect(item)
  },
  registerItem: (item) => {
    itemListRef.value.push(item)
    return itemListRef.value.length - 1
  },
  unregisterItem: (item) => {
    const index = itemListRef.value.indexOf(item)
    if (index > -1) {
      itemListRef.value.splice(index, 1)
    }
  },
})

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

const onBackPress = () => {
  innerVisible.value = false
  emit('update:visible', false)
}

const isImg = (url: any) => {
  return typeof url === 'string' && isFileUrl(url)
}

// others
const shareSheetClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('titled', !!props.title || !!slots.title?.(props)),
    props.rootClass,
  )
})

const shareSheetStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
