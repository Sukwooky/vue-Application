<template>
 
  <div>

    <!--탄수화물 제목 / 초과 시 Chip / 그래프 --> 
    <div>
      탄수화물 <strong class="black--text">{{dateCarbo}}g</strong> / <strong class="grey--text">{{recommendCarbo}}g</strong>
      <v-chip v-if="isCarboExcess" class="ma-2" color="red" text-color="white">
        초과
      </v-chip>
    </div>
    <v-progress-linear :value="dateCarbo" color="blue" height="25">
      <strong>{{ Math.ceil(leftPercentCarbo) }}%</strong>
    </v-progress-linear>

    <br>

    <!--단백질 제목 / 초과 시 Chip / 그래프 --> 
    <div>
      단백질 <strong class="black--text">{{dateProtein}}g</strong> / <strong class="grey--text">{{recommendProtein}}g</strong>
      <v-chip v-if="isProteinExcess" class="ma-2" color="red" text-color="white">
        초과
      </v-chip>
    </div>
    <v-progress-linear :value="dateProtein" color="blue" height="25">
      <strong>{{ Math.ceil(leftPercentProtein) }}%</strong>
    </v-progress-linear>

    <br>

    <!--지방 제목 / 초과 시 Chip / 그래프 --> 
    <div>
      지방 <strong class="black--text">{{dateFat}}g</strong> / <strong class="grey--text">{{recommentFat}}g</strong>
      <v-chip v-if="isFatExcess" class="ma-2" color="red" text-color="white">
        초과
      </v-chip>
    </div>
    <v-progress-linear :value="dateFat" color="blue" height="25">
      <strong>{{ Math.ceil(leftPercentFat) }}%</strong>
    </v-progress-linear>
  </div>
    
</template>

<script>
//import axios from "axios

export default {
    name : 'DiaryNutrient',
    props: {
        date : {
            type : String,
            default : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        },
    },


    //mounted(){
    //    axios.get("/api/diary/"+ this.date)
    //    .then(()=>{
    //          recommendCarbo -> Number
    //          dateCarbo -> Number 
    //          recommendProtein -> Number
    //          dateProtein -> Number   
    //          recommentFat -> Number
    //          dateFat -> Number     
    //    });
    //},

    data(){
        return {
            recommendCarbo: 100,    //일일 권장 탄수화물
            dateCarbo : 110,         //사용자의 날짜별 탄수화물

            recommendProtein : 100, //일일 권장 단백질
            dateProtein: 30,        //사용자의 날짜별 단백질

            recommentFat: 100,      //일일 권장 지방
            dateFat: 200,           //사용자의 날짜별 지방
        }
    },

    computed: {

        isCarboExcess(){
            return this.recommendCarbo < this.dateCarbo
        },

        leftPercentCarbo(){
            if (this.recommendCarbo < this.dateCarbo){
              return 100
            }else{
              return (this.dateCarbo / this.recommendCarbo) * 100
            }
        },

        isProteinExcess(){
            return this.recommendProtein < this.dateProtein
        },

        leftPercentProtein(){
            if (this.recommendProtein < this.dateProtein){
              return 100
            }else{
              return (this.dateProtein / this.recommendProtein) * 100
            }
        },

        isFatExcess(){
            return this.recommentFat < this.dateFat
        },

        leftPercentFat(){
            if(this.recommentFat < this.dateFat){
              return 100
            }else{
              return (this.dateFat / this.recommentFat) * 100
            }
        }
    }
    
}
</script>

<style>

</style>