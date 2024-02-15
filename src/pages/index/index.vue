<template>
  <custom-navbar />
  <scroll-view
    class="scroll"
    scroll-y
    refresher-enabled
    @scrolltolower="onScrollTolower"
    :refresher-triggered="isTrigger"
    @refresherrefresh="onRefresherrefresh"
  >
    <template v-if="isLoading">
      <home-skeleton />
    </template>
    <template v-else>
      <swiper-view :bannerData="bannerResult" />
      <category-mutli :categoryData="categoryResult" />
      <hot-mutli :hotData="hotResult" />
      <guess-like ref="guessRef" />
    </template>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { getHomeBanner, getHomeCategoryMutli, getHomeHotMutli } from '@/services/modules/home'

import customNavbar from './cpns/custom-navbar.vue'
import swiperView from '@/components/swiper-view/swiper-view.vue'
import categoryMutli from './cpns/category-mutli.vue'
import hotMutli from './cpns/hot-mutli.vue'
import homeSkeleton from './cpns/home-skeleton.vue'
import useGuessLike from '@/hooks/useGuessLike'

const bannerResult = ref<BannerItem[]>([])
const categoryResult = ref<CategoryItem[]>([])
const hotResult = ref<HotItem[]>([])
const fetchBannerAction = async () => {
  const res = await getHomeBanner()
  bannerResult.value = res.result
}
const fetchCategoryAction = async () => {
  const res = await getHomeCategoryMutli()
  categoryResult.value = res.result
}
const fetchHotMutliAction = async () => {
  const res = await getHomeHotMutli()
  hotResult.value = res.result
}

const isTrigger = ref(false)
const { guessRef, onScrollTolower } = useGuessLike()
const onRefresherrefresh = async () => {
  isTrigger.value = true
  guessRef.value?.resetData()
  await Promise.all([
    fetchBannerAction(),
    fetchCategoryAction(),
    fetchHotMutliAction(),
    guessRef.value?.getMore()
  ])
  isTrigger.value = false
}

const isLoading = ref(false)
onLoad(async () => {
  isLoading.value = true
  await Promise.all([fetchBannerAction(), fetchCategoryAction(), fetchHotMutliAction()])
  isLoading.value = false
})
</script>
<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
  .scroll {
    flex: 1;
  }
}
</style>
