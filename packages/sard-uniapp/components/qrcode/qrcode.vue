<template>
  <view :class="qrcodeClass" :style="qrcodeStyle">
    <sar-resize-sensor initial @resize="onResize" />
    <view :class="bem.e('canvas-wrapper')">
      <canvas
        :id="canvasId"
        :canvas-id="canvasId"
        :class="canvasId"
        :width="canvasSize * pixelRatio"
        :height="canvasSize * pixelRatio"
        :style="{
          width: size,
          height: size,
        }"
      ></canvas>
    </view>
    <image
      :src="dataURL"
      :show-menu-by-longpress="showMenuByLongpress"
      mode="aspectFit"
      :class="bem.e('image')"
    />
    <slot></slot>
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
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  qrcode,
  logError,
  NodeRect,
  getWindowInfo,
} from '../../utils'
import {
  defaultQrcodeProps,
  type QrcodeProps,
  type QrcodeEmits,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<QrcodeProps>(), defaultQrcodeProps())

const emit = defineEmits<QrcodeEmits>()

const bem = createBem('qrcode')

// main
const instance = getCurrentInstance()
const canvasId = uniqid()
const { pixelRatio } = getWindowInfo()
const contextRef = shallowRef<ReturnType<typeof uni.createCanvasContext>>()

const canvasSize = ref(0)

const onResize = (rect: NodeRect) => {
  canvasSize.value = rect.width
}

const qrcodeMap = computed(() => {
  return qrcode(props.text, {
    ecl: props.ecl as QrcodeProps['ecl'],
  })
})

const dataURL = ref('')

const drawQrcode = async () => {
  const context = contextRef.value
  const size = canvasSize.value

  if (!context || !size) {
    return
  }

  // #ifdef MP-ALIPAY
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.scale(pixelRatio, pixelRatio)
  // #endif

  const map = qrcodeMap.value
  const moduleSize = size / (map.length + props.quietZoneModules * 2)
  const margin = moduleSize * props.quietZoneModules

  context.clearRect(0, 0, size, size)
  context.setFillStyle(props.bgColor)
  context.fillRect(0, 0, size, size)
  context.setFillStyle(props.color)

  map.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === 1) {
        context.fillRect(
          colIndex * moduleSize + margin,
          rowIndex * moduleSize + margin,
          moduleSize,
          moduleSize,
        )
      }
    })
  })

  // 绘制 icon
  await drawIcon(context)

  context.draw(false, () => {
    uni.canvasToTempFilePath(
      {
        canvasId: canvasId,
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
}

// 绘制 icon
const drawIcon = async (ctx: any) => {
  if (props.icon) {
    const iconInfo = (await loadIcon(props.icon)) as any

    const size = canvasSize.value
    ctx.save()
    ctx.beginPath()
    ctx.drawImage(iconInfo.path, size * 0.4, size * 0.4, size * 0.2, size * 0.2)
    ctx.restore()
  }
}

// 加载 icon 图片
const loadIcon = (path: string) => {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: path,
      success(res) {
        resolve(res)
      },
      fail(err) {
        logError(`uni.getImageInfo fail, path: ${path}`)
        logError(err)
        reject(err)
      },
    })
  })
}

watch(
  [
    contextRef,
    qrcodeMap,
    canvasSize,
    () => props.color,
    () => props.bgColor,
    () => props.quietZoneModules,
    () => props.icon,
  ],
  () => {
    drawQrcode()
  },
)

onMounted(async () => {
  contextRef.value = uni.createCanvasContext(canvasId, instance)
})

// others
const qrcodeClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const qrcodeStyle = computed(() => {
  return stringifyStyle(props.rootStyle, {
    width: props.size,
    height: props.size,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
