<template>
    <v-row class="mt-3">
          
        <v-col cols="auto">
            <div>일일 권장</div>
            <strong class="grey--text">{{allKcal}}kcal</strong>

            <div>섭취</div>
            <strong class="grey--text">{{todayKcal}}kcal</strong>
        </v-col>
        
        <v-spacer></v-spacer>
          
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
    //
    //    });
    //},

    data(){
        return {
            allKcal : 2067,
            todayKcal : 500,
        }
    },

    computed: {
        leftKcal(){
            return this.allKcal - this.todayKcal;
        },

        leftPercentKcal(){
            return (this.todayKcal / this.allKcal) * 100
        },
    }
    
}
</script>

<style>

</style>