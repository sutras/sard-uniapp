<template>
  <sar-form :model="model" direction="vertical">
    <sar-form-item>
      <sar-input v-model="model.phone" inlaid placeholder="请输入手机号">
        <template #prepend>
          <sar-button
            type="pale-text"
            color="inherit"
            root-style="padding-left: 0"
            @click="areaVisible = true"
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

  <AreaCode v-model:visible="areaVisible" @select="onSelect" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import AreaCode from './AreaCode.vue'

const model = reactive({
  areaCode: '86',
  phone: '',
})

const areaVisible = ref(false)

const onSelect = (code: string) => {
  model.areaCode = code
}
</script>
