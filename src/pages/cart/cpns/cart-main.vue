<template>
  <scroll-view scroll-y class="scroll-view" enable-back-to-top @scrolltolower="onScrollTolower">
    <!-- 已登录: 显示购物车 -->
    <template v-if="profile">
      <!-- 有内容 -->
      <view class="cart-list" v-if="cartList.length">
        <view class="tips">
          <text class="label">满减</text>
          <text class="desc">满1件, 即可享受9折优惠</text>
        </view>
        <uni-swipe-action>
          <block v-for="item in cartList" :key="item.skuId">
            <uni-swipe-action-item class="cart-swipe">
              <view class="goods">
                <text
                  class="checkbox"
                  :class="{ checked: item.selected }"
                  @tap="onChangeSelected(item)"
                ></text>
                <navigator
                  :url="`/pages/goods/goods?id=${item.id}`"
                  hover-class="none"
                  class="navigator"
                >
                  <image class="picture" :src="item.picture" />
                  <view class="meta">
                    <view class="name ellipsis">{{ item.name }}</view>
                    <view class="attrsText ellipsis">{{ item.attrsText }}</view>
                    <view class="price">
                      <text class="small">￥</text>
                      <text>{{ item.nowPrice }}</text>
                    </view>
                  </view>
                </navigator>
                <view class="count">
                  <vk-data-input-number-box
                    v-model="item.count"
                    :min="1"
                    :max="item.stock"
                    :index="item.skuId"
                    @change="onChangeCount"
                  />
                </view>
              </view>
              <template #right>
                <view class="cart-swipe-right">
                  <button class="button delete-button" @tap="onDeleteBtn(item.skuId)">删除</button>
                </view>
              </template>
            </uni-swipe-action-item>
          </block>
        </uni-swipe-action>
      </view>
      <!-- 无内容 -->
      <view class="cart-blank" v-else>
        <image src="/static/images/blank_cart.png" class="image" />
        <text class="text">购物车还是空的，快来挑选好货吧</text>
        <navigator open-type="switchTab" url="/pages/index/index" hover-class="none">
          <button class="button">去首页看看</button>
        </navigator>
      </view>
      <!-- 吸底工具栏 -->
      <view class="toolbar" :style="{ paddingBottom: paddingBottom ? paddingBottom + 'px' : 0 }">
        <text class="all" :class="{ checked: selectedAll }" @tap="onSelectedAll">全选</text>
        <text class="text">合计:</text>
        <view class="amount">
          <text class="small">￥</text>
          <text>{{ selectedGoodsPrice }}</text>
        </view>
        <view class="button-grounp">
          <view
            class="button payment-button"
            :class="{ disabled: selectedGoodsCount === 0 }"
            @tap="gotoPayment"
          >
            去结算({{ selectedGoodsCount }})
          </view>
        </view>
      </view>
    </template>

    <!-- 未登录: 提示登录 -->
    <view class="login-blank" v-else>
      <text class="text">登录后可查看购物车中的商品</text>
      <navigator url="/pages/login/login" hover-class="none">
        <button class="button">去登录</button>
      </navigator>
    </view>

    <guess-like ref="guessRef"></guess-like>

    <view class="toolbar-height"></view>
  </scroll-view>
</template>

<script setup lang="ts">
import type { InputNumberBoxEvent } from '@/components/vk-data-input-number-box/vk-data-input-number-box '
import useGuessLike from '@/hooks/useGuessLike'
import {
  deleteMemberCart,
  getMemberCart,
  putMemberCartBySkuId,
  putMemberCartSelected
} from '@/services/modules/cart'
import useMemberStore from '@/stores/modules/member'
import type { CartItem } from '@/types/cart'
import { onShow } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { ref } from 'vue'

const memberStore = useMemberStore()
const { profile } = storeToRefs(memberStore)
defineProps<{
  paddingBottom?: number
}>()

const cartList = ref<CartItem[]>([])
const fetchCartAction = async () => {
  const res = await getMemberCart()
  cartList.value = res.result
}

const onDeleteBtn = async (skuId: string) => {
  uni.showModal({
    title: '确认删除？',
    success: async (res) => {
      if (res.confirm) {
        await deleteMemberCart({ ids: [skuId] })
        fetchCartAction()
      }
    }
  })
}

// 修改状态和数量
const onChangeCount = async (event: InputNumberBoxEvent) => {
  await putMemberCartBySkuId(event.index, { count: event.value })
}
const onChangeSelected = async (item: CartItem) => {
  item.selected = !item.selected
  await putMemberCartBySkuId(item.skuId, { selected: item.selected })
}

// 全选
const selectedAll = computed(() => {
  // 购物车有内容并且每一项都是选中是checked全选
  return cartList.value.length && cartList.value.every((i) => i.selected)
})
const onSelectedAll = async () => {
  // 点击全选按钮
  const _selectedAll = !selectedAll.value
  cartList.value.forEach((i) => {
    i.selected = _selectedAll
  })
  await putMemberCartSelected({ selected: _selectedAll })
}

