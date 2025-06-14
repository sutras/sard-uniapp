<template>
  <sar-list card>
    <sar-list-item>
      <sar-picker
        v-model="value"
        :columns="columns"
        :option-keys="{ label: 'name', value: 'name' }"
        @change="onChange"
      >
        <template
          #custom="{
            columns,
            maskClass,
            pickerViewClass,
            indicatorClass,
            value,
            onChange,
          }"
        >
          <picker-view
            :class="pickerViewClass"
            :mask-class="maskClass"
            :indicator-class="indicatorClass"
            :value="value"
            @change="onChange"
          >
            <picker-view-column v-for="(column, i) in columns" :key="i">
              <sar-picker-item
                v-for="(option, j) in column"
                :key="j"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <sar-icon family="cake" :name="option.icon" />
                <text style="margin-left: 16rpx">
                  {{ option.name }}
                </text>
              </sar-picker-item>
            </picker-view-column>
          </picker-view>
        </template>
      </sar-picker>
    </sar-list-item>
    <sar-list-item
      title="当前值："
      :value="JSON.stringify(value) ?? 'undefined'"
    />
    <sar-list-item title="设置为: 泡芙" arrow hover @click="value = '泡芙'" />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getPrizes } from '../../lucky-draw/demo/utils'

const columns = getPrizes()

const value = ref<string | undefined>('布丁')

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
