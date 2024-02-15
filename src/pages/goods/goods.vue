<template>
  <template v-if="isLoading">
    <vk-data-goods-sku-popup
      ref="skuPopupRef"
      v-model="isShowSku"
      :localdata="localdata"
      :mode="skuMode"
      price-color="#27BA9B"
      add-cart-background-color="#FFA868"
      buy-now-background-color="#27BA9B"
      :actived-style="{
        color: '#27BA9B',
        borderColor: '#27BA9B',
        backgroundColor: '#E9F8F5'
      }"
      @add-cart="onAddCart"
      @buy-now="onBuyNow"
    />
    <scroll-view class="viewport" scroll-y>
      <view class="goods">
        <view class="swiper">
          <swiper circular @change="onChange">
            <block v-for="(item, index) in goodsInfos?.mainPictures" :key="item">
              <swiper-item>
                <image class="image" :src="item" @tap="onImageTap(index)" />
              </swiper-item>
            </block>
          </swiper>
          <view class="indicator">
            <text>{{ currentIndex + 1 }}</text>
            <text class="split">/</text>
            <text>{{ goodsInfos?.mainPictures.length }}</text>
          </view>
        </view>
      </view>
      <view class="meta">
        <view class="price">
          <text class="small">¥</text>
          <text>{{ goodsInfos?.price }}</text>
        </view>
        <view class="name ellipsis">{{ goodsInfos?.name }}</view>
        <view class="desc">{{ goodsInfos?.desc }}</view>
      </view>
      <view class="action">
        <view class="item arrow" @tap="openSkuPop(SkuMode.Both)">
          <text class="label">选择</text>
          <text class="text ellipsis"> {{ selectArrText }} </text>
        </view>
        <view @tap="openPopup('address')" class="item arrow">
          <text class="label">送至</text>
          <text class="text ellipsis">
            {{
              selectedAddress?.id
                ? selectedAddress.fullLocation + '' + selectedAddress.address
                : '请选择收获地址'
            }}
          </text>
        </view>
        <view @tap="openPopup('service')" class="item arrow">
          <text class="label">服务</text>
          <text class="text ellipsis"> 无忧退 快速退款 免费包邮 </text>
        </view>
      </view>
      <uni-popup ref="popup" type="bottom" background-color="#fff">
        <address-panel
          v-if="popupName === 'address'"
          @close="popup?.close()"
          @confirm-address="onConfirmAddress"
        />
        <service-panel v-if="popupName === 'service'" @close="popup?.close()" />
      </uni-popup>

      <view class="detail">
        <view class="title">
          <text class="text">详情</text>
        </view>
        <view class="content">
          <view class="properties">
            <block v-for="item in goodsInfos?.details.properties" :key="item.name">
              <view class="item">
                <text class="label">{{ item.name }}</text>
                <text class="value">{{ item.value }}</text>
              </view>
            </block>
          </view>

          <block v-for="item in goodsInfos?.details.pictures" :key="item">
            <image class="image" :src="item" mode="widthFix" />
          </block>
        </view>
      </view>

      <view class="similar">
        <view class="title">
          <text class="text">同类推荐</text>
        </view>
        <view class="content">
          <block v-for="item in goodsInfos?.similarProducts" :key="item.id">
            <navigator class="item" hover-class="none" :url="`/pages/goods/goods?id=${item.id}`">
              <image class="image" :src="item.picture"></image>
              <view class="name ellipsis">{{ item.name }}</view>
              <view class="price">
                <text class="small">¥</text>
                <text class="">{{ item.price }}</text>
              </view>
            </navigator>
          </block>
        </view>
      </view>
    </scroll-view>

    <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      <view class="icons">
        <button class="icons-button"><text class="text icon-heart"></text>收藏</button>
        <button class="icons-button" open-type="contact">
          <text class="text icon-handset"></text>客服
        </button>
        <navigator class="icons-button" url="/pages/cart/cart2">
          <text class="text icon-cart"></text>购物车
        </navigator>
      </view>
      <view class="buttons">
        <view class="addcart" @tap="openSkuPop(SkuMode.Cart)">加入购物车</view>
        <view class="buynow" @tap="openSkuPop(SkuMode.Buy)">立即购买</view>
      </view>
    </view>
  </template>
  <template v-else>
    <goods-skeleton />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getGoodsById } from '@/services/modules/goods'
