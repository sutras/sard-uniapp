<template>
  <sar-grid direction="horizontal" reverse>
    <sar-grid-item v-for="i in 4" :key="i" text="文字" icon="image" />
  </sar-grid>

  <sar-grid direction="vertical" reverse>
    <sar-grid-item v-for="i in 4" :key="i" text="文字" icon="image" />
  </sar-grid>
</template>
