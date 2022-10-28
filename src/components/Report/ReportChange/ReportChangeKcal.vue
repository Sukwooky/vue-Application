<template>
  <div>  

    <!--칼로리 정보-->
    <v-row class="mt-3">

      <!--날짜별 섭취 칼로리, (오늘날짜 섭취-날짜별 섭취칼로리)-->
      <v-col cols="auto">
        <h2>{{dateKcal}}<span class="grey--text font-weight-thin">kcal</span></h2>
        <div :class="KcalColor">
          <v-icon :color="KcalIconColor">{{KcalIcon}}</v-icon>{{differKcal}} <span class="grey--text">오늘보다</span>
        </div>
      </v-col>

      <v-spacer></v-spacer>

      <!--섭취 최대 칼로리, 섭취 최소 칼로리-->
      <v-col cols="auto">
        <div>
          <div class="text-right">
            <strong class="red--text">{{maxKcal}}kcal</strong> <span class="grey--text">MAX</span> 
          </div>
          <div class="text-right">
            <strong class="blue--text">{{minKcal}}kcal</strong> <span class="grey--text">MIN</span> 
          </div>
        </div>
      </v-col>
    </v-row>

    <!--칼로리 그래프-->
    <div class="py-3 px-1 border">
      <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData"/>
    </div>

  </div>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import {Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, ChartDataLabels);

export default {
  name : 'ReportChangeKcal',
  components: {
    LineChartGenerator
  },

  mounted(){

  },

  data(){
    return {
      dateKcal : 3000,      //날짜 별 섭취 칼로리
      todayKcal : 3000,     //오늘날짜 섭취 칼로리

      maxKcal : 4302,       //사용자의 섭취 최대 칼로리
      minKcal : 100,        //사용자의 섭취 최소 칼로리
      recommendKcal : 2306, //사용자의 권장 칼로리 

      chartData: {
          labels: ['2022-10-16','2022-10-17','2022-10-18','2022-10-19','2022-10-20','2022-10-21','2022-10-22'],
          datasets: [     
            {
              label: '칼로리 변화',

              backgroundColor: '#1870d5',    //점 색깔
              pointBorderColor: '#1870d5',   //점 주위 색깔
              borderColor: '#1870d5',        //그래프 색깔
              borderWidth: 2,             //그래프 두께
              
              tension: 0.5,               //휘어짐 정도

              data: [4500, 3800, 1200, 3600, 4300, 0, 3000],

              datalabels: {
                display : true,
                formatter: function() {
                  return '';
                },

                listeners: {
                  click: (context) => {
                    this.dateKcal = this.chartData.datasets[0].data[context.dataIndex];
                  }
                },
              }
            },
          ]
      },
      
      chartOptions: {
        
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 5000,
        },
        interaction : {
          mode : 'index',
          intersect : false
        },

        //그래프 특징
        plugins: {
              
            //그래프 종류 표시
            legend: {              
                display: true,
                align : 'end',
                fullSize : false,
                labels :{
                  boxWidth : 10,
                  font : {
                    family : 'Jua',
                    size : 13,
                  },
                },

                onClick: () => {
                  //pass
                },
            },

            //그래프 점 표시
            tooltip: {
                callbacks : {
                  //매개변수 -> return 변화 매개변수 
                  label : () => {
                    return '';
                  }
                },
                boxWidth: 10,
                titleFont: {
                  size: 13,
                  family : 'Jua'
                }
            },

            //그래프 제목 표시
            title : {
                display : true,
                font : {
                  family : 'Jua',
                  size : 20
                },
                text : '섭취 칼로리(점 클릭)'
            },
        },
        
        //x축, y축
        scales: {
          x: {
            display: false,
            ticks: {
              padding: 5
            },
            grid: {
              display: false
            },
          },

          y: {
            display : true,
            min : 0,
              
            //y축 label 설정
            ticks: {
              display : true,
              stepSize : 5,
              font : {
                family : 'Jua',
                size : 10,
              },

              callback : (value) => {
                
                const isdiff = this.recommendKcal - value > 0;     //2306시 2305선택
                const diff = this.recommendKcal - value;           //2306-2305 = 1
                
                if(value % 500 === 0){
                  return value
                }else if(diff < 5 && isdiff){
                  return '권장 칼로리'
                }
              }
            },
            
            grid : {
              display : true,         //이건 default
              drawOnChartArea : true, //이건 default
              drawBorder : false,      
              drawTicks : true,      
              color: function(context) {
                if(context.tick.label === '권장 칼로리'){
                  return 'black'
                }else{
                  return 'rgba(0, 0, 0, 0.1)'
                }
              },
              borderDash : [5,5],
              lineWidth : 1.5
            }

          }
        },
      }

    }
  },

  computed : {

    KcalIcon(){
      if (this.dateKcal - this.todayKcal > 0) {
        //오늘보다 초과
        return 'mdi-menu-up'

      }else if (this.dateKcal - this.todayKcal === 0){
        //오늘보다 유지
        return 'mdi-minus'
      }else{
        //오늘보다 감소
        return 'mdi-menu-down'
      }
    },

    KcalIconColor(){
      if (this.dateKcal - this.todayKcal > 0) {
        //오늘보다 초과
        return 'red'

      }else if (this.dateKcal - this.todayKcal === 0){
        //오늘보다 유지
        return 'grey'
      }else{
        //오늘보다 감소
        return 'blue'
      }
    },

    KcalColor(){
      if (this.dateKcal - this.todayKcal > 0) {
        //오늘보다 초과
        return 'red--text'

      }else if (this.dateKcal - this.todayKcal === 0){
        //오늘보다 유지
        return 'grey--text' 
      }else{
        //오늘보다 감소
        return 'blue--text' 
      }
    },

    differKcal(){
      return Math.abs(this.todayKcal - this.dateKcal);
    }
  }
}
</script>

<style  scoped>
.border {
  border: 3px solid ;
}
</style>