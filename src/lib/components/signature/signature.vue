<template>
  <view
    :class="signatureClass"
    :style="signatureStyle"
    @transitionend="onTransitionEnd"
  >
    <sar-status-bar v-if="fullScreen && customNavbar" />

    <view :class="bem.e('content')">
      <view :class="bem.e('body')">
        <view :id="contentId" :class="bem.e('canvas-content')">
          <canvas
            type="2d"
            :class="bem.e('canvas')"
            :style="{
              width: canvasCSSWidth,
              height: canvasCSSHeight,
            }"
            :canvas-id="canvasId"
            :id="canvasId"
            disable-scroll
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
            @mousedown="onMouseDown"
            @ready="onCanvasReady"
          ></canvas>
          <canvas
            type="2d"
            :class="bem.e('covert-canvas')"
            :style="{
              width: covertCanvasCSSWidth,
              height: covertCanvasCSSHeight,
            }"
            :canvas-id="covertCanvasId"
            :id="covertCanvasId"
            @ready="onCanvasReady"
          ></canvas>
        </view>
      </view>

      <view :class="bem.e('footer')" :id="footerId">
        <view
          :class="bem.e('footer-content')"
          :style="{ width: footerContentWidth }"
        >
          <sar-status-bar v-if="fullScreen && customNavbar" reverse />
          <slot></slot>
          <view :class="bem.e('button-group')">
            <sar-button
              v-if="fullScreen"
              size="small"
              type="pale"
              block
              @click="onCancel"
            >
              {{ cancelText || t('cancel') }}
            </sar-button>
            <sar-button size="small" type="pale" block @click="onClear">
              {{ clearText || t('clear') }}
            </sar-button>
            <sar-button size="small" block @click="onConfirm">
              {{ confirmText || t('confirm') }}
            </sar-button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  watch,
  getCurrentInstance,
  ref,
  reactive,
  toRef,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
  NodeRect,
  getNode,
  getWindowInfo,
  sleep,
  isWeb,
  isApp,
  isAlipay,
  plusToDataURL,
} from '../../utils'
import {
  type SignatureProps,
  type SignatureSlots,
  type SignatureEmits,
  type SignatureExpose,
  defaultSignatureProps,
} from './common'
import SarButton from '../button/button.vue'
import { useTransition, useZIndex } from '../../use'
import { type TransitionHookName } from '../../use/useTransition'
import { useTranslate } from '../locale'
import SarStatusBar from '../status-bar/status-bar.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SignatureProps>(), defaultSignatureProps)

defineSlots<SignatureSlots>()

const emit = defineEmits<SignatureEmits>()

const bem = createBem('signature')

const { t } = useTranslate('signature')

// main
const instance = getCurrentInstance()

const dpr = getWindowInfo().pixelRatio

const contentId = uniqid()

const canvasCSSWidth = ref('')
const canvasCSSHeight = ref('')

let canvasWidth = 0
let canvasHeight = 0

const covertCanvasCSSWidth = ref('')
const covertCanvasCSSHeight = ref('')

let covertCanvasWidth = 0
let covertCanvasHeight = 0

const canvasId = uniqid()
let canvas: HTMLCanvasElement
let context: CanvasRenderingContext2D

const covertCanvasId = uniqid()
let covertCanvas: HTMLCanvasElement
let covertContext: CanvasRenderingContext2D

let prevPoints: [number, number] = [0, 0]

let isEmpty = true

const mapImageType = {
  jpg: 'image/jpeg',
  png: 'image/png',
}

const setCanvasSize = async () => {
  const bodyRect = await getBoundingClientRect(`#${contentId}`, instance)

  canvasWidth = bodyRect.width * dpr
  canvasHeight = bodyRect.height * dpr

  covertCanvasWidth = canvasHeight
  covertCanvasHeight = canvasWidth

  if (!isApp && canvas) {
    canvas.width = canvasWidth
    canvas.height = canvasHeight
  }

  if (!isWeb && !isApp) {
    context.resetTransform()
    context.scale(dpr, dpr)
  }

  canvasCSSWidth.value = bodyRect.width + 'px'
  canvasCSSHeight.value = bodyRect.height + 'px'

  if (!isApp && covertCanvas) {
    covertCanvas.width = covertCanvasWidth
    covertCanvas.height = covertCanvasHeight
  }

  if (!isWeb && !isApp) {
    covertContext.resetTransform()
    covertContext.scale(dpr, dpr)
  }

  covertCanvasCSSWidth.value = bodyRect.height + 'px'
  covertCanvasCSSHeight.value = bodyRect.width + 'px'
}

