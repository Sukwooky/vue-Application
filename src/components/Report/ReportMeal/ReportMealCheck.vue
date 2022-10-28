<template>
    <div class="text-center mt-10">
        
        <!--날짜 정보-->
        <v-row align="center">
            <v-col>
                <div class="border">
                    <strong>{{dates[0]}} ~ {{dates[1]}}</strong>
                </div>
            </v-col>
        </v-row>

        <!--아침-->
        <v-row align="center">
            <v-col cols="auto">
                <div>아침</div>
            </v-col>
            <v-col cols="auto" v-for="food in this.breakFastArray" :key="food.id">
                <v-btn v-if="food.isEaten" icon color="red" x-small>
                  <v-icon>mdi-checkbox-marked</v-icon>
                </v-btn>
                <v-btn v-else icon color="blue" x-small
                @click="goMealRegister(food.date)">
                  <v-icon>mdi-plus-box-outline</v-icon>
                </v-btn>
            </v-col>            
        </v-row>

        <!--점심-->
        <v-row align="center">
            <v-col cols="auto">
                <div>점심</div>
            </v-col>
            <v-col cols="auto" v-for="food in this.lunchArray" :key="food.id">
                <v-btn v-if="food.isEaten" icon color="red" x-small>
                  <v-icon>mdi-checkbox-marked</v-icon>
                </v-btn>
                <v-btn v-else icon color="blue" x-small
                @click="goMealRegister(food.date)">
                  <v-icon>mdi-plus-box-outline</v-icon>
                </v-btn>
            </v-col>            
        </v-row>

        <!--저녁-->
        <v-row align="center">
            <v-col cols="auto">
                <div>저녁</div>
            </v-col>
            <v-col cols="auto" v-for="food in this.dinnerArray" :key="food.id">
                <v-btn v-if="food.isEaten" icon color="red" x-small>
                  <v-icon>mdi-checkbox-marked</v-icon>
                </v-btn>
                <v-btn v-else icon color="blue" x-small 
                @click="goMealRegister(food.date)">
                  <v-icon>mdi-plus-box-outline</v-icon>
                </v-btn>
            </v-col>            
        </v-row>
    </div>

</template>

<script>
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
            breakFastArray : [{id:1, isEaten: true, date : '2022-10-17'},{id:2, isEaten: false, date : '2022-10-17'},
            {id:3, isEaten: true, date : '2022-10-17'},{id:4, isEaten: false, date : '2022-10-17'},{id:5, isEaten: false, date : '2022-10-17'},
            {id:6, isEaten: false, date : '2022-10-17'},{id:7, isEaten: false, date : '2022-10-17'}],
            
            lunchArray : [{id:1, isEaten: false, date : '2022-10-17'},{id:2, isEaten: true, date : '2022-10-17'},
            {id:3, isEaten: false, date : '2022-10-17'},{id:4, isEaten: true, date : '2022-10-17'},{id:5, isEaten: false, date : '2022-10-17'},
            {id:6, isEaten: true, date : '2022-10-17'},{id:7, isEaten: false, date : '2022-10-17'}],
            
            dinnerArray : [{id:1, isEaten: false, date : '2022-10-17'},{id:2, isEaten: false, date : '2022-10-17'},
            {id:3, isEaten: false, date : '2022-10-17'},{id:4, isEaten: true, date : '2022-10-17'},{id:5, isEaten: true, date : '2022-10-17'},
            {id:6, isEaten: false, date : '2022-10-17'},{id:7, isEaten: true, date : '2022-10-17'}],
        }
    },

    methods : {

        
        goMealRegister(date){
            this.$router.push(
            {
                name : "MealRegister",
                params : {
                    initDate : date,
                    initMeal : '아침',
                    initFoods : [{
                        id : 0,
                        name : '김치찌개',
                        imgURL : 'jjigae.jpg',
                        kcal : 449,
                        nutrient : {
                          carbo : 50,
                          protein : 30,
                          fat : 30,
                        }
                    },{
                        id : 1,
                        name : '김밥',
                        imgURL : 'jjigae.jpg',
                        kcal : 449,
                        nutrient : {
                          carbo : 50,
                          protein : 30,
                          fat : 30,
                        }
                    },
                    {
                        id : 2,
                        name : '떡볶이',
                        imgURL : 'jjigae.jpg',
                        kcal : 449,
                        nutrient : {
                          carbo : 50,
                          protein : 30,
                          fat : 30,
                        }
                    }] 
                }
            });
        },
    }
}
</script>

<style  scoped>
.border {
  border: 3px solid ;
}
</style>