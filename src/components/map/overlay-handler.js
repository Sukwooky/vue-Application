const kakao = window.kakao

class KakaoOverlay {
    constructor(vuekakaomap, content){

        //ref를 통해 KakaoMap.vue, div태그
        this.vuekakaomap = vuekakaomap;
        this.content = content;
        
        //init instance
        this.instance = new kakao.maps.CustomOverlay({
            map: null,  // 아직 올리지 않음
            clickable: false,
            content: this.content,
            position: null, // 나중에 클릭하면 좌표 바로 위에 가운데로 위치시킴
            
            xAnchor: 0.5,
            yAnchor: 1,
            zIndex: 3
        });
    }

    showAt(lat, lng){
        console.log("overlay show!!", lat , lng);
        this.instance.setMap(this.vuekakaomap.mapInstance); //Custom overlay 생성(ref를 통해 KakaoMap.vue의 data:mapInstance)
        
        const pos = new kakao.maps.LatLng(lat, lng);
        this.instance.setPosition(pos);
    }

    hide(){
        this.instance.setMap(null);                        // Custom overlay 제거
    }
}

export {KakaoOverlay}