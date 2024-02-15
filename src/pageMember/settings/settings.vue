<template>
  <view class="viewport">
    <view class="list" v-if="profile">
      <navigator url="/pageMember/address/address" hover-class="none" class="item arrow">
        我的收货地址
      </navigator>
    </view>

    <view class="list">
      <button hover-class="none" class="item arrow" open-type="openSetting">授权管理</button>
      <button hover-class="none" class="item arrow" open-type="feedback">问题反馈</button>
      <button hover-class="none" class="item arrow" open-type="contact">联系我们</button>
    </view>

    <view class="list">
      <navigator hover-class="none" class="item arrow" url=" ">关于小兔鲜儿</navigator>
    </view>

    <button class="button" @tap="onLoginOut" v-if="profile">退出登录</button>
  </view>
</template>

<script setup lang="ts">
import useMemberStore from '@/stores/modules/member'
import { storeToRefs } from 'pinia'

const memberStore = useMemberStore()
const { profile } = storeToRefs(memberStore)
const onLoginOut = () => {
  uni.showModal({
    content: '是否退出登录？',
    success: (res) => {
      if (res.confirm) {
        memberStore.clearProfile()
        uni.navigateBack()
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.viewport {
  height: 100vh;
  padding: 20rpx;
  background-color: #f4f4f4;
}

.list {
  padding: 0 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  .item {
    height: 90rpx;
    line-height: 90rpx;
    padding-left: 10rpx;
    font-size: 30rpx;
    color: #333;
    border-top: 1rpx solid #ddd;
    position: relative;
    text-align: left;
    background-color: #fff;
    &:first-child {
      border: none;
    }
  }
  .arrow::after {
    content: '\e6c2';
    font-family: 'erabbit' !important;
    width: auto;
    height: auto;
    position: absolute;
    left: auto;
    right: 5rpx;
    top: 50%;
    transform: translateY(-50%);
    color: #ccc;
    font-size: 30rpx;
  }
}

.button {
  margin-top: 40rpx;
  font-size: 32rpx;
  background-color: #fff;
  color: #333;
  border-radius: 10rpx;
}
</style>
