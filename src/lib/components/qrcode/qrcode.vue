<template>
  <view :class="qrcodeClass" :style="qrcodeStyle">
    <view :class="bem.e('canvas-wrapper')">
      <canvas
        :class="canvasId"
        :width="canvasSize"
        :height="canvasSize"
        :style="{ width: canvasSize + 'px', height: canvasSize + 'px' }"
        :canvas-id="canvasId"
        :id="canvasId"
      ></canvas>
    </view>
    <image
      :src="dataURL"
      :show-menu-by-longpress="showMenuByLongpress"
      mode="aspectFit"
      :class="bem.e('image')"
    />
    <slot v-if="!icon"></slot>
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

const qrcodeMap = computed(() => {
  return qrcode(props.text, {
    ecl: props.ecl as QrcodeProps['ecl'],
  })
})

const dataURL = ref('')

const drawQrcodeInApp = async () => {
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

  // 绘制 icon
  await drawIcon(context)

  context.draw()

  setTimeout(() => {
    uni.canvasToTempFilePath(
      {
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
        fail(err) {
          console.log('uni.canvasToTempFilePath fail', err)
        },
      },
      instance,
    )
  }, 500)
}

// 绘制 icon
const drawIcon = async (ctx: any) => {
  if (props.icon) {
    const iconInfo = (await loadIcon(props.icon)) as any

    const size = props.canvasSize
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
        console.log('uni.getImageInfo fail', path)
        console.log('uni.getImageInfo fail', err)
        reject(err)
      },
    })
  })
}

watch(
  [
    contextRef,
    qrcodeMap,
    () => props.canvasSize,
    () => props.color,
    () => props.bgColor,
    () => props.quietZoneModules,
    () => props.icon,
  ],
  () => {
    drawQrcodeInApp()
    // if (isApp) {
    //   drawQrcodeInApp()
    // } else {
    //   drawQrcodeInOthers()
    // }
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
@use './index.scss' as *;
</style>
