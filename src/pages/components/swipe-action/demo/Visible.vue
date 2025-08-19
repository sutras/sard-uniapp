<template>
  <sar-list card>
    <sar-list-item>
      <sar-segmented v-model="visible" :options="options" />
    </sar-list-item>

    <sar-list-item style="padding: 1px 0 0 0">
      <sar-swipe-action v-model:visible="visible">
        <sar-list-item title="两边插槽" value="内容" />
        <template #left="{ hide }">
          <sar-button
            theme="danger"
            square
            inline
            style="height: 100%"
            @click="onClick('点赞', hide)"
          >
            点赞
          </sar-button>
          <sar-button
            theme="primary"
            square
            inline
            style="height: 100%"
            @click="onClick('分享', hide)"
          >
            分享
          </sar-button>
          <sar-button
            theme="warning"
            square
            inline
            style="height: 100%"
            @click="onClick('收藏', hide)"
          >
            收藏
          </sar-button>
        </template>
        <template #right="{ hide }">
          <sar-button
            theme="danger"
            square
            inline
            style="height: 100%"
            @click="onClick('删除', hide)"
          >
            删除
          </sar-button>
          <sar-button
            theme="primary"
            square
            inline
            style="height: 100%"
            @click="onClick('取消', hide)"
          >
            取消
          </sar-button>
        </template>
      </sar-swipe-action>
    </sar-list-item>
  </sar-list>
</template>

<script lang="ts" setup>
import { type SwipeActionVisible, toast } from 'sard-uniapp'
import { ref } from 'vue'

const visible = ref<SwipeActionVisible>(false)

const options = [
  { label: 'left', value: 'left' },
  { label: 'false', value: false },
  { label: 'right', value: 'right' },
]

const onClick = (content: string, hide: () => void) => {
  toast(`点击了${content}`)
  hide()
}
</script>
