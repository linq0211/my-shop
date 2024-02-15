import type { CategoryTopItem } from '@/types/category'
import myRequest from '..'

export function getCategoryTop() {
  return myRequest<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top'
  })
}
