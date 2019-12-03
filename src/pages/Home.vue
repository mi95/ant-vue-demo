<template>
  <div class="home">
    <HelloWorld msg="this is home"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created(){
    console.log('store',this.$store.state.user)
    
  }
}
</script>