// 数量和价格
const selectedGoodsList = computed(() => {
  return cartList.value.filter((i) => i.selected)
})
const selectedGoodsPrice = computed(() => {
  return selectedGoodsList.value.reduce((pre, cur) => pre + cur.count * cur.price, 0).toFixed(2)
})
const selectedGoodsCount = computed(() => {
  return selectedGoodsList.value.reduce((pre, cur) => pre + cur.count, 0)
})

const gotoPayment = () => {
  if (selectedGoodsCount.value === 0) {
    return uni.showToast({
      icon: 'none',
      title: '请选择商品'
    })
  }
  // 跳转到结算页
  uni.navigateTo({ url: '/pageOrder/create/create' })
}

const { guessRef, onScrollTolower } = useGuessLike()

onShow(() => {
  if (profile) {
    fetchCartAction()
  }
})
</script>

<style lang="scss" scoped>
// 滚动容器
.scroll-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f7f7f8;
}

// 购物车列表
.cart-list {
  padding: 0 20rpx;

  // 优惠提示
  .tips {
    display: flex;
    align-items: center;
    line-height: 1;
    margin: 30rpx 10rpx;
    font-size: 26rpx;
    color: #666;

    .label {
      color: #fff;
      padding: 7rpx 15rpx 5rpx;
      border-radius: 4rpx;
      font-size: 24rpx;
      background-color: #27ba9b;
      margin-right: 10rpx;
    }
  }

  // 购物车商品
  .goods {
    display: flex;
    padding: 20rpx 20rpx 20rpx 80rpx;
    border-radius: 10rpx;
    background-color: #fff;
    position: relative;

    .navigator {
      display: flex;
    }

    .checkbox {
      position: absolute;
      top: 0;
      left: 0;

      display: flex;
      align-items: center;
      justify-content: center;
      width: 80rpx;
      height: 100%;

      &::before {
        content: '\e6cd';
        font-family: 'erabbit' !important;
        font-size: 40rpx;
        color: #444;
      }

      &.checked::before {
        content: '\e6cc';
        color: #27ba9b;
      }
    }

    .picture {
      width: 170rpx;
      height: 170rpx;
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20rpx;
    }

    .name {
      height: 72rpx;
      font-size: 26rpx;
      color: #444;
    }

    .attrsText {
      line-height: 1.8;
      padding: 0 15rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .price {
      line-height: 1;
      font-size: 26rpx;
      color: #444;
      margin-bottom: 2rpx;
      color: #cf4444;

      &::before {
        content: '￥';
        font-size: 80%;
      }
    }

    // 商品数量
    .count {
      position: absolute;
      bottom: 20rpx;
      right: 5rpx;

      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 220rpx;
      height: 48rpx;

      .text {
        height: 100%;
        padding: 0 20rpx;
        font-size: 32rpx;
        color: #444;
      }

      .input {
        height: 100%;
        text-align: center;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: #444;
        background-color: #f6f6f6;
      }
    }
  }

  .cart-swipe {
    display: block;
    margin: 20rpx 0;
  }

  .cart-swipe-right {
    display: flex;
    height: 100%;

    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      padding: 6px;
      line-height: 1.5;
      color: #fff;
      font-size: 26rpx;
      border-radius: 0;
    }

    .delete-button {
      background-color: #cf4444;
    }
  }
}

// 空状态
.cart-blank,
.login-blank {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 60vh;
  .image {
    width: 400rpx;
    height: 281rpx;
  }
  .text {
    color: #444;
    font-size: 26rpx;
    margin: 20rpx 0;
  }
  .button {
    width: 240rpx !important;
    height: 60rpx;
    line-height: 60rpx;
    margin-top: 20rpx;
    font-size: 26rpx;
    border-radius: 60rpx;
    color: #fff;
    background-color: #27ba9b;
  }
}

// 吸底工具栏
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--window-bottom));
  z-index: 1;

  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  border-top: 1rpx solid #ededed;
  border-bottom: 1rpx solid #ededed;
  background-color: #fff;
  box-sizing: content-box;

  .all {
    margin-left: 25rpx;
    font-size: 14px;
    color: #444;
    display: flex;
    align-items: center;
  }

  .all::before {
    font-family: 'erabbit' !important;
    content: '\e6cd';
    font-size: 40rpx;
    margin-right: 8rpx;
  }

  .checked::before {
    content: '\e6cc';
    color: #27ba9b;
  }

  .text {
    margin-right: 8rpx;
    margin-left: 32rpx;
    color: #444;
    font-size: 14px;
  }

  .amount {
    font-size: 20px;
    color: #cf4444;

    .decimal {
      font-size: 12px;
    }

    &::before {
      content: '￥';
      font-size: 12px;
    }
  }

  .button-grounp {
    margin-left: auto;
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 72rpx;
    font-size: 13px;
    color: #fff;

    .button {
      width: 240rpx;
      margin: 0 10rpx;
      border-radius: 72rpx;
    }

    .payment-button {
      background-color: #27ba9b;

      &.disabled {
        opacity: 0.6;
      }
    }
  }
}
// 底部占位空盒子
.toolbar-height {
  height: 100rpx;
}
</style>
