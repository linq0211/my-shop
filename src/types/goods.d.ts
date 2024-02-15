import type { GoodsItem } from './global'
import type { AddressItem } from './address'

/** 商品信息 */
export interface GoodsResult {
  id: string
  name: string
  desc: string
  price: number
  oldPrice: number
  details: Details
  mainPictures: string[]
  similarProducts: GoodsItem[]
  skus: SkuItem[]
  specs: SpecItem[]
  userAddresses: AddressItem[]
}

/** 商品详情: 包含详情属性 + 详情图片 */
export interface Details {
  properties: DetailsPropertyItem[]
  pictures: string[]
}

/** 详情属性 */
export interface DetailsPropertyItem {
  name: string
  value: string
}

/** sku信息 */
export interface SkuItem {
  id: string
  inventory: number
  oldPrice: number
  picture: string
  price: number
  skuCode: string
  specs: SkuSpecItem[]
}

/** 规格信息 */
export interface SkuSpecItem {
  name: string
  valueName: string
}

/** 可选规格信息 */
export interface SpecItem {
  name: string
  values: SpecValueItem[]
}

/** 可选值信息 */
export interface SpecValueItem {
  available: boolean
  desc: string
  name: string
  picture: string
}
