import type { AddressItem } from '@/types/address'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useAddressStore = defineStore('address', () => {
  const address = ref<AddressItem>()
  const changeAddressAction = (val: AddressItem) => {
    address.value = val
  }
  return {
    address,
    changeAddressAction
  }
})

export default useAddressStore
