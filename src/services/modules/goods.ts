import type { GoodsResult } from '@/types/goods'
import myRequest from '..'

export function getGoodsById(id: string) {
  return myRequest<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: {
      id
    }
  })
}
