<template>
  <view
    style="display: flex; flex-direction: row; align-items: center; gap: 20rpx"
  >
    <sar-input
      type="text"
      :model-value="modelValue.number"
      @update:model-value="onNumberChange"
      :validate-event="false"
    />
    <sar-picker-input
      :model-value="modelValue.currency"
      :columns="[
        { value: 'rmb', label: 'RMB' },
        { value: 'dollar', label: 'Dollar' },
      ]"
      @update:model-value="onCurrencyChange"
      :validate-event="false"
    />
  </view>
</template>

<script setup lang="ts">
import { useFormItemContext, type FormItemContext } from '@sard/uniapp'

export type Currency = 'rmb' | 'dollar'

interface PriceValue {
  number: number
  currency: Currency
}

const props = defineProps<{
  modelValue: PriceValue
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: PriceValue): void
}>()

const formItemContext = useFormItemContext() as FormItemContext

const triggerChange = (changedValue: {
  number?: number
  currency?: Currency
}) => {
  emit('update:model-value', { ...props.modelValue, ...changedValue })
  formItemContext.onChange()
}

const onNumberChange = (value: string) => {
  const newNumber = parseInt(value || '0', 10)
  triggerChange({ number: newNumber })
}

const onCurrencyChange = (newCurrency: Currency) => {
  triggerChange({ currency: newCurrency })
}
</script>
