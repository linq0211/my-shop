<template>
  <view class="address-panel">
    <text class="close icon-close" @tap="onCloseTap"></text>
    <view class="title">配送至</view>
    <view class="content">
      <block v-for="(item, index) in addressList" :key="item.id">
        <view class="item" @tap="onChangeAddress(index)">
          <view class="user">{{ item.receiver }} {{ item.contact }}</view>
          <view class="address">{{ item.fullLocation }} {{ item.address }}</view>
          <text class="icon" :class="index === activeIndex ? 'icon-checked' : 'icon-ring'"></text>
        </view>
      </block>
    </view>
    <view class="footer">
      <view class="addAddress" @tap="onNewAddress"> 新建地址 </view>
      <view class="confirm" @tap="onConfirm">确定</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getMemberAddress } from '@/services/modules/address'
import type { AddressItem } from '@/types/address'
import { ref, onMounted } from 'vue'

const emit = defineEmits(['close', 'confirmAddress'])
const onCloseTap = () => {
  emit('close')
}
const addressList = ref<AddressItem[]>([])
const fetchAddressAction = async () => {
  const res = await getMemberAddress()
  addressList.value = res.result
}

const onNewAddress = () => {
  uni.navigateTo({
    url: '/pageMember/address-form/address-form'
  })
}
const onConfirm = () => {
  emit('confirmAddress', addressList.value[activeIndex.value])
  
}

const activeIndex = ref(0)
const onChangeAddress = (index: number) => {
  activeIndex.value = index
}

onMounted(() => {
  fetchAddressAction()
})
</script>

<style scoped lang="scss">
.address-panel {
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
    min-height: 300rpx;
    max-height: 540rpx;
    overflow: auto;
    padding: 20rpx;
    .item {
      position: relative;
      padding: 30rpx 60rpx;
      background-size: 30rpx;
      background-repeat: no-repeat;
      background-position: 0 center;
      background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
      .user {
        font-size: 32rpx;
        color: #444;
      }
      .address {
        font-size: 28rpx;
        color: #666;
      }
      .icon {
        font-size: 40rpx;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
      .icon-checked {
        color: #27ba9b;
      }
      .icon-ring {
        color: #444;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    padding: 20rpx 0 60rpx;
    font-size: 28rpx;
    color: #fff;

    .addAddress {
      flex: 1;
      height: 72rpx;
      text-align: center;
      line-height: 72rpx;
      margin: 0 20rpx;
      border-radius: 72rpx;
      background-color: #27ba9b;
    }
    .confirm {
      flex: 1;
      height: 72rpx;
      text-align: center;
      line-height: 72rpx;
      margin: 0 20rpx;
      border-radius: 72rpx;
      background-color: #ffa868;
    }
  }
}
</style>
