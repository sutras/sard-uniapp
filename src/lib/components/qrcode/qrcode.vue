<template>
  <view :class="qrcodeClass" :style="qrcodeStyle">
    <view :class="bem.e('canvas-wrapper')">
      <canvas
        type="2d"
        :width="canvasSize"
        :height="canvasSize"
        :style="{ width: canvasSize + 'px', height: canvasSize + 'px' }"
        :canvas-id="canvasId"
        :id="canvasId"
      ></canvas>
    </view>
    <image :src="dataURL" mode="aspectFit" :class="bem.e('image')" />
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
  isApp,
} from '../../utils'
import { defaultQrcodeProps, type QrcodeProps } from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<QrcodeProps>(), defaultQrcodeProps)

const bem = createBem('qrcode')

// main
const instance = getCurrentInstance()
const canvasId = uniqid()
const contextRef = shallowRef<ReturnType<typeof uni.createCanvasContext>>()
const canvasRef = shallowRef<HTMLCanvasElement>()

const qrcodeMap = computed(() => {
  return qrcode(props.text, {
    ecl: props.ecl as QrcodeProps['ecl'],
  })
})

const dataURL = ref('')

const drawQrcodeInApp = () => {
  const context = contextRef.value
  if (!context) {
    return
  }

  const map = qrcodeMap.value
  const size = props.canvasSize
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

  context.draw()

  uni.canvasToTempFilePath({
    x: 0,
    y: 0,
    width: size,
    height: size,
    destWidth: size,
    destHeight: size,
    canvasId: canvasId,
    success(res) {
      dataURL.value = res.tempFilePath
    },
  })
}

const drawQrcodeInOthers = () => {
  const canvas = canvasRef.value
  if (!canvas) {
    return
  }

  const map = qrcodeMap.value
  const size = props.canvasSize
  canvas.width = size
  canvas.height = size
  const moduleSize = size / (map.length + props.quietZoneModules * 2)
  const margin = moduleSize * props.quietZoneModules
  const context = canvas.getContext('2d') as CanvasRenderingContext2D

  const path2D = (context as any).createPath2D
    ? (context as any).createPath2D()
    : (canvas as any).createPath2D
    ? (canvas as any).createPath2D()
    : new Path2D()

  map.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === 1) {
        path2D.rect(
          colIndex * moduleSize + margin,
          rowIndex * moduleSize + margin,
          moduleSize,
          moduleSize,
        )
      }
    })
  })
  context.clearRect(0, 0, size, size)
  context.fillStyle = props.bgColor
  context.fillRect(0, 0, size, size)
  context.fillStyle = props.color
  context.fill(path2D)

  dataURL.value = canvas.toDataURL()
}

watch(
  [
    contextRef,
    canvasRef,
    qrcodeMap,
    () => props.canvasSize,
    () => props.color,
    () => props.bgColor,
    () => props.quietZoneModules,
  ],
  () => {
    if (isApp) {
      drawQrcodeInApp()
    } else {
      drawQrcodeInOthers()
    }
  },
)

onMounted(() => {
  if (isApp) {
    contextRef.value = uni.createCanvasContext(canvasId, instance)
  } else {
    uni
      .createSelectorQuery()
      .in(instance)
      .select(`#${canvasId}`)
      .node((res) => {
        if (res && res.node) {
          canvasRef.value = res.node
        }
      })
      .exec()
  }
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
