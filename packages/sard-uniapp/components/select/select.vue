<template>
  <view :class="selectClass" :style="selectStyle">
    <view v-if="filterable" :class="bem.e('search')">
      <sar-input
        v-model="searchValue"
        :placeholder="filterPlaceholder"
        clearable
      >
        <template #prepend>
          <sar-icon family="sari" name="search" />
        </template>
      </sar-input>
    </view>
    <view :class="containerClass">
      <scroll-view
        :class="scrollClass"
        scroll-y
        :scroll-top="scrollTop"
        trap-scroll
        :upper-threshold="0"
        :lower-threshold="0"
        :throttle="false"
        :id="scrollViewId"
        @scroll="onScroll"
        @scrolltoupper="onScrolltoupper"
        @scrolltolower="onScrolltolower"
      >
        <slot
          v-if="isNumber(internalDefault) ? internalDefault : $slots.default"
        ></slot>
        <template v-else>
          <template v-if="isGroupable">
            <sar-select-option-group
              v-for="group in options"
              :key="getKey(getValue(group))"
              :label="getLabel(group)"
              :value="getValue(group)"
            >
              <sar-select-option
                v-for="item in getChildren(group)"
                :key="getKey(getValue(item))"
                :label="getLabel(item)"
                :value="getValue(item)"
              />
            </sar-select-option-group>
          </template>
          <template v-else>
            <sar-select-option
              v-for="item in options"
              :key="getKey(getValue(item))"
              :label="getLabel(item)"
              :value="getValue(item)"
            />
          </template>
        </template>
        <view v-if="isEmpty" :class="bem.e('empty')">
          <sar-empty size="small" />
        </view>
        <view v-if="remote && !isEmpty" :id="loadMoreId">
          <sar-load-more
            :status="status"
            @load-more="onLoadMore"
            @reload="onReload"
          />
        </view>
      </scroll-view>
    </view>
    <view v-if="multiple && showToolbar" :class="bem.e('toolbar')">
      <view :class="bem.e('num')">
        {{
          t('selected', {
            num: innerValue.length,
          })
        }}
      </view>
      <sar-button
        inline
        type="pale-text"
        theme="secondary"
        root-style="margin-left: auto"
        @click="onClear"
      >
        {{ t('clearSelect') }}
      </sar-button>
      <sar-button
        v-if="showSelectAll"
        inline
        type="pale-text"
        @click="onSelectAll"
      >
        {{ t('selectAll') }}
      </sar-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, inject, nextTick, ref, watch } from 'vue'
import {
  type ScrollIntoViewPosition,
  type NodeRect,
  classNames,
  stringifyStyle,
  createBem,
  debounce,
  getScrollIntoViewValue,
  getBoundingClientRect,
  uniqid,
  isNumber,
} from '../../utils'
import {
  type SelectProps,
  type SelectSlots,
  type SelectEmits,
  type SelectExpose,
  type SelectContext,
  defaultSelectProps,
  selectContextSymbol,
} from './common'
import { useLoadMore, useOptionKeys, useScrollSide } from '../../use'
import { useTranslate } from '../locale'
import SarInput from '../input/input.vue'
import SarIcon from '../icon/icon.vue'
import SarButton from '../button/button.vue'
import SarSelectOptionGroup from '../select-option-group/select-option-group.vue'
import SarSelectOption from '../select-option/select-option.vue'
import SarLoadMore from '../load-more/load-more.vue'
import SarEmpty from '../empty/empty.vue'
import { useSelect } from './useSelect'
import { usePopupEnter } from '../popup'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SelectProps>(), defaultSelectProps())

defineSlots<SelectSlots>()

const emit = defineEmits<SelectEmits>()

const bem = createBem('select')

const { t } = useTranslate('select')

// main
const { getLabel, getValue, getChildren, getKey } = useOptionKeys(props)

const isGroupable = computed(() => {
  const first = props.options[0]
  return first && Array.isArray(getChildren(first))
})

const scrollViewId = uniqid()

const { innerValue, selectItems, getEnabledValue, setToggle, setSelect } =
  inject<SelectContext | null>(selectContextSymbol, null) || useSelect(props)

setToggle((value: any) => {
  triggerChange(value)
})

setSelect((value: any) => {
  emit('select', value)
})

watch(
  () => props.modelValue,
  (value) => {
    innerValue.value = props.multiple
      ? Array.isArray(value)
        ? value
        : []
      : value
  },
  {
    immediate: true,
  },
)

const triggerChange = (nextValue: any) => {
  innerValue.value = nextValue
  emit('update:model-value', nextValue)
  emit('change', nextValue)
}

const {
  scrollSide,
  onScroll: onSideScroll,
  onScrolltoupper,
  onScrolltolower,
} = useScrollSide()

// search
const searchValue = ref('')

watch(searchValue, () => {
  props.filterMethod?.(searchValue.value)
  debouncedRefresh()
})

// remote
const { status, onLoadMore, onReload, refresh, loadMoreId } = useLoadMore({
  scrollViewSelector: `#${scrollViewId}`,
  disabled: () => !props.remote || !props.remoteMethod,
  request: async (page, isRefresh) => {
    return props
      .remoteMethod(searchValue.value, page, isRefresh)
      .then((loaded) => {
        if (isRefresh) {
          scrollTop.value = scrollTop.value === 0 ? 0.1 : 0
        }
        return loaded
      })
  },
})

const debouncedRefresh = debounce(refresh, props.threshold)

const isEmpty = computed(() => {
  return (
    selectItems.value.length === 0 &&
    (props.remote ? status.value === 'complete' : true)
  )
})

// toolbar
const onClear = () => {
  if (innerValue.value.length > 0) {
    triggerChange([])
  }
}

const onSelectAll = () => {
  triggerChange(getEnabledValue())
}

const showSelectAll = computed(() => {
  return props.multiple && props.multipleLimit <= 0
})

// scroll into view

const instance = getCurrentInstance()

const scrollTop = ref(0)

let memoScrollTop = 0

const onIntoViewScroll = (event: any) => {
  memoScrollTop = event.detail.scrollTop
}

const scrollIntoView = async (
  getRect: () => Promise<NodeRect>,
  position: ScrollIntoViewPosition = 'nearest',
) => {
  const optionRect = await getRect()

  const scrollViewRect = await getBoundingClientRect(
    `#${scrollViewId}`,
    instance,
  )

  const value = getScrollIntoViewValue(
    scrollViewRect.height,
    memoScrollTop,
    optionRect.height,
    optionRect.top - scrollViewRect.top + memoScrollTop,
    {
      position,
    },
  )

  scrollTop.value = scrollTop.value === value ? value + 0.1 : value
}

watch(
  innerValue,
  () => {
    nextTick(() => {
      if (!props.multiple) {
        const item = selectItems.value.find((item) => item.isSelected)
        if (item) {
          scrollIntoView(item.getRect)
        }
      }
    })
  },
  {
    immediate: true,
  },
)

usePopupEnter(() => {
  const item = selectItems.value.find((item) => item.isSelected)
  if (item) {
    scrollIntoView(item.getRect)
  }
})

const onScroll = (event: any) => {
  onSideScroll(event)
  onIntoViewScroll(event)
}

// others

defineExpose<SelectExpose>({})

const selectClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const selectStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const containerClass = computed(() => {
  return classNames(
    bem.e('container'),
    bem.em('container', scrollSide.value, scrollSide.value),
  )
})

const scrollClass = computed(() => {
  return classNames(
    bem.e('scroll'),
    bem.em('scroll', 'filterable', props.filterable),
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
