<template>
    <v-container class="fill-height">
        <v-row justify="center">
            <v-col cols="auto">
                <v-card width="460">

                    <v-tabs v-model="tab" background-color="primary" dark centered>
                        <v-tab v-for="item,index in items" :key="index">
                          {{ item.tab }}
                        </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        
                        <v-tab-item>
                          <v-card flat>
                            <InfoFirstIn/>
                          </v-card>
                        </v-tab-item>

                        <v-tab-item>
                          <v-card flat>
                            <InfoSecondIn/>
                          </v-card>
                        </v-tab-item>

                        <v-tab-item>
                          <v-card flat>
                            <InfoSignUp/>
                          </v-card>
                        </v-tab-item>
                    </v-tabs-items>

                    <v-row align="center" justify="center" class="mt-4 mb-4">

                            <v-btn @click="backBtn" class="mr-10" color="primary">
                              <v-icon>mdi-arrow-left</v-icon>
                            </v-btn>

                            <v-btn @click="nextBtn" class="ml-10" color="primary">
                              <v-icon>mdi-arrow-right</v-icon>
                            </v-btn>

                    </v-row>
                    
                    <v-card class="text-center">
                        <div>
                            <router-link to="/authentication/sign-in" class="text-decoration-none">로그인</router-link>
                        </div>
                    </v-card>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
const InfoFirstInVue = () => import('./InfoFirstIn.vue')
const InfoSecondInVue = () => import( './InfoSecondIn.vue')
const InfoSignUp = () => import("./InfoSignUp.vue")

export default {
  data () {
    return {
      tab: null,
      items: [
        { tab: '1단계'},
        { tab: '2단계'},
        { tab: '3단계'},
      ],
    }
  },


  components : {
    InfoFirstIn: InfoFirstInVue,
    InfoSecondIn: InfoSecondInVue,
    InfoSignUp : InfoSignUp
  },

  methods : {
    backBtn(){
        if (this.tab === 0){
            this.tab = 0
        }else{
            this.tab -= 1
        }

    },

    nextBtn(){
        if (this.tab === 2){
            this.tab = 2
        }else{
            this.tab += 1
        }

    }
  }
}
</script>