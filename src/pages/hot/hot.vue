<template>
  <view class="viewport">
    <view class="cover">
      <image :src="bannerPicture"></image>
    </view>
    <view class="tabs">
      <block v-for="(item, index) in subType" :key="item.id">
        <text class="text" :class="{ active: index === activeIndex }" @tap="activeIndex = index">
          {{ item.title }}
        </text>
      </block>
    </view>
    <block v-for="(item, index) in subType" :key="item.id">
      <scroll-view
        scroll-y
        class="scroll-view"
        v-show="activeIndex === index"
        @scrolltolower="onScrollTolower"
      >
        <view class="goods">
          <block v-for="goods in item.goodsItems.items" :key="goods.id">
            <navigator hover-class="none" class="item" :url="`/pages/goods/goods?id=${goods.id}`">
              <image class="image" :src="goods.picture"></image>
              <view class="name ellipsis">{{ goods.name }}</view>
              <view class="price">
                <text class="small">¥</text>
                <text>{{ goods.price }}</text>
              </view>
            </navigator>
          </block>
        </view>
        <view class="loading-text">{{ item.noMore ? '没有更多数据了~' : '上拉加载更多~' }}</view>
      </scroll-view>
    </block>
  </view>
</template>

<script setup lang="ts">
import { getHotRecommend } from '@/services/modules/hot'
import type { SubTypeItem } from '@/types/hot'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' }
]

const query = defineProps<{
  type: string
}>()
const currentHot = hotMap.find((i) => i.type === query.type)
uni.setNavigationBarTitle({ title: currentHot!.title })

const activeIndex = ref(0)
const bannerPicture = ref('')
const subType = ref<(SubTypeItem & { noMore?: boolean })[]>([])
const getRecommendData = async () => {
  const res = await getHotRecommend(currentHot!.url)
  bannerPicture.value = res.result.bannerPicture
  subType.value = res.result.subTypes
}
onLoad(() => {
  getRecommendData()
})

const onScrollTolower = async () => {
  const currsubType = subType.value[activeIndex.value]

  if (currsubType.goodsItems.page < currsubType.goodsItems.pages) {
    currsubType.goodsItems.page++
  } else {
    currsubType.noMore = true
    return uni.showToast({ icon: 'none', title: '没有更多数据了~' })
  }

  const res = await getHotRecommend(currentHot!.url, {
    subType: currsubType.id,
    page: currsubType.goodsItems.page,
    pageSize: currsubType.goodsItems.pageSize
  })
  const newsubTypes = res.result.subTypes[activeIndex.value]
  currsubType.goodsItems.items.push(...newsubTypes.goodsItems.items)
}
</script>

<style scoped lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.tabs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      top: 48rpx;
    }
  }
}
.scroll-view {
  flex: 1;
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  .item {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .image {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    margin: 10rpx 0;
    height: 78rpx;
    font-size: 26rpx;
  }
  .price {
    color: #cf4444;
    font-size: 30rpx;
  }
  .small {
    font-size: 24rpx;
    margin-right: 5rpx;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 40rpx 0;
}
</style>
