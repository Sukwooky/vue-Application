<template>
 
  <div>
    <div>탄수화물 {{todayCarbo}}g / {{allCarbo}}g</div>
    <v-progress-linear v-model="todayCarbo" color="blue" height="25">
      <strong>{{ Math.ceil(leftPercentCarbo) }}%</strong>
    </v-progress-linear>

    <br>

    <div>단백질 {{todayProtein}}g / {{allProtein}}g</div>
    <v-progress-linear v-model="todayProtein" color="blue" height="25">
      <strong>{{ Math.ceil(leftPercentProtein) }}%</strong>
    </v-progress-linear>

    <br>

    <div>지방 {{todayFat}}g / {{allFat}}g</div>
    <v-progress-linear v-model="todayFat" color="blue" height="25">
      <strong>{{ Math.ceil(leftPercentFat) }}%</strong>
    </v-progress-linear>
  </div>
    
</template>

<script>
//import axios from "axios

export default {
    props: {
        "date" : String,
    },

    //mounted(){
    //    axios.get("/api/diary/"+ this.date)
    //    .then(()=>{
    //
    //    });
    //},

    data(){
        return {
            allCarbo: 100,
            todayCarbo : 50,

            allProtein : 100,
            todayProtein: 50,
            
            allFat: 100,
            todayFat: 40
        }
    },

    computed: {

        leftPercentCarbo(){
            return (this.todayCarbo / this.allCarbo) * 100
        },

        leftPercentProtein(){
            return (this.todayProtein / this.allProtein) * 100
        },

        leftPercentFat(){
            return (this.todayFat / this.allFat) * 100
        }
    }
    
}
</script>

<style>

</style>