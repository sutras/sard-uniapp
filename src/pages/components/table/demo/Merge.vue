<template>
  <sar-table bordered>
    <sar-table-row>
      <sar-table-cell width="360rpx">
        <sar-table-row>
          <sar-table-cell width="80rpx">
            <view class="cell cell-label">姓名</view>
          </sar-table-cell>
          <sar-table-cell width="100rpx">
            <view class="cell">张三</view>
          </sar-table-cell>
          <sar-table-cell width="80rpx">
            <view class="cell cell-label">性别</view>
          </sar-table-cell>
          <sar-table-cell width="100rpx">
            <view class="cell">男</view>
          </sar-table-cell>
        </sar-table-row>
        <sar-table-row>
          <sar-table-cell width="80rpx">
            <view class="cell cell-label">民族</view>
          </sar-table-cell>
          <sar-table-cell width="100rpx">
            <view class="cell">汉</view>
          </sar-table-cell>
          <sar-table-cell width="80rpx">
            <view class="cell cell-label">电话</view>
          </sar-table-cell>
          <sar-table-cell width="100rpx">
            <view class="cell">138***</view>
          </sar-table-cell>
        </sar-table-row>
        <sar-table-row>
          <sar-table-cell width="80rpx">
            <view class="cell cell-label">职称</view>
          </sar-table-cell>
          <sar-table-cell width="280rpx">
            <view class="cell">自媒体运营</view>
          </sar-table-cell>
        </sar-table-row>
      </sar-table-cell>
      <sar-table-cell width="100rpx">
        <view class="cell">照片</view>
      </sar-table-cell>
    </sar-table-row>

    <sar-table-row>
      <sar-table-cell width="80rpx">
        <view class="cell cell-label">个人亮点</view>
      </sar-table-cell>
      <sar-table-cell width="380rpx">
        <view class="cell">
          擅长结合热点事件与受众兴趣，创作出具有病毒式传播潜力的内容，多次策划的内容在社交媒体上获得百万级阅读量。
        </view>
      </sar-table-cell>
    </sar-table-row>
  </sar-table>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.cell {
  flex: 1;
  padding: 12rpx 16rpx;
}
.cell-label {
  background-color: var(--sar-secondary-bg);
}
</style>
