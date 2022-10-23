<template>
  
  <v-container fluid>
    <RestaurantMap v-bind:restaurants="restaurants"/>
  </v-container>
</template>

<script>
const RestaurantMap = () => import("@/layouts/Page/RestaurantMap.vue")

import {api} from "@/api.js"  //axios로 변경

export default {

  data(){
    return {
      restaurants : []
    }
  },

  mounted(){
    
    // axios를 통해 음식점 정보 부르기 
    api.restaurant.restaurantAll(res => {

      // 음식점state 할당 
      this.restaurants = res.restaurants

    });
  },

  components : {
    "RestaurantMap" : RestaurantMap
  }
}
</script>

<style>

</style>