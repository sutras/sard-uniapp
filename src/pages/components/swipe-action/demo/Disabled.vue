<template>
  <sar-list card>
    <sar-list-item style="padding: 1px 0 0 0">
      <sar-swipe-action disabled>
        <sar-list-item title="两边插槽" value="内容" />
        <template #right>
          <sar-button
            theme="danger"
            square
            inline
            style="height: 100%"
            @click="onClick('删除')"
          >
            删除
          </sar-button>
          <sar-button
            theme="primary"
            square
            inline
            style="height: 100%"
            @click="onClick('取消')"
          >
            取消
          </sar-button>
        </template>
      </sar-swipe-action>
    </sar-list-item>

    <sar-list-item style="padding: 1px 0 0 0">
      <sar-swipe-action disabled visible="right">
        <sar-list-item title="两边插槽" value="内容" />
        <template #right>
          <sar-button
            theme="danger"
            square
            inline
            style="height: 100%"
            @click="onClick('删除')"
          >
            删除
          </sar-button>
          <sar-button
            theme="primary"
            square
            inline
            style="height: 100%"
            @click="onClick('取消')"
          >
            取消
          </sar-button>
        </template>
      </sar-swipe-action>
    </sar-list-item>
  </sar-list>
</template>

<script lang="ts" setup>
import { toast } from 'sard-uniapp'

const onClick = (content: string) => {
  toast(`点击了${content}`)
}
</script>
