<template>
  <sar-list>
    <sar-list-item
      title="等级特权"
      arrow
      hover
      @click="navigateTo('FullScreen')"
    />
  </sar-list>
</template>

<script lang="ts" setup>
const navigateTo = (url: string) => {
  uni.navigateTo({
    url: `/pages/components/table/demo/${url}`,
  })
}
</script>
