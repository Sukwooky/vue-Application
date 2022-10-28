<template>
  
  <v-container fluid>

    <!--1. 카메라/갤러리/텍스트 이미지(분석됨) 보기-->
    <div class="mb-5 border-image">
      <v-img :src="cImg" @error="changeNotDefault" 
      height="200px" contain/>
    </div>

    <v-divider></v-divider>

    <!--2. 전체 섭취량, 등록할 음식 버튼-->
    <div class="mt-3 mb-3">
      <v-row align="center">
        
        <!--전체 섭취량-->
        <v-col cols="auto">
          <h2>
            전체 섭취량 <span class="blue--text font-weight-medium">({{ foodsKcal }}kcal)</span>
          </h2>
        </v-col>
          
        <!--등록할 음식 버튼-->
        <v-col cols="auto">
          <v-btn dark color="blue" outlined fab small> 
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <!--3. 날짜선택, 식사 선택(아침/점심/저녁)-->
    <div class="mt-3 mb-8 pa-3 border">
      <v-row align="center">
        
        <!--날짜선택-->
        <v-col cols="auto">
          <v-dialog v-model="dateDialog">
                   
              <!--Dialog 유발-->
              <template v-slot:activator="{ on, attrs }">
                  <v-chip color="blue" dark v-bind="attrs" v-on="on" label>
                    {{date}}
                  </v-chip>
              </template>
            
              <!--Dialog 내용-->
              <v-card>
                  <v-card-text class="text-center">                        
                      <v-date-picker v-model="date" 
                      color="blue" header-color="blue">
                      </v-date-picker>
                  </v-card-text>
              </v-card>
          </v-dialog>
        </v-col>

        <!--식사 선택(아침/점심/저녁)-->
        <v-col cols="auto">
          <v-dialog v-model="mealDialog" scrollable max-width="300px">
              
              <!--Dialog 유발-->
              <template v-slot:activator="{ on, attrs }">
                <v-chip v-bind="attrs" v-on="on" label
                color="blue" dark>{{meal}}</v-chip>
              </template>
              
              <!--Dialog 내용-->
              <v-card class="text-center">
                <v-card-title class="justify-center">
                  <div>식사 선택</div>
                </v-card-title>
                
                <v-divider></v-divider>
                
                <v-card-text class="justify-center" style="height: 300px;">
                  <v-radio-group v-model="meal" column>
                    <v-radio label="아침" value="아침"></v-radio>
                    <v-radio label="점심" value="점심"></v-radio>
                    <v-radio label="저녁" value="저녁"></v-radio>
                  </v-radio-group>
                </v-card-text>
                
                <v-divider></v-divider>
                
                <v-card-actions class="justify-center">
                  <v-btn color="blue darken-1" text
                  @click="mealDialog = false">확인</v-btn>
                </v-card-actions>
              </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </div>

    <!--4. 영양정보 확인, 등록할 음식들-->
    <div class="mt-3 mb-8 pa-3 border">

      <!--영양정보 확인-->
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-dialog v-model="nutrientDialog" scrollable max-width="300px">
              
              <!--Dialog 유발-->
              <template v-slot:activator="{ on, attrs }">
                <v-chip v-bind="attrs" v-on="on" label outlined color="blue" dark>
                  <v-icon left>mdi-flower</v-icon>영양정보<v-icon right>mdi-flower</v-icon>
                </v-chip>
              </template>
              
              <!--Dialog 내용-->
              <v-card class="text-center">
                <v-card-title class="justify-center">
                  <div>영양 정보</div>
                </v-card-title>
                
                <v-divider></v-divider>
                
                <v-card-text class="justify-center" style="height: 300px;">
                    <!--Tab 선택-->
                    <v-tabs v-model="nutrientTab" background-color="transparent" color="blue" grow>
                      <v-tab v-for="tabItem in nutrientTabItems" :key="tabItem.tabIdx">
                        {{ tabItem.tabName }}
                      </v-tab>
                    </v-tabs>

                    <!--Tab 선택시 내용-->
                    <v-tabs-items v-model="nutrientTab" class="mt-5">
                      <v-tab-item v-for="tabItem in nutrientTabItems" :key="tabItem.tabIdx">
                        <div v-if="tabItem.tabIdx === 0">
                          <NutrientSum :foods="foods" :foodsKcal="foodsKcal"/>
                        </div>
                        <div v-else-if="tabItem.tabIdx === 1">
                          <NutrientDetail :foods="foods" :foodsKcal="foodsKcal"/>
                        </div>
                      </v-tab-item>
                    </v-tabs-items>
                </v-card-text>
                
                <v-divider></v-divider>
                
                <v-card-actions class="justify-center">
                  <v-btn color="blue darken-1" text
                  @click="nutrientDialog = false">확인</v-btn>
                </v-card-actions>
              </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      
      <!--등록할 음식들-->
      <v-row align="center" justify="center">
        <v-col cols="auto" v-for="food in foods" :key="food.id">
            <v-chip link close @click:close="deleteFood(food.id)">{{food.name}}</v-chip>
        </v-col>
      </v-row>
    </div>

    <v-divider></v-divider>

    <!--5. 입력-->
    <div class="mt-3 mb-3">
      
      <!--입력 제목-->
      <v-row align="center" class="mb-1">
        <v-col cols="auto">
          <h2>비율 입력</h2>
        </v-col>
      </v-row>
      
      <!--입력-->
      <v-card class="border" tile>
        <v-list>
          <v-list-item-group v-model="inputModel" mandatory color="blue">
            <v-list-item v-for="(item, i) in inputItems " :key="i" class="mb-2 rounded-pill">
                                            
                <v-list-item-title>
                  <div class="text--primary font-weight-bold mb-2">{{item.title}}</div>
                </v-list-item-title>
               
                <v-list-item-icon>
                    {{ratioFoodsKcal(item.ratio)}}kcal
                </v-list-item-icon>  
                   
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>

    <!--6. 등록-->
    <div class="mt-10">
      <v-form @submit.prevent="submit">
          <v-btn type="submit" block x-large rounded color="primary">입력 완료</v-btn>
      </v-form>
    </div>
  </v-container>


