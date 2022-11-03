<template>
    <v-container fluid>
        
        <!--카메라,갤러리 제목-->
        <v-card class="text-center">
            <h1 class="text--primary font-weight-black">카메라 및 갤러리 등록</h1>
        </v-card>

        <!--카메라,갤러리 등록-->
        <v-card>
            <v-card-text class="text-center">
                <ValidationObserver ref="observer" v-slot="{invalid}">
                    <v-form @submit.prevent="submit">
                        
                        <v-card elevation="10" outlined>

                            <!--음식 사진 제목-->
                            <v-card-title class="text--primary font-weight-black">음식 사진</v-card-title>

                            <!--음식 등록-->
                            <v-card-text>
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
                            </v-card-text>

                            <!--음식점 사진 확인-->
                            <v-expansion-panels>
                                <v-expansion-panel>
                                    <v-expansion-panel-header>
                                        올린 이미지 확인
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-img :src="cImg" @error="changeNotDefault"
                                        height="200px" contain/>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-card>
                        
                        <v-btn type="submit" block x-large rounded color="primary" class="mt-4" :disabled="invalid" >등록하기</v-btn>
                    </v-form>
                </ValidationObserver>
            </v-card-text>
        </v-card>

    </v-container>
</template>

<script>
import AWS from 'aws-sdk'
import axios from 'axios'
import {extend, ValidationObserver, ValidationProvider } from "vee-validate"
import {required} from "vee-validate/dist/rules"
extend('required', {
  ...required,
  message : '해당 필드는 필수값입니다.'
});

export default {
    components : {
        ValidationObserver,
        ValidationProvider
    },

    data(){
        return {
            img : null,             //v-input 받아온 값
            imgURL : null,          //s3에 업로드되면 얻기, POST요청 (afas.jpg)
            imgPreURL : null,       //s3에 업로드되면 얻기, v-img:src (~)
            isDefaultImage : true,

            bucketRegion : 'ap-northeast-2',
            IdentityPoolId : 'ap-northeast-2:d6a685e8-0da6-493d-bb54-d84abf3ab01c',
            href : 'https://dgucapstonepics.s3.ap-northeast-2.amazonaws.com/', 
            albumBucketName : 'dgucapstonepics', 
            albumName : 'food_album',
        }
    },

    computed : {
        //isDefaultImage:true -> defaultimg
        //isDefaultImage:false -> imgPreURL
        cImg(){
            return this.isDefaultImage ? require('@/assets/default.png') : this.imgPreURL;
        },
    },

    methods : {
        async submit(){
            // 입력조건 유효성 결과
            const result = await this.$refs.observer.validate()
            
            // 입력조건 유효성 결과 만족시
            if (result){

                // 음식점 정보
                const _info = {
                    Name : this.Name,
                    imgURL : this.imgURL,
                    Location : this.Location,
                    Menu : this.Menu
                };

                await axios.post('/api//register', _info)
                    .then(res => {
                        console.log(res.data.success, res.data.message);
                        //this.$router.push('/')
                    })
                    .catch(err =>{
                        console.log(err.message)
                    })
            }
        },

        //isDefaultImage = true -> false
        changeNotDefault(){
            this.isDefaultImage = false;
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
            if (this.img === null){
                
                this.img = null
                this.imgURL = null
                
                this.imgPreURL = null;
                this.isDefaultImage = true;
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
                        console.log(`파일 업로드: ${data}`);

                        //s3에 업로드되면 얻기, POST요청 (afas.jpg)
                        //s3에 업로드되면 얻기, v-img:src (~)
                        this.imgURL = randomString + '.' + form;
                        
                        this.imgPreURL = this.href + this.albumName + '/' + randomString + '.' + form;
                        this.isDefaultImage = false;

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

<style>

</style>