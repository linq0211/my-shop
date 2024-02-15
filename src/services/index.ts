import useMemberStore from '@/stores/modules/member'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
// const baseURL = 'https://pcapi-xiaotuxian-front.itheima.net'

// 请求
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 拼接url
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }

    // 超时时间
    options.timeout = 10000

    // 小程序请求头
    options.header = {
      ...options.header,
      'source-client': 'miniapp'
    }

    // 登录成功验证token
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  }
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

// 响应
interface IRequest<T> {
  code: string
  msg: string
  result: T
}

const myRequest = <T>(options: UniApp.RequestOptions) => {
  return new Promise<IRequest<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        // 响应成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 正确响应
          resolve(res.data as IRequest<T>)
        } else if ((res.statusCode = 401)) {
          // 无效的token，清理信息并返回登录页重新登录
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 其他错误
          uni.showToast({
            icon: 'none',
            title: (res.data as IRequest<T>).msg || '请求错误'
          })
          reject(res)
        }
      },
      fail: (err) => {
        // 网络错误，响应失败
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试'
        })
        reject(err)
      }
    })
  })
}

export default myRequest
