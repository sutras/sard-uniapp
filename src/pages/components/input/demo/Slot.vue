<template>
  <sar-input placeholder="请输入">
    <template #prepend>
      <sar-icon name="search" />
    </template>
  </sar-input>
  <sar-input placeholder="请输入" clearable>
    <template #append>
      <sar-button size="small">发送验证码</sar-button>
    </template>
  </sar-input>
</template>
