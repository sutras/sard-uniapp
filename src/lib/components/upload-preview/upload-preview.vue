<template>
  <view :class="uploadPreviewClass" :style="uploadPreviewStyle">
    <image
      v-if="isImage"
      :class="bem.e('image')"
      mode="aspectFill"
      :src="mediaUrl"
      @click="onImageClick"
    />
    <view v-else-if="isVideo" :class="bem.e('video-wrapper')">
      <video
        :class="bem.e('video')"
        :id="videoId"
        :src="mediaUrl"
        :controls="controlsVisible"
        :show-center-play-btn="false"
        @fullscreenchange="onFullscreenchange"
      />

      <view :class="bem.e('video-play')" @click="onPlayClick">
        <sar-icon family="sari" name="play" size="80rpx" />
      </view>
    </view>
    <view v-else :class="bem.e('file')">
      <view :class="bem.e('file-icon')">
        <sar-icon family="sari" name="file" />
      </view>
      <view :class="bem.e('file-name')">
        {{ name }}
      </view>
    </view>
    <view
      v-if="status === 'uploading' || status === 'failed'"
      :class="bem.e('status')"
    >
      <view :class="bem.e('status-icon')">
        <sar-loading v-if="status === 'uploading'" />
        <sar-icon
          v-else-if="status === 'failed'"
          family="sari"
          name="x-circle"
        />
      </view>

      <view v-if="message" :class="bem.e('status-message')">{{ message }}</view>
    </view>
    <view
      v-if="removable && !disabled && !readonly && status !== 'uploading'"
      :class="bem.e('remove')"
      @click="onRemove"
    >
      <view :class="bem.e('close')">
        <sar-icon family="sari" name="close" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  isImageUrl,
  isVideoUrl,
  uniqid,
} from '../../utils'
import SarIcon from '../icon/icon.vue'
import SarLoading from '../loading/loading.vue'
import {
  type UploadPreviewProps,
  type UploadPreviewEmits,
  defaultUploadPreviewProps,
} from '../upload/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<UploadPreviewProps>(),
  defaultUploadPreviewProps,
)

const emit = defineEmits<UploadPreviewEmits>()

const bem = createBem('upload')

// main
const isImage = computed(() => {
  return (
    props.isImage ||
    props.file?.type === 'image' ||
    (props.url && isImageUrl(props.url))
  )
})

const isVideo = computed(() => {
  return (
    props.isVideo ||
    props.file?.type === 'video' ||
    (props.url && isVideoUrl(props.url))
  )
})

const mediaUrl = computed(() => {
  return props.url || props.file?.path || ''
})

// image
const onImageClick = () => {
  emit('image-click', props.index)
}

// video
const videoId = uniqid()
const instance = getCurrentInstance()
const controlsVisible = ref(false)
const videoContext = uni.createVideoContext(videoId, instance)

const onFullscreenchange = (event: any) => {
  if (event.detail.fullScreen) {
    videoContext.play()
    controlsVisible.value = true
  } else {
    videoContext.pause()
    controlsVisible.value = false
  }
}

const onPlayClick = () => {
  videoContext.requestFullScreen({
    direction: 0,
  })
}

// remove
const onRemove = () => {
  if (!props.removable || props.disabled || props.readonly) return

  function remove() {
    emit('remove', props.index)
  }

  if (props.beforeRemove) {
    const ret = props.beforeRemove(props.index)
    if (!ret) {
      return
    }
    if (ret instanceof Promise) {
      ret
        .then(() => {
          remove()
        })
        .catch(() => {
          void 0
        })
      return
    }
  }
  remove()
}

// others
const uploadPreviewClass = computed(() => {
  return classNames(
    bem.e('preview'),
    bem.em('preview', 'is-video', isVideo.value),
    props.rootClass,
  )
})

const uploadPreviewStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
