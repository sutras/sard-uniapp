<template>
  <sar-grid :columns="3">
    <sar-grid-item v-for="i in 6" :key="i" text="文字" icon="image" />
  </sar-grid>
</template>
