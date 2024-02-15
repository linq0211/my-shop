<template>
  <view class="cart">
    <cart-main :paddingBottom="safeAreaInsets?.bottom" />
  </view>
</template>

<script setup lang="ts">
import cartMain from './cpns/cart-main.vue'
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>
