<template>
  <view class="service">
    <text class="close icon-close" @tap="onCloseTap"></text>
    <view class="title">服务说明</view>
    <view class="content">
      <view class="item">
        <view class="header">无忧退货</view>
        <view class="info">
          自收到商品之日起30天内，可在线申请无忧退货服务（食品等特殊商品除外）
        </view>
      </view>
      <view class="item">
        <view class="header">快速退款</view>
        <view class="info">
          收到退货包裹并确认无误后，将在48小时内办理退款，
          退款将原路返回，不同银行处理时间不同，预计1-5个工作日到账
        </view>
      </view>
      <view class="item">
        <view class="header">满88元免邮费</view>
        <view class="info">
          单笔订单金额(不含运费)满88元可免邮费，不满88元， 单笔订单收取10元邮费
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
const onCloseTap = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.service {
  position: relative;
  padding: 0 30rpx;
  background-color: #fff;
  .close {
    position: absolute;
    right: 24rpx;
    top: 24rpx;
  }
  .title {
    text-align: center;
    font-size: 32rpx;
    padding: 40rpx 0;
    border-bottom: 1rpx solid #ddd;
    color: #444;
  }
  .content {
    padding: 30rpx 20rpx 100rpx;
    .item {
      margin: 30rpx 0;
      .header {
        font-size: 28rpx;
        color: #333;
        margin-bottom: 10rpx;
      }
      .info {
        font-size: 26rpx;
        color: #999;
      }
    }
  }
}
</style>
