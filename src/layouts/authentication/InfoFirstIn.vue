<template>

    <v-container fluid>
        <v-card>

            <PageTab/>

            <v-card>
                <v-card-text class="pa-4 text--primary font-weight-black text-center">당신의 목표는 무엇인가요?</v-card-text>
                <v-list>
                    <v-list-item-group v-model="TargetModel" mandatory color="blue">
                        <v-list-item v-for="(item, i) in TargetItems " :key="i" class="mb-1 rounded-pill">

                            <v-list-item-icon>
                              <v-icon>{{item.icon}}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <div class="text--primary font-weight-bold ">{{item.title}}</div>
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
                <v-card-text class="pa-4 text--primary font-weight-black text-center">당신의 평소 활동량은 어떤가요?</v-card-text>
                <v-list>
                    <v-list-item-group v-model="ActivityModel" mandatory color="blue">
                        <v-list-item v-for="(item, i) in ActivityItems " :key="i" class="mb-2 rounded-pill">

                            <v-list-item-icon>
                                <v-icon>{{item.icon}}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-title>
                                <div class="text--primary font-weight-bold mb-2">{{item.title}}</div>
                                <div class="text--disabled font-weight-light">{{item.subTitle}}</div>
                            </v-list-item-title>

                            <v-list-item-icon>
                                <v-icon>mdi-check</v-icon>
                            </v-list-item-icon>

                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
                        
            <v-divider></v-divider>

            <PageButton :backURL="backURL" :nextURL="nextURL" />

        </v-card>
    </v-container>

</template>

<script>
const PageTab = () => import("@/components/PageTab.vue");
const PageButton = () => import("@/components/PageButton.vue");

export default {

    components : {
        "PageButton" : PageButton,
        "PageTab" : PageTab,
    },

    data(){
        return {
            
            //TargetModel : this.$store.state.infoTarget,
            //ActivityModel : this.$store.state.infoActivity,

            TargetItems : [
              { title: '체중감량', icon: 'mdi-human-child' },
              { title: '근육증량', icon: 'mdi-human-handsdown' },
              { title: '체중유지', icon: 'mdi-human' },
            ],

            ActivityItems : [
              { title: '가벼운 활동', subTitle: '앉아있는 시간이 많아요.', icon:'mdi-battery-10'},
              { title: '일상적 업무', subTitle: '움직이는 시간이 많아요.', icon:'mdi-battery-50'},
              { title: '심한 활동',   subTitle: '일상의 대부분 운동해요.', icon:'mdi-battery-charging-100'}
            ],

            backURL : "/authentication/info-first",
            nextURL : "/authentication/info-second",

        }
    },

    computed : {
        TargetModel : {
            get(){
                return this.$store.state.infoTarget
            },
            set(val){
                this.$store.state.infoTarget = val
            }
        },
        ActivityModel : {
            get(){
                return this.$store.state.infoActivity
            },
            set(val){
                this.$store.state.infoActivity = val
            }
        },
    },
    
}
</script>

<style>

</style>