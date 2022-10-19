<template>
 
  <div>

    <!--탄수화물 제목 / 초과 시 Chip / 그래프 --> 
    <div>
      탄수화물 <strong class="black--text">{{todayCarbo}}g</strong> / <strong class="grey--text">{{allCarbo}}g</strong>
      <v-chip v-if="isCarboExcess" class="ma-2" color="red" text-color="white">
        초과
      </v-chip>
    </div>
    <v-progress-linear :value="todayCarbo" color="blue" height="25">
      <strong>{{ Math.ceil(leftPercentCarbo) }}%</strong>
    </v-progress-linear>

    <br>

    <!--단백질 제목 / 초과 시 Chip / 그래프 --> 
    <div>
      단백질 <strong class="black--text">{{todayProtein}}g</strong> / <strong class="grey--text">{{allProtein}}g</strong>
      <v-chip v-if="isProteinExcess" class="ma-2" color="red" text-color="white">
        초과
      </v-chip>
    </div>
    <v-progress-linear :value="todayProtein" color="blue" height="25">
      <strong>{{ Math.ceil(leftPercentProtein) }}%</strong>
    </v-progress-linear>

    <br>

    <!--지방 제목 / 초과 시 Chip / 그래프 --> 
    <div>
      지방 <strong class="black--text">{{todayFat}}g</strong> / <strong class="grey--text">{{allFat}}g</strong>
      <v-chip v-if="isFatExcess" class="ma-2" color="red" text-color="white">
        초과
      </v-chip>
    </div>
    <v-progress-linear :value="todayFat" color="blue" height="25">
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
    //          allCarbo -> Number
    //          todayCarbo -> Number 
    //          allProtein -> Number
    //          todayProtein -> Number   
    //          allFat -> Number
    //          todayFat -> Number     
    //    });
    //},

    data(){
        return {
            allCarbo: 100,
            todayCarbo : 25,

            allProtein : 100,
            todayProtein: 30,

            allFat: 100,
            todayFat: 200,
        }
    },

    computed: {

        isCarboExcess(){
            return this.allCarbo < this.todayCarbo
        },

        leftPercentCarbo(){
            if (this.allCarbo < this.todayCarbo){
              return 100
            }else{
              return (this.todayCarbo / this.allCarbo) * 100
            }
        },

        isProteinExcess(){
            return this.allProtein < this.todayProtein
        },

        leftPercentProtein(){
            if (this.allProtein < this.todayProtein){
              return 100
            }else{
              return (this.todayProtein / this.allProtein) * 100
            }
        },

        isFatExcess(){
            return this.allFat < this.todayFat
        },

        leftPercentFat(){
            if(this.allFat < this.todayFat){
              return 100
            }else{
              return (this.todayFat / this.allFat) * 100
            }
        }
    }
    
}
</script>

<style>

</style>