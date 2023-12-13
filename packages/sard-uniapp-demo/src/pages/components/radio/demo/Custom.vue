<template>
  <sar-radio-group v-model="value">
    <template #custom="{ toggle }">
      <sar-list card>
        <sar-list-item
          v-for="(option, i) in options"
          :key="i"
          :title="option.label"
          hover
          @click="toggle(option.value)"
        >
          <template #icon>
            <sar-radio readonly :value="option.value" />
          </template>
        </sar-list-item>
      </sar-list>
    </template>
  </sar-radio-group>

  <sar-radio-group v-model="value" root-style="margin-top: 40rpx">
    <template #custom="{ toggle }">
      <sar-list card>
        <sar-list-item
          v-for="(option, i) in options"
          :key="i"
          :title="option.label"
          hover
          @click="toggle(option.value)"
        >
          <template #value>
            <sar-radio readonly :value="option.value">
              <template #icon="{ checked }">
                <sar-icon
                  v-if="checked"
                  color="var(--sar-red)"
                  size="32rpx"
                  name="success"
                />
              </template>
            </sar-radio>
          </template>
        </sar-list-item>
      </sar-list>
    </template>
  </sar-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('option2')

const options = [
  {
    value: 'option1',
    label: '选项1',
  },
  {
    value: 'option2',
    label: '选项2',
  },
  {
    value: 'option3',
    label: '选项3',
  },
]
</script>
