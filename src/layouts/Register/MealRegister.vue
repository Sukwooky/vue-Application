<template>
  
  <v-container fluid>

    <!--카메라/갤러리/텍스트 이미지(분석됨) 보기-->
    <div class="mb-5 border">
      <v-img :src="cImg" @error="changeNotDefault" 
      height="200px" contain/>
    </div>

    <v-divider></v-divider>

    <!--전체 섭취량-->
    <div class="mt-3">
      <h2>
        전체 섭취량 <span class="blue--text font-weight-medium">({{ this.foods[0].kcal }}kcal)</span>
      </h2>
    </div>

    <!--날짜선택, 식사 선택(아침/점심/저녁)-->
    <div class="mt-3 mb-3">
      <v-row align="center">

        <!--날짜선택-->
        <v-col cols="auto">
          <v-dialog v-model="dateDialog">
                   
              <!--Dialog 유발-->
              <template v-slot:activator="{ on, attrs }">
                  <v-chip color="blue" dark v-bind="attrs" v-on="on">
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
                <v-chip v-bind="attrs" v-on="on"
                color="blue" dark>{{meal}}</v-chip>
              </template>
              
              <!--Dialog 내용-->
              <v-card class="text-center">
                <v-card-title class="justify-center">
                  <div>식사 선택</div>
                </v-card-title>
                
                <v-divider></v-divider>
                
                <v-card-text class="justify-center"
                style="height: 300px;">
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
        <v-col cols="auto">
          <v-btn dark color="blue" outlined fab>
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    
    <!--등록할 음식들, 등록한 음식들 영양정보-->
    <div class="mt-3 mb-3">
      <v-row align="center" class="border">
        <v-col cols="auto"  v-for="food in foods" :key="food.id">
            <v-chip close @click:close="deleteFood(food.id)">{{food.name}}</v-chip>
        </v-col>
      </v-row>
    </div>

  </v-container>


</template>

<script>
export default {
  
  name : 'MealRegister',
  mounted(){
    
    //음식추가(카메라,갤러리,텍스트)를 통해 여기로 왔을떄 
    
    //1. 날짜 전달
    //2. 아침/점심/저녁 전달
    //3. 음식(kcal, 이름, 이미지URL, 영양소)전달

  },

  data(){
    return {
      
      date : this.$route.params.initDate,
      dateDialog : false,

      meal : this.$route.params.initMeal,
      mealDialog : false,

      foods : this.$route.params.initFoods,
      
      //이미지 관련
      default_img : true,
      rtrimgURL : null,       //s3에 업로드되면 얻기, POST요청 (afas.jpg)
      rtrimgPreURL : null,    //s3에 업로드되면 얻기, v-img:src (~)
    }
  },

  computed :{
      
      //default_img = true -> defaultimg
      //default_img = false -> rtrimgPreURL
      cImg(){
          return this.default_img ? require('@/assets/default.png') : this.rtrimgPreURL;
      }
  },

  methods : {
      
      //default_img = true -> false
      changeNotDefault(){
          this.default_img = false;
      },

      deleteFood(id){
        this.foods.pop(id)
      }
  }
}
</script>
<style scoped>
.border {
  border: 3px solid ;
}
</style>