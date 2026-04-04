<template>
  <view :class="barcodeClass" :style="barcodeStyle">
    <view :class="bem.e('canvas-wrapper')">
      <canvas
        :id="canvasId"
        :canvas-id="canvasId"
        :width="canvasWidth"
        :height="canvasHeight"
        :style="{
          width: canvasWidth / pixelRatio + 'px',
          height: canvasHeight / pixelRatio + 'px',
        }"
      ></canvas>
    </view>
    <image
      :src="dataURL"
      :show-menu-by-longpress="showMenuByLongpress"
      mode="scaleToFill"
      :class="bem.e('image')"
    />
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  onMounted,
  ref,
  shallowRef,
  watch,
} from 'vue'
import {
  type BarcodeLayoutSegment,
  barcode,
  calculateBarcodeLayout,
  classNames,
  createBem,
  getWindowInfo,
  isApp,
  logError,
  measureTextWidth,
  sleep,
  stringifyStyle,
  uniqid,
} from '../../utils'
import {
  defaultBarcodeProps,
  type BarcodeProps,
  type BarcodeEmits,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<BarcodeProps>(), defaultBarcodeProps())

const emit = defineEmits<BarcodeEmits>()

const bem = createBem('barcode')

// main
const instance = getCurrentInstance()
const canvasId = uniqid()
const { pixelRatio } = getWindowInfo()
const contextRef = shallowRef<ReturnType<typeof uni.createCanvasContext>>()
const canvasWidth = ref(1)
const canvasHeight = ref(1)
const dataURL = ref('')

const barcodeEncodings = computed(() => {
  if (!props.value) {
    return []
  }

  return barcode(props.value, {
    format: props.format,
    width: props.width,
    height: props.height,
    color: props.color,
    background: props.background,
    displayValue: props.displayValue,
    textPosition: props.textPosition,
    textAlign: props.textAlign,
    textMargin: props.textMargin,
    fontStyle: props.fontStyle,
    fontWeight: props.fontWeight,
    fontSize: props.fontSize,
    fontFamily: props.fontFamily,
    margin: props.margin,
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
  })
})

function drawBarcodeSegment(
  context: ReturnType<typeof uni.createCanvasContext>,
  xOffset: number,
  segment: BarcodeLayoutSegment,
) {
  const { options } = segment
  const yOffset =
    options.textPosition === 'top' && options.displayValue
      ? options.marginTop + options.fontSize + options.textMargin
      : options.marginTop

  context.setFillStyle(options.lineColor)

  for (let index = 0; index < segment.data.length; index++) {
    const bar = segment.data[index]
    const ratio = Number(bar)

    if (!ratio) {
      continue
    }

    context.fillRect(
      xOffset + segment.barcodePadding + index * options.width,
      yOffset,
      options.width,
      options.height * ratio,
    )
  }
}

function drawBarcodeText(
  context: ReturnType<typeof uni.createCanvasContext>,
  xOffset: number,
  segment: BarcodeLayoutSegment,
) {
  const { options } = segment

  if (!options.displayValue || !segment.text) {
    return
  }

  const { fontStyle, fontWeight, fontSize, fontFamily } = options

  context.font = [
    fontStyle,
    fontWeight === 'normal' ? '' : fontWeight,
    fontSize + 'px',
    fontFamily,
  ]
    .filter(Boolean)
    .join(' ')

  context.setFillStyle(options.lineColor)
  context.setTextBaseline('top')
  context.setTextAlign('left')

  let textX = xOffset
  if (options.textAlign === 'center') {
    textX += (segment.width - segment.textWidth) / 2
  } else if (options.textAlign === 'right') {
    textX += segment.width - segment.textWidth
  }

  const textY =
    options.textPosition === 'top'
      ? options.marginTop
      : options.marginTop + options.height + options.textMargin

  context.fillText(segment.text, textX, textY)
}

const drawBarcode = async () => {
  const context = contextRef.value
  if (!context) {
    return
  }

  try {
    if (!barcodeEncodings.value.length) {
      dataURL.value = ''
      return
    }

    // #ifdef MP-ALIPAY
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.scale(pixelRatio, pixelRatio)
    // #endif

    const layout = calculateBarcodeLayout(
      barcodeEncodings.value,
      (text, options) => measureTextWidth(context, text, options),
    )

    const nextCanvasWidth = Math.max(layout.width * pixelRatio, 1)
    const nextCanvasHeight = Math.max(layout.height * pixelRatio, 1)

    if (
      canvasWidth.value !== nextCanvasWidth ||
      canvasHeight.value !== nextCanvasHeight
    ) {
      canvasWidth.value = nextCanvasWidth
      canvasHeight.value = nextCanvasHeight
      await sleep(isApp ? 150 : 50)
    }

    context.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
    context.setFillStyle(props.background)
    context.fillRect(0, 0, canvasWidth.value, canvasHeight.value)

    let xOffset = layout.segments[0]?.options.marginLeft ?? 0

    layout.segments.forEach((segment) => {
      drawBarcodeSegment(context, xOffset, segment)
      drawBarcodeText(context, xOffset, segment)
      xOffset += segment.width
    })

    context.draw(false, () => {
      uni.canvasToTempFilePath(
        {
          canvasId,
          success(res) {
            dataURL.value = res.tempFilePath
            emit('success', res.tempFilePath)
          },
          fail(err) {
            logError(err)
          },
        },
        instance,
      )
    })
  } catch (err) {
    dataURL.value = ''
    logError(err)
  }
}

watch(
  [
    contextRef,
    () => props.value,
    () => props.format,
    () => props.width,
    () => props.height,
    () => props.color,
    () => props.background,
    () => props.displayValue,
    () => props.textPosition,
    () => props.textAlign,
    () => props.textMargin,
    () => props.fontStyle,
    () => props.fontWeight,
    () => props.fontSize,
    () => props.fontFamily,
    () => props.margin,
    () => props.marginTop,
    () => props.marginBottom,
    () => props.marginLeft,
    () => props.marginRight,
  ],
  () => {
    drawBarcode()
  },
)

onMounted(async () => {
  contextRef.value = uni.createCanvasContext(canvasId, instance)
})

// others
const barcodeClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const barcodeStyle = computed(() => {
  return stringifyStyle(props.rootStyle, {
    width: canvasWidth.value / pixelRatio + 'px',
    height: canvasHeight.value / pixelRatio + 'px',
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
