<template>
  <sar-card
    root-style="
      --sar-card-bg: var(--sar-danger);
      --sar-card-border-color: white;
      --sar-card-active-bg: rgba(var(--sar-danger-rgb), 0.9);
      --sar-card-footer-border-style: dashed;
      --sar-card-border-width: 2px;
      color: white;
    "
    hover
    title="Trumpet to the Son of Heaven"
    footer="Wang Pan is known as the champion of Nanqu. Ming Dynasty Sanqu writer, painter, also known as medicine."
  >
    Trumpet, suona, small song, large cavity. The official ships are in chaos,
    all because of your bid. The army listened to the army, and the people
    listened to the people. Where to tell what is true and what is false? The
    sight blows over this house, blows the other one, only blows the water all
    the geese fly!
  </sar-card>

  <sar-card
    class="mt-30"
    style="--sar-card-border-left: 96rpx; --sar-card-border-right: 32rpx"
    hover
  >
    <template #title>
      <view class="flex">
        <view class="w-64 text-primary">
          <sar-icon name="pencil-square" size="36rpx" />
        </view>
        <view>
          <view class="font-bold">
            <text>实施安装工单</text>
            <text class="ml-10">GB20250627</text>
          </view>
          <view class="text-primary text-sm mt-10">待评价</view>
        </view>
      </view>
    </template>

    <view class="flex ml-64">
      <view class="flex flex-col gap-10">
        <view class="flex">
          <view class="stext-tertiary w-140">机构</view>
          <view>广州天河妇幼保健院</view>
        </view>
        <view class="flex">
          <view class="stext-tertiary w-140">创建时间</view>
          <view>2025-06-27 22:25:46</view>
        </view>
        <view class="flex">
          <view class="stext-tertiary w-140">负责人</view>
          <view>张三</view>
        </view>
      </view>
    </view>
  </sar-card>
</template>
