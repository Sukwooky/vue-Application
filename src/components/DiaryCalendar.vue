<template>
    <div>
        
        <!--Dialog-->
        <v-dialog v-model="dialog">
            
            <!--Dialog 유발-->
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="blue" dark v-bind="attrs" v-on="on">{{date}}</v-btn>
            </template>
            
            <!--Dialog 내용-->
            <v-card>
                <v-card-text class="text-center">                        
                    <v-date-picker v-model="date" 
                    color="blue" header-color="blue"
                    :events="arrayEvents" event-color="red lighten-1"
                    >
                    </v-date-picker>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-btn @click="minusDate" class="ml-3" color="primary" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-btn @click="plusDate" color="primary" icon>
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>    
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            arrayEvents: null,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

            dialog: false,
        }
    },

    mounted () {
      //2022-09-30 이런식으로 불러오기
      this.arrayEvents = [
        '2022-10-16','2022-10-17' 
      ];
    },

    methods : {

        leftPad(value) {
            if (value >= 10) {
                return value;
            }

            return `0${value}`;
        },

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
    }
}
</script>

<style>

</style>