<template>
  <view class="relative box-border" :style="{ paddingTop }">
    <view class="absolute inset-0 flex justify-center items-center sbg-fourth">
      <text>{{ meta.width }}</text>
      <text>x</text>
      <text>{{ meta.height }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useTimeout } from '../../../use'
import { random } from '../../../utils'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  meta: {
    width: number
    height: number
  }
}>()

const emit = defineEmits<{
  (
    e: 'load',
    event: {
      detail: {
        width: number
        height: number
      }
    },
  ): void
}>()

const internalWidth = ref(320)
const internalHeight = ref(240)

const currWidth = computed(() => internalWidth.value)
const currHeight = computed(() => internalHeight.value)

const paddingTop = computed(
  () => (currHeight.value / currWidth.value) * 100 + '%',
)

const { start } = useTimeout(
  () => {
    internalWidth.value = props.meta.width
    internalHeight.value = props.meta.height
    emit('load', {
      detail: {
        width: props.meta.width,
        height: props.meta.height,
      },
    })
  },
  random(50, 150),
)

onMounted(() => {
  start()
})
</script>
