<template>
  <template v-if="isLoading">
    <view class="category">
      <view class="search">
        <view class="input">
          <text class="icon-search">女靴</text>
        </view>
      </view>

      <view class="content">
        <scroll-view class="firstCate" scroll-y>
          <block v-for="(item, index) in categoryTop" :key="item.id">
            <view
              class="item"
              :class="{ active: index === activeIndex }"
              @tap="activeIndex = index"
            >
              <text> {{ item.name }} </text>
            </view>
          </block>
        </scroll-view>

        <scroll-view class="secondCate" scroll-y>
          <view class="banner">
            <swiper-view :bannerData="bannerResult" />
          </view>
          <view class="panel" v-for="item in categoryChildren" :key="item.id">
            <view class="header">
              <text class="name">{{ item.name }}</text>
              <navigator class="more" hover-class="none">全部</navigator>
            </view>
            <view class="content">
              <block v-for="goods in item.goods" :key="goods">
                <navigator
                  class="item"
                  hover-class="none"
                  :url="`/pages/goods/goods?id=${goods.id}`"
                >
                  <image class="image" :src="goods.picture" />
                  <view class="name ellipsis">{{ goods.name }}</view>
                  <view class="price">
                    <text class="small">¥</text>
                    <text>{{ goods.price }}</text>
                  </view>
                </navigator>
              </block>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </template>
  <template v-else>
    <category-skeleton />
  </template>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getHomeBanner } from '@/services/modules/home'
import { getCategoryTop } from '@/services/modules/category'
import type { BannerItem } from '@/types/home'
import type { CategoryTopItem } from '@/types/category'

import SwiperView from '@/components/swiper-view/swiper-view.vue'
import categorySkeleton from './cpns/category-skeleton.vue'

const bannerResult = ref<BannerItem[]>([])
const categoryTop = ref<CategoryTopItem[]>([])
const fetchBannerAction = async () => {
  const res = await getHomeBanner(2)
  bannerResult.value = res.result
}
const fetchCategoryAction = async () => {
  const res = await getCategoryTop()
  categoryTop.value = res.result
}

const isLoading = ref(false)
const activeIndex = ref(0)
const categoryChildren = computed(() => {
  return categoryTop.value[activeIndex.value]?.children || []
})

onLoad(() => {
  fetchBannerAction()
  fetchCategoryAction()
  isLoading.value = true
})
</script>

<style scoped lang="scss">
.category {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .search {
    padding: 20rpx 30rpx;
    background-color: #fff;
    .input {
      height: 64rpx;
      display: flex;
      align-items: center;
      background-color: #f3f4f4;
      border-radius: 32rpx;
      font-size: 28rpx;
      color: #8b8b8b;
      padding-left: 24rpx;
      .icon-search {
        &::before {
          margin-right: 10rpx;
        }
      }
    }
  }
  .content {
    flex: 1;
    min-height: 400rpx;
    display: flex;
    .firstCate {
      width: 180rpx;
      // 元素会根据自身宽高来设置尺寸。它是完全非弹性的：既不会缩短，也不会伸长来适应 flex 容器。相当于将属性设置为"flex: 0 0 auto"
      flex: none;
      background-color: #f6f6f6;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 90rpx;
        font-size: 28rpx;
        color: #595c63;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 42rpx;
          bottom: 0;
          width: 96rpx;
          border-top: 1rpx solid #e3e4e7;
        }
        &.item:last-child::after {
          display: none;
        }
      }
      .active {
        &::before {
          content: '';
          position: absolute;
          height: 100%;
          width: 8rpx;
          left: 0;
          background-color: #27ba9b;
        }
      }
    }
    .secondCate {
      background-color: #fff;
      margin: 0 30rpx;
      .banner {
        height: 200rpx;
        margin-bottom: 20rpx;
      }
      .panel {
        .header {
          height: 60rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1rpx solid #f7f7f8;
          .name {
            color: #333;
            font-size: 28rpx;
          }
          .more {
            font-size: 24rpx;
            color: #999;
            &::after {
              font-family: 'erabbit' !important;
              content: '\e6c2';
            }
          }
        }
        .content {
          width: 100%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          padding: 20rpx 0;
          .item {
            width: 150rpx;
            margin-right: 30rpx;
            margin-bottom: 20rpx;
            &:nth-child(3n) {
              margin-right: 0;
            }
            .image {
              width: 120rpx;
              height: 120rpx;
            }
            .name {
              padding: 5rpx;
              font-size: 24rpx;
              color: #333;
              margin: 5rpx 0;
            }
            .price {
              font-size: 28rpx;
              color: #cf4444;
              .small {
                font-size: 24rpx;
              }
            }
          }
        }
      }
    }
  }
}
</style>
