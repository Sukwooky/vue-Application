<template>
 
    <v-row class="mt-3">
        <v-col cols="auto">
            <v-list-item>
                <v-list-item-content>                        
                    <v-list-item-title >
                      일일 탄수화물
                    </v-list-item-title>
                    <v-list-item-content>
                        <v-progress-linear v-model="knowledge" height="20" buffer-value="40">
                          <strong>{{ Math.ceil(knowledge) }}%</strong>
                        </v-progress-linear>
                    </v-list-item-content>
                </v-list-item-content>
            </v-list-item>
        </v-col>
        <v-col cols="auto">
            <v-list-item>
                <v-list-item-content>                        
                    <v-list-item-title >
                      일일 탄수화물
                    </v-list-item-title>
                    <v-list-item-content>
                        <v-progress-linear v-model="knowledge" height="20">
                          <strong>{{ Math.ceil(knowledge) }}%</strong>
                        </v-progress-linear>
                    </v-list-item-content>
                </v-list-item-content>
            </v-list-item>
        </v-col>
        <v-col cols="auto">
            <v-list-item>
                <v-list-item-content>                        
                    <v-list-item-title >
                      일일 탄수화물
                    </v-list-item-title>
                    <v-list-item-content>
                        <v-progress-linear v-model="knowledge" height="20" size>
                          <strong>{{ Math.ceil(knowledge) }}%</strong>
                        </v-progress-linear>
                    </v-list-item-content>
                </v-list-item-content>
            </v-list-item>
        </v-col>
    </v-row>
    
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
            knowledge: 33,
        }
    }
    
}
</script>

<style>

</style>