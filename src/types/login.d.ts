export interface LoginResult {
  id: number
  avatar: string
  account?: string
  nickname?: string
  mobile: string
  token?: string
  gender?: '女' | '男'
  birthday?: string
  cityCode?: string
  provinceCode?: string
  profession?: string
  fullLocation?: string
}

export type ProfileParams = Pick<
  LoginResult,
  'nickname' | 'gender' | 'birthday' | 'profession' | 'provinceCode' | 'cityCode'
> & {
  countyCode?: string
}
