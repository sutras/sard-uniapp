<template>
  <sar-checkbox checked>
    <template #icon="{ checked }">
      <sar-icon family="demo-icons" :name="checked ? 'heart-fill' : 'heart'" />
    </template>
    复选框
  </sar-checkbox>
</template>
