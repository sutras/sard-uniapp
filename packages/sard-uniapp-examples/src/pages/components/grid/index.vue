<template>
  <doc-page>
    <doc-demo title="基础使用">
      <sar-row>
        <sar-col>
          <view class="grid-box">span</view>
        </sar-col>
        <sar-col>
          <view class="grid-box">span</view>
        </sar-col>
      </sar-row>
      <sar-row>
        <sar-col :span="4">
          <view class="grid-box">span-4</view>
        </sar-col>
        <sar-col :span="8">
          <view class="grid-box">span-8</view>
        </sar-col>
      </sar-row>
      <sar-row>
        <sar-col :span="3">
          <view class="grid-box">span-3</view>
        </sar-col>
        <sar-col>
          <view class="grid-box">span</view>
        </sar-col>
        <sar-col span="auto">
          <view class="grid-box">auto</view>
        </sar-col>
      </sar-row>
    </doc-demo>

    <doc-demo title="列偏移">
      <sar-row>
        <sar-col>
          <view class="grid-box">span</view>
        </sar-col>
        <sar-col :offset="3">
          <view class="grid-box">offset-3</view>
        </sar-col>
      </sar-row>
    </doc-demo>

    <doc-demo title="水平对齐">
      <sar-row justify="start">
        <sar-col :span="3">
          <view class="grid-box">span-3</view>
        </sar-col>
        <sar-col :span="3">
          <view class="grid-box">span-3</view>
        </sar-col>
      </sar-row>
      <sar-row justify="center">
        <sar-col :span="3">
          <view class="grid-box">span-3</view>
        </sar-col>
        <sar-col :span="3">
          <view class="grid-box">span-3</view>
        </sar-col>
      </sar-row>
      <sar-row justify="end">
        <sar-col :span="3">
          <view class="grid-box">span-3</view>
        </sar-col>
        <sar-col :span="3">
          <view class="grid-box">span-3</view>
        </sar-col>
      </sar-row>
    </doc-demo>

    <doc-demo title="垂直对齐">
      <view class="grid-align">
        <sar-row align="start">
          <sar-col>
            <view class="grid-box">span-3</view>
          </sar-col>
          <sar-col>
            <view class="grid-box">span-3</view>
          </sar-col>
        </sar-row>
        <sar-row align="center">
          <sar-col>
            <view class="grid-box">span-3</view>
          </sar-col>
          <sar-col>
            <view class="grid-box">span-3</view>
          </sar-col>
        </sar-row>
        <sar-row align="end">
          <sar-col>
            <view class="grid-box">span-3</view>
          </sar-col>
          <sar-col>
            <view class="grid-box">span-3</view>
          </sar-col>
        </sar-row>
      </view>
    </doc-demo>

    <doc-demo title="列间距">
      <sar-row :gutter="30">
        <sar-col>
          <view class="grid-box">span-3</view>
        </sar-col>
        <sar-col>
          <view class="grid-box">span-3</view>
        </sar-col>
      </sar-row>
    </doc-demo>

    <doc-demo title="列顺序">
      <sar-row>
        <sar-col>
          <view class="grid-box">col1</view>
        </sar-col>
        <sar-col :order="-1">
          <view class="grid-box">col2 order:-1</view>
        </sar-col>
      </sar-row>
      <sar-row>
        <sar-col :order="2">
          <view class="grid-box">col1 order:2</view>
        </sar-col>
        <sar-col :order="1">
          <view class="grid-box">col2 order:1</view>
        </sar-col>
        <sar-col>
          <view class="grid-box">col3</view>
        </sar-col>
      </sar-row>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.sar-row {
  margin-bottom: 10px;
}
.grid-align .sar-col:nth-child(1) .grid-box {
  height: 30px;
}
.grid-align .sar-col:nth-child(2) .grid-box {
  height: 60px;
}
.grid-align .sar-col:nth-child(3) .grid-box {
  height: 90px;
}
.grid-box {
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.1);
}
.sar-col:nth-child(2n) .grid-box {
  background-color: rgba(0, 0, 0, 0.15);
}
</style>
