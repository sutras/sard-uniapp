<template>
  <doc-page title="Sidebar 侧边导航">
    <doc-demo>
      <sar-list card>
        <sar-list-item
          title="基础用法"
          arrow
          hover
          @click="navigateTo('Skyline')"
        />
      </sar-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
const navigateTo = (url: string) => {
  uni.navigateTo({
    url: `/pages/components/sidebar/demo/${url}`,
  })
}
</script>

<style lang="scss" scoped></style>
