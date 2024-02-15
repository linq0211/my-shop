import { ref } from 'vue'
import type { LoginResult } from '@/types/login'
import { defineStore } from 'pinia'

const useMemberStore = defineStore(
  'member',
  () => {
    const profile = ref<LoginResult>()

    const setProfile = (val: LoginResult) => {
      profile.value = val
    }
    const clearProfile = () => {
      profile.value = undefined
    }

    return { profile, setProfile, clearProfile }
  },
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        }
      }
    }
  }
)

export default useMemberStore