import type { GoodsResult } from '@/types/goods'

import addressPanel from './cpns/address-panel.vue'
import servicePanel from './cpns/service-panel.vue'
import goodsSkeleton from './cpns/goods-skeleton.vue'
import type {
  SkuPopupEvent,
  SkuPopupInstanceType,
  SkuPopupLocaldata
} from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup'
import { computed } from 'vue'
import { postMemberCart } from '@/services/modules/cart'
import type { AddressItem } from '@/types/address'
import useAddressStore from '@/stores/modules/address'

const { safeAreaInsets } = uni.getSystemInfoSync()

const query = defineProps<{
  id: string
}>()
const selectedAddress = ref<AddressItem>()
const onConfirmAddress = (item: AddressItem) => {
  const addressStore = useAddressStore()
  addressStore.changeAddressAction(item)
  selectedAddress.value = item
  popup.value?.close()
}

enum SkuMode {
  Both = 1,
  Cart = 2,
  Buy = 3
}
const isShowSku = ref(false)
const localdata = ref({} as SkuPopupLocaldata)
const skuMode = ref<SkuMode>(SkuMode.Both)
const skuPopupRef = ref<SkuPopupInstanceType>()
const selectArrText = computed(() => {
  return skuPopupRef.value?.selectArr?.join(' ').trim() || '请选择商品规格'
})
const openSkuPop = (mode: SkuMode) => {
  isShowSku.value = true
  skuMode.value = mode
}
const onAddCart = async (event: SkuPopupEvent) => {
  await postMemberCart({ skuId: event._id, count: event.buy_num })
  uni.showToast({
    title: '添加成功',
    icon: 'success'
  })
  isShowSku.value = false
}
const onBuyNow = (event: SkuPopupEvent) => {
  uni.navigateTo({
    url: `/pageOrder/create/create?skuId=${event._id}&count=${event.buy_num}&addressId=${selectedAddress.value?.id}`
  })
  isShowSku.value = false
}

const goodsInfos = ref<GoodsResult>()
const fetchGoodsAction = async () => {
  const res = await getGoodsById(query.id)
  goodsInfos.value = res.result
  localdata.value = {
    _id: res.result.id,
    name: res.result.name,
    goods_thumb: res.result.mainPictures[0],
    sku_list: res.result.skus.map((i) => {
      return {
        _id: i.id,
        goods_id: res.result.id,
        goods_name: res.result.name,
        image: i.picture,
        price: i.price * 100, // 价格需要乘100
        sku_name_arr: i.specs.map((item) => item.valueName),
        stock: i.inventory
      }
    }),
    spec_list: res.result.specs.map((i) => ({
      name: i.name,
      list: i.values.map((v) => ({ name: v.name }))
    }))
  }
}

const currentIndex = ref(0)
const onChange: UniHelper.SwiperOnChange = (event) => {
  currentIndex.value = event.detail.current
}
const onImageTap = (index: number) => {
  uni.previewImage({
    current: index,
    urls: goodsInfos.value!.mainPictures
  })
}

const popup = ref<{
  open: (type?: UniHelper.UniPopupType) => void
  close: () => void
}>()
const popupName = ref<'address' | 'service'>()
const openPopup = (name: typeof popupName.value) => {
  popupName.value = name
  popup.value?.open()
}

const isLoading = ref(false)
onLoad(() => {
  fetchGoodsAction()
  isLoading.value = true
})
</script>

