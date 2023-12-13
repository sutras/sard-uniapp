<template>
  <doc-title>单值选择</doc-title>
  <sar-slider
    :model-value="50"
    piece-color="var(--sar-orange)"
    thumb-color="var(--sar-orange)"
  />

  <doc-title>范围选择</doc-title>
  <sar-slider
    range
    :model-value="[20, 80]"
    piece-color="var(--sar-orange)"
    thumb-color="var(--sar-orange)"
  />
</template>
