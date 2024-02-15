<template>
  <view class="swiper-view">
    <swiper
      class="swiper"
      circular
      autoplay
      indicator-dots
      indicator-color="rgba(255, 255, 255, 0.4)"
      indicator-active-color="#fff"
      :interval="3000"
    >
      <block v-for="item in bannerData" :key="item.id">
        <swiper-item class="item">
          <navigator url="/pages/index/index" hover-class="none" class="navigator">
            <image mode="widthFix" class="image" :src="item.imgUrl"></image>
          </navigator>
        </swiper-item>
      </block>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import type { BannerItem } from '@/types/home.d'
defineProps<{
  bannerData: BannerItem[]
}>()
</script>

<style scoped lang="scss">
.swiper-view {
  width: 100%;
  height: 300rpx;
  .swiper {
    .item {
      .navigator,
      .image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
@/types @/types/home
