<template>
  <v-fade-transition mode="out-in">
      <router-view></router-view>
  </v-fade-transition>

</template>

<script>
import "@/styles/overrides.sass"

export default {
 
}
</script>

<style scoped>

#app{
  font-family: 'Jua'
}
</style>