const getCanvas = async () => {
  if (isApp) {
    context = uni.createCanvasContext(
      canvasId,
      instance,
    ) as unknown as CanvasRenderingContext2D

    covertContext = uni.createCanvasContext(
      covertCanvasId,
      instance,
    ) as unknown as CanvasRenderingContext2D
  } else {
    canvas = await getNode(`#${canvasId}`, instance)
    if (canvas) {
      context = canvas.getContext('2d') as CanvasRenderingContext2D
    }

    covertCanvas = await getNode(`#${covertCanvasId}`, instance)
    if (covertCanvas) {
      covertContext = covertCanvas.getContext('2d') as CanvasRenderingContext2D
    }
  }

  if (!props.fullScreen) {
    await initialCanvas()
    if (isAlipay) {
      await initialCanvas()
    }
  }
}

onMounted(() => {
  if (!isAlipay) {
    getCanvas()
  }
})

let canvasReadyCount = 0

const onCanvasReady = () => {
  canvasReadyCount++
  if (isAlipay && canvasReadyCount === 2) {
    getCanvas()
  }
}

// touch event
const onTouchStart = (event: TouchEvent) => {
  const { x, y } = event.touches[0] as unknown as { x: number; y: number }

  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.lineWidth = props.lineWidth
  context.strokeStyle = props.color

  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(x, y)
  prevPoints = [x, y]
  context.stroke()

  if (isApp) {
    ;(context as any).draw(true)
  }

  isEmpty = false
}

const onTouchMove = (event: TouchEvent) => {
  const { x, y } = event.touches[0] as unknown as { x: number; y: number }

  context.moveTo(...prevPoints)
  context.lineTo(x, y)
  prevPoints = [x, y]
  context.stroke()

  if (isApp) {
    ;(context as any).draw(true)
  }
}

const onTouchEnd = () => {
  context.closePath()
}

// mouse event
let rect: NodeRect
let isDown = false

const onMouseDown = async (event: MouseEvent) => {
  if (isApp) {
    return
  }
  isDown = true

  document.addEventListener('mousemove', onMouseMove, true)
  document.addEventListener('mouseup', onMouseUp, true)

  rect = await getBoundingClientRect(`#${canvasId}`, instance)

  const touchEvent = {
    ...event,
    touches: [{ x: event.clientX - rect.left, y: event.clientY - rect.top }],
  }

  onTouchStart(touchEvent as unknown as TouchEvent)
}

const onMouseMove = (event: MouseEvent) => {
  if (!isDown) {
    return
  }
  event.preventDefault?.()

  const touchEvent = {
    ...event,
    touches: [{ x: event.clientX - rect.left, y: event.clientY - rect.top }],
  }
  onTouchMove(touchEvent as unknown as TouchEvent)
}

const onMouseUp = () => {
  if (!isDown) {
    return
  }
  isDown = false
  document.removeEventListener('mousemove', onMouseMove, true)
  document.removeEventListener('mouseup', onMouseUp, true)
}

// methods
const initialCanvas = async () => {
  await setCanvasSize()

  if (!isWeb && !isApp) {
    await sleep(50)
  }

  if (context) {
    context.clearRect(0, 0, canvasWidth, canvasHeight)
    if (isApp) {
      ;(context as any).draw()
    }

    if (props.background) {
      context.fillStyle = props.background
      context.fillRect(0, 0, canvasWidth, canvasHeight)
      if (isApp) {
        ;(context as any).draw()
      }
    }
  }

  isEmpty = true
}

const clear = () => {
  initialCanvas()
  emit('clear')
}

const getCanvasDataURL = async () => {
  if (isApp) {
    return await plusToDataURL(await getCanvasFilePath())
  }
  return canvas.toDataURL(mapImageType[props.type])
}

const getCanvasFilePath = async () => {
  return await new Promise<string>((resolve) => {
    const options = {
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      destWidth: canvasWidth,
      destHeight: canvasHeight,
      canvasId: canvasId,
      canvas: canvas,
      fileType: props.type,
      quality: props.quality,
      success(res: any) {
        resolve(res.tempFilePath)
      },
    }
    if (isAlipay) {
      ;(canvas as any).toTempFilePath(options)
    } else {
      uni.canvasToTempFilePath(options)
    }
  })
}

const drawRotateCanvas = async () => {
  covertContext.clearRect(0, 0, covertCanvasWidth, covertCanvasHeight)
  covertContext.save()
  covertContext.scale(1 / dpr, 1 / dpr)
  covertContext.translate(0, covertCanvasHeight)
  covertContext.rotate(-Math.PI / 2)
  if (isApp) {
    const dataURL = await getCanvasDataURL()
    covertContext.drawImage(dataURL as any, 0, 0)
  } else {
    covertContext.drawImage(canvas, 0, 0)
  }
  covertContext.restore()
  if (isApp) {
    await new Promise<void>((resolve) => {
      ;(covertContext as any).draw(false, () => {
        resolve()
      })
    })
  }
}

const getRotateCanvasDataUrl = async () => {
  if (isApp) {
    return await plusToDataURL(await getRotateCanvasFilePath())
  }

  await drawRotateCanvas()
  return covertCanvas.toDataURL(mapImageType[props.type])
}

const getRotateCanvasFilePath = async () => {
  await drawRotateCanvas()

  return await new Promise<string>((resolve) => {
    const options = {
      x: 0,
      y: 0,
      width: covertCanvasWidth,
      height: covertCanvasHeight,
      destWidth: covertCanvasWidth,
      destHeight: covertCanvasHeight,
      canvasId: covertCanvasId,
      canvas: covertCanvas,
      fileType: props.type,
      quality: props.quality,
      success(res: any) {
        resolve(res.tempFilePath)
      },
    }
    if (isAlipay) {
      ;(canvas as any).toTempFilePath(options)
    } else {
      uni.canvasToTempFilePath(options)
    }
  })
}

const getCanvasTarget = async () => {
  if (props.target === 'dataURL') {
    return await getCanvasDataURL()
  }
  return await getCanvasFilePath()
}

const getRotateCanvasTarget = async () => {
  if (props.target === 'dataURL') {
    return await getRotateCanvasDataUrl()
  }
  return await getRotateCanvasFilePath()
}

const confirm = async () => {
  const dataURL = isEmpty
    ? ''
    : props.fullScreen
    ? await getRotateCanvasTarget()
    : await getCanvasTarget()

  emit('confirm', dataURL)

  if (props.fullScreen) {
    close()
  }
}

const close = () => {
  innerVisible.value = false
  emit('update:visible', false)
}

const onCancel = () => {
  close()
  emit('cancel')
}

const onClear = () => {
  clear()
}

const onConfirm = () => {
  confirm()
}

const resize = () => {
  initialCanvas()
}

// visible
const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

const [zIndex, increaseZIndex] = useZIndex()

let fullScreenInitialled = false

const { realVisible, transitionClass, onTransitionEnd } = useTransition(
  reactive({
    visible: innerVisible,
    duration: toRef(() => props.duration),
    prefix: bem.m('fade-'),
    async onVisibleHook(name: TransitionHookName) {
      if (props.fullScreen) {
        switch (name) {
          case 'enter': {
            if (!fullScreenInitialled) {
              fullScreenInitialled = true
              await sleep(50)
              setFooterContentWidth()
              await initialCanvas()
            }
            break
          }
        }
      }
    },
  }),
)

watch(
  innerVisible,
  () => {
    if (innerVisible.value) {
      increaseZIndex()
    }
  },
  {
    immediate: true,
  },
)

// footer content size
const footerContentWidth = ref('')

const footerId = uniqid()

const setFooterContentWidth = async () => {
  const rect = await getBoundingClientRect(`#${footerId}`, instance)
  footerContentWidth.value = rect.height + 'px'
}

// others
const signatureClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('full', props.fullScreen),
    bem.m('hidden', props.fullScreen && !realVisible.value),
    props.fullScreen ? transitionClass.value : '',
    props.rootClass,
  )
})

const signatureStyle = computed(() => {
  return stringifyStyle(
    {
      // display: isAlipay || realVisible.value ? 'flex' : 'none',
      '--sar-button-padding-x-sm': '32rpx',
      transitionDuration: props.duration + 'ms',
      zIndex: props.fullScreen && innerVisible.value ? zIndex.value : null,
    },
    props.rootStyle,
  )
})

defineExpose<SignatureExpose>({
  clear,
  confirm,
  resize,
})
</script>

<style lang="scss">
@import './index.scss';
</style>
