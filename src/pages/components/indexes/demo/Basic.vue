<template>
  <sar-form :model="model" direction="vertical">
    <sar-form-item>
      <sar-input v-model="model.phone" inlaid placeholder="请输入手机号">
        <template #prepend>
          <sar-button
            type="pale-text"
            color="inherit"
            root-style="padding-left: 0"
            @click="toAreaCode"
          >
            +{{ model.areaCode }}
            <sar-icon
              name="caret-down"
              root-style="top: 4rpx; margin-left: 4rpx"
            />
          </sar-button>
        </template>
      </sar-input>
    </sar-form-item>
  </sar-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({
  areaCode: '86',
  phone: '',
})

const toAreaCode = () => {
  uni.navigateTo({
    url: `/pages/components/indexes/demo/AreaCode`,
    events: {
      selectAreaCode: (data: any) => {
        model.areaCode = data.code
      },
    },
  })
}
</script>
