<template>
  <sar-list card>
    <sar-list-item title="当前类型" :value="type" />
    <sar-list-item title="当前值" :value="value || '暂无输入'" />
    <sar-list-item>
      <sar-segmented v-model="type" :options="types" />
    </sar-list-item>
    <sar-list-item title="打开键盘" arrow hover @click="visible = true" />
    <sar-keyboard-popout
      v-model:visible="visible"
      :title="`类型：${type}`"
      :type="type"
      @input="onInput"
      @delete="onDelete"
    >
      <view class="flex items-center justify-center text-center h-80">
        {{ value || '暂无输入' }}
      </view>
    </sar-keyboard-popout>
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const types = ['number', 'digit', 'idcard', 'random']
const type = ref<'number' | 'digit' | 'idcard' | 'random'>('number')
const visible = ref(false)
const value = ref('')

const onInput = (key: string) => {
  value.value += key
}

const onDelete = () => {
  value.value = value.value.slice(0, -1)
}
</script>
