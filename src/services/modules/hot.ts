import type { PageParams } from '@/types/home'
import myRequest from '..'
import type { HotResult } from '@/types/hot'

type HotParams = PageParams & { subType?: string }

export function getHotRecommend(url: string, data?: HotParams) {
  return myRequest<HotResult>({
    method: 'GET',
    url,
    data
  })
}
