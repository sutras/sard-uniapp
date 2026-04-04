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
          <sar-resize-sensor initial @resize="onResize" />
          <canvas
            type="2d"
            :id="canvasId"
            :canvas-id="canvasId"
            :class="bem.e('canvas')"
            disable-scroll
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
            @mousedown="onMouseDown"
            @ready="onCanvasReady"
          ></canvas>

          <view :class="bem.e('covert-canvas-wrapper')">
            <canvas
              type="2d"
              :id="covertCanvasId"
              :canvas-id="covertCanvasId"
              :style="{
                width: canvasCSSWidth + 'px',
                height: canvasCSSHeight + 'px',
              }"
              @ready="onCovertCanvasReady"
            ></canvas>
          </view>
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
  shallowRef,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
  NodeRect,
  getWindowInfo,
  sleep,
  isApp,
  filePathToDataURL,
  isMp,
  getNode,
  isWeb,
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
import SarResizeSensor from '../resize-sensor/resize-sensor.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<SignatureProps>(),
  defaultSignatureProps(),
)

defineSlots<SignatureSlots>()

const emit = defineEmits<SignatureEmits>()

const bem = createBem('signature')

const { t } = useTranslate('signature')

// main
type CanvasContext = ReturnType<typeof uni.createCanvasContext>

const instance = getCurrentInstance()

const { pixelRatio } = getWindowInfo()

const contentId = uniqid()

const canvasId = uniqid()
const covertCanvasId = uniqid()

const contextRef = shallowRef<CanvasRenderingContext2D>()
const covertContextRef = shallowRef<CanvasRenderingContext2D>()

const canvasRef = shallowRef<HTMLCanvasElement>()
const covertCanvasRef = shallowRef<HTMLCanvasElement>()

const canvasWidth = ref(1)
const canvasHeight = ref(1)

const covertCanvasWidth = ref(1)
const covertCanvasHeight = ref(1)

const canvasCSSWidth = ref(1)
const canvasCSSHeight = ref(1)

const onResize = (rect: NodeRect) => {
  canvasCSSWidth.value = rect.height
  canvasCSSHeight.value = rect.width
}

let prevPoints: [number, number] = [0, 0]

let isEmpty = true

const mapImgType = {
  png: 'image/png',
  jpg: 'image/jpeg',
}

// ============================ ready ============================
const getCanvas = async () => {
  canvasRef.value = (await getNode(`#${canvasId}`, instance))!
  contextRef.value = canvasRef.value.getContext('2d')!
}

const getCovertCanvas = async () => {
  covertCanvasRef.value = (await getNode(`#${covertCanvasId}`, instance))!
  covertContextRef.value = covertCanvasRef.value.getContext('2d')!
}

onMounted(async () => {
  // #ifdef MP-WEIXIN || WEB
  await getCanvas()
  await getCovertCanvas()
  initialCanvas()
  // #endif

  // #ifdef APP-PLUS || APP-HARMONY
  contextRef.value = uni.createCanvasContext(
    canvasId,
    instance,
  ) as unknown as CanvasRenderingContext2D
  covertContextRef.value = uni.createCanvasContext(
    covertCanvasId,
    instance,
  ) as unknown as CanvasRenderingContext2D
  initialCanvas()
  // #endif
})

let readyCount = 0

const ready = () => {
  readyCount++
  if (readyCount === 2) {
    initialCanvas()
  }
}

const onCanvasReady = async () => {
  // #ifdef MP-ALIPAY
  await getCanvas()
  ready()
  // #endif
}

const onCovertCanvasReady = async () => {
  // #ifdef MP-ALIPAY
  await getCovertCanvas()
  ready()
  // #endif
}

// ========================== touch event =========================
const onTouchStart = async (event: TouchEvent) => {
  const context = contextRef.value!

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

  // #ifdef APP-PLUS || APP-HARMONY
  ;(context as unknown as CanvasContext).draw(true)
  // #endif

  isEmpty = false
}

const onTouchMove = (event: TouchEvent) => {
  const context = contextRef.value!

  const { x, y } = event.touches[0] as unknown as { x: number; y: number }

  context.moveTo(...prevPoints)
  context.lineTo(x, y)
  prevPoints = [x, y]
  context.stroke()

  // #ifdef APP-PLUS || APP-HARMONY
  ;(context as unknown as CanvasContext).draw(true)
  // #endif
}

const onTouchEnd = () => {
  const context = contextRef.value!

  context.closePath()
}

// =========================== mouse event ==========================
let downRect: NodeRect
let isDown = false

