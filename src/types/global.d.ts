export interface PageResult<T> {
  items: T[]
  counts: number
  pageSize: number
  pages: number
  page: number
}

export interface GoodsItem {
  desc: string
  discount: number
  id: string
  name: string
  orderNum: number
  picture: string
  price: number
}
