<template>
  <view class="hot-mutli">
    <block v-for="item in hotData" :key="item.id">
      <view class="item">
        <view class="header">
          <text class="title">{{ item.title }}</text>
          <text class="alt">{{ item.alt }}</text>
        </view>
        <navigator class="content" :url="`/pages/hot/hot?type=${item.type}`" hover-class="none">
          <block v-for="src in item.pictures" :key="src">
            <image class="image" :src="src" />
          </block>
        </navigator>
      </view>
    </block>
  </view>
</template>

<script setup lang="ts">
import type { HotItem } from '@/types/home'
defineProps<{
  hotData: HotItem[]
}>()
</script>

<style scoped lang="scss">
.hot-mutli {
  min-height: 508rpx;
  display: flex;
  flex-wrap: wrap;
  margin: 20rpx 20rpx 0;
  .item {
    width: 347rpx;
    height: 250rpx;
    margin: 5rpx;
    border-radius: 12rpx;
    background-color: #fff;
    .header {
      display: flex;
      align-items: center;
      padding: 24rpx 24rpx 0;
      .title {
        font-size: 32rpx;
        color: #262626;
      }
      .alt {
        font-size: 24rpx;
        color: #7f7f7f;
        margin-left: 20rpx;
      }
    }
    .content {
      padding: 15rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .image {
        width: 150rpx;
        height: 150rpx;
      }
    }
  }
}
</style>
