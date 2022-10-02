<template>

    <v-container class="fill-height">
        <v-row justify="center">
            <v-col cols="auto">
                <v-card width="460">
                    
                    <v-card-text class="text-center px-12 py-16">
                        <div class="text-h4 text--primary font-weight-black mb-10">로그인</div>

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
                        
                        <div class="mt-10">
                            <router-link to="/authentication/info" class="text-decoration-none mr-3">
                                회원가입
                            </router-link> | 
                            <router-link to="/authentication/sign-in" class="text-decoration-none ml-3">
                                로그인
                            </router-link>
                        </div>

                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
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

    methods : {
        async submit(){
            const res = this.$refs.observer.validate()
            if (res) {
                alert("로그인 프로세스")
            }
        }
    }
}
</script>

<style>

</style>