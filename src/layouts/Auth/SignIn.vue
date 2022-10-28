<template>

    <v-container fluid>
        
        <v-card>
                    
            <v-card-text class="text-center px-12 py-16">

                <h1 class="text--primary font-weight-black">로그인</h1>
                        
                <ValidationObserver ref="observer" v-slot="{invalid}">
                    <v-form @submit.prevent="submit">
                                
                        <ValidationProvider :rules="{
                            required : true,
                            email : true,
                            }" name="이메일" v-slot="{errors}">
                            <v-text-field v-model="email" label="이메일" :error-messages="errors"
                            prepend-icon="mdi-email-outline" clearable 
                            ></v-text-field>                                    
                        </ValidationProvider>
                                
                        <ValidationProvider rules="required|min:4" name="비밀번호" v-slot="{errors}">
                            <v-text-field v-model="password" label="비밀번호" :error-messages="errors"
                            prepend-icon="mdi-lock-outline" clearable class="mt-4"
                            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" :type="passwordShow ? 'text' : 'password'"
                            @click:append="passwordShow = !passwordShow"></v-text-field>
                        </ValidationProvider>

                        <v-btn type="submit" block x-large rounded color="primary" class="mt-4" :disabled="invalid">로그인</v-btn>

                    </v-form>
                </ValidationObserver>
                
                <v-alert :value='isLoginError' type="error" class="mt-5" 
                transition="scale-transition" dense outlined>
                    {{LoginErrorMsg}}
                </v-alert>        

                <div class="mt-10">
                    <router-link to="/authentication/info-first" class="text-decoration-none mr-3">
                        회원가입
                    </router-link> | 
                    <router-link to="/authentication/sign-in" class="text-decoration-none ml-3">
                        로그인
                    </router-link>
                </div>

            </v-card-text>

        </v-card>
    </v-container>

</template>

<script>

import {mapState} from 'vuex'

import {extend, ValidationObserver, ValidationProvider } from "vee-validate"
import {required, email} from "vee-validate/dist/rules"
extend("min", (val,params) =>{
  const limit = params[0]
  if (val && val.length < limit){
    return `해당 필드는 최소 ${limit}자 입니다.`
  }
  return true
});
extend('required', {
  ...required,
  message : '해당 필드는 필수값입니다.'
});
extend('email',{
  ...email,
  message : '입력된 정보가 이메일 형식이 아닙니다.'
});

export default {
    name : "SignIn",
    data(){
        return {

            email: null,
            
            passwordShow: true,
            password: null,
        }
    },

    components : {
      ValidationObserver,
      ValidationProvider
    },

    computed : {
        ...mapState(['isLoginError', 'LoginErrorMsg'])
    },

    methods : {
        async submit(){

            // 입력조건 유효성 결과
            const res = this.$refs.observer.validate()

            // 입력조건 유효성 결과 만족시
            if (res) {
                
                // 로그인 정보
                const loginObj = {
                    email : this.email,
                    password : this.password
                };
                
                this.$store.dispatch('login', loginObj)
                //.then(()=>{
                //    this.$router.push('/')
                //})
            }
        }
    }
}
</script>

<style>

</style>