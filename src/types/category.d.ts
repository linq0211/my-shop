import type { GoodsItem } from './global'

export type CategoryTopItem = {
  id: string
  name: string
  picture: string
  imageBanners: string[]
  children: CategoryChildItem[]
}

export type CategoryChildItem = {
  id: string
  name: string
  picture: string
  goods: GoodsItem[]
}
