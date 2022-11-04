<template>
    <v-container fluid>
        
        <!--텍스트 제목-->
        <div class="mb-5">
            <div class="text-center mb-10">
                <h1 class="text--primary font-weight-black">텍스트 등록</h1>
            </div>
            <div>
            <div class="blue--text"><strong class="black--text">등록 날짜:</strong> {{this.date}}</div>
            <div class="blue--text"><strong class="black--text">등록 종류:</strong> {{this.meal}}</div>
            </div>
        </div>

        <!--텍스트 등록, 등록 버튼-->
        <div>
            <v-row align="center" justify="center">
                <v-col cols="12">
                    
                    <ValidationObserver ref="observer" v-slot="{invalid}">
                        <v-form @submit.prevent="submit">
                            <div>
                                <!--음식 텍스트 등록-->
                                <div class="mb-3">
                                    <div class="text-center">
                                        <h2 class="text--primary font-weight-black">음식 검색</h2>
                                    </div>
                                    <div>
                                        <ValidationProvider :rules="{
                                            required : true,
                                            isfood : true,
                                            }" name="음식" v-slot="{errors}">
                                            <v-text-field v-model="food" label="음식" :error-messages="errors"
                                            prepend-icon="mdi-food" clearable 
                                            ></v-text-field>                                    
                                        </ValidationProvider>
                                    </div>
                                </div>
                                
                                <!--등록 버튼-->
                                <div>
                                    <v-btn type="submit" block x-large rounded color="primary" class="mt-4" :disabled="invalid">등록하기</v-btn>
                                </div>
                            </div>
                        </v-form>
                    </ValidationObserver>

                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import axios from 'axios'
import {extend, ValidationObserver, ValidationProvider } from "vee-validate"
import {required} from "vee-validate/dist/rules"
extend('required', {
  ...required,
  message : '해당 필드는 필수값입니다.'
});

extend('isfood', async (value) => {

    const info = {food : value};

    const foodSearch = food => {
        return new Promise((resolve) => {

            axios.post('/api/food/', food)
                .then(res => {
                    resolve(res)
                })
                .catch(err =>{
                    console.log(err.message)
                });
        });
    }

    const result = await foodSearch(info);
    if (result.data.isSuccess === false){
        return '해당 음식은 등록할 수 없습니다.'
    }
    return true
});

export default {
    name : "AddFoodDialog",
    components : {
        ValidationObserver,
        ValidationProvider
    },

    props : {
        date : {
            type : String
        },

        meal : {
            type : String
        }
    },

    data(){
        return {

            //음식 관련
            food : null,
        }
    },

    methods : {
        async submit(){
            // 입력조건 유효성 결과
            const result = await this.$refs.observer.validate()
            
            // 입력조건 유효성 결과 만족시
            if (result){
                
                const info = {food : this.food};
                axios.post("/api/food", info)
                    .then((res) => {
                        console.log(res.data.food);
                        if(res.data.isSuccess === true){

                            let foodObject = res.data.food
                            this.$emit("add-food", foodObject);
                            this.food = null;
                            
                        }else{
                            //이미 validate로 판별함 -> 일어날수가 x
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
        },

    }
}
</script>

<style scoped>
.border-image{
  border : 3px solid ;
}
</style>