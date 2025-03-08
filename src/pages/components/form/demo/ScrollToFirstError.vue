<template>
  <doc-page title="滚动到第一个错误字段">
    <sar-form
      :model="formState"
      ref="formRef"
      scroll-to-first-error
      :scroll-into-view-options="{
        startOffset: 50,
        endOffset: footerHeight,
        position,
      }"
    >
      <sar-form-item
        v-for="(item, i) in formState"
        :key="item.key"
        :name="[i, 'value']"
        :label="item.label"
        required
      >
        <sar-input type="textarea" min-height="300rpx" v-model="item.value" />
      </sar-form-item>
    </sar-form>

    <view style="height: 160rpx"></view>
    <view class="footer">
      <sar-row gap="20rpx">
        <sar-col>
          <sar-button @click="onSubmit">Submit</sar-button>
        </sar-col>
        <sar-col>
          <sar-button type="outline" @click="onReset">reset</sar-button>
        </sar-col>
      </sar-row>
      <view style="padding: 20rpx 0">
        <sar-radio-group v-model="position" direction="horizontal">
          <sar-radio value="start">start</sar-radio>
          <sar-radio value="center">center</sar-radio>
          <sar-radio value="end">end</sar-radio>
          <sar-radio value="nearest">nearest</sar-radio>
        </sar-radio-group>
      </view>
    </view>
  </doc-page>
</template>

<script lang="ts" setup>
import { ref, toRaw, getCurrentInstance } from 'vue'
import {
  toast,
  type FormExpose,
  type ScrollIntoViewPosition,
  type FieldValidateError,
} from 'sard-uniapp'
import { onMounted } from 'vue'

const formState = ref(
  Array(10)
    .fill(0)
    .map((_, i) => {
      return {
        label: 'Item' + i,
        name: 'item' + i,
        value: '',
        key: i,
      }
    }),
)

const formRef = ref<FormExpose>()

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('success')
      console.log('formState: ', toRaw(formState))
    })
    .catch((error: FieldValidateError[]) => {
      console.log('Validate Failed:', error)
    })
}

const onReset = () => {
  formRef.value?.reset()
}

const position = ref<ScrollIntoViewPosition>('nearest')

const footerHeight = ref(0)
const instance = getCurrentInstance()

onMounted(() => {
  uni
    .createSelectorQuery()
    .in(instance)
    .select('.footer')
    .boundingClientRect((result: any) => {
      footerHeight.value = result.height
    })
    .exec()
})
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  padding: 20rpx 32rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  border-top: 1px var(--sar-border-color) solid;
  background: var(--sar-emphasis-bg);
}
</style>
