<template>
  <view class="category-mutli">
    <block v-for="(item, index) in categoryData" :key="item.id">
      <navigator class="item" url="/pages/index/index" hover-class="none">
        <image class="image" :src="item.icon" />
        <text class="text">{{ item.name }}</text>
      </navigator>
    </block>
  </view>
</template>

<script setup lang="ts">
import type { CategoryItem } from '@/types/home'
defineProps<{
  categoryData: CategoryItem[]
}>()
</script>

<style scoped lang="scss">
.category-mutli {
  display: flex;
  flex-wrap: wrap;
  padding: 10rpx 0;
  margin: 20rpx 0 0;
  min-height: 328rpx;
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150rpx;
    .image {
      width: 100rpx;
      height: 100rpx;
    }
    .text {
      font-size: 26rpx;
      color: #666;
    }
  }
}
</style>
