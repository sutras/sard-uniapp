<template>
  <view :class="swiperWrapperClass" :style="swiperWrapperStyle">
    <swiper
      :class="swiperClass"
      :current="innerValue"
      :previous-margin="previousMargin"
      :next-margin="nextMargin"
      :display-multiple-items="displayMultipleItems"
      @change="onChange"
    >
      <swiper-item
        v-for="(item, index) in finalList"
        :class="bem.e('swiper-item')"
        :key="index"
        :style="swiperItemStyle"
        @click="onClick(index)"
      >
        <view
          :class="bem.e('item')"
          :style="
            stringifyStyle(itemStyle, dynamicItemStyle?.(index, innerValue))
          "
        >
          <image
            v-if="item.image"
            :class="bem.e('image')"
            :src="item.image"
            mode="aspectFill"
          />
          <video
            v-else-if="item.video"
            :id="idPrefix + index"
            :class="bem.e('video')"
            :src="item.video"
            :poster="item.poster"
            :enable-progress-gesture="false"
            muted
            object-fit="cover"
          />
        </view>
      </swiper-item>
    </swiper>
    <sar-swiper-dot
      v-if="showDot"
      :current="innerValue"
      :type="dotType"
      :list="list"
      field="title"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { classNames, stringifyStyle, createBem, uniqid } from '../../utils'
import {
  type SwiperProps,
  type SwiperSlots,
  type SwiperEmits,
  type SwiperExpose,
  defaultSwiperProps,
} from './common'
import SarSwiperDot from '../swiper-dot/swiper-dot.vue'

defineOptions({
  name: 'SarSwiper',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<SwiperProps>(), defaultSwiperProps())

defineSlots<SwiperSlots>()

const emit = defineEmits<SwiperEmits>()

const bem = createBem('swiper')

// main
const idPrefix = uniqid() + '-'

const innerValue = ref(props.modelValue || 0)

watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val || 0
  },
)

const finalList = computed(() => {
  return props.list.map((item) => {
    if (typeof item === 'string') {
      return { image: item }
    }
    return item
  })
})

const mayPauseVideo = (currentIndex: number) => {
  finalList.value.forEach((item, index) => {
    if (item.video) {
      const videoContext = uni.createVideoContext(`${idPrefix}${index}`)
      if (index === currentIndex) {
        videoContext.play()
      } else {
        videoContext.pause()
      }
    }
  })
}

const onChange = (e: any) => {
  const index = e.detail.current
  innerValue.value = index
  mayPauseVideo(index)
  emit('update:model-value', index)
  emit('change', index)
}

const onClick = (index: number) => {
  emit('click', index)
}

// others
defineExpose<SwiperExpose>({})

const swiperWrapperClass = computed(() => {
  return classNames(bem.e('wrapper'), props.rootClass)
})

const swiperWrapperStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const swiperClass = computed(() => {
  return classNames(bem.b())
})
</script>

<style lang="scss">
@import './index.scss';
</style>
