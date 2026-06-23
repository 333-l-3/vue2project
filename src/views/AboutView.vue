<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="goHome">Go Home</button>
  </div>
</template>


<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AboutView',
  setup() {
    const router = useRouter()
    const goHome = () => {
      router.push('/')
    }
    return {
      goHome
    }
  }
})
</script>
