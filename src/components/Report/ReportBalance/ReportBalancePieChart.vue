<template>
    <div class="text-center mt-10 border">
        <DoughnutChartGenerator :chart-options="chartOptions" :chart-data="chartData"/>
    </div>

</template>

<script>
import { Doughnut as DoughnutChartGenerator} from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale} from 'chart.js'
import chartjsPluginDoughnutlabel from "chartjs-plugin-doughnutlabel-rebourne";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, chartjsPluginDoughnutlabel, ChartDataLabels)

export default {
    name : 'ReportBalancePieChart',
    props: {
        "dates" : Array,
    },

    components: {
        DoughnutChartGenerator
    },

    //mounted(){
    //  
    //
    //    axios.get("/api/report/"+ this.date)
    //    .then(()=>{
    //          
    //         
    //    });
    //},

    data() {
        return {

            chartData: {
                labels: ['탄수화물', '단백질', '지방'],
                datasets: [
                {
                    backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                    data: [59, 26, 15],
                    
                    hoverBackgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                    //hoverBorderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'], 
                    hoverBorderWidth : 7,
                    cutout : '50%',

                    datalabels: {
                        display : true,
                        font : {
                            size: 17,
                            family : 'Jua',
                        },
                        formatter: (value, context) => {
                            const textlabel = this.chartData.labels[context.dataIndex];
                            const textvalue = value;
                            const text = textlabel + ": " + textvalue + "%"
                            return text ; 
                        },
                    },
                }]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 5000,
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
                                const text = tooltipItem.label + ': ' + tooltipItem.formattedValue + '%';
                                return text;
                            }
                        },
                        boxWidth: 10,
                        bodyFont: {
                            size: 14,
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
                        text : '권장 영양소 비율(%)'
                    },

                    //그래프 안 제목 표시
                    doughnutlabel: {
                        labels: [	
                        {
                            text: '권장 비율',
                            font: {
                                family : 'Jua',
                                size: '30',
                                weight: 'bold',
                            }
                        },
                        {
                            text: '3대 영양소',
                            font: {
                                family : 'Jua',
                                size: '20',
                                weight: 'bold',
                            }
                        }],
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