<template>
  <view class="disc">
    <view
      class="sectors"
      :style="{
        backgroundImage: repeatingConicGradient,
        transform: `rotate(${degrees}deg)`,
      }"
    >
      <view
        v-for="(prize, index) in prizes"
        :key="prize.id"
        class="sector"
        :class="{ 'sector-event': index % 2 === 0 }"
        :style="{
          transform: `rotate(${-index * sectorDegrees}deg)`,
        }"
      >
        <view class="sector-half">
          <view class="prize-icon">
            <sar-icon family="cake" :name="prize.icon" />
          </view>
          <view class="prize-name">{{ prize.name }}</view>
        </view>
      </view>
    </view>
    <view class="play-btn" @click="onPlay">
      <text>点我抽奖</text>
      <view class="play-btn-arrow"></view>
    </view>
  </view>

  <sar-dialog
    v-model:visible="dialogVisible"
    :show-cancel="false"
    confirm-text="收下"
  >
    <view v-if="winningPrize" class="dialog-prize">
      <view class="dialog-prize-icon">
        <sar-icon family="cake" :name="winningPrize.icon" />
      </view>
      <view class="dialog-prize-title">
        <text>恭喜你抽中</text>
        <text class="dialog-prize-name">“{{ winningPrize.name }}”</text>
      </view>
    </view>
  </sar-dialog>
</template>

<script setup lang="ts">
import { useLuckyWheel } from 'sard-uniapp'
import { computed, onMounted, ref } from 'vue'
import { getPrizesApi, getPrizeApi, type Prize } from './utils'

const prizes = ref<Prize[]>([])
const winningPrize = ref<Prize>()
const dialogVisible = ref(false)

const { degrees, sectorDegrees, play, stop, pause } = useLuckyWheel({
  count: computed(() => prizes.value.length),
  complete: (index) => {
    winningPrize.value = prizes.value[index]
    dialogVisible.value = true
  },
})

const repeatingConicGradient = computed(() => {
  const angle = sectorDegrees.value
  return (
    `repeating-conic-gradient(` +
    `var(--sector-bg) ${-angle / 2}deg, var(--sector-bg) ${angle / 2}deg,` +
    `transparent ${angle / 2 + 0.5}deg, transparent ${angle / 2 + angle}deg,` +
    `var(--sector-bg) ${angle / 2 + angle + 0.5}deg)`
  )
})

const onPlay = () => {
  play()
  getPrizeApi(8)
    .then((prize) => {
      stop(prizes.value.findIndex((item) => item.id === prize.id))
    })
    .catch(() => pause())
}

onMounted(() => {
  getPrizesApi(8).then((res) => {
    prizes.value = res
  })
})
</script>

<style lang="scss" scoped>
.disc {
  position: relative;
  box-sizing: border-box;
  width: 660rpx;
  height: 660rpx;
  margin: 0 auto;
  border: 10rpx solid #ffddcf;
  border-radius: 50%;
  overflow: hidden;
  --sector-bg: #fff0cb;
}
.sectors {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #fffbef;
}
.sector {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.sector-half {
  box-sizing: border-box;
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.prize-icon {
  margin-top: 20rpx;
  font-size: 72rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
}
.prize-name {
  margin-top: 20rpx;
  font-weight: 500;
  font-size: 22rpx;
  color: #eb7e50;
  line-height: 32rpx;
}
.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160rpx;
  height: 160rpx;
  border: 8rpx solid #fff;
  border-radius: 50%;
  font-weight: 500;
  color: #fff;
  background-color: #f02020;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.play-btn-arrow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%) scaleX(0.4);

  &::before {
    content: '';
    display: flex;
    width: 60rpx;
    height: 60rpx;
    background-color: #f02020;
    transform: rotate(45deg);
  }
}

.dialog-prize {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 60rpx 0;
}
.dialog-prize-icon {
  font-size: 160rpx;
  text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
}
.dialog-prize-title {
  margin-top: 32rpx;
  font-size: 32rpx;
  line-height: 32rpx;
}
.dialog-prize-name {
  color: #eb7e50;
  font-weight: 600;
}
</style>
