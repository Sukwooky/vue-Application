<template>

    <v-container fluid>
      <v-card>

          <PageTab/>

          <v-card>
              <v-card-text class="pa-4 text--primary font-weight-black text-center">당신의 성별은 무엇인가요?</v-card-text>
                  <v-list>
                      <v-list-item-group v-model="GenderModel" mandatory color="blue">
                        <v-list-item v-for="(item) in GenderItems " :key="item.genderItemIdx" class="mb-1 rounded-pill">

                          <v-list-item-icon>
                            <v-icon>{{item.icon}}</v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                              <div class="text--primary font-weight-bold">{{item.title}}</div>
                          </v-list-item-content>

                          <v-list-item-icon>
                            <v-icon>mdi-check</v-icon>
                          </v-list-item-icon>

                        </v-list-item>
                      </v-list-item-group>
                  </v-list>
          </v-card>

          <v-divider></v-divider>

          <v-card>
              <v-card-text class="pa-4 text--primary font-weight-black text-center">당신의 키는 얼마인가요?</v-card-text>
              <v-card-text>
                  <v-row class="mb-4" justify="space-between">
                      <v-col class="text-left">
                          <span class="text-h2 font-weight-light" v-text="this.$store.state.infoHeight"></span>
                          <span class="subheading font-weight-light mr-1">cm</span>
                      </v-col>
                  </v-row>

                  <v-slider v-model="heightModel" :color="height_color" track-color="grey" min="100" max="250">
                      <template v-slot:prepend>
                        <v-icon :color="height_color" @click="height_decrement">mdi-minus</v-icon>
                      </template>

                      <template v-slot:append>
                        <v-icon :color="height_color" @click="height_increment">mdi-plus</v-icon>
                      </template>
                  </v-slider>
              </v-card-text>
          </v-card>
                      
          <v-divider></v-divider>

          <v-card>
              <v-card-text class="pa-4 text--primary font-weight-black text-center">당신의 몸무게는 어떤가요?</v-card-text>
              <v-card-text>
                  <v-row class="mb-4" justify="space-between">
                      <v-col class="text-left">
                          <span class="text-h2 font-weight-light" v-text="this.$store.state.infoWeight"></span>
                          <span class="subheading font-weight-light mr-1">kg</span>
                      </v-col>
                  </v-row>

                  <v-slider v-model="weightModel" :color="weight_color" track-color="grey" min="0" max="200">
                      <template v-slot:prepend>
                        <v-icon :color="weight_color" @click="weight_decrement">mdi-minus</v-icon>
                      </template>

                      <template v-slot:append>
                        <v-icon :color="weight_color" @click="weight_increment">mdi-plus</v-icon>
                      </template>
                  </v-slider>
              </v-card-text>
          </v-card>

          <v-divider></v-divider>
          
          <PageButton :backURL="backURL" :nextURL="nextURL" />

      </v-card>
    </v-container>

</template>

<script>
const PageTab = () => import("@/components/Auth/AuthPageTab.vue");
const PageButton = () => import("@/components/Auth/AuthPageButton.vue");

export default {
    name : "InfoSecondIn",
    components : {
        "PageTab" : PageTab,
        "PageButton" : PageButton
    },
      
    data(){
        return {
            
            GenderItems : [
              { genderItemIdx: 0, title: '남자', icon: 'mdi-human-male' },
              { genderItemIdx: 1, title: '여자', icon: 'mdi-human-female' },
            ],

            backURL : "/authentication/info-first",
            nextURL : "/authentication/info-sign-up",

            //GenderModel : this.$store.state.infoGender,

            //heightModel: this.$store.state.infoHeight,
            //weightModel : this.$store.state.infoWeight
        }
    },
    computed: {
        
        GenderModel : {
          get(){
            return this.$store.state.infoGender
          },
          set(value){
            this.$store.state.infoGender = value
          }
        },

        // v-slider의 v-model 
        heightModel : {
          get(){
            return this.$store.state.infoHeight
          },
          set(value){
            this.$store.state.infoHeight = value
          }
        },

        // v-slider의 v-model 
        weightModel : {
          get(){
            return this.$store.state.infoWeight
          },

          set(value){
            this.$store.state.infoWeight = value
          }
        },


        height_color () {
            if (this.$store.state.infoHeight < 140) return 'red'
            if (this.$store.state.infoHeight < 210) return 'green'
            if (this.$store.state.infoHeight < 250) return 'red'
            return 'red'
        },

        weight_color () {
            if (this.$store.state.infoWeight < 30) return 'red'
            if (this.$store.state.infoWeight < 150) return 'green'
            if (this.$store.state.infoWeight < 200) return 'red'
            return 'red'
        },
    },

    methods: {
        height_decrement () {
          this.$store.state.infoHeight--
        },
        height_increment () {
          this.$store.state.infoHeight++
        },
        weight_decrement () {
          this.$store.state.infoWeight--
        },
        weight_increment () {
          this.$store.state.infoWeight++
        },
    },
}
</script>

<style>

</style>