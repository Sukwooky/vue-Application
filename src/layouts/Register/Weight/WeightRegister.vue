<template>
  <v-container fluid>

      <!--뒤로이동 버튼, 제목 -->
      <div class="mb-5">
        <v-row justify="space-between" align="center">
          
          <v-col cols="4">
            <v-btn @click="backDiary" color="blue" outlined>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          
          <v-col cols="4">
            <h3 class="text-center font-weight-medium">몸무게 입력</h3>
          </v-col>
          
          <v-col cols="4">
            <!--정렬위함-->
          </v-col>
        </v-row>
      </div>

      <!--달력, Dialog 버튼-->
      <div class="mb-3 mt-3">
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
            </v-col>  
            
            <v-spacer></v-spacer>
            
            <!--Dialog 버튼-->
            <v-col cols="auto"> 

              <!--Dialog 왼쪽 버튼-->
              <v-btn @click="minusDate" class="ml-3" color="primary" icon>
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              
              <!--Dialog 오른쪽 버튼-->
              <v-btn @click="plusDate" color="primary" icon :disabled="computedDisabled">
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-col>            
          </v-row>
      </div>

      <v-divider></v-divider>

      <!--최대/최소 몸무게, 입력 몸무게-->
      <div class="mt-10">
        <v-row align="center">
          
          <v-col cols="auto">
            <div class="pl-3">
              <div>
                <span class="grey--text">MAX</span> <strong class="red--text">{{maxWeight}}kg</strong>
              </div>
              <div>
                <span class="grey--text">MIN</span> <strong class="blue--text">{{minWeight}}kg</strong>
              </div>
            </div>

          </v-col>

          <v-spacer></v-spacer>
          
          <v-col cols="auto">
            <h1 class="font-weight-medium">
              {{displayWeight}} kg
            </h1>
          </v-col>

        </v-row>
      </div>

      
      <!--몸무게 입력-->
      <div class="mt-10">
        <ValidationObserver ref="observer" v-slot="{invalid}">
          <v-form @submit.prevent="submit">
            <ValidationProvider rules="required|numeric" name="몸무게" v-slot="{errors}">
              <v-text-field v-model="weight" label="몸무게" :error-messages="errors"
              prepend-icon="mdi-account-badge" clearable type="number" suffix="kg"/>
            </ValidationProvider>

          <v-btn type="submit" block x-large rounded color="primary" class="mt-4" :disabled="invalid">몸무게 등록</v-btn>
          </v-form>
        </ValidationObserver>
      </div>

  </v-container>  
</template>

<script>
import {extend, ValidationObserver, ValidationProvider } from "vee-validate"
import {required, numeric} from "vee-validate/dist/rules"

extend('required', {
  ...required,
  message : '해당 필드는 필수값입니다.'
});

extend('numeric', {
  ...numeric,
  message : '해당 필드는 숫자만 입력해야합니다.'
})

export default {

    name : 'WeightRegister',
    components : {
      ValidationObserver,
      ValidationProvider,
    },

    created(){
      const hasNotInitDate = !this.$route.params.initDate;
      this.date = hasNotInitDate ? (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : this.$route.params.initDate;
    },

    mounted () {
      this.dateArrayEvents = ['2022-11-21', '2022-11-22'];
      this.maxWeight = 70
      this.minWeight = 50
    },

    data(){
        return {
            dateArrayEvents : null,
            date : null,
            dateDialog: false,

            weight : null,
            maxWeight : null,
            minWeight : null,
        }
    },

    computed: {
      displayWeight(){
        if (this.weight === null){
          return '0.0'
        }else{
          return this.weight;
        }
      },

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
      
      async submit(){
            // 입력조건 유효성 결과
            const result = await this.$refs.observer.validate()
            
            // 입력조건 유효성 결과 만족시
            if (result){

                console.log(this.weight)
            }
      },

      backDiary(){
        this.$router.push(
          {
            name : "Diary",
          }
        );
      },
    }

}
</script>

<style>
.border {
  border: solid;
}
</style>