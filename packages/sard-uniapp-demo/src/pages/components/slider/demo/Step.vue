<template>
  <doc-title>步长：10</doc-title>
  <sar-slider :model-value="50" show-value :step="10" />

  <doc-title>步长：12.3</doc-title>
  <sar-slider range :model-value="[50, 80]" show-value :step="12.3" />
</template>
