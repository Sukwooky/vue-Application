const kakao = window.kakao

class MarkerHandler {
    constructor(vuekakaomap, options){

        // ref를 통해 KakaoMap.vue
        this.vuekakaomap = vuekakaomap;
        this.options = options;
    }

    add(restaurants, fnConv) {
        restaurants.forEach(data => {
            const option = fnConv(data);
            // option.lat, option.lng
            
            const markerInstance = new kakao.maps.Marker({
                map : this.vuekakaomap.mapInstance,
                position : new kakao.maps.LatLng(option.lat, option.lng)
            });

            markerInstance.$$ = {
                data,
            };

            if (this.options.markerClicked) {
                kakao.maps.event.addListener(markerInstance, 'click', ()=> {
                    this.options.markerClicked(markerInstance.$$.data);
                });
            }   

            console.log(`${markerInstance} MarkerInstance 생성`)
        })
    }
}

export {MarkerHandler}