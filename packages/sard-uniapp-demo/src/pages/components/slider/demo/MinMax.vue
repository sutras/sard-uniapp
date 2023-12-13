<template>
  <doc-title>值的范围：[-50, 50]</doc-title>
  <sar-slider :model-value="0" show-value :min="-50" :max="50" />

  <doc-title>值的范围：[-50, 50]</doc-title>
  <sar-slider :model-value="[0, 20]" show-value range :min="-50" :max="50" />
</template>
