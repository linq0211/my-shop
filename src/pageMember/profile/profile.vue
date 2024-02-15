<template>
  <view class="viewport">
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>

    <view class="avatar">
      <view class="avatar-content" @tap="onAvatarTap">
        <image class="image" :src="profile?.avatar" />
        <text class="text">点击修改头像</text>
      </view>
    </view>

    <view class="form">
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profile?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" placeholder="请填写昵称" v-model="profile!.nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onRadioChange">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="profile?.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profile?.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="profile?.birthday"
            @change="onDatePickerChange"
          >
            <view v-if="profile?.birthday">{{ profile.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            class="picker"
            mode="region"
            :value="profile?.fullLocation?.split(' ')"
            @change="onRegionPickerChange"
          >
            <view v-if="profile?.fullLocation">{{ profile?.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input class="input" type="text" placeholder="请填写职业" v-model="profile!.profession" />
        </view>
      </view>
      <button class="form-button" @tap="onSubmit">保 存</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getMemberProfile, putMemberProfile } from '@/services/modules/profile'
import type { LoginResult } from '@/types/login'
import useMemberStore from '@/stores/modules/member'

const { safeAreaInsets } = uni.getSystemInfoSync()

const profile = ref({} as LoginResult)
const fetchMemberProfile = async () => {
  const res = await getMemberProfile()
  profile.value = res.result
}

const memberStore = useMemberStore()
const onAvatarTap = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (chooseRes) => {
      uni.uploadFile({
        url: '/member/profile/avatar',
        name: 'file',
        filePath: chooseRes.tempFiles[0].tempFilePath,
        success: (uploadRes) => {
          if (uploadRes.statusCode === 200) {
            // 返回的data是一个JSON字符串
            const { avatar } = JSON.parse(uploadRes.data).result
            memberStore.profile!.avatar = avatar
            uni.showToast({ icon: 'success', title: '更新成功' })
          } else {
            uni.showToast({ icon: 'error', title: '更新错误' })
          }
        }
      })
    }
  })
}

const onRadioChange: UniHelper.RadioGroupOnChange = (event) => {
  profile.value.gender = event.detail.value as '男' | '女'
}
const onDatePickerChange: UniHelper.DatePickerOnChange = (event) => {
  profile.value.birthday = event.detail.value
}
let fullLocationCode: [string, string, string] = ['', '', '']
const onRegionPickerChange: UniHelper.RegionPickerOnChange = (event) => {
  profile.value.fullLocation = event.detail.value.join(' ')
  fullLocationCode = event.detail.code!
}

const onSubmit = async () => {
  const res = await putMemberProfile({
    nickname: profile.value.nickname,
    gender: profile.value.gender,
    birthday: profile.value.birthday,
    provinceCode: fullLocationCode[0],
    cityCode: fullLocationCode[1],
    countyCode: fullLocationCode[2],
    profession: profile.value.profession
  })
  memberStore.profile!.nickname = profile.value.nickname
  uni.showToast({ icon: 'success', title: '保存成功' })
  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}

onLoad(() => {
  fetchMemberProfile()
})
</script>

<style lang="scss" scoped>
.viewport {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f4f4f4;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: 750rpx 420rpx;
  background-repeat: no-repeat;
}

.navbar {
  position: relative;
  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }
  .text {
    display: block;
    padding-top: 20rpx;
    font-size: 26rpx;
    color: #fff;
  }
}

.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    align-items: center;
    height: 96rpx;
    padding: 25rpx 20rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 140rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
