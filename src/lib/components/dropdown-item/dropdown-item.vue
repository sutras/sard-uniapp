<template>
  <view
    :class="dropdownItemClass"
    :style="dropdownItemStyle"
    @click="onItemClick"
  >
    <view v-if="label" :class="bem.e('label')">
      {{ label }}
      <text v-if="(!isNullish(title) || !isNullish(innerValue)) && separator">
        {{ separator }}
      </text>
    </view>
    <view v-if="title" :class="bem.e('title')">
      {{ title }}
    </view>
    <view v-if="!isNullish(innerValue)" :class="bem.e('value')">
      {{ currentLabel }}
    </view>
    <view v-else-if="placeholder" :class="bem.e('placeholder')">
      {{ placeholder }}
    </view>
    <view :class="bem.e('arrow')">
      <sar-icon :name="currentArrow" />
    </view>
  </view>

  <view
    v-if="wholeVisible"
    :class="bem.e('away')"
    :style="awayInset"
    @click="onAwayClick"
    @touchmove.stop.prevent
  />
  <view v-if="wholeVisible" :class="bem.e('popover')" :style="popupInset">
    <sar-popup
      :root-class="bem.e('popup')"
      :root-style="
        stringifyStyle({
          position: 'absolute',
        })
      "
      :overlay-style="stringifyStyle({ position: 'absolute' })"
      :overlay-class="bem.e('overlay')"
      :effect="popupEffect"
      :visible="popupVisible"
      :duration="context.duration"
      @after-leave="onAfterLeave"
      @overlay-click="onOverlayClick"
    >
      <slot>
        <sar-list inlaid>
          <sar-list-item
            v-for="(item, i) in options"
            :key="i"
            :title="item.label"
            hover
            :root-class="
              classNames(
                bem.e('option'),
                bem.em('option', 'active', item.value === innerValue),
              )
            "
            @click="onOptionClick(item)"
          >
            <template #arrow>
              <view :class="bem.e('option-icon')">
                <sar-icon name="success" />
              </view>
            </template>
          </sar-list-item>
        </sar-list>
      </slot>
    </sar-popup>
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  ref,
  watch,
  inject,
  onMounted,
  onUnmounted,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
  getWindowInfo,
  isNullish,
} from '../../utils'
import SarPopup from '../popup/popup.vue'
import SarList from '../list/list.vue'
import SarListItem from '../list-item/list-item.vue'
import SarIcon from '../icon/icon.vue'
import {
  type DropdownItemProps,
  type DropdownItemSlots,
  type DropdownItemEmits,
  type DropdownContext,
  type DropdownOption,
  dropdownContextSymbol,
  defaultDropdownItemProps,
} from '../dropdown/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<DropdownItemProps>(),
  defaultDropdownItemProps,
)

defineSlots<DropdownItemSlots>()

const emit = defineEmits<DropdownItemEmits>()

const bem = createBem('dropdown-item')

// main
const context = inject<DropdownContext>(
  dropdownContextSymbol,
) as DropdownContext

if (!context) {
  throw new Error('DropdownItem must be included in Dropdown.')
}

const itemId = uniqid()
const instance = getCurrentInstance()

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
  },
)

const innerVisible = ref(props.visible)
const wholeVisible = ref(props.visible)
const popupVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

watch(innerVisible, () => {
  if (innerVisible.value) {
    wholeVisible.value = true
    context.hideOthers(instance)

    setPosition().then(() => {
      popupVisible.value = true
    })
  } else {
    popupVisible.value = false
  }
})

const popupInset = ref('')
const awayInset = ref('')

const setPosition = async () => {
  const { windowHeight } = getWindowInfo()
  const itemRect = await getBoundingClientRect(`.${itemId}`, instance)

  const nextPopupInset: Record<string, any> = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }

  const nextAwayInset: Record<string, any> = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }

  if (context.direction === 'down') {
    nextPopupInset.top = `calc(${itemRect.bottom}px + var(--window-top))`
    nextPopupInset.bottom = 0

    nextAwayInset.top = 0
    nextAwayInset.bottom = `calc(${
      windowHeight - itemRect.bottom
    }px + var(--window-top))`
  } else {
    nextPopupInset.top = 0
    nextPopupInset.bottom = `${windowHeight - itemRect.top}px`

    nextAwayInset.top = `calc(${itemRect.bottom}px + var(--window-top))`
    nextAwayInset.bottom = 0
  }

  popupInset.value = stringifyStyle(nextPopupInset)
  awayInset.value = stringifyStyle(nextAwayInset)
}

const setInnerVisible = (visible: boolean) => {
  if (visible !== innerVisible.value) {
    innerVisible.value = visible
    emit('update:visible', visible)
  }
}

const onItemClick = () => {
  if (!context.disabled && !props.disabled) {
    setInnerVisible(!innerVisible.value)
  }
}

const onOptionClick = (item: DropdownOption) => {
  if (item.value !== innerValue.value) {
    innerValue.value = item.value
    emit('update:model-value', item.value)
    emit('change', item.value)
  }
  setInnerVisible(false)
}

const onOverlayClick = () => {
  if (context.overlayClosable) {
    setInnerVisible(false)
  }
}

const onAwayClick = () => {
  if (context.awayClosable) {
    setInnerVisible(false)
  }
}

const onAfterLeave = () => {
  wholeVisible.value = false
}

const hide = () => {
  setInnerVisible(false)
}

onMounted(() => {
  context.register(instance, {
    hide,
    visible: wholeVisible,
  })
})

onUnmounted(() => {
  context.unregister(instance)
})

const currentLabel = computed(() => {
  return props.options?.find((option) => option.value === innerValue.value)
    ?.label
})

const currentArrow = computed(() => {
  return wholeVisible.value ? 'caret-up' : 'caret-down'
})

const popupEffect = computed(() => {
  return context.direction === 'up' ? 'slide-bottom' : 'slide-top'
})

// others
const dropdownItemClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(context.direction),
    bem.m('show', wholeVisible.value),
    bem.m('disabled', context.disabled || props.disabled),
    props.rootClass,
    itemId,
  )
})

const dropdownItemStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
