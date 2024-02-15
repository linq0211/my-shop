import type { CartItem } from '@/types/cart'
import myRequest from '..'

interface cartParams {
  skuId: string
  count: number
}

export function postMemberCart(data: cartParams) {
  return myRequest({
    method: 'POST',
    url: '/member/cart',
    data
  })
}

export function getMemberCart() {
  return myRequest<CartItem[]>({
    method: 'GET',
    url: '/member/cart'
  })
}

export function deleteMemberCart(data: { ids: string[] }) {
  return myRequest({
    method: 'DELETE',
    url: '/member/cart',
    data
  })
}

export function putMemberCartBySkuId(skuId: string, data: { selected?: boolean; count?: number }) {
  return myRequest({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data
  })
}

export function putMemberCartSelected(data: { selected: boolean }) {
  return myRequest({
    method: 'PUT',
    url: '/member/cart/selected',
    data
  })
}
