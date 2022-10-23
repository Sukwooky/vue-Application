<template>
    <v-row class="mt-3">

        <!--일일 권장 Kcal와 섭취 Kcal--> 
        <v-col cols="auto">
            <div>일일 권장</div>
            <strong class="black--text">{{recommendKcal}}kcal</strong>

            <div>
                섭취
                <v-chip v-if="isKcalExcess" class="my-2" color="red" text-color="white">초과</v-chip>
            </div>
            <strong class="black--text">{{dateKcal}}kcal</strong>
        </v-col>
        
        <v-spacer></v-spacer>
          
        <!--잔여 Kcal 그래프--> 
        <v-col cols="auto">
            <v-progress-circular :value="leftPercentKcal" 
            rotate="90" size="100" width="13" color="blue" button>
                <div class="text-center">
                    <strong class="grey--text">잔여</strong><br>
                    <strong class="grey--text">{{leftKcal}}kcal</strong>
                </div>
            </v-progress-circular>
        </v-col>
    </v-row>

</template>

<script>
//import axios from "axios"

export default {

    props: {
        "date" : String,
    },

    //mounted(){
    //    axios.get("/api/diary/"+ this.date)
    //    .then(()=>{
    //          recommendKcal -> Number
    //          dateKcal -> Number     
    //    });
    //},

    data(){
        return {
            recommendKcal : 2067,     //일일 권장 Kcal
            dateKcal : 300,           //사용자의 날짜별 Kcal
        }
    },

    computed: {
        isKcalExcess(){
            return this.recommendKcal < this.dateKcal
        },

        leftKcal(){
            if (this.recommendKcal < this.dateKcal){
                return 0
            }else{
                return this.recommendKcal - this.dateKcal;
            }
        },

        leftPercentKcal(){
            return (this.dateKcal / this.recommendKcal) * 100
        },
    }
    
}
</script>

<style>

</style>