<template>
  <doc-title>只读</doc-title>
  <sar-upload
    :model-value="[
      { url: 'https://unpkg.com/@sard/assets@1.2.0/images/pic1.jpg' },
    ]"
    readonly
  />

  <doc-title>禁用</doc-title>
  <sar-upload
    :model-value="[
      { url: 'https://unpkg.com/@sard/assets@1.2.0/images/pic1.jpg' },
    ]"
    disabled
  />
</template>
