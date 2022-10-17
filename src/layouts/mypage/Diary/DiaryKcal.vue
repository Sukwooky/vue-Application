<template>
    <v-row class="mt-3">
          
        <v-col cols="auto">
            <v-list-item>
                <v-list-item-content>                        
                    <v-list-item-title class="">
                      일일 권장
                    </v-list-item-title>
                    <v-list-item-subtitle>{{allKcal}}</v-list-item-subtitle>
                    <v-list-item-title class="mt-1">
                      섭취
                    </v-list-item-title>
                    <v-list-item-subtitle>{{todayKcal}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-col>
        
        <v-spacer></v-spacer>
          
        <v-col cols="auto">
            <v-progress-circular :value="leftPercentKcal" 
            rotate="90" size="100" width="13" color="blue" button>
                <div class="text-center">
                    <strong class="black--text">잔여</strong><br>
                    <strong>{{leftKcal}}kcal</strong>
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