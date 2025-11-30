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
      <sar-icon family="sari" :name="currentArrow" />
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
    <sar-overlay
      root-style="position: absolute"
      :visible="popupVisible"
      :duration="context.duration"
      :z-index="zIndex"
      @click="onOverlayClick"
    />
    <view
      :class="popupClass"
      :style="popupStyle"
      @transitionend="onTransitionEnd"
    >
      <slot>
        <sar-list inlaid>
          <sar-list-item
            v-for="(option, i) in options"
            :key="i"
            :title="option.label"
            hover
            :root-class="
              classNames(
                bem.e('option'),
                bem.em('option', 'active', option.value === innerValue),
              )
            "
            @click="onOptionClick(option)"
          >
            <template #arrow>
              <view :class="bem.e('option-icon')">
                <sar-icon family="sari" name="success" />
              </view>
            </template>
          </sar-list-item>
        </sar-list>
      </slot>
    </view>
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
  reactive,
  toRef,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
  getWindowInfo,
  isNullish,
  isFunction,
  isObject,
  noop,
} from '../../utils'
import SarList from '../list/list.vue'
import SarListItem from '../list-item/list-item.vue'
import SarIcon from '../icon/icon.vue'
import SarOverlay from '../overlay/overlay.vue'
import {
  type DropdownItemProps,
  type DropdownItemSlots,
  type DropdownItemEmits,
  type DropdownContext,
  type DropdownOption,
  type DropdownCloseType,
  dropdownContextSymbol,
  defaultDropdownItemProps,
  defaultValueOnClear,
} from '../dropdown/common'
import {
  type TransitionHookName,
  useLockScroll,
  useTransition,
  useZIndex,
} from '../../use'

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

const mergedTogglable = computed(() => props.togglable || context.togglable)
const mergedValueOnClear = computed(
  () => props.valueOnClear || context.valueOnClear || defaultValueOnClear,
)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
  },
)

// visible
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

useLockScroll(popupVisible)

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

let isClosing = false

const perhapsClose = (type: DropdownCloseType) => {
  if (isClosing) {
    return
  }
  if (isFunction(props.beforeClose)) {
    const result = props.beforeClose(type)
    if (isObject(result) && isFunction(result.then)) {
      isClosing = true

      return result
        .then(() => {
          setInnerVisible(false)
        })
        .catch(noop)
    } else if (result === false) {
      return
    }
  }

  setInnerVisible(false)
}

let isOpening = false

const perhapsOpen = () => {
  if (isOpening) {
    return
  }
  if (isFunction(props.beforeOpen)) {
    const result = props.beforeOpen()
    if (isObject(result) && isFunction(result.then)) {
      isOpening = true

      return result
        .then(() => {
          setInnerVisible(true)
        })
        .catch(noop)
    } else if (result === false) {
      return
    }
  }

  setInnerVisible(true)
}

const onItemClick = () => {
  if (!context.disabled && !props.disabled) {
    if (innerVisible.value) {
      perhapsClose('button')
    } else {
      perhapsOpen()
    }
  }
}

const onOptionClick = (option: DropdownOption) => {
  let changed = false

  if (option.value !== innerValue.value) {
    innerValue.value = option.value
    changed = true
  } else {
    if (mergedTogglable.value) {
      const value = mergedValueOnClear.value()
      if (value !== innerValue.value) {
        innerValue.value = value
      }
      changed = true
    }
  }

  if (changed) {
    emit('update:model-value', innerValue.value)
    emit('change', innerValue.value)
  }

  perhapsClose('option')
}

const onOverlayClick = () => {
  if (context.overlayClosable) {
    perhapsClose('overlay')
  }
}

const onAwayClick = () => {
  if (context.awayClosable) {
    perhapsClose('away')
  }
}

const hide = () => {
  if (innerVisible.value) {
    perhapsClose('other-button')
  }
}

onMounted(() => {
  context.register(instance, {
    hide,
    visible: wholeVisible,
  })
})

const [zIndex, increaseZIndex] = useZIndex()

const { realVisible, transitionClass, onTransitionEnd } = useTransition(
  reactive({
    visible: toRef(() => popupVisible.value),
    duration: toRef(() => context.duration),
    prefix: computed(() => bem.em('popup', popupEffect.value) + '-'),
    onVisibleHook: (name: TransitionHookName) => {
      if (name === 'before-enter') {
        increaseZIndex()
        isOpening = false
      }
      if (name === 'after-leave') {
        wholeVisible.value = false
      }
      if (name === 'leave-cancelled' || name === 'after-leave') {
        isClosing = false
      }

      emit('visible-hook', name)
      emit(name as any)
    },
  }),
)

const popupClass = computed(() => {
  return classNames(
    bem.e('popup'),
    bem.em('popup', popupEffect.value),
    transitionClass.value,
  )
})

const popupStyle = computed(() => {
  return stringifyStyle(props.rootStyle, {
    zIndex: zIndex.value,
    display: realVisible.value ? 'flex' : 'none',
    transitionDuration: context.duration + 'ms',
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
