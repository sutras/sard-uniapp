<template>
  <sar-rate
    :model-value="2.5"
    allowHalf
    icon-family="demo-icons"
    void-icon="heart"
    icon="heart-fill"
  />
  <view>
    <sar-rate :model-value="2.5" allow-half disabled void-text="好" text="好" />
  </view>
</template>
