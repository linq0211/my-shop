export interface BannerItem {
  id: string
  imgUrl: string
  hrefUrl: string
  type: string
}

export interface CategoryItem {
  id: string
  name: string
  icon: string
}

export interface HotItem {
  id: string
  alt: string
  pictures: string[]
  target: string
  title: string
  type: string
}

export interface PageParams {
  page?: number
  pageSize?: number
}
