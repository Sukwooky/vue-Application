<template>

    <v-container fluid>
        <!--제목-->
        <v-card class="text-center">
            <h1 class="text--primary font-weight-black">음식점 현황</h1>
        </v-card>
        
        <!--음식점 지도-->
        <v-card class="text-center">
            <v-card-text class="text-center">
                
                <!--카카오지도-->
                <KakaoMap ref="kmap" v-bind:options="mapOptions">
                    <template #overlay>
                        <div class="overlay-popup" ref="restaurantOverlay">

                            <div v-if="overlayRestaurant">
                                <h3>{{overlayRestaurant.place}}</h3>
                                <div class="addr">{{overlayRestaurant.info}} : ~</div>
                                <div class="addr">{{overlayRestaurant.info}} : ~</div>                            

                                <v-row justify="end">
                                    <v-col cols="auto" ><v-btn @click.prevent="closeOverlay()" icon><v-icon>mdi-close-outline</v-icon></v-btn></v-col>
                                </v-row>
                            </div>

                        </div>
                    </template>
                </KakaoMap>

                <!--카카오지도 버튼-->
                <v-row justify="center" class="pd-5">
                        <v-col cols="auto">
                            <v-btn v-on:click="zoom(-1)" color="primary" fab large><v-icon>mdi-magnify-plus</v-icon></v-btn>
                            <v-btn v-on:click="zoom(1)" color="primary" fab large><v-icon>mdi-magnify-minus</v-icon></v-btn>
                        </v-col>
                </v-row>
            </v-card-text>

        </v-card>
        
        <!--음식점 정보-->
        <v-card>
            <v-row class="ma-3">
                <v-col v-for="(rtr,i) in this.restaurants" :key="`rtr-${i}`" cols="12" sm="6" md="4" lg="3"
                @click="showOnMap(rtr)" :class="{active : rtr === activeRestaurant }" class="restaurant" >
                    <RestaurantVue v-bind:rtr="rtr" ></RestaurantVue>
                </v-col>
            </v-row>
        </v-card>

    </v-container>
</template>

<script>
import KakaoMap from "@/components/Map/KakaoMap.vue"
import RestaurantVue from "@/layouts/Page/Restaurant.vue"

import {MarkerHandler} from "@/components/Map/marker-handler.js"
import {KakaoOverlay} from "@/components/Map/overlay-handler.js"

export default {

    props : {
        restaurants : Array
    },

    data(){
        return {
            mapOptions : {
                center : {
                    lat : 0,
                    lng : 0
                },
                level : 3
            },

            markers : null, //marker 인스턴스

            activeRestaurant : null, //selected 음식점(class: acitve활성)

            overlay : null,  //overlay 인스턴스
            overlayRestaurant : null, //overlay에 보여줄 음식점(음식정보내용: 할당)
        }
    },

    created(){

        // 현재 위치얻기 / 안되면 동국대학교로 설정
        this.$getLocation({})
            .then((coordinates) => {
                this.mapOptions.center = {
                    lat : coordinates.lat,
                    lng : coordinates.lng
                }
                console.log(`get location: ${coordinates.lat} ${coordinates.lng}`);
            })
            .catch((error) => {
                this.mapOptions.center = {
                    lat : 37.55807745217469,
                    lng : 127.00095068962825
                }
                console.log(`${error}: not get location`);
            });
    },

    mounted(){

        // 음식점 마커객체 생성
        const vuekakaomap = this.$refs.kmap
        this.markers = new MarkerHandler(vuekakaomap, {
          markerClicked : (rtr) => {
            console.log("click" + rtr);

            // 마커클릭시 지도 이동 이벤트
            this.showOnMap(rtr)

            // 마커클릭시 overlay 보여주기 이벤트
            this.overlayRestaurant = rtr;
            this.overlay.showAt(rtr.lat, rtr.lng);
          },
        });

        // 음식점 마커 지도에 추가
        this.markers.add(this.restaurants, (rtr) => {
          return {lat : rtr.lat, lng: rtr.lng}
        });

        // 음식점 overlay객체 생성
        this.overlay = new KakaoOverlay(vuekakaomap, this.$refs.restaurantOverlay)

    },

    components : {
      "KakaoMap" : KakaoMap,
      "RestaurantVue" : RestaurantVue,
    },

    methods : {

        // 버튼클릭시 지도 확대 이벤트
        zoom(delta){
            const level = Math.max(1, this.mapOptions.level + delta) //최소 level 1
            this.mapOptions.level = level
        },

        // 버튼클릭시 지도 이동 이벤트
        showOnMap(rtr){

            //버튼클릭시 class: acitve활성
            this.activeRestaurant = rtr


            //버튼클릭시 KakaoMap.vue의 watch속성 로직실행
            this.mapOptions.center = {
                lat : rtr.lat,
                lng : rtr.lng
            }

            //버튼클릭시 overlay보여주기 이벤트
            this.overlayRestaurant = rtr;
            this.overlay.showAt(rtr.lat, rtr.lng);

        },

      closeOverlay(){
        this.overlay.hide();
      }
    }
}
</script>

<style>
.active {
  background-color: #1E88E5;
}

.restaurant:hover {
    cursor: pointer;
}

</style>
