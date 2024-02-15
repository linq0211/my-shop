import type { LoginResult } from '@/types/login'
import myRequest from '..'

interface userParams {
  account: string
  password: string
}
interface loginParams {
  code: string
  encryptedData: string
  iv: string
}

export function postLogin(data: userParams) {
  return myRequest<LoginResult>({
    method: 'POST',
    url: '/login',
    data
  })
}

export function postLoginWxMin(data: loginParams) {
  return myRequest<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data
  })
}

export function postLoginWxMinSimple(phoneNumber: string = '13123456789') {
  return myRequest<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: { phoneNumber }
  })
}
