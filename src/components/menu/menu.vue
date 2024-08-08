<template>
  <sar-list v-for="group in menu" card :key="group.title" :title="group.title">
    <sar-list-item
      v-for="comp in group.children"
      :key="comp.title"
      :title="comp.title"
      hover
      arrow
      @click="navigateTo(comp.name)"
    ></sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import menu from './menu.json'

const navigateTo = (name: string) => {
  uni.navigateTo({
    url: `/pages/components/${name}/index`,
  })
}
</script>

<style lang="scss"></style>
