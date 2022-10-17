import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'


Vue.use(Vuex);

export const store = new Vuex.Store({

    state : {
        infoTarget : 0,   //0:체중감량 1:근육증량 2:체중유지
        infoActivity : 0, //0:가벼운활동 1:일상적업무 2:심한활동
        infoGender : 0,   //0:남자 1:여자
        infoHeight : 180, //키
        infoWeight : 50,  //몸무게
        infoName : null,
        infoEmail : null,
        infoPassword : null,

        isLogin : false,
        isLoginError : false,
        LoginErrorMsg : "",

        userInfo : {
            name : "정원석"
        }
    },

    getters : {
        getUserInfo_name(state){
            return state.userInfo.name;
        }
    }
    ,
    mutations : {
        

        //로그인 성공 시
        loginSuccess(state, payload){
            state.isLogin = true;
            state.isLoginError = false;

            state.userInfo = payload
        },
        
        //로그인 실패 시
        loginError(state, msg){
            state.isLogin = false;
            state.isLoginError = true;
            state.LoginErrorMsg = msg;

            setTimeout(()=>{
                state.isLoginError = false;
                state.LoginErrorMsg = '';
            },3000);
        },

        logout(state){
            state.isLogin = false;
            state.isLoginError = false;

            state.userInfo = null;
        },
    },

    actions : {
        login({dispatch}, loginObj){
            
            axios.post('/api/user/login', loginObj)
            .then(res => {
                
                // 로그인 일치 정보 o (success: true, token: token)
                // 로그인 일치 정보 x (success: false, message)
                if (res.data.success === true){             // 로그인 일치 정보 o
                    
                    //1. localStoarge에 token 저장(새로고침 방지)
                    let token = res.data.token;
                    localStorage.setItem('access-token', token);

                    //2. getMemberInfo
                    dispatch('getMemberInfo');

                }else{                                     // 로그인 일치 정보 x      
                    console.log(res.data.success, res.data.message)
                    
                    this.commit('loginError', res.data.message);
                }

            })
            .catch(err =>{
                console.log(err.message)
            })
        },

        getMemberInfo({commit}){
            
            //1. localStoarge에서 token 얻음(새로고침 방지)
            let token = localStorage.getItem('access-token');
            let config = {
                headers : {
                    'access-token' : token
                }
            };

            //2. token을 헤더에 포함시켜서 유저 정보를 요청
            axios.get('/api/user/auth', config)
            .then(response => {
                
                //auth o (success: true, user_id, user_name)
                //auth x (success: false, message)
                if (response.data.success === true){    //auth o
                    
                    let userInfo = {
                        user_id : response.data.user_id,
                        user_name : response.data.user_name,
                    };
                    console.log(response.data.success, response.data.user_name)
                    commit('loginSuccess', userInfo)
                }else{                                  //auth x
                    console.log(response.data.success, response.data.message);
                }
            })
            .catch(err => {
                console.log(err.message);
            });
        },

        logout({commit}) {

            localStorage.removeItem('access-token');

            commit('logout')
        },
    }
});