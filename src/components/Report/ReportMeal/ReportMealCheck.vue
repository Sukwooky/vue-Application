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
            <v-col cols="auto" v-for="(food,index) in this.breakFastArray" :key="`food-${index}`">

                <!--등록 O-->
                <v-btn v-if="food.isEaten" icon color="red" x-small>
                  <v-icon>mdi-checkbox-marked</v-icon>
                </v-btn>
                
                <!--등록 X-->
                <v-menu v-else bottom origin="center center" transition="scale-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon color="blue" x-small v-bind="attrs" v-on="on">
                            <v-icon>mdi-plus-box-outline</v-icon>
                      </v-btn>
                    </template>
                    
                    <v-list>
                      <v-list-item v-for="(menuItem) in menuItems" :key="menuItem.menuIdx" @click="goImageRegister(menuItem.component, food.date, '아침')">
                        <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>            
        </v-row>

        <!--점심-->
        <v-row align="center">
            <v-col cols="auto">
                <div>점심</div>
            </v-col>
            <v-col cols="auto" v-for="(food,index) in this.lunchArray" :key="`food-${index}`">
                
                <!--등록 O-->
                <v-btn v-if="food.isEaten" icon color="red" x-small>
                  <v-icon>mdi-checkbox-marked</v-icon>
                </v-btn>
                
                <!--등록 X-->
                <v-menu v-else bottom origin="center center" transition="scale-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon color="blue" x-small v-bind="attrs" v-on="on">
                            <v-icon>mdi-plus-box-outline</v-icon>
                      </v-btn>
                    </template>
                    
                    <v-list>
                      <v-list-item v-for="(menuItem) in menuItems" :key="menuItem.menuIdx" @click="goImageRegister(menuItem.component, food.date, '점심')">
                        <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>            
        </v-row>

        <!--저녁-->
        <v-row align="center">
            <v-col cols="auto">
                <div>저녁</div>
            </v-col>
            <v-col cols="auto" v-for="(food,index) in this.dinnerArray" :key="`food-${index}`">
                
                <!--등록 O-->
                <v-btn v-if="food.isEaten" icon color="red" x-small>
                  <v-icon>mdi-checkbox-marked</v-icon>
                </v-btn>
                
                <!--등록 X-->
                <v-menu v-else bottom origin="center center" transition="scale-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon color="blue" x-small v-bind="attrs" v-on="on">
                            <v-icon>mdi-plus-box-outline</v-icon>
                      </v-btn>
                    </template>
                    
                    <v-list>
                      <v-list-item v-for="(menuItem) in menuItems" :key="menuItem.menuIdx" @click="goImageRegister(menuItem.component, food.date, '저녁')">
                        <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>            
        </v-row>
    </div>

</template>

<script>
export default {
    name : "ReportMealCheck",
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

            menuItems: [
                { menuIdx:0, title: '카메라/갤러리', component : "MobileRegister" },
                { menuIdx:1, title: '텍스트', component : "TextRegister" },
            ],
        }
    },

    methods : {

        goImageRegister(component, date, meal){
            this.$router.push(
            {
                name : component,
                params : {
                    initDate : date,
                    initMeal : meal,
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