<template>
  <sar-button @click="onShowActionSheet1">默认id的ActionSheet</sar-button>
  <sar-button @click="onShowActionSheet2">自定义id的ActionSheet</sar-button>
  <sar-button @click="onHideActionSheet">隐藏ActionSheet</sar-button>
  <sar-button @click="onHideAll">隐藏所有</sar-button>

  <sar-action-sheet-agent />
  <sar-action-sheet-agent id="custom-sheet" />
</template>

<script setup lang="ts">
import { actionSheet, toast } from 'sard-uniapp'

const onShowActionSheet1 = () => {
  actionSheet({
    description: '使用默认id',
    itemList: [{ name: '选项1' }, { name: '选项2' }],
    showCancel: true,
    onSelect(item) {
      toast(item.name)
    },
  })
}

const onShowActionSheet2 = () => {
  actionSheet({
    id: 'custom-sheet',
    description: '使用自定义id',
    itemList: [{ name: '选项A' }, { name: '选项B' }],
    showCancel: true,
    onSelect(item) {
      toast(item.name)
    },
  })
}

const onHideActionSheet = () => {
  actionSheet.hide('custom-sheet')
}

const onHideAll = () => {
  actionSheet.hideAll()
}
</script>
