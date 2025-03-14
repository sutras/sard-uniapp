<template>
  <sar-popover
    :options="options"
    @select="onSelect"
    :position="position"
    :controller="popover"
  />

  <sar-list card>
    <sar-list-item arrow hover title="屏幕中下" @click="onBottomCenter" />
    <sar-list-item arrow hover title="屏幕右下" @click="onBottomEnd" />
    <sar-list-item arrow hover title="屏幕中上" @click="onTopCenter" />
  </sar-list>
</template>

<script setup lang="ts">
import {
  getWindowInfo,
  toast,
  usePopover,
  type MenuOption,
  type PopoverPosition,
} from 'sard-uniapp'
import { ref } from 'vue'

const position = ref<PopoverPosition>('bottom')

const popover = usePopover()

const onBottomCenter = () => {
  position.value = 'bottom'
  popover.show(() => {
    const { windowWidth, windowHeight } = getWindowInfo()
    return {
      width: windowWidth,
      height: 10,
      left: 0,
      right: windowWidth,
      top: windowHeight - 10,
      bottom: windowHeight,
    }
  })
}

const onBottomEnd = () => {
  position.value = 'bottom-end'
  popover.show(() => {
    const { windowWidth, windowHeight } = getWindowInfo()
    return {
      width: 10,
      height: 10,
      left: windowWidth - 10,
      right: windowWidth,
      top: windowHeight - 10,
      bottom: windowHeight,
    }
  })
}

const onTopCenter = () => {
  position.value = 'top'
  popover.show(() => {
    const { windowWidth } = getWindowInfo()
    return {
      width: windowWidth,
      height: 10,
      left: 0,
      right: windowWidth,
      top: 0,
      bottom: 10,
    }
  })
}

const options = [
  {
    text: '选项1',
  },
  {
    text: '选项2',
  },
  {
    text: '选项3',
  },
]

const onSelect = (option: MenuOption) => {
  toast(option.text)
}
</script>
