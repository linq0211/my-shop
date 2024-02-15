import type { PageResult, GoodsItem } from './global'

export interface HotResult {
  id: string
  bannerPicture: string
  title: string
  subTypes: SubTypeItem[]
}

export interface SubTypeItem {
  id: string
  title: string
  goodsItems: PageResult<GoodsItem>
}
