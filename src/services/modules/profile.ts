import type { LoginResult, ProfileParams } from '@/types/login'
import myRequest from '..'

export function getMemberProfile() {
  return myRequest<LoginResult>({
    method: 'GET',
    url: '/member/profile'
  })
}

export function putMemberProfile(data: ProfileParams) {
  return myRequest({
    method: 'PUT',
    url: '/member/profile',
    data
  })
}
