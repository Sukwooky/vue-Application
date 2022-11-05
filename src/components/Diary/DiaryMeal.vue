<template>
    <div>

        <!--식사기록 제목 및 식사 등록 버튼-->
        <div class="my-3">
            <v-row>
                
                <!--식사기록 제목-->
                <v-col cols="auto">
                    <h3>식사 기록</h3>
                </v-col>
                <v-spacer></v-spacer>

                <!--식사등록 버튼-->
                <v-col cols="auto">
                    <v-menu bottom origin="center center" transition="scale-transition">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn dark color="blue" outlined fab v-bind="attrs" v-on="on">
                                <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                        </template>

                        <v-list>
                          <v-list-item v-for="(menuItem) in menuItems" :key="menuItem.menuIdx" @click="goImageRegister(menuItem.component)">
                            <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
        </div>

        <!--식사기록 아침-->
        <div>
            아침 <strong class="black--text">{{breakfastKcal}}kcal</strong> / <strong class="grey--text">{{recommendKcal}}kcal</strong>
        </div>
        <div>
            <vueper-slides class="no-shadow" slide-multiple :bullets= "false" :arrows= "false"
             :gap="3" :slide-ratio="1 / 4" :dragging-distance="200" :visibleSlides="4">
                <vueper-slide v-for="(food,index) in breakfastArray" :key="`food-${index}`" :image="require(`@/assets/${food.imgUrl}`)" :title="`${food.kcal}kcal`" 
                :style="'color : white'" @click.native="slideClick(food)"/>  
            </vueper-slides>  
        </div>

        <!--식사기록 점심-->
        <div>
            점심 <strong class="black--text">{{lunchKcal}}kcal</strong> / <strong class="grey--text">{{recommendKcal}}kcal</strong>
        </div>
        <div>
            <vueper-slides class="no-shadow" slide-multiple :bullets= "false" :arrows= "false"
             :gap="3" :slide-ratio="1 / 4" :dragging-distance="200" :visibleSlides="4">
                <vueper-slide v-for="(food,index) in lunchArray" :key="`food-${index}`" :image="require(`@/assets/${food.imgUrl}`)" :title="`${food.kcal}kcal`" 
                :style="'color : white'" @click.native="slideClick(food)"/>  
            </vueper-slides>  
        </div>

        <!--식사기록 저녁-->
        <div>
            저녁 <strong class="black--text">{{dinnerKcal}}kcal</strong> / <strong class="grey--text">{{recommendKcal}}kcal</strong>
        </div>
        <div>
            <vueper-slides class="no-shadow" slide-multiple :bullets= "false" :arrows= "false"
             :gap="3" :slide-ratio="1 / 4" :dragging-distance="200" :visibleSlides="4">
                <vueper-slide v-for="(food,index) in dinnerArray" :key="`food-${index}`" :image="require(`@/assets/${food.imgUrl}`)" :title="`${food.kcal}kcal`" 
                :style="'color : white'" @click.native="slideClick(food)"/>  
            </vueper-slides>  
        </div>
    </div>

</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
    name : 'DiaryMeal',
    props: {
        date : {
            type : String,
            default : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        },
    },

    components: { VueperSlides, VueperSlide },

    //mounted(){
    //    axios.get("/api/diary/"+ this.date)
    //    .then(()=>{
    //          breakfastKcal -> Number
    //          breakfastArray -> Array
    //
    //          lunckKcal -> Number    
    //          lunchArray -> Array
    //
    //          dinnerKcal -> Number   
    //          dinnerArray -> Array  
    //
    //          recommendKcal -> Number      
    //    });
    //},

    data(){
        return {

            breakfastKcal : 50,     //사용자의 날짜별 아침 칼로리
            breakfastArray : [
                { idx: 0, imgUrl:'jjigae.jpg', kcal: 100}, { idx: 1, imgUrl:'jjigae.jpg', kcal: 90}, { idx: 2, imgUrl:'jjigae.jpg', kcal: 80}, { idx: 3, imgUrl:'sidebar.jpg', kcal: 70}
            ],

            lunchKcal : 0,         //사용자의 날짜별 점심 칼로리
            lunchArray :  [
                { idx: 0, imgUrl:'jjigae.jpg', kcal: 60}, { idx: 1, imgUrl:'jjigae.jpg', kcal: 50},
            ],

            dinnerKcal : 0,        //사용자의 날짜별 저녁 칼로리
            dinnerArray :  [
                { idx: 0, imgUrl:'jjigae.jpg', kcal: 40}
            ],

            recommendKcal : 200,
            
            menuItems: [
                {menuIdx: 0, title: '카메라/갤러리', component : "MobileRegister" },
                {menuIdx: 1, title: '텍스트', component : "TextRegister" },
            ],
        }
    },

    methods : {
        slideClick(food){
            console.log("ㅎㅇ", food);
        },

        goImageRegister(component){
            this.$router.push(
            {
                name : component,
                params : {
                    initDate : this.date,
                    initMeal : '아침',
                }
            });
        },
    }
}
</script>

<style>

</style>