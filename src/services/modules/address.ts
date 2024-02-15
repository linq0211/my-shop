import type { AddressItem, AddressParams, AddressId } from '@/types/address'
import myRequest from '..'

export function postMemberAddress(data: AddressParams) {
  return myRequest<AddressId>({
    method: 'POST',
    url: '/member/address',
    data
  })
}

export function putMemberAddress(id: string, data: AddressParams) {
  return myRequest<AddressId>({
    method: 'PUT',
    url: `/member/address/${id}`,
    data
  })
}
export function deleteMemberAddress(id: string) {
  return myRequest<AddressId>({
    method: 'DELETE',
    url: `/member/address/${id}`
  })
}
export function getMemberAddressById(id: string) {
  return myRequest<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`
  })
}
export function getMemberAddress() {
  return myRequest<AddressItem[]>({
    method: 'GET',
    url: '/member/address'
  })
}
