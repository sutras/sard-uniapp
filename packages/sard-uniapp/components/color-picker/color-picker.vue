<template>
  <view :class="colorPickerClass" :style="colorPickerStyle">
    <view
      :id="panelId"
      :class="bem.e('panel')"
      :style="panelStyle"
      @touchstart.stop.prevent="onPanelTouchStart"
      @touchmove.stop.prevent="onPanelTouchMove"
      @touchend="onPanelTouchEnd"
      @touchcancel="onPanelTouchEnd"
      @mousedown="onPanelMouseDown"
    >
      <view :class="bem.e('thumb')" :style="panelThumbStyle"></view>
    </view>

    <view
      :id="hueBarId"
      :class="classNames(bem.e('slider-bar'), bem.em('slider-bar', 'hue'))"
      @touchstart.stop.prevent="onHueTouchStart"
      @touchmove.stop.prevent="onHueTouchMove"
      @touchend="onHueTouchEnd"
      @touchcancel="onHueTouchEnd"
      @mousedown="onHueMouseDown"
    >
      <view :class="bem.e('thumb')" :style="hueThumbStyle"></view>
    </view>

    <view
      v-if="props.showAlpha"
      :id="alphaBarId"
      :class="classNames(bem.e('slider-bar'), bem.em('slider-bar', 'alpha'))"
      @touchstart.stop.prevent="onAlphaTouchStart"
      @touchmove.stop.prevent="onAlphaTouchMove"
      @touchend="onAlphaTouchEnd"
      @touchcancel="onAlphaTouchEnd"
      @mousedown="onAlphaMouseDown"
    >
      <view :class="bem.e('alpha-fill')" :style="alphaBarStyle"></view>
      <view :class="bem.e('thumb')" :style="alphaThumbStyle"></view>
    </view>

    <view :class="bem.e('info')">
      <view :class="bem.e('preview')">
        <view :class="bem.e('preview-fill')" :style="previewStyle"></view>
      </view>

      <view :class="bem.e('value')">{{ outputValue }}</view>

      <sar-popover
        v-if="showFormat"
        v-model:visible="formartPopoverVisible"
        :options="formatOptions"
        position="top"
        @select="onFormatSelect"
      >
        <sar-popover-reference
          :class="
            classNames(
              bem.e('format'),
              bem.em('format', 'active', formartPopoverVisible),
            )
          "
        >
          {{ displayFormat }}
          <sar-icon
            :name="formartPopoverVisible ? 'up' : 'down'"
            size="12"
            family="sari"
          />
        </sar-popover-reference>
      </sar-popover>
    </view>

    <view
      v-if="showPresets && normalizedPresets.length"
      :class="bem.e('presets')"
    >
      <view :class="bem.e('preset-list')">
        <view
          v-for="preset in normalizedPresets"
          :key="preset.value"
          :class="
            classNames(
              bem.e('preset'),
              bem.em('preset', 'active', preset.active),
            )
          "
          @click="onPresetSelect(preset.value)"
        >
          <view
            :class="bem.e('preset-fill')"
            :style="stringifyStyle({ background: preset.preview })"
          ></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { type Ref, computed, getCurrentInstance, ref, watch } from 'vue'
import {
  type NodeRect,
  type ColorFormat,
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  clamp,
  getBoundingClientRect,
  formatColor,
  getPreviewColor,
  hslToHsv,
  hslToRgb,
  hsvToHsl,
  normalizeHsva,
  parseColor,
  getTouchPoint,
  defaultColorPickerValue,
} from '../../utils'
import { useFormContext, useFormItemContext } from '../form/common'
import { useMouseDown } from '../../use'
import {
  type ColorPickerProps,
  type ColorPickerSlots,
  type ColorPickerEmits,
  type ColorPickerExpose,
  defaultColorPickerProps,
} from './common'
import SarPopover from '../popover/popover.vue'
import SarPopoverReference from '../popover-reference/popover-reference.vue'
import SarIcon from '../icon/icon.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ColorPickerProps>(),
  defaultColorPickerProps(),
)

defineSlots<ColorPickerSlots>()

const emit = defineEmits<ColorPickerEmits>()

