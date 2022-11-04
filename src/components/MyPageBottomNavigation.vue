<template>
    <v-bottom-navigation :value="value" color="blue" grow app>
      <v-btn @click="goDiary">
        <span>다이어리</span>
        <v-icon>mdi-book</v-icon>
      </v-btn>
    
      <v-btn @click="goReport">
        <span>리포트</span>
        <v-icon>mdi-file-chart</v-icon>
      </v-btn>
    
    </v-bottom-navigation>
</template>

<script>
  export default {
    name : "AppBottomNavigation",
    data(){
        return {
          value: null
        }
    },

    methods : {
      goDiary(){
          this.$router.push(
            {
              name : "Diary",
            }
          ).catch(()=>{
              console.log("같은 페이지 입니다.")
          });      
      },

      goReport(){
          this.$router.push(
            {
              name : "Report",
            }
          ).catch(()=>{
              console.log("같은 페이지 입니다.")
          });      
      },
    }
  }
</script>

<style>

</style>