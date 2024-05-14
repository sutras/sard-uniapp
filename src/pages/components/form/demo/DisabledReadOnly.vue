<template>
  <doc-page>
    <sar-list>
      <sar-list-item title="只读">
        <template #value>
          <sar-switch v-model="formReadonly" />
        </template>
      </sar-list-item>
      <sar-list-item title="禁用">
        <template #value>
          <sar-switch v-model="formDisabled" />
        </template>
      </sar-list-item>
    </sar-list>

    <sar-form
      :disabled="formDisabled"
      :readonly="formReadonly"
      label-width="200rpx"
    >
      <sar-form-item label="Checkbox">
        <sar-checkbox-group v-model="checkboxValue">
          <sar-checkbox value="apple">Apple</sar-checkbox>
          <sar-checkbox value="pear">Pear</sar-checkbox>
        </sar-checkbox-group>
      </sar-form-item>
      <sar-form-item label="Radio">
        <sar-radio-group v-model="radioValue">
          <sar-radio value="apple">Apple</sar-radio>
          <sar-radio value="pear">Pear</sar-radio>
        </sar-radio-group>
      </sar-form-item>
      <sar-form-item label="Input">
        <sar-input />
      </sar-form-item>
      <sar-form-item label="Picker">
        <sar-picker-input
          placeholder="Picker"
          :columns="[
            {
              label: 'Demo',
              value: 'demo',
            },
          ]"
        />
      </sar-form-item>
      <sar-form-item label="Cascader">
        <sar-cascader-input placeholder="Cascader" :options="options" />
      </sar-form-item>
      <sar-form-item label="DatetimePicker">
        <sar-datetime-picker-input placeholder="DatetimePicker" />
      </sar-form-item>
      <sar-form-item label="Calendar">
        <sar-calendar-input placeholder="Calendar" type="range" />
      </sar-form-item>
      <sar-form-item label="Stepper">
        <sar-stepper />
      </sar-form-item>
      <sar-form-item label="Input[Textarea]">
        <sar-input type="textarea" />
      </sar-form-item>
      <sar-form-item label="PasswordInput">
        <sar-password-input
          gap="0"
          model-value="123"
          root-style="height: 80rpx"
        />
      </sar-form-item>
      <sar-form-item label="Switch">
        <sar-switch :model-value="true" />
      </sar-form-item>
      <sar-form-item label="Rate">
        <sar-rate :model-value="3" />
      </sar-form-item>
      <sar-form-item label="Slider">
        <sar-slider :model-value="50" />
      </sar-form-item>
      <sar-form-item label="Upload">
        <sar-upload />
      </sar-form-item>
      <sar-form-item label="Button">
        <sar-button>Button</sar-button>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'

const formDisabled = ref(true)
const formReadonly = ref(false)

const checkboxValue = ref(['apple'])
const radioValue = ref('apple')
const options = reactive([
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
      },
    ],
  },
])
</script>
