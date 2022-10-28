<template>
  <div>
    <div class="mb-3">
      <v-row>
        <!--달력-->
        <v-col cols="auto">
          <!--Dialog-->
          <v-dialog v-model="dateDialog">
                
              <!--Dialog 유발-->
              <template v-slot:activator="{ on, attrs }">
                  <v-btn color="blue" dark v-bind="attrs" v-on="on">
                    {{computedDate}}
                  </v-btn>
              </template>
              
              <!--Dialog 내용-->
              <v-card>
                  <v-card-text class="text-center">                        
                      <v-date-picker v-model="dates" range readonly
                      color="blue" header-color="blue">
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
      </v-row>
    </div>
    
    <v-divider></v-divider>
    
    <div class="mb-3">
      <ReportMealPieChart :dates="dates"/>
    </div>

    <v-divider></v-divider>

    <div class="mb-3">
      <ReportMealCheck :dates="dates"/>
    </div>


  </div>
</template>

<script>
const ReportMealPieChart = () => import("@/components/Report/ReportMeal/ReportMealPieChart.vue");
const ReportMealCheck = () => import("@/components/Report/ReportMeal/ReportMealCheck.vue");

export default {
  name : "ReportMeal",
  components : {
    "ReportMealPieChart" : ReportMealPieChart,
    "ReportMealCheck" : ReportMealCheck,
  },

  mounted(){

      //'일주일전' ~ '오늘' 불러오기 (String)
      let now = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000);
      const beforeday = new Date(now.setDate(now.getDate() - 6)).toISOString().substr(0,10);
      const today = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0,10);

      this.dates = [beforeday, today];
  },

  data(){
    return {
        dates: [],

        dateDialog: false,
    }
  },

  computed : {
    
    //달력 버튼 내용 표시
    computedDate(){

      const beforday = this.formatDate(this.dates[0]);
      const today = this.formatDate(this.dates[1])

      return beforday + '~' + today;
    },

    //달력 다음날 이동 버튼 가능여부 
    computedDisabled(){

      const today = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
      if (this.dates[1] === today){
        return true
      }else{
        return false
      }
    }

  },

  methods : {

      //computed 통해 날짜 할당시 format
      formatDate(date){
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${year.substring(2,4)}/${month}/${day}`
      },

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
          let start_date = new Date(this.dates[0]);
          let end_date = new Date(this.dates[1]);

          start_date.setDate(start_date.getDate() - 1);
          end_date.setDate(end_date.getDate() - 1);

          //(String)
          this.dates =[this.toStringByFormatting(start_date),this.toStringByFormatting(end_date)];

      },

      plusDate(){
          let start_date = new Date(this.dates[0]);
          let end_date = new Date(this.dates[1]);

          start_date.setDate(start_date.getDate() + 1);
          end_date.setDate(end_date.getDate() + 1);

          //(String)
          this.dates =[this.toStringByFormatting(start_date), this.toStringByFormatting(end_date)];
      },
  }
}
</script>

<style>

</style>