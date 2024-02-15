<template>
  <view class="guess-like">
    <view class="title">
      <text class="text">猜你喜欢</text>
    </view>
    <view class="content">
      <block v-for="item in guessList" :key="item.id">
        <navigator class="item" :url="`/pages/goods/goods?id=${item.id}`">
          <image class="image" :src="item.picture" />
          <view class="name ellipsis">{{ item.name }}</view>
          <view class="price">
            <text class="small">￥</text>
            <text>{{ item.price }}</text>
          </view>
        </navigator>
      </block>
    </view>
    <view class="bottom">
      {{ noMoreData ? '没有更多数据了~' : '上拉加载更多~' }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { PageParams } from '@/types/home'
import { getHomeGuessLike } from '@/services/modules/home'
import type { GoodsItem } from '@/types/global'

const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10
}
const noMoreData = ref(false)
const guessList = ref<GoodsItem[]>([])
const resetData = () => {
  pageParams.page = 1
  guessList.value = []
  noMoreData.value = false
}
const getMore = async () => {
  if (noMoreData.value) {
    return uni.showToast({
      icon: 'none',
      title: '没有更多数据了~'
    })
  }
  const res = await getHomeGuessLike(pageParams)
  guessList.value.push(...res.result.items)
  if (pageParams.page < res.result.pages) {
    pageParams.page++
  } else {
    noMoreData.value = true
  }
}

onMounted(() => {
  getMore()
})
defineExpose({
  getMore,
  resetData
})
</script>

<style scoped lang="scss">
.guess-like {
  .title {
    display: flex;
    justify-content: center;
    padding: 32rpx 0 40rpx;
    font-size: 30rpx;
    color: #262626;
    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      &::after,
      &::before {
        content: '';
        width: 20rpx;
        height: 20rpx;
        background-image: url(@/static/images/bubble.png);
        background-size: cover;
        margin: 0 15rpx;
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 20rpx;
    .item {
      width: 347rpx;
      padding: 20rpx;
      margin-bottom: 20rpx;
      border-radius: 12rpx;
      overflow: hidden;
      background-color: #fff;
      .image {
        width: 304rpx;
        height: 304rpx;
      }
      .name {
        height: 75rpx;
        font-size: 26rpx;
        color: #262626;
        margin: 8rpx 0;
      }
      .price {
        color: #cf4444;
        font-size: 26rpx;
        .small {
          font-size: 20rpx;
        }
      }
    }
  }

  .bottom {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
  }
}
</style>
