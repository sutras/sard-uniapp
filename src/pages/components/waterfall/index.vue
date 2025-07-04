<template>
  <doc-page title="Waterfall 瀑布流">
    <doc-demo>
      <sar-list card>
        <sar-list-item
          title="基础使用"
          arrow
          hover
          @click="navigateTo('Basic')"
        />
        <sar-list-item
          title="已知宽高"
          arrow
          hover
          @click="navigateTo('KnownSize')"
        />
        <sar-list-item
          title="真实案例"
          arrow
          hover
          @click="navigateTo('TrueCase')"
        />
        <sar-list-item
          title="最大等待时间"
          arrow
          hover
          @click="navigateTo('MaxWait')"
        />
        <sar-list-item
          title="大图"
          arrow
          hover
          @click="navigateTo('BigImage')"
        />
        <sar-list-item
          title="自定义列数"
          arrow
          hover
          @click="navigateTo('Columns')"
        />
        <sar-list-item
          title="结合下拉刷新与触底加载"
          arrow
          hover
          @click="navigateTo('Dynamic')"
        />
      </sar-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
const navigateTo = (url: string) => {
  uni.navigateTo({
    url: `/pages/components/waterfall/demo/${url}`,
  })
}
</script>