const bem = createBem('color-picker')

// main
const instance = getCurrentInstance()

const formContext = useFormContext()
const formItemContext = useFormItemContext()

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || props.readonly
})

const getInitialHsvaColor = () => {
  const parsed = parseColor(props.modelValue || defaultColorPickerValue)
  return parsed
    ? normalizeHsva(hslToHsv(parsed.color))
    : normalizeHsva(undefined)
}

const innerColor = ref(getInitialHsvaColor())
const lastEmittedValue = ref<string>()

watch(
  () => props.modelValue,
  (value) => {
    if (value === lastEmittedValue.value) {
      lastEmittedValue.value = undefined
      return
    }

    const parsed = parseColor(props.modelValue || defaultColorPickerValue)
    if (parsed) {
      innerColor.value = normalizeHsva(hslToHsv(parsed.color))
    }
    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const currentColor = computed(() => {
  return hsvToHsl(innerColor.value)
})

const displayColor = computed(() => {
  return props.showAlpha
    ? currentColor.value
    : {
        ...currentColor.value,
        a: 1,
      }
})

const emitColor = () => {
  const value = formatColor(
    displayColor.value,
    currentFormat.value,
    props.showAlpha,
  )
  lastEmittedValue.value = value
  emit('update:model-value', value)
  emit('change', value)
}

const applyColor = (nextColor: Partial<typeof innerColor.value>) => {
  innerColor.value = normalizeHsva({
    ...innerColor.value,
    ...nextColor,
  })
  emitColor()
}

const getTrackRect = async (
  selector: string,
  rectRef: Ref<NodeRect | undefined>,
): Promise<NodeRect> => {
  if (rectRef.value) {
    return rectRef.value
  }

  return (rectRef.value = await getBoundingClientRect(selector, instance))
}

const clearTrackRect = (rectRef: Ref<NodeRect | undefined>) => {
  rectRef.value = undefined
}

const updateByHorizontalTrack = async (
  event: TouchEvent,
  rectRef: Ref<NodeRect | undefined>,
  selector: string,
  callback: (ratio: number) => void,
) => {
  const rect = await getTrackRect(selector, rectRef)
  const { x } = getTouchPoint(event)
  const ratio = clamp((x - rect.left) / rect.width, 0, 1)
  callback(ratio)
}

// ============================ panel ============================
const panelId = uniqid()
const panelRect = ref<NodeRect>()

const hueColor = computed(() => {
  return getPreviewColor(
    hsvToHsl({ h: innerColor.value.h, s: 100, v: 100, a: 1 }),
    false,
  )
})

const panelStyle = computed(() => {
  return stringifyStyle({
    background: `linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0) 100%), ${hueColor.value}`,
  })
})

const panelThumbStyle = computed(() => {
  return stringifyStyle({
    left: `${innerColor.value.s}%`,
    top: `${100 - innerColor.value.v}%`,
  })
})

const updatePanelByEvent = async (event: TouchEvent) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  const rect = await getTrackRect(`#${panelId}`, panelRect)
  const point = getTouchPoint(event)

  applyColor({
    s: clamp(((point.x - rect.left) / rect.width) * 100, 0, 100),
    v: clamp((1 - (point.y - rect.top) / rect.height) * 100, 0, 100),
  })
}

const onPanelTouchStart = (event: TouchEvent) => {
  void updatePanelByEvent(event)
}

const onPanelTouchMove = (event: TouchEvent) => {
  void updatePanelByEvent(event)
}

const onPanelTouchEnd = () => {
  clearTrackRect(panelRect)
}

const onPanelMouseDown = useMouseDown(
  onPanelTouchStart,
  onPanelTouchMove,
  onPanelTouchEnd,
)

// ============================ hue ============================
const hueBarId = uniqid()
const hueRect = ref<NodeRect>()

const hueThumbStyle = computed(() => {
  return stringifyStyle({
    left: `${(innerColor.value.h / 360) * 100}%`,
  })
})

const updateHueByEvent = async (event: TouchEvent) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  await updateByHorizontalTrack(event, hueRect, `#${hueBarId}`, (ratio) => {
    applyColor({
      h: ratio * 360,
    })
  })
}

