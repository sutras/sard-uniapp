<template>
  <sar-list card>
    <sar-list-item title="上一步" @click="prevStep" arrow hover />
    <sar-list-item title="下一步" @click="nextStep" arrow hover />
    <sar-list-item>
      <sar-steps :current="current" direction="vertical">
        <sar-step v-for="(item, i) in itemList" :key="i" :index="i">
          <view style="display: flex; align-items: center">
            <view>
              <view>{{ item.name }}</view>
              <view
                style="
                  color: var(--sar-tertiary-color);
                  font-size: var(--sar-text-sm);
                "
              >
                {{ item.description }}
              </view>
            </view>
            <sar-button root-style="margin-left: auto" inline type="pale-text">
              操作
            </sar-button>
          </view>
        </sar-step>
      </sar-steps>
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(8)

const itemList = [
  { name: '步骤1', description: '这是描述' },
  { name: '步骤2', description: '这是描述' },
  { name: '步骤3', description: '这是描述' },
]

const prevStep = () => {
  current.value = current.value <= 0 ? itemList.length : current.value - 1
}

const nextStep = () => {
  current.value = current.value >= itemList.length ? 0 : current.value + 1
}
</script>
