<template name="skeleton">
  <view class="sk-container">
    <scroll-view
      scroll-y
      class="viewport viewport data-v-e000afeb data-v-e000afeb"
      enable-back-to-top
    >
      <view class="goods goods data-v-e000afeb data-v-e000afeb">
        <view class="swiper swiper data-v-e000afeb data-v-e000afeb">
          <swiper circular class="data-v-e000afeb data-v-e000afeb" :current="0">
            <swiper-item
              class="data-v-e000afeb data-v-e000afeb"
              style="
                position: absolute;
                width: 100%;
                height: 100%;
                transform: translate(0%, 0px) translateZ(0px);
              "
            >
              <image class="image data-v-e000afeb sk-image"></image>
            </swiper-item>
          </swiper>
          <view class="indicator indicator data-v-e000afeb data-v-e000afeb">
            <text class="data-v-e000afeb sk-transparent sk-opacity">1</text>
            <text class="split data-v-e000afeb sk-transparent sk-opacity">/</text>
            <text class="data-v-e000afeb sk-transparent sk-opacity">5</text>
          </view>
        </view>
      </view>
      <view class="meta meta data-v-e000afeb data-v-e000afeb">
        <view class="price price data-v-e000afeb data-v-e000afeb">
          <text class="small data-v-e000afeb sk-transparent sk-opacity">¥</text>
          <text class="data-v-e000afeb sk-transparent sk-text-14-2857-579 sk-text">168.00</text>
        </view>
        <view class="name ellipsis data-v-e000afeb sk-transparent sk-text-14-2857-380 sk-text"
          >梅乃宿梅酒720毫升</view
        >
        <view class="desc data-v-e000afeb sk-transparent sk-text-14-2857-584 sk-text"
          >小藏手工酿造，百年名酒app</view
        >
      </view>
      <view class="action action data-v-e000afeb data-v-e000afeb">
        <view class="item arrow data-v-e000afeb sk-pseudo sk-pseudo-circle">
          <text class="label data-v-e000afeb sk-transparent sk-text-14-2857-826 sk-text">选择</text>
          <text class="text ellipsis data-v-e000afeb sk-transparent sk-text-14-2857-74 sk-text">
            请选择商品规格
          </text>
        </view>
        <view class="item arrow data-v-e000afeb sk-pseudo sk-pseudo-circle">
          <text class="label data-v-e000afeb sk-transparent sk-text-14-2857-8 sk-text">送至</text>
          <text class="text ellipsis data-v-e000afeb sk-transparent sk-text-14-2857-930 sk-text">
            请选择收获地址
          </text>
        </view>
        <view class="item arrow data-v-e000afeb sk-pseudo sk-pseudo-circle">
          <text class="label data-v-e000afeb sk-transparent sk-text-14-2857-324 sk-text">服务</text>
          <text class="text ellipsis data-v-e000afeb sk-transparent sk-text-14-2857-963 sk-text">
            无忧退 快速退款 免费包邮
          </text>
        </view>
      </view>
      <view
        is="node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup"
        class="r r data-v-e000afeb data-v-e000afeb"
      ></view>
    </scroll-view>
    <view class="toolbar toolbar data-v-e000afeb data-v-e000afeb" style="padding-bottom: 0px">
      <view class="icons icons data-v-e000afeb data-v-e000afeb">
        <button
          class="icons-button data-v-e000afeb sk-transparent sk-button sk-pseudo sk-pseudo-circle"
        >
          <text class="text icon-heart data-v-e000afeb sk-pseudo sk-pseudo-circle"></text>收藏
        </button>
        <button
          class="icons-button data-v-e000afeb sk-transparent sk-button sk-pseudo sk-pseudo-circle"
          open-type="contact"
        >
          <text class="text icon-handset data-v-e000afeb sk-pseudo sk-pseudo-circle"></text>客服
        </button>
        <navigator class="icons-button data-v-e000afeb sk-transparent" open-type="switchTab">
          <text class="text icon-cart data-v-e000afeb sk-pseudo sk-pseudo-circle"></text>购物车
        </navigator>
      </view>
      <view class="buttons buttons data-v-e000afeb data-v-e000afeb">
        <view
          class="addcart data-v-e000afeb sk-transparent sk-text-31-9444-879 sk-text"
          style="background-position-x: 50%"
          >加入购物车</view
        >
        <view
          class="buynow data-v-e000afeb sk-transparent sk-text-31-9444-847 sk-text"
          style="background-position-x: 50%"
          >立即购买</view
        >
      </view>
    </view>
  </view>
</template>

<style>
.sk-transparent {
  color: transparent !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-14-2857-579 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 58.8rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-380 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 50.4rpx;
  position: relative !important;
}
.sk-text-14-2857-584 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-826 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-74 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-8 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-930 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-324 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-963 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-31-9444-879 {
  background-image: linear-gradient(
    transparent 31.9444%,
    #eeeeee 0%,
    #eeeeee 68.0556%,
    transparent 0%
  ) !important;
  background-size: 100% 72rpx;
  position: relative !important;
}
.sk-text-31-9444-847 {
  background-image: linear-gradient(
    transparent 31.9444%,
    #eeeeee 0%,
    #eeeeee 68.0556%,
    transparent 0%
  ) !important;
  background-size: 100% 72rpx;
  position: relative !important;
}
.sk-button {
  color: #efefef !important;
  background: #efefef !important;
  border: none !important;
  box-shadow: none !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
