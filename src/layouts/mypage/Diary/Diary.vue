<template>

    <v-container fluid>

      <!--달력, 날짜별 몸무게-->
      <div class="mb-3">
          <v-row>

            <!--달력-->
            <v-col cols="auto">
              <!--Dialog-->
              <v-dialog v-model="dateDialog">

                  <!--Dialog 유발-->
                  <template v-slot:activator="{ on, attrs }">
                      <v-btn color="blue" dark v-bind="attrs" v-on="on">
                        {{date}}<v-icon right>mdi-calendar</v-icon>
                      </v-btn>
                  </template>

                  <!--Dialog 내용-->
                  <v-card>
                      <v-card-text class="text-center">                        
                          <v-date-picker v-model="date" 
                          color="blue" header-color="blue"
                          :events="dateArrayEvents" event-color="red lighten-1">
                          </v-date-picker>
                      </v-card-text>
                  </v-card>
              </v-dialog>

              <!--Dialog 왼쪽 버튼-->
              <v-btn @click="minusDate" class="ml-3" color="primary" icon>
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              
              <!--Dialog 오른쪽 버튼-->
              <v-btn @click="plusDate" color="primary" icon :disabled="computedDisabled">
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>

            </v-col>

            <v-spacer></v-spacer>
            
            <!--날짜별 몸무게 입력 버튼-->
            <v-col cols="auto">
                <v-btn @click="goWeightRegister" 
                class="white--text" color="blue" >
                  kg<v-icon right>mdi-human-child</v-icon>
                </v-btn>
            </v-col>

          </v-row>
      </div>

      <v-divider></v-divider>

      <!--날짜별 칼로리-->
      <div class="mb-3">
        <DiaryKcal :date="date"/>
      </div>

      <v-divider></v-divider>

      <!--날짜별 영양소-->
      <div class="mb-3">
        <DiaryNutrient :date="date"/>
      </div>

      <v-divider></v-divider>

      <!--날짜별 식사기록-->
      <div class="mb-3">
        <DiaryMeal :date="date"/>
      </div>
      
    </v-container>
</template>

<script>
const DiaryKcal = () => import("@/components/Diary/DiaryKcal.vue");
const DiaryNutrient = () => import("@/components/Diary/DiaryNutrient.vue");
const DiaryMeal = () => import("@/components/Diary/DiaryMeal.vue");

export default {
    name : 'Diary',
    components : {
      "DiaryKcal" : DiaryKcal,
      "DiaryNutrient" : DiaryNutrient,
      "DiaryMeal" : DiaryMeal,
    },

    mounted () {
      //2022-09-30 이런식으로 불러오기
      this.dateArrayEvents = [
        '2022-10-16','2022-10-17' 
      ];
    },

    data(){
        return {
            dateArrayEvents: null,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

            dateDialog: false,

        }
    },

    computed : {
      
      //달력 다음날 이동 버튼 가능여부 
      computedDisabled(){

        const today = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
        if (this.date === today){
          return true
        }else{
          return false
        }
      }
    },

    methods : {

      //event 통해 날짜 할당시 format
      leftPad(value) {
          if (value >= 10) {
              return value;
          }

          return `0${value}`;
      },

      //event 통해 날짜 할당시 format
      toStringByFormatting(source, delimiter = '-') {
          const year = source.getFullYear();
          const month = this.leftPad(source.getMonth() + 1);
          const day = this.leftPad(source.getDate());

          return [year, month, day].join(delimiter);
      },

      minusDate(){
          let temp_date = new Date(this.date);
          temp_date.setDate(temp_date.getDate() - 1);

          this.date = this.toStringByFormatting(temp_date);

      },

      plusDate(){
          let temp_date = new Date(this.date);
          temp_date.setDate(temp_date.getDate() + 1);

          this.date = this.toStringByFormatting(temp_date);
      },
      
      goWeightRegister(){
        this.$router.push(
          {
            name : "WeightRegister",
            params : {
              initDate : this.date,
              initDateArrayEvents : this.dateArrayEvents
            }
          }
        );
      },

    },

}
</script>

<style>

</style>