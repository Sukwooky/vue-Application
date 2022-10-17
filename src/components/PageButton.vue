<template>
    <v-card>
        <v-card-text>

            <v-row align="center" justify="center" class="mt-4 mb-4">
            
                <v-btn @click="backBtn" class="mr-5" color="primary" outlined>
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>

                <v-btn @click="nextBtn" class="ml-5" color="primary" outlined>
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>    
            </v-row>
        </v-card-text>
    </v-card>

</template>

<script>
export default {
    props: {
      "backURL" : String,
      "nextURL" : String
    },
    
    methods : {

        backBtn(){
            this.$router.push(this.backURL)
            .catch(()=>{
                console.log("같은 페이지 입니다.")
            });
        },

        nextBtn(){
            this.$router.push(this.nextURL)
            .catch(()=>{
                console.log("같은 페이지 입니다.")
            });
        }
  }
}
</script>

<style>

</style>