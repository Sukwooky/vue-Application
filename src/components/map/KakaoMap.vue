<template>
  <div ref="map" class="kmap">
    <slot name="overlay"></slot> <!--slot통해 Map위에다가 보여줌-->
  </div>
</template>

<script>

let kakao = window.kakao

export default {

  props: ["options"],

  data(){
    return {
        mapInstance : null
    }
  },

  mounted(){

    kakao = kakao || window.kakao;

    //지도를 담을 영역의 DOM 레퍼런스
    var container = this.$refs.map; 
    
    //지도를 생성할 때 필요한 기본 옵션
    //(1)var options = { 
    //  center: new kakao.maps.LatLng(33.450701, 126.570667), 
    //  level: 3 //지도의 레벨(확대, 축소 정도)
    //};
    const { center , level } = this.options
    
    //지도 생성 및 객체 리턴
    //(1)const mapInstance = new kakao.maps.Map(container, options); 
    this.mapInstance = new kakao.maps.Map(container, {
        center : new kakao.maps.LatLng(center.lat, center.lng),
        level : level
    });
  },

  watch : {
    // 지도 확대 이벤트시 변경
    "options.level"(cur, pre){
      console.log(`watch level : ${pre} -> ${cur}`)
      this.mapInstance.setLevel(cur)
    },
    // 지도 이동 이벤트시 변경
    "options.center"(cur){
      console.log(`watch center : ${cur.lat} ${cur.lng}`)
      //this.mapInstance.setCenter(new kakao.maps.LatLng(cur.lat, cur.lng)) -> 거칠게 이동
      this.mapInstance.panTo(new kakao.maps.LatLng(cur.lat, cur.lng))     //-> 부드럽게 이동 
    }
  },
}
</script>

<style>
.kmap {
  margin: 0 auto;

  height: 600px;
}

.kmap .overlay-popup{
  max-width: 200px;
  min-width: 160px;

  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);

  background-color: #ffffffcc;
  box-shadow: 0 0 8px #0000004d, 0 0 1px 2px #00000022;
}

.kmap .overlay-popup h3{
  margin: 0px;
  padding: 8px;
  
  background-color: #ed4215;
  color: white;
  
  font-weight: 400;
  font-size: 16px;
}

.kmap .overlay-popup .addr{
  padding: 8px;
}

</style>