</template>

<script>
import axios from 'axios'
const NutrientSum = () => import("@/components/Register/Meal/NutrientSum.vue");
const NutrientDetail = () => import("@/components/Register/Meal/NutrientDetail.vue");

export default {
  
  name : 'MealRegister',
  mounted(){
    
    //음식추가(카메라,갤러리,텍스트)를 통해 여기로 왔을떄 
    
    //1. 날짜 전달
    //2. 아침/점심/저녁 전달
    //3. 음식(kcal, 이름, 이미지URL, 영양소)전달

  },

  components : {
    "NutrientSum" : NutrientSum,
    "NutrientDetail" : NutrientDetail,

  },

  data(){
    return {
      
      //날짜선택, 식사 선택(아침/점심/저녁)
      date : this.$route.params.initDate,
      dateDialog : false,

      meal : this.$route.params.initMeal,
      mealDialog : false,

      //영양정보 확인, 등록할 음식들
      nutrientTab: null,
      nutrientTabItems : [
        {tabIdx: 0, tabName : '영양정보 전체'},
        {tabIdx: 1, tabName : '영양정보 상세'},
      ],
      nutrientDialog : false,

      foods : this.$route.params.initFoods,
      
      //입력
      inputModel : 3,
      inputItems : [
        { title: '1/4소접시', ratio : 0.25},
        { title: '1/2소접시', ratio : 0.5},
        { title: '3/4소접시', ratio : 0.75},
        { title: '1소접시', ratio : 1},
        { title: '2소접시', ratio : 2},
      ],

      //이미지 관련
      default_img : true,
      rtrimgURL : null,       //s3에 업로드되면 얻기, POST요청 (afas.jpg)
      rtrimgPreURL : null,    //s3에 업로드되면 얻기, v-img:src (~)
    }
  },

  computed : {
      
      //default_img = true -> defaultimg
      //default_img = false -> rtrimgPreURL
      cImg(){
          return this.default_img ? require('@/assets/default.png') : this.rtrimgPreURL;
      },

      foodsKcal(){
        let sum_kcal = 0
        for(let i=0; i< this.foods.length; i++){
          sum_kcal += this.foods[i].kcal;
        } 
        return sum_kcal
      },

      ratioFoodsKcal(){
        return (ratio) => {
          let sum_kcal = 0
          for(let i=0; i< this.foods.length; i++){
            sum_kcal += this.foods[i].kcal;
          } 
          return ratio * sum_kcal;
        }
      }
      
  },

  methods : {
      
      //default_img = true -> false
      changeNotDefault(){
          this.default_img = false;
      },

      deleteFood(id){
        this.foods.pop(id)
      },

      async submit(){
        
        // 섭취 음식 등록 정보
        const foodObj = {
            date : this.date,
            meal : this.meal,
            foods : this.foods,
            ratio : this.inputItems[this.inputModel].ratio
        };
        console.log(foodObj);
        
        await axios.post('/api/foods/join', foodObj)
          .then(res => {
              if (res.data.isSuccess === true){
                  
                  console.log(res.data)
                  //this.$router.push('/authentication/sign-in')
              }else{
                  console.log(res.data)
              }
          })
          .catch(err =>{
              console.log(err.message)
          })
      }
  }
}
</script>
<style scoped>
.border {
  border: 2px dashed;
  border-color: #80CAFF;

}
.border-image{
  border : 3px solid ;
}

</style>