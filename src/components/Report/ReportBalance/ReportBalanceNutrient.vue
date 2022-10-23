<template>
 
  <div>

    <!--탄수화물 권장비율/ 1주 섭취양 / 권장량 그래프 --> 
    <v-row>
      <v-col cols="auto">
        <v-icon x-small color="rgb(255, 99, 132)" left>mdi-checkbox-blank</v-icon>
        탄수화물(권장비율) <span class="grey--text">{{recommendCarboPercent}}%</span>
      </v-col>

      <v-spacer></v-spacer>

      <v-col cols="auto">
        {{weekCarbo}}/{{recommendCarbo}}g
      </v-col>
    </v-row>

    <!--단백질 권장비율/ 1주 섭취양 / 권장량 그래프 --> 
    <v-row>
      <v-col cols="auto">
        <v-icon x-small color="rgb(54, 162, 235)" left>mdi-checkbox-blank</v-icon>
        단백질(권장비율) <span class="grey--text">{{recommendProteinPercent}}%</span>
      </v-col>

      <v-spacer></v-spacer>

      <v-col cols="auto">
        {{weekProtein}}/{{recommendProtein}}g
      </v-col>
    </v-row>
    
    <!--지방 권장비율/ 1주 섭취양 / 권장량 그래프 --> 
    <v-row>
      <v-col cols="auto">
        <v-icon x-small color="rgb(255, 205, 86)" left>mdi-checkbox-blank</v-icon>
        지방(권장비율) <span class="grey--text">{{recommendFatPercent}}%</span>
      </v-col>

      <v-spacer></v-spacer>

      <v-col cols="auto">
        {{weekFat}}/{{recommendFat}}g
      </v-col>
    </v-row>

  </div>
    
</template>

<script>
//import axios from "axios

export default {
    
    props: {
        "dates" : Array,
    },

    //mounted(){
    //    this.dates[0], this.dates[1]이용
    //
    //    axios.get("/api/report/"+ this.date)
    //    .then(()=>{
    //          
    //         
    //    });
    //},

    data(){
        return {
            recommendCarboPercent: 59,     //일일 권장 탄수화물 비율
            recommendCarbo : 258,          //일일 권장 탄수화물 양,
            weekCarbo : 272,               //일주일 동안 섭취 탄수화물 양

            recommendProteinPercent : 15,  //일일 권장 단백질
            recommendProtein: 129,         //일일 권장 단백질 양
            weekProtein : 71,              //일주일 동안 섭취 단백질 양

            recommendFatPercent: 26,       //일일 권장 지방
            recommendFat: 57,              //일일 권장 지방 양
            weekFat : 55,                  //일주일 동안 섭취 지방 양
        }
    },

    
}
</script>

<style>

</style>