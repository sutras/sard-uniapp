<template>
  <doc-page>
    <doc-demo title="基础使用">
      <sar-loading />
    </doc-demo>

    <doc-demo title="加载类型">
      <sar-loading type="circular" />
      <sar-loading type="clock" />
    </doc-demo>

    <doc-demo title="加载文案">
      <sar-loading text="text..."></sar-loading>
      <sar-loading>slot...</sar-loading>
    </doc-demo>

    <doc-demo title="垂直排布">
      <sar-loading vertical>加载中...</sar-loading>
    </doc-demo>

    <doc-demo title="加载尺寸">
      <sar-loading size="24px" textSize="18px" text="加载中" />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <sar-loading
        color="var(--sar-primary)"
        textColor="var(--sar-primary)"
        text="加载中"
      />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts"></script>