<style scoped lang="scss">
.viewport {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
  .goods {
    background-color: #fff;
    .swiper {
      height: 750rpx;
      position: relative;
      .image {
        width: 750rpx;
        height: 750rpx;
      }
      .indicator {
        position: absolute;
        right: 30rpx;
        bottom: 30rpx;
        background-color: rgba(0, 0, 0, 0.3);
        height: 40rpx;
        line-height: 40rpx;
        padding: 0 18rpx;
        border-radius: 30rpx;
        color: #fff;
        font-size: 26rpx;
        .split {
          margin: 0 5rpx;
        }
      }
    }
  }
  .meta {
    border-bottom: 1rpx solid #eaeaea;
    .price {
      height: 70rpx;
      font-size: 42rpx;
      color: #fff;
      padding: 10rpx 30rpx;
      background-color: #35c8a9;
      .small {
        font-size: 32rpx;
      }
    }
    .name {
      max-height: 80rpx;
      margin: 10rpx 20rpx 0;
      font-size: 36rpx;
    }
    .desc {
      padding: 20rpx;
      font-size: 24rpx;
      color: #cf4444;
    }
  }
  .action {
    padding-left: 20rpx;
    .item {
      height: 80rpx;
      display: flex;
      align-items: center;
      border-bottom: 1rpx solid #eaeaea;
      font-size: 26rpx;
      color: #333;
      padding-right: 40rpx;
      position: relative;
      &:last-child {
        border-bottom: 0 none;
      }
      .label {
        width: 60rpx;
        color: #898b94;
        padding: 0 16rpx;
      }
      .text {
        flex: 1;
        -webkit-line-clamp: 1;
      }
    }
    .arrow {
      &::after {
        content: '\e6c2';
        font-family: 'erabbit' !important;
        position: absolute;
        right: 30rpx;
        color: #898b94;
      }
    }
  }
  .detail {
    padding-left: 20rpx;
    margin-top: 20rpx;
    background-color: #fff;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 90rpx;
      line-height: 1;
      padding: 30rpx 60rpx 30rpx 6rpx;
      position: relative;
      .text {
        padding-left: 10rpx;
        font-size: 28rpx;
        color: #333;
        font-weight: 600;
        border-left: 4rpx solid #27ba9b;
      }
    }
    .content {
      margin-left: -20rpx;
      .image {
        width: 100%;
      }
    }
    .properties {
      padding: 0 20rpx;
      margin-bottom: 30rpx;
      .item {
        display: flex;
        line-height: 2;
        padding: 10rpx;
        font-size: 26rpx;
        color: #333;
        border-bottom: 1rpx dashed #ccc;
      }
      .label {
        width: 200rpx;
      }
      .value {
        flex: 1;
      }
    }
  }
  .similar {
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
      padding: 0 20rpx 150rpx;
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
  }
}
.toolbar {
  width: 100%;
  height: 100rpx;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1rpx solid #eaeaea;
  background-color: #fff;
  z-index: 1;
  padding: 0 20rpx var(--window-bottom);
  box-sizing: border-box;
  .icons {
    display: flex;
    align-items: center;
    flex: 1;
    .icons-button {
      flex: 1;
      padding: 0;
      font-size: 20rpx;
      line-height: 1.4;
      text-align: center;
      color: #333;
      background-color: #fff;
      &::after {
        border: none;
      }
    }
    .text {
      display: block;
      font-size: 34rpx;
    }
  }
  .buttons {
    display: flex;
    align-items: center;
    .addcart {
      width: 220rpx;
      height: 72rpx;
      line-height: 72rpx;
      text-align: center;
      background-color: #ffa868;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }
    .buynow {
      width: 220rpx;
      height: 72rpx;
      line-height: 72rpx;
      text-align: center;
      background-color: #27ba9b;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
      margin-left: 20rpx;
    }
  }
}
</style>
