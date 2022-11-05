<template>
    <v-container fluid>
        
        <!--카메라,갤러리 제목-->
        <div class="mb-5">
            <div class="text-center mb-10">
                <h1 class="text--primary font-weight-black">카메라 및 갤러리 등록</h1>
            </div>
            <div>
            <div class="blue--text"><strong class="black--text">등록 날짜:</strong> {{this.date}}</div>
            <div class="blue--text"><strong class="black--text">등록 종류:</strong> {{this.meal}}</div>
            </div>
        </div>

        <!--카메라,갤러리 등록, 등록 버튼-->
        <div>
            <v-row align="center" justify="center">
                <v-col cols="12">
                    
                    <ValidationObserver ref="observer" v-slot="{invalid}">
                        <v-form @submit.prevent="submit">
                            <div>
                                <!--음식 파일 등록-->
                                <div class="mb-3">
                                    <div class="text-center">
                                        <h2 class="text--primary font-weight-black">음식 사진 불러오기(클릭)</h2>
                                    </div>
                                    <div>
                                        <ValidationProvider :rules="{
                                                required : true,
                                                }" name="카메라/갤러리 사진" v-slot="{errors}">
                                                <v-file-input type="file" accept="image/*"
                                                v-model="img" label="카메라/갤러리 사진" :error-messages="errors"
                                                outlined :show-size="1000"
                                                prepend-icon="mdi-camera-burst" clearable counter color="blue"
                                                @change="uploadAlbumFile">
                                                    <template v-slot:selection="{ text }">
                                                        <v-chip color="primary accent-4" dark label small>
                                                          {{ text }}
                                                        </v-chip>
                                                    </template>
                                                </v-file-input>
                                        </ValidationProvider>
                                    </div>
                                </div>
                                
                                <!--음식 사진 확인-->
                                <div>
                                    <div class="text-center">
                                        <h2 class="text--primary font-weight-black">음식 사진 확인</h2>
                                    </div>
                                
                                    <div class="border-image">
                                        <v-img :src="cImg" @error="changeNotDefault"
                                        height="200px" contain/>
                                    </div>
                                </div>
                                <!--음식 라벨링 사진 확인-->
                                <div>
                                    <div class="text-center">
                                        <h2 class="text--primary font-weight-black">분석된 음식 사진 확인</h2>
                                    </div>
                                
                                    <LabelImage :foods="foods" :isDefaultLabelImage="isDefaultLabelImage" :labelImgPreURL="labelImgPreURL"/>
                                </div>
                                
                                <!--등록 버튼-->
                                <div>
                                    <v-btn type="submit" block x-large rounded color="primary" class="mt-4" :disabled="invalid" >등록하기</v-btn>
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
const LabelImage = () => import("@/components/Register/Image/LabelImage.vue");

import AWS from 'aws-sdk'
import {extend, ValidationObserver, ValidationProvider } from "vee-validate"
import {required} from "vee-validate/dist/rules"
extend('required', {
  ...required,
  message : '해당 필드는 필수값입니다.'
});

