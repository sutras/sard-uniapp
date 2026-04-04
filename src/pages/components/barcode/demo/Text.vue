<template>
  <sar-list card>
    <sar-list-item title="显示文本">
      <template #value>
        <sar-switch v-model="displayValue" />
      </template>
    </sar-list-item>
    <sar-list-item title="加粗">
      <template #value>
        <sar-switch v-model="bold" />
      </template>
    </sar-list-item>
    <sar-list-item title="倾斜">
      <template #value>
        <sar-switch v-model="italic" />
      </template>
    </sar-list-item>
    <sar-list-item title="字号">
      <template #value>
        <sar-slider
          v-model="fontSize"
          :min="10"
          :max="30"
          style="width: 500rpx"
        />
      </template>
    </sar-list-item>
    <sar-list-item title="文本边距">
      <template #value>
        <sar-slider
          v-model="textMargin"
          :min="0"
          :max="30"
          style="width: 500rpx"
        />
      </template>
    </sar-list-item>
    <sar-list-item>
      <sar-segmented v-model="textPosition" :options="textPositionOptions" />
    </sar-list-item>
    <sar-list-item>
      <sar-segmented v-model="textAlign" :options="textAlignOptions" />
    </sar-list-item>
    <sar-list-item>
      <sar-barcode
        value="123456789012"
        :display-value="displayValue"
        :text-position="textPosition"
        :text-align="textAlign"
        :font-style="italic ? 'italic' : 'normal'"
        :font-weight="bold ? 'bold' : 'normal'"
        font="Arial"
        :font-size="fontSize"
        :text-margin="textMargin"
      />
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type BarcodeTextPosition, type CanvasTextAlign } from 'sard-uniapp'

const textPositionOptions: BarcodeTextPosition[] = ['top', 'bottom']
const textAlignOptions: CanvasTextAlign[] = ['left', 'center', 'right']

const displayValue = ref(true)
const textPosition = ref<BarcodeTextPosition>('bottom')
const textAlign = ref<CanvasTextAlign>('center')

const bold = ref(false)
const italic = ref(false)
const fontSize = ref(18)
const textMargin = ref(5)
</script>
