<template>
  <view class="viewport">
    <scroll-view class="scroll-view" scroll-y>
      <view v-if="true" class="address">
        <uni-swipe-action class="address-list">
          <block v-for="item in addressList" :key="item.id">
            <uni-swipe-action-item class="item">
              <view class="item-content" @tap="onChooseAddress(item)">
                <view class="user">
                  {{ item.receiver }}
                  <text class="contact">{{ item.contact }}</text>
                  <text v-if="item.isDefault === 1" class="badge">默认</text>
                </view>
                <view class="locate">{{ item.fullLocation }} {{ item.address }}</view>
                <navigator
                  class="edit"
                  hover-class="none"
                  :url="`/pageMember/address-form/address-form?id=${item.id}`"
                  @tap.stop="() => {}"
                >
                  <!-- 阻止事件冒泡 -->
                  修改
                </navigator>
              </view>
              <template #right>
                <button class="deletebtn" @tap="onDeleteTap(item.id)">删除</button>
              </template>
            </uni-swipe-action-item>
          </block>
        </uni-swipe-action>
      </view>
      <view v-else class="blank">暂无收货地址</view>
    </scroll-view>
    <view class="add-btn">
      <navigator hover-class="none" url="/pageMember/address-form/address-form">
        新建地址
      </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
import { deleteMemberAddress, getMemberAddress } from '@/services/modules/address'
import useAddressStore from '@/stores/modules/address'
import type { AddressItem } from '@/types/address'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

const addressList = ref<AddressItem[]>([])
const fetchAddressAction = async () => {
  const res = await getMemberAddress()
  addressList.value = res.result
}

const onDeleteTap = async (id: string) => {
  uni.showModal({
    title: '确认删除?',
    success: async (res) => {
      if (res.confirm) {
        await deleteMemberAddress(id)
        fetchAddressAction()
      }
    }
  })
}

const onChooseAddress = (item: AddressItem) => {
  const addressStore = useAddressStore()
  addressStore.changeAddressAction(item)
  uni.navigateBack()
}
onShow(() => {
  fetchAddressAction()
})
</script>

<style lang="scss" scoped>
.viewport {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f4f4f4;

  .scroll-view {
    padding-top: 10rpx;
  }
}

.address {
  padding: 0 20rpx;
  margin: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item-content {
    line-height: 1;
    padding: 40rpx 10rpx 38rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;

    .edit {
      position: absolute;
      top: 36rpx;
      right: 30rpx;
      padding: 2rpx 0 2rpx 20rpx;
      border-left: 1rpx solid #666;
      font-size: 26rpx;
      color: #666;
      line-height: 1;
    }
  }

  .item:last-child .item-content {
    border: none;
  }

  .user {
    font-size: 28rpx;
    margin-bottom: 20rpx;
    color: #333;

    .contact {
      color: #666;
    }

    .badge {
      display: inline-block;
      padding: 4rpx 10rpx 2rpx 14rpx;
      margin: 2rpx 0 0 10rpx;
      font-size: 26rpx;
      color: #27ba9b;
      border-radius: 6rpx;
      border: 1rpx solid #27ba9b;
    }
  }

  .locate {
    line-height: 1.6;
    font-size: 26rpx;
    color: #333;
  }
}

.blank {
  margin-top: 300rpx;
  text-align: center;
  font-size: 32rpx;
  color: #888;
}

.add-btn {
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
.deletebtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
  font-size: 28rpx;
  color: #fff;
  border-radius: 0;
  padding: 0;
  background-color: #cf4444;
}
</style>
