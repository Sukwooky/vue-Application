const api = {
    restaurant : {
       restaurantAll(callback){
        const restaurants = [
            {
                seq: 398,
                place : "음식점1",
                info : "제육볶음",
                lat : 37.56089076590386, 
                lng : 126.99645175708804
            },
            {
                seq : 399,
                place : "음식점2",
                info : "돈까스",
                lat : 37.56081417997729, 
                lng : 126.99641214720332
            },
            {
                seq: 400,
                place : "음식점3",
                info : "초밥",
                lat : 37.561543987013806, 
                lng : 126.99640079394858
            },
            {
                seq: 401,
                place : "음식점4",
                info : "햄버거",
                lat : 37.560944851198634,
                lng : 126.99743643508589
            }
        ];

        callback({ success : true, restaurants })
       } 
    },

    temp_restaurant : {
        restaurantAll(callback){
            const restaurants = [
                {
                    seq: 398,
                    place : "temp음식점1",
                    info : "temp제육볶음",
                    lat : 37.56089076590386, 
                    lng : 126.99645175708804
                },
                {
                    seq : 399,
                    place : "temp음식점2",
                    info : "temp돈까스",
                    lat : 37.56081417997729, 
                    lng : 126.99641214720332
                },
                {
                    seq: 400,
                    place : "temp음식점3",
                    info : "temp초밥",
                    lat : 37.561543987013806, 
                    lng : 126.99640079394858
                },
                {
                    seq: 401,
                    place : "temp음식점4",
                    info : "temp햄버거",
                    lat : 37.560944851198634,
                    lng : 126.99743643508589
                }
            ];
    
            callback({ success : true, restaurants })
           } 
    }
}


export {api}