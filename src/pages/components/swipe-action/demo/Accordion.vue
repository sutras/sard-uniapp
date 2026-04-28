<template>
  <sar-swipe-action-group ref="groupRef">
    <sar-list card>
      <sar-list-item>
        <sar-button size="small" @click="groupRef?.closeAll()">
          关闭全部
        </sar-button>
      </sar-list-item>

      <sar-list-item style="padding: 1px 0 0 0">
        <sar-swipe-action>
          <sar-list-item title="消息提醒" value="向左滑动" />
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
          </template>
        </sar-swipe-action>
      </sar-list-item>

      <sar-list-item style="padding: 1px 0 0 0">
        <sar-swipe-action>
          <sar-list-item title="订单通知" value="只会展开一个" />
          <template #right="{ hide }">
            <sar-button
              theme="warning"
              square
              inline
              style="height: 100%"
              @click="onClick('标记已读', hide)"
            >
              已读
            </sar-button>
            <sar-button
              theme="danger"
              square
              inline
              style="height: 100%"
              @click="onClick('删除', hide)"
            >
              删除
            </sar-button>
          </template>
        </sar-swipe-action>
      </sar-list-item>

      <sar-list-item style="padding: 1px 0 0 0">
        <sar-swipe-action>
          <sar-list-item title="系统公告" value="打开其他项会自动关闭当前项" />
          <template #right="{ hide }">
            <sar-button
              theme="primary"
              square
              inline
              style="height: 100%"
              @click="onClick('查看', hide)"
            >
              查看
            </sar-button>
          </template>
        </sar-swipe-action>
      </sar-list-item>
    </sar-list>
  </sar-swipe-action-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'sard-uniapp'
import type SwipeActionGroup from 'sard-uniapp/components/swipe-action-group/swipe-action-group.vue'

const groupRef = ref<InstanceType<typeof SwipeActionGroup>>()

const onClick = (content: string, hide: () => void) => {
  toast(`点击了${content}`)
  hide()
}
</script>
