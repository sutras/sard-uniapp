<template>
  <sar-list card>
    <sar-list-item style="padding: 1px 0 0 0">
      <sar-swipe-action>
        <sar-list-item title="右边插槽" value="内容" />
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

    <sar-list-item style="padding: 1px 0 0">
      <sar-swipe-action>
        <sar-list-item title="左边插槽" value="内容" />
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
      </sar-swipe-action>
    </sar-list-item>

    <sar-list-item style="padding: 1px 0 0">
      <sar-swipe-action>
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

<script setup lang="ts">
import { toast } from 'sard-uniapp'

const onClick = (content: string, hide: () => void) => {
  toast(`点击了${content}`)
  hide()
}
</script>
