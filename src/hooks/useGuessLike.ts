import { ref } from 'vue'
import guessLike from '@/components/guess-like/guess-like.vue'

const useGuessLike = () => {
  const guessRef = ref<InstanceType<typeof guessLike>>()
  const onScrollTolower = () => {
    guessRef.value?.getMore()
  }

  return {
    guessRef,
    onScrollTolower
  }
}
export default useGuessLike
