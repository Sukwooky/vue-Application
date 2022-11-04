<template>
  
  <v-app>

    <DefaultBar @drawer="drawer = !drawer"></DefaultBar>

    <DefaultNavigationDrawer v-model="drawer"></DefaultNavigationDrawer>  

    <v-main>
      <v-fade-transition mode="out-in">
          <router-view></router-view>
      </v-fade-transition>
      
    </v-main>
    
    <MyPageBottomNavigation/>

  </v-app>

</template>

<script>
const DefaultBar = () => import("@/components/AppBar.vue");
const DefaultNavigationDrawer = () => import("@/components/AppNavigationDrawer.vue");
const MyPageBottomNavigation = () => import("@/components/MyPageBottomNavigation.vue");

export default {
    name : "MyPageLayout",
    data () {
      return {

        drawer : false,

      }
    },

    components : {
      "DefaultBar" : DefaultBar,
      "DefaultNavigationDrawer" : DefaultNavigationDrawer,
      "MyPageBottomNavigation" : MyPageBottomNavigation,
    }
}
</script>

<style>

</style>