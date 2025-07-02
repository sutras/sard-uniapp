<template>
  <sar-sticky-box
    style="
      display: flex;
      align-items: flex-end;
      height: 400rpx;
      background: var(--sar-emphasis-bg);
    "
  >
    <sar-sticky :offset-bottom="40" style="margin-left: 300rpx">
      <sar-button inline background="var(--sar-indigo)">
        容器中的吸底
      </sar-button>
    </sar-sticky>
  </sar-sticky-box>
</template>