export default {
    name : "MobileRegister",
    components : {
        ValidationObserver,
        ValidationProvider,
        LabelImage,
    },

    created(){
        const hasNotInitDate = !this.$route.params.initDate;
        this.date = hasNotInitDate ? (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : this.$route.params.initDate;

        const hasNotInitMeal = !this.$route.params.initMeal;
        this.meal = hasNotInitMeal ?  '아침' : this.$route.params.initMeal;
    },

    data(){
        return {

            //router params 관련
            date : null,
            meal : null,

            //이미지 등록 전(이미지파일 관련)
            img : null,             //v-input 받아온 값
            imgURL : null,          //s3에 업로드되면 얻기, POST요청 (afas.jpg)
            imgPreURL : null,       //s3에 업로드되면 얻기, v-img:src (http: ~~ /afas.jpg)
            isDefaultImage : true,

            //분석된 이미지 등록 전(이미지파일 관련)
            labelImgPreURL : null,
            isDefaultLabelImage : true,

            //이미지 등록 전(S3관련)
            bucketRegion : 'ap-northeast-2',
            IdentityPoolId : 'ap-northeast-2:d6a685e8-0da6-493d-bb54-d84abf3ab01c',
            href : 'https://dgucapstonepics.s3.ap-northeast-2.amazonaws.com/', 
            albumBucketName : 'dgucapstonepics', 
            albumName : 'food_album',

            //이미지 등록 후(음식 관련)
            foods : [
                {xmain:10, ymain:10, name:'김치찌개', kcal:300, nutrient:{carbo:50,protein:30,fat:9,}},
                {xmain:40, ymain:40, name:'김밥', kcal:200, nutrient:{carbo:10,protein:10,fat:6,}},
                {xmain:70, ymain:70, name:'꽁치', kcal:100, nutrient:{carbo:20,protein:10,fat:7,}},
                {xmain:10, ymain:20, name:'공기밥', kcal:400, nutrient:{carbo:30,protein:5,fat:8,}},
            ],
        }
    },

    computed : {
        //isDefaultImage:true -> defaultimg
        //isDefaultImage:false -> imgPreURL
        cImg(){
            return this.isDefaultImage ? require('@/assets/default.png') : this.imgPreURL;
        },

        cLabelImg(){
            return this.isDefaultLabelImage ? require('@/assets/default.png') : this.labelImgPreURL;
        }
    },

    methods : {

        //isDefaultImage = true -> false
        changeNotDefault(){
            console.log('발생함?')
            this.isDefaultImage = false;
        },

        //isDefaultLabelImage = true -> false
        changeNotDefaultLabel(){
            this.isDefaultLabelImage = false;
        },

        async submit(){
            // 입력조건 유효성 결과
            const result = await this.$refs.observer.validate()
            
            // 입력조건 유효성 결과 만족시
            if (result){

                //MealRegister
                this.$router.push({
                    name : "MealRegister",
                    params : {
                        initImgPreURL : this.imgPreURL,
                        initDate : this.date,
                        initMeal : this.meal,
                        initFoods : this.foods,
                    }
                });
            }
        },

        connectAWS(){
            AWS.config.update({
              region: this.bucketRegion,
              credentials: new AWS.CognitoIdentityCredentials({
                  IdentityPoolId: this.IdentityPoolId
              })
            });
        },

        getS3(){
          var s3 = new AWS.S3({
            apiVersion: "2006-03-01",
            params: { Bucket: this.albumBucketName }
          });
          return s3;
        },

        uploadAlbumFile(){
            //AWS 연결
            this.connectAWS();

            //img 지울때 / 추가할때
            if (!this.img){
                
                //일반 이미지
                this.img = null;
                this.imgURL = null;
                
                this.imgPreURL = null;
                this.isDefaultImage = true;

                //분석된 이미지
                this.labelImgPreURL = null;
                this.isDefaultLabelImage = true;

            }else{
                
                //2. AWS 버킷에 업로드(1) 
                // 파일형식(.jpg) + 랜덤문자열 얻기
                let albumFileName = this.img.name;
                let form = albumFileName.split('.')[1];

                let randomString = new Date().getTime().toString(36);

                // 앨범이름 얻기
                let albumPhotosKey = encodeURIComponent(this.albumName) + "/";

                // photoKey: S3에 저장형식
                let photoKey = albumPhotosKey + randomString + '.'+ form;

                var upload = new AWS.S3.ManagedUpload({
                  params: {
                    Bucket: this.albumBucketName,
                    Key: photoKey,
                    Body: this.img,
                  }
                });

                //2. AWS 버킷에 업로드(2) 
                var promise = upload.promise();
                promise.then(
                    (data) => {
                        console.log("파일 업로드:", data);

                        //이미지
                        this.imgURL = randomString + '.' + form;
                        
                        this.imgPreURL = this.href + this.albumName + '/' + randomString + '.' + form;
                        this.isDefaultImage = false;

                        //분석된 이미지(여기서 axios.post 날려서 foods 할당)
                        this.labelImgPreURL = this.href + this.albumName + '/' + randomString + '.' + form;
                        this.isDefaultLabelImage = false;

                    },
                    (err) => {
                       console.log(err)
                    }
                );
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