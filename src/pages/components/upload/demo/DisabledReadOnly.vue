<template>
  <doc-title>只读</doc-title>
  <sar-upload
    :model-value="[
      {
        url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
      },
    ]"
    readonly
  />

  <doc-title>禁用</doc-title>
  <sar-upload
    :model-value="[
      {
        url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
      },
    ]"
    disabled
  />
</template>
