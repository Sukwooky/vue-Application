<template>
  <div class="text-center mt-10 border">
    <BarChartGenerator
      :chart-options="chartOptions"
      :chart-data="chartData"
    />
  </div>

</template>

<script>
import { Bar as BarChartGenerator } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels)

export default {
  name : 'ReportBalanceBarChart',
  components: {
    BarChartGenerator
  },
  data() {
    return {
      chartData: {
        labels: ['10.17','10.18','10.19','10.20','10.21','10.22','10.23'],
        datasets: [
          {
            label: '지방',
            stack: 'combined',
            type : 'bar',
            backgroundColor: 'rgb(255, 205, 86)',
            data: [30, 30, 30, 30, 30, 30, 30],
            datalabels: {
                display : false,
            },
          },
          {
            label: '단백질',
            stack: 'combined',
            type : 'bar',
            backgroundColor: 'rgb(54, 162, 235)',
            data: [10, 10, 10, 10, 10, 10, 10],
            datalabels: {
                display : false,
            },
          },
          {
            label: '탄수화물',
            stack: 'combined',
            type : 'bar',
            backgroundColor: 'rgb(255, 99, 132)',
            data: [60, 60, 60, 60, 60, 60, 60],
            datalabels: {
                display : false,
            },
          },
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 5000,
        },
        scales: {
            x: {
              stacked: true,
              display: true,

              //x축 label 설정
              ticks: {
                padding: 10,
                font : {
                  family : 'Jua',
                  size : 10,
                },
              },

              grid: {
                display : true,         //이건 default
                drawOnChartArea : true, //이건 default
                drawBorder : true,      
                drawTicks : false,      
              },

            },
            y: {
              stacked: true,
              display : true,
              
              //y축 label 설정
              ticks: {
                display : true,
                stepSize : 5, 
                font : {
                  family : 'Jua',
                  size : 10,
                },

                callback : (value) =>{
                  if(value === 25){
                    return '25%'
                  }else if(value === 50){
                    return '50%'
                  }
                }
              },

              grid : {
                display : true,         //이건 default
                drawOnChartArea : true, //이건 default
                drawBorder : true,      
                drawTicks : true,      
                color: function(context) {
                
                  if (context.tick.value === 25) {
                    return 'rgb(255, 205, 86)';
                  }else if(context.tick.value === 50) {
                    return 'rgb(255, 99, 132)';
                  }
                },
              }

            }
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
                    label : (tooltipItem) => {
                        const text = tooltipItem.dataset.label + '(' + tooltipItem.formattedValue + '%)';
                        return text;
                    }
                },
                boxWidth: 10,
                titleFont: {
                    size: 14,
                    family : 'Jua'
                },
                bodyFont : {
                    size: 13,
                    family : 'Jua'
                },
            },

            //그래프 제목 표시
            title : {
                display : true,
                font : {
                    family : 'Jua',
                    size : 20
                },
                text : '일주일 간 섭취 비율(%)'
            },
        },
        
      }
    }
  }
}
</script>
<style  scoped>
.border {
  border: 3px solid ;
}
</style>