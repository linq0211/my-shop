<template>
  <view class="login">
    <view class="logo">
      <image
        class="image"
        src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo_icon.png"
      />
    </view>

    <view class="content">
      <!-- #ifdef H5 -->
      <view class="user">
        <input class="input" type="text" placeholder="请输入用户名" v-model="account" />
        <input class="input" type="text" placeholder="请输入密码" password v-model="password" />
        <button class="userBtn" @tap="onUserBtn">登录</button>
      </view>
      <!--#endif-->
      <!-- #ifdef MP-WEIXIN -->
      <!-- <view class="phone">
        <button class="phoneBtn" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
          <text class="icon icon-phone"></text>
          手机号快捷登录
        </button>
      </view> -->
      <!--#endif-->
      <view class="extra">
        <view class="other">
          <text class="text">-------------- 其他登录方式 --------------</text>
        </view>
        <view class="options">
          <view class="option" @tap="onSimBtn">
            <button class="simBtn">
              <text class="icon icon-phone"></text>
            </button>
            <text class="text">模拟快捷登录</text>
          </view>
        </view>
      </view>
    </view>
    <view class="tips" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      登录 / 注册即视为你同意《服务条款》
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { postLogin, postLoginWxMinSimple } from '@/services/modules/login'
import useMemberStore from '@/stores/modules/member'
import type { LoginResult } from '@/types/login'

const { safeAreaInsets } = uni.getSystemInfoSync()

const account = ref('')
const password = ref('')
const onUserBtn = async () => {
  const res = await postLogin({
    account: account.value,
    password: password.value
  })
  loginSuccess(res.result)
}

// const onGetPhoneNumber: UniHelper.ButtonOnGetphonenumber = (event) => {
//   console.log(event)
// }

const onSimBtn = async () => {
  const res = await postLoginWxMinSimple('13566495289')
  loginSuccess(res.result)
}

const loginSuccess = (profile: LoginResult) => {
  const memberStore = useMemberStore()
  memberStore.setProfile(profile)
  uni.showToast({ icon: 'success', title: '登录成功' })
  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  position: relative;
  padding: 20rpx 40rpx;
  .logo {
    text-align: center;
    margin: 40rpx 0;
    .image {
      width: 220rpx;
      height: 220rpx;
    }
  }
  .content {
    .user {
      .input {
        height: 80rpx;
        border: 1px solid #ddd;
        margin-bottom: 30rpx;
        padding: 0 20rpx;
        font-size: 30rpx;
        border-radius: 72rpx;
      }
      .userBtn {
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #28bb9c;
        border-radius: 72rpx;
        color: #fff;
      }
    }
    .phone {
      margin: 30rpx 0;
      .phoneBtn {
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffa868;
        border-radius: 72rpx;
        color: #fff;
        .icon-phone {
          &::before {
            margin-right: 10rpx;
          }
        }
      }
    }
    .extra {
      .other {
        margin: 30rpx 0;
        text-align: center;
        .text {
          font-size: 24rpx;
          color: #999;
        }
      }
      .options {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .simBtn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          border: 1rpx solid #999;
        }
        .text {
          margin-top: 10rpx;
          font-size: 22rpx;
          color: #666;
        }
      }
    }
  }
  .tips {
    position: absolute;
    bottom: 30rpx;
    left: 20rpx;
    right: 20rpx;
    font-size: 24rpx;
    color: #999;
    text-align: center;
  }
}
</style>
