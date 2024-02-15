import myRequest from '..'
import type { BannerItem, CategoryItem, HotItem, PageParams } from '../../types/home'
import type { GoodsItem, PageResult } from '@/types/global'

export function getHomeBanner(distributionSite = 1) {
  return myRequest<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite
    }
  })
}

export function getHomeCategoryMutli() {
  return myRequest<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli'
  })
}

export function getHomeHotMutli() {
  return myRequest<HotItem[]>({
    method: 'GET',
    url: '/home/hot/mutli'
  })
}

export function getHomeGuessLike(data?: PageParams) {
  return myRequest<PageResult<GoodsItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data
  })
}
