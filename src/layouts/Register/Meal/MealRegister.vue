<template>
  
  <v-container fluid>

    <!--1. 카메라/갤러리/텍스트 이미지(분석됨) 보기-->
    <LabelImage :foods="foods" :isDefaultLabelImage="isDefaultImg" :labelImgPreURL="imgPreURL"
    class="mb-5"/>
    
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
          <v-dialog v-model="addDialog" scrollable max-width="300px">
              
              <!--Dialog 유발-->
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on"  
                dark color="blue" outlined fab small> 
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </template>
              
              <!--Dialog 내용-->
              <v-card class="text-center">
                <v-card-text>
                  <AddFoodDialog :date="date" :meal="meal" v-on:add-food="addFood"/>
                </v-card-text>
              </v-card>

          </v-dialog>
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
                    <v-tabs v-model="nutrientTabModel" background-color="transparent" color="blue" grow>
                      <v-tab v-for="tabItem in nutrientTabItems" :key="tabItem.tabIdx">
                        {{ tabItem.tabName }}
                      </v-tab>
                    </v-tabs>

                    <!--Tab 선택시 내용-->
                    <v-tabs-items v-model="nutrientTabModel" class="mt-5">
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
        <v-col cols="auto" v-for="(food,index) in foods" :key="`food-${index}`">
            <v-chip link close @click:close="deleteFood(index)">{{food.name}}</v-chip>
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
            <v-list-item v-for="(inputItem) in inputItems " :key="inputItem.inputIdx" class="mb-2 rounded-pill">
                                            
                <v-list-item-title>
                  <div class="text--primary mb-2">{{inputItem.title}}</div>
                </v-list-item-title>
               
                <v-list-item-icon>
                    {{ratioFoodsKcal(inputItem.ratio)}}kcal
                </v-list-item-icon>  
                   
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>

    <!--6. 등록-->
    <div class="mt-10">
      <v-form @submit.prevent="submit">
          <v-btn type="submit"
          block x-large rounded color="primary">입력 완료</v-btn>
      </v-form>
      <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="submitDialog">
        <!--Dialog 내용-->
          <v-card>
            <v-card-title class="justify-center error white--text">
              <v-icon left>mdi-alert-decagram</v-icon>주의<v-icon right>mdi-alert-decagram</v-icon>
            </v-card-title>
            <v-card-text class="text-center">
              <h2 class="pa-12">{{submitErrMsg}}</h2>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn text @click="closeSubmitDialog()">확인</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
    </div>
  </v-container>

</template>

<script>
const LabelImage = () => import("@/components/Register/Image/LabelImage.vue");
const AddFoodDialog = () => import("@/components/Register/Meal/AddFoodDialog.vue");
const NutrientSum = () => import("@/components/Register/Meal/NutrientSum.vue");
const NutrientDetail = () => import("@/components/Register/Meal/NutrientDetail.vue");

import axios from 'axios'

export default {
  
  name : 'MealRegister',
  components : {
    "LabelImage" : LabelImage,
    "AddFoodDialog" : AddFoodDialog,
    "NutrientSum" : NutrientSum,
    "NutrientDetail" : NutrientDetail,
  },

  created(){
    const hasNotInitImgPreURL = !this.$route.params.initImgPreURL;
    this.imgPreURL = hasNotInitImgPreURL ? null : this.$route.params.initImgPreURL ;
    if (!this.imgPreURL){
      this.isDefaultImg = true;
      this.imgURL = null;
    }else{
      this.isDefaultImg = false;
      
      const urlArr = this.imgPreURL.split('/');
      this.imgURL = urlArr[urlArr.length - 1];
    }
    
    const hasNotInitDate = !this.$route.params.initDate;
    this.date = hasNotInitDate ? (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : this.$route.params.initDate;

    const hasNotInitMeal = !this.$route.params.initMeal;
    this.meal = hasNotInitMeal ?  '아침' : this.$route.params.initMeal;

    const hasNotInitFoods = !this.$route.params.initFoods;
    this.foods = hasNotInitFoods ? [] : this.$route.params.initFoods; 

  },

  data(){
    return {
      
      //router params 관련
      date : null,
      dateDialog : false,

      meal : null,
      mealDialog : false,

      foods : null,

      isDefaultImg : true,
      imgURL : null,       //s3에 업로드되면 얻기, POST요청 (afas.jpg)
      imgPreURL : null,    //s3에 업로드되면 얻기, v-img:src (http: ~~ /afas.jpg)

      //음식추가시 Dialog 관련
      addDialog : false,


      //전체,상세 영양정보 Dialog, Tab 관련
      nutrientDialog : false,
      nutrientTabModel: 0,
      nutrientTabItems : [
        {tabIdx: 0, tabName : '영양정보 전체'},
        {tabIdx: 1, tabName : '영양정보 상세'},
      ],

      //비율 Item 관련
      inputModel : 3,
      inputItems : [
        { inputIdx: 0, title: '1/4소접시', ratio : 0.25},
        { inputIdx: 1, title: '1/2소접시', ratio : 0.5},
        { inputIdx: 2, title: '3/4소접시', ratio : 0.75},
        { inputIdx: 3, title: '1소접시', ratio : 1},
        { inputIdx: 4, title: '2소접시', ratio : 2},
      ],

      //음식등록시 Dialog 관련 
      submitDialog : false,
      submitErrMsg : "",
    }
  },

  computed : {
      
      //isDefaultImg = true -> defaultimg
      //isDefaultImg = false -> imgPreURL
      cImg(){
          return this.isDefaultImg ? require('@/assets/default.png') : this.imgPreURL;
      },

      foodsKcal(){
        let sum_kcal = 0;

        if(Array.isArray(this.foods) && this.foods.length === 0){
          //
        }else{
          for(let i=0; i< this.foods.length; i++){
              sum_kcal += this.foods[i].kcal;
          } 
        }
        
        return sum_kcal
      },

      ratioFoodsKcal(){
        return (ratio) => {
          let sum_kcal = 0
          
          if(Array.isArray(this.foods) && this.foods.length === 0){
            //
          }else{
            for(let i=0; i< this.foods.length; i++){
                sum_kcal += this.foods[i].kcal;
            } 
          }
          return ratio * sum_kcal;
        }
      },
  },

  methods : {
      
      //isDefaultImg = true -> false
      changeNotDefault(){
        this.isDefaultImg = false;
      },

      addFood(foodObject){
        this.foods.push(foodObject);
        this.addDialog = false;
      },

      deleteFood(id){
        this.foods.splice(id,1);
      },

      async submit(){

          if(Array.isArray(this.foods) && this.foods.length === 0){
              this.submitDialog = true;
              this.submitErrMsg = "최소한 1개의 음식은 등록해주세요"
          }
          else{
            
            // 섭취 음식 등록 정보
            const foodObj = {
                date : this.date,
                meal : this.meal,
                imgURL : this.imgURL,
                foods : this.foods,
                ratio : this.inputItems[this.inputModel].ratio
            };
            console.log(foodObj);

            await axios.post('/api/foods/join', foodObj)
              .then(res => {
                  if (res.data.isSuccess === true){
                      console.log(res.data)
                  }else{
                      console.log(res.data)
                  }
              })
              .catch(err =>{
                  console.log(err.message)
              })
          }
      },

      closeSubmitDialog(){
        this.submitDialog = false;
        this.submitErrMsg = "";
      },
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