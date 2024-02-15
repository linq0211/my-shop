<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="logo">
      <image class="image" src="@/static/images/logo.png"></image>
      <view class="title">新鲜 · 亲民 · 快捷</view>
    </view>
    <view class="search">
      <text class="icon-search">搜索商品</text>
      <text class="icon-scan"></text>
    </view>
  </view>
</template>

<script setup lang="ts">
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style scoped lang="scss">
.navbar {
  background-image: url('@/static/images/navigator_bg.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  .logo {
    display: flex;
    align-items: center;
    padding-left: 30rpx;
    padding-top: 20rpx;
    height: 64rpx;
    .image {
      width: 166rpx;
      height: 39rpx;
    }
    .title {
      flex: 1;
      color: #fff;
      font-size: 26rpx;
      border-left: 1rpx solid #fff;
      padding-left: 20rpx;
      line-height: 26rpx;
      margin-left: 20rpx;
    }
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10rpx 0 26rpx;
    margin: 20rpx;
    height: 64rpx;
    color: #fff;
    border-radius: 32rpx;
    background-color: rgba(255, 255, 255, 0.5);
    .icon-search {
      &::before {
        margin-right: 10rpx;
      }
    }
    .icon-scan {
      font-size: 30rpx;
      padding: 10rpx;
    }
  }
}
</style>