const onHueTouchStart = (event: TouchEvent) => {
  void updateHueByEvent(event)
}

const onHueTouchMove = (event: TouchEvent) => {
  void updateHueByEvent(event)
}

const onHueTouchEnd = () => {
  clearTrackRect(hueRect)
}

const onHueMouseDown = useMouseDown(
  onHueTouchStart,
  onHueTouchMove,
  onHueTouchEnd,
)

// ============================ alpha ============================
const alphaBarId = uniqid()
const alphaRect = ref<NodeRect>()
const opaquePreviewRgb = computed(() => {
  return hslToRgb(hsvToHsl({ ...innerColor.value, a: 1 }))
})

const alphaBarStyle = computed(() => {
  const { r, g, b } = opaquePreviewRgb.value
  return stringifyStyle({
    background: `linear-gradient(90deg, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`,
  })
})

const alphaThumbStyle = computed(() => {
  return stringifyStyle({
    left: `${innerColor.value.a * 100}%`,
  })
})

const updateAlphaByEvent = async (event: TouchEvent) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  await updateByHorizontalTrack(event, alphaRect, `#${alphaBarId}`, (ratio) => {
    applyColor({
      a: ratio,
    })
  })
}

const onAlphaTouchStart = (event: TouchEvent) => {
  void updateAlphaByEvent(event)
}

const onAlphaTouchMove = (event: TouchEvent) => {
  void updateAlphaByEvent(event)
}

const onAlphaTouchEnd = () => {
  clearTrackRect(alphaRect)
}

const onAlphaMouseDown = useMouseDown(
  onAlphaTouchStart,
  onAlphaTouchMove,
  onAlphaTouchEnd,
)

// ============================ preview ============================
const colorFormats: ColorFormat[] = ['hex', 'rgb', 'hsl']
const formatOptions = colorFormats.map((format) => {
  return {
    text: format.toUpperCase(),
    value: format,
  }
})

const normalizeSelectableFormat = (format?: ColorFormat) => {
  return format && colorFormats.includes(format) ? format : 'hex'
}

const currentFormat = ref<ColorFormat>(normalizeSelectableFormat(props.format))

const displayFormat = computed(() => {
  return (
    formatOptions.find((option) => option.value === currentFormat.value)
      ?.text || ''
  )
})

watch(
  () => props.format,
  () => {
    currentFormat.value = normalizeSelectableFormat(props.format)
  },
)

const onFormatSelect = ({ value }: { value: ColorFormat; text: string }) => {
  if (isDisabled.value || isReadonly.value || currentFormat.value === value) {
    return
  }

  currentFormat.value = value
  emit('update:format', value)
  emit('format-change', value)
  emitColor()
}

const formartPopoverVisible = ref(false)

const outputValue = computed(() => {
  return formatColor(displayColor.value, currentFormat.value, props.showAlpha)
})

const previewColor = computed(() => {
  return getPreviewColor(displayColor.value, props.showAlpha)
})

const previewStyle = computed(() => {
  return stringifyStyle({
    background: previewColor.value,
  })
})

// ============================ presets ============================
const normalizedPresets = computed(() => {
  return (props.presets || [])
    .map((value) => {
      const parsed = parseColor(value)
      if (!parsed) {
        return null
      }
      return {
        value,
        preview: getPreviewColor(parsed.color, props.showAlpha),
        active:
          formatColor(parsed.color, 'hex', props.showAlpha) ===
          formatColor(displayColor.value, 'hex', props.showAlpha),
      }
    })
    .filter(Boolean) as { value: string; preview: string; active: boolean }[]
})

const onPresetSelect = (value: string) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  const parsed = parseColor(value)
  if (!parsed) {
    return
  }

  innerColor.value = normalizeHsva(hslToHsv(parsed.color))
  emitColor()
}

// ============================ others ============================
const colorPickerClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('disabled', isDisabled.value),
    bem.m('readonly', isReadonly.value),
    props.rootClass,
  )
})

const colorPickerStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

defineExpose<ColorPickerExpose>({})
</script>

<style lang="scss">
@import './index.scss';
</style>
