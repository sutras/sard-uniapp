<template>
  <doc-title>只读</doc-title>
  <sar-switch readonly />
  <sar-switch :model-value="true" readonly class="ml-10" />

  <doc-title>禁用</doc-title>
  <sar-switch disabled />
  <sar-switch :model-value="true" disabled class="ml-10" />
</template>
