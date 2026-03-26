<template>
  <sar-space direction="vertical">
    <sar-compact block>
      <sar-input placeholder="请输入" />
      <sar-input placeholder="请输入" />
    </sar-compact>
    <sar-compact block>
      <sar-input placeholder="请输入" style="width: 160rpx" />
      <sar-input placeholder="请输入" />
    </sar-compact>
    <sar-compact block>
      <sar-input placeholder="请输入" />
      <sar-button icon="pencil-square" class="flex-none" />
    </sar-compact>
    <sar-compact block>
      <sar-button class="flex-none">Button</sar-button>
      <sar-input placeholder="请输入" />
      <sar-input placeholder="请输入" />
    </sar-compact>
    <sar-compact block>
      <sar-button class="flex-none">Button</sar-button>
      <sar-input placeholder="请输入" />
      <sar-button class="flex-none">Button</sar-button>
      <sar-input placeholder="请输入" />
    </sar-compact>
    <sar-compact block>
      <sar-datetime-picker-input
        type="yM"
        :input-props="{ inlaid: false }"
        placeholder="请选择"
      >
        <template #arrow>
          <sar-icon name="down" />
        </template>
      </sar-datetime-picker-input>

      <sar-input placeholder="请输入" />

      <sar-datetime-picker-input
        type="yM"
        :input-props="{ inlaid: false }"
        placeholder="请选择"
      >
        <template #arrow>
          <sar-icon name="down" />
        </template>
      </sar-datetime-picker-input>
    </sar-compact>
  </sar-space>
</template>
