<template>
  <doc-page title="自定义绘制">
    <sar-watermark
      class="fixed"
      :content="content"
      :font="{
        fontSize,
        textAlign,
        color,
      }"
      :z-index="9999"
      :gap="[gapX, gapY]"
      :offset="[offsetX, offsetY]"
      :rotate="rotate"
    />

    <sar-form label-width="120rpx">
      <sar-form-item label="textAlign">
        <sar-segmented
          v-model="textAlign"
          :options="['left', 'center', 'right']"
        />
      </sar-form-item>
      <sar-form-item label="rotate">
        <sar-slider v-model="rotate" :min="-180" :max="180" show-value />
      </sar-form-item>
      <sar-form-item label="fontSize">
        <sar-slider v-model="fontSize" :min="1" :max="100" show-value />
      </sar-form-item>
      <sar-form-item label="gapX">
        <sar-slider v-model="gapX" :min="-100" :max="100" show-value />
      </sar-form-item>
      <sar-form-item label="gapY">
        <sar-slider v-model="gapY" :min="-100" :max="100" show-value />
      </sar-form-item>
      <sar-form-item label="offsetX">
        <sar-slider v-model="offsetX" :min="-100" :max="100" show-value />
      </sar-form-item>
      <sar-form-item label="offsetY">
        <sar-slider v-model="offsetY" :min="-100" :max="100" show-value />
      </sar-form-item>
      <sar-form-item label="content">
        <sar-input v-model="strContent" type="textarea" />
      </sar-form-item>
      <sar-form-item label="color">
        <sar-input v-model="color" />
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const rotate = ref(-22)
const fontSize = ref(14)
const gapX = ref(30)
const gapY = ref(30)
const offsetX = ref(gapX.value / 2)
const offsetY = ref(gapY.value / 2)
const textAlign = ref('center')
const strContent = ref('SardUniapp\nUniapp + Vue3 + TS')
const content = computed(() =>
  strContent.value
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((item) => item.trim()),
)
const color = ref('rgba(128,128,128,.3)')
</script>
