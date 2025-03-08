<template>
  <doc-page title="方向与对齐">
    <doc-demo>
      <doc-title>排列方向</doc-title>
      <sar-radio-group v-model="direction" direction="horizontal">
        <sar-radio value="vertical">vertical</sar-radio>
        <sar-radio value="horizontal">horizontal</sar-radio>
      </sar-radio-group>

      <doc-title>水平对齐</doc-title>
      <sar-radio-group v-model="labelAlign" direction="horizontal">
        <sar-radio value="start">start</sar-radio>
        <sar-radio value="center">center</sar-radio>
        <sar-radio value="end">end</sar-radio>
      </sar-radio-group>

      <doc-title>垂直对齐</doc-title>
      <sar-radio-group v-model="labelValign" direction="horizontal">
        <sar-radio value="start">start</sar-radio>
        <sar-radio value="center">center</sar-radio>
        <sar-radio value="end">end</sar-radio>
      </sar-radio-group>

      <doc-title>星号位置</doc-title>
      <sar-radio-group v-model="starPosition" direction="horizontal">
        <sar-radio value="left">left</sar-radio>
        <sar-radio value="right">right</sar-radio>
      </sar-radio-group>
    </doc-demo>

    <doc-demo>
      <sar-form
        label-width="200rpx"
        :direction="direction"
        :label-align="labelAlign"
        :label-valign="labelValign"
        :star-position="starPosition"
        :model="formLabelAlign"
        card
      >
        <sar-form-item label="Name" required>
          <sar-input v-model="formLabelAlign.name" />
        </sar-form-item>
        <sar-form-item label="Activity zone" required>
          <sar-input v-model="formLabelAlign.region" />
        </sar-form-item>
        <sar-form-item label="Activity form" required>
          <sar-input v-model="formLabelAlign.type" type="textarea" />
        </sar-form-item>
      </sar-form>
    </doc-demo>
  </doc-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const labelAlign = ref<any>('start')
const labelValign = ref<any>('center')
const direction = ref<any>('horizontal')
const starPosition = ref<any>('left')

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})
</script>
