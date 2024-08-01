<template>
  <view :class="qrcodeClass" :style="qrcodeStyle">
    <canvas type="2d" :class="bem.e('canvas')" :id="canvasId"></canvas>
    <image :src="dataURL" mode="aspectFit" :class="bem.e('image')" />
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, shallowRef } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  qrcode,
} from '../../utils'
import { qrcodePropsDefaults, type QrcodeProps } from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<QrcodeProps>(), qrcodePropsDefaults)

const bem = createBem('qrcode')

// main
const canvasId = uniqid()

const canvasRef = shallowRef<HTMLCanvasElement>()

const qrcodeMap = computed(() => {
  return qrcode(props.text, {
    ecl: props.ecl,
  })
})

const dataURL = computed(() => {
  const canvas = canvasRef.value
  if (!canvas) {
    return ''
  }

  const map = qrcodeMap.value
  const size = props.canvasSize
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  const moduleSize = size / (map.length + props.quietZoneModules * 2)
  const margin = moduleSize * props.quietZoneModules

  const path = (canvas as any).createPath2D
    ? (canvas as any).createPath2D()
    : new Path2D()

  map.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === 1) {
        path.rect(
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
  context.fill(path)

  return canvas.toDataURL()
})

const instance = getCurrentInstance()

onMounted(() => {
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
