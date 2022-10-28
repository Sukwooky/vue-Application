<template>
  
  <v-app>

    <DefaultBar @drawer="drawer = !drawer"></DefaultBar>

    <DefaultNavigationDrawer v-model="drawer"></DefaultNavigationDrawer>  

    <v-main>
      <v-fade-transition mode="out-in">
          <router-view></router-view>
      </v-fade-transition>
      
    </v-main>

  </v-app>

</template>

<script>
const DefaultBar = () => import("@/components/AppBar.vue");
const DefaultNavigationDrawer = () => import("@/components/AppNavigationDrawer.vue");

export default {
    name : "AuthPage",
    data () {
      return {

        drawer : false,

      }
    },

    components : {
      "DefaultBar" : DefaultBar,
      "DefaultNavigationDrawer" : DefaultNavigationDrawer,
    }
}
</script>

<style>

</style>