<template>

    <v-container class=" fill-height">
        <v-row justify="center">
            <v-col cols="auto">
                <!--
                <router-link to="/">
                    <v-img :src="require('@/assets/logo.png')" width="100" class="mx-auto mb-6" />
                </router-link>
                -->

                <v-card width="460">
                    <v-card-text class="text-center px-12 py-16">                        
                        <ValidationObserver ref="observer" v-slot="{invalid}">
                            <v-form @submit.prevent="submit">

                                <ValidationProvider rules="required|max:10" name="이름" v-slot="{errors}">
                                  <v-text-field v-model="name" label="이름" :counter="10" :error-messages="errors"
                                  prepend-icon="mdi-account-badge" clearable
                                  />
                                </ValidationProvider>

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

                                <ValidationProvider :rules="{
                                    required : true,
                                    min : 4,
                                    confirmed : '비밀번호'
                                }" name="비밀번호 확인" v-slot="{errors}">
                                    <v-text-field v-model="cofirm_password" label="비밀번호 확인" :error-messages="errors"
                                    prepend-icon="mdi-lock-outline" clearable class="mt-4"
                                    :append-icon="confirm_passwordShow ? 'mdi-eye' : 'mdi-eye-off'" :type="confirm_passwordShow ? 'text' : 'password'"
                                    @click:append="confirm_passwordShow = !confirm_passwordShow"></v-text-field>
                                </ValidationProvider>
                                
                                <v-btn type="submit" block x-large rounded color="primary" class="mt-4" :disabled="invalid">회원가입</v-btn>

                            </v-form>
                        </ValidationObserver>
                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'

import {extend, ValidationObserver, ValidationProvider } from "vee-validate"
import {required, email, confirmed} from "vee-validate/dist/rules"
extend("max", (val,params) =>{
  const limit = params[0]
  if (val && val.length > limit){
    return `해당 필드는 ${limit}자를 초과 할 수 없습니다.`
  }
  return true
});
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
extend('confirmed', {
    ...confirmed,
    message : '입력된 비밀번호가 일치하지 않습니다.'

});

export default {
    data(){
        return {
          //name : this.$store.state.infoName,
          //email: this.$store.state.infoEmail,

          passwordShow: true,
          //password: this.$store.state.infoPassword,

          confirm_passwordShow: true,
          cofirm_password: '',
        }
    },

    computed : {
        name : {
            get(){
                return this.$store.state.infoName
            },
            set(val){
                this.$store.state.infoName = val
            }
        },
        email : {
            get(){
                return this.$store.state.infoEmail
            },
            set(val){
                this.$store.state.infoEmail = val
            }
        },

        password : {
            get(){
                return this.$store.state.infoPassword
            },
            set(val){
                this.$store.state.infoPassword = val
            }
        },
    },

    components : {
      ValidationObserver,
      ValidationProvider
    },

    methods : {
        async submit(){
            // 입력조건 유효성 결과
            const result = await this.$refs.observer.validate()
            
            // 입력조건 유효성 결과 만족시
            if (result){

                // 회원가입 정보
                const info = {
                    infoTarget : this.$store.state.infoTarget,
                    infoActivity : this.$store.state.infoActivity,
                    infoGender : this.$store.state.infoGender,
                    infoHeight : this.$store.state.infoHeight,
                    infoWeight : this.$store.state.infoWeight,
                    infoName : this.$store.state.infoName,
                    infoEmail : this.$store.state.infoEmail,
                    infoPassword : this.$store.state.infoPassword
                };

                await axios.post('/api/user/joinform', info)
                    .then(res => {
                        console.log(res)
                        this.$router.push('/authentication/sign-in')
                    })
                    .catch(err =>{
                        console.log(err.message)
                    })
            }
        }
    }
}
</script>

<style>

</style>