const onMouseDown = async (event: MouseEvent) => {
  if ('ontouchstart' in document || isApp) {
    return
  }

  isDown = true

  document.addEventListener('mousemove', onMouseMove, true)
  document.addEventListener('mouseup', onMouseUp, true)

  downRect = await getBoundingClientRect(`#${canvasId}`, instance)

  const touchEvent = {
    ...event,
    touches: [
      { x: event.clientX - downRect.left, y: event.clientY - downRect.top },
    ],
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
    touches: [
      { x: event.clientX - downRect.left, y: event.clientY - downRect.top },
    ],
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

// ======================= get canvas info =======================
const getCanvasFilePath = async () => {
  return await new Promise<string>((resolve, reject) => {
    uni.canvasToTempFilePath(
      {
        canvasId: isMp ? '' : canvasId,
        canvas: canvasRef.value,
        fileType: props.type,
        quality: props.quality,
        success(res: any) {
          resolve(res.tempFilePath)
        },
        fail(err) {
          reject(err)
        },
      },
      instance,
    )
  })
}

const getCanvasDataURL = async () => {
  if (isMp || isWeb) {
    return canvasRef.value!.toDataURL(mapImgType[props.type], props.quality)
  }

  return filePathToDataURL(await getCanvasFilePath())
}

const getCanvasTarget = async () => {
  if (props.target === 'dataURL') {
    return await getCanvasDataURL()
  }
  return await getCanvasFilePath()
}

const drawCovertCanvas = async () => {
  // #ifdef MP || WEB
  const covertContext = covertContextRef.value!
  const covertCanvas = covertCanvasRef.value!
  const canvas = canvasRef.value!

  covertContext.clearRect(0, 0, covertCanvas.width, covertCanvas.height)
  covertContext.save()
  // #ifdef WEB
  covertContext.scale(1 / pixelRatio, 1 / pixelRatio)
  // #endif
  covertContext.translate(0, covertCanvas.height)
  covertContext.rotate(-Math.PI / 2)
  covertContext.drawImage(canvas, 0, 0)
  covertContext.restore()
  // #endif

  // #ifdef APP-PLUS || APP-HARMONY
  const oldCovertContext = covertContextRef.value as unknown as CanvasContext

  oldCovertContext.clearRect(
    0,
    0,
    covertCanvasWidth.value,
    covertCanvasHeight.value,
  )
  oldCovertContext.save()
  oldCovertContext.scale(1 / pixelRatio, 1 / pixelRatio)
  oldCovertContext.translate(0, covertCanvasHeight.value)
  oldCovertContext.rotate(-Math.PI / 2)
  oldCovertContext.drawImage(await getCanvasFilePath(), 0, 0)
  oldCovertContext.restore()

  await new Promise<void>((resolve) => {
    oldCovertContext.draw(false, () => {
      resolve()
    })
  })
  // #endif
}

const getCovertCanvasFilePath = async () => {
  await drawCovertCanvas()

  return await new Promise<string>((resolve, reject) => {
    uni.canvasToTempFilePath(
      {
        canvasId: isMp ? '' : covertCanvasId,
        canvas: covertCanvasRef.value,
        fileType: props.type,
        quality: props.quality,
        success(res: any) {
          resolve(res.tempFilePath)
        },
        fail(err) {
          reject(err)
        },
      },
      instance,
    )
  })
}

const getCovertCanvasDataUrl = async () => {
  if (isMp || isWeb) {
    await drawCovertCanvas()
    return covertCanvasRef.value!.toDataURL(
      mapImgType[props.type],
      props.quality,
    )
  }
  return filePathToDataURL(await getCovertCanvasFilePath())
}

const getCovertCanvasTarget = async () => {
  if (props.target === 'dataURL') {
    return await getCovertCanvasDataUrl()
  }
  return await getCovertCanvasFilePath()
}

// ========================= methods =========================
const initialCanvas = async () => {
  const bodyRect = await getBoundingClientRect(`#${contentId}`, instance)

  // #ifdef MP || WEB
  const context = contextRef.value
  const covertContext = contextRef.value
  const canvas = canvasRef.value
  const covertCanvas = covertCanvasRef.value

  if (context && covertContext && canvas && covertCanvas) {
    // #ifdef MP
    canvas.width = bodyRect.width * pixelRatio
    canvas.height = bodyRect.height * pixelRatio
    covertCanvas.width = canvas.height
    covertCanvas.height = canvas.width

    context.setTransform(1, 0, 0, 1, 0, 0)
    context.scale(pixelRatio, pixelRatio)
    covertContext.setTransform(1, 0, 0, 1, 0, 0)
    covertContext.scale(pixelRatio, pixelRatio)
    // #endif

    context.clearRect(0, 0, canvas.width, canvas.height)

    if (props.background) {
      context.fillStyle = props.background
      context.fillRect(0, 0, canvas.width, canvas.height)
    }
  }
  // #endif

  // #ifdef APP-PLUS || APP-HARMONY
  const oldContext = contextRef.value as unknown as CanvasContext
  const oldCovertContext = covertContextRef.value as unknown as CanvasContext

  if (oldContext && oldCovertContext) {
    canvasWidth.value = bodyRect.width * pixelRatio
    canvasHeight.value = bodyRect.height * pixelRatio
    covertCanvasWidth.value = canvasHeight.value
    covertCanvasHeight.value = canvasWidth.value

    oldContext.clearRect(0, 0, canvasWidth.value, canvasHeight.value)

    if (props.background) {
      oldContext.fillStyle = props.background
      oldContext.fillRect(0, 0, canvasWidth.value, canvasHeight.value)
    }
    oldContext.draw()
  }
  // #endif

  isEmpty = true
}

const clear = () => {
  initialCanvas()
  emit('clear')
}

const confirm = async () => {
  const dataURL = isEmpty
    ? ''
    : props.fullScreen
      ? await getCovertCanvasTarget()
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

const resize = () => {
  initialCanvas()
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
