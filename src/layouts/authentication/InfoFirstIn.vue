<template>

    <v-container class="fill-height">
        <v-row justify="center">
            <v-col cols="auto">
                <v-card width="460">
                        
                        <v-card>
                            <v-card-text class="pa-4 text--primary font-weight-black">당신의 목표는 무엇인가요?</v-card-text>
                            <v-list>
                                <v-list-item-group v-model="TargetModel" mandatory color="indigo">
                                  <v-list-item v-for="(item, i) in TargetItems " :key="i" class="mb-1 rounded-pill">

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
                            <v-card-text class="pa-4 text--primary font-weight-black">당신의 평소 활동량은 어떤가요?</v-card-text>
                            <v-list>
                                <v-list-item-group v-model="ActivityModel" mandatory color="indigo">
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
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
export default {
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
              { title: '가벼운 활동', subTitle: '앉아있는 시간이 많아요.(사무직, 운전기사 등)', icon:'mdi-battery-10'},
              { title: '일상적 업무', subTitle: '움직이는 시간이 많아요.(영업직, 택배기사 등)', icon:'mdi-battery-50'},
              { title: '심한 활동',   subTitle: '일상의 대부분 운동해요.(운동선수, 트레이너 등)', icon:'mdi-battery-charging-100'}
            ]

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