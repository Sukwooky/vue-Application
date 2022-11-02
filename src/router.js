import Vue from "vue"
import VueRouter from "vue-router"

const DefaultLayout = () => import("@/layouts/default/index.vue")
const AuthenticationLayout = () => import("@/layouts/Auth/index.vue")
const PageLayout = () => import("@/layouts/Page/index.vue")
const MyPageLayout = () => import("@/layouts/MyPage/index.vue");
const ImageRegisterLayout = () => import("@/layouts/Register/Image/index.vue");
const WeightRegisterLayout = () => import("@/layouts/Register/Weight/index.vue");
const MealRegisterLayout  = () => import("@/layouts/Register/Meal/index.vue");

// DefaultLayout
const DashBoard = () => import("./components/DashBoard.vue")

//AuthenticationLayout
const SignIn = () => import('@/layouts/Auth/SignIn.vue')

const InfoFist = () => import("@/layouts/Auth/InfoFirstIn.vue");
const InfoSecond = () => import("@/layouts/Auth/InfoSecondIn.vue");
const InfoSignUp  = () => import("@/layouts/Auth/InfoSignUp.vue");

//PageLayout
const RestaurantList = () => import("@/layouts/Page/RestaurantList.vue")

//MyPageLayout
const Diary = () => import("@/layouts/MyPage/Diary/Diary.vue");
const Report = () => import("@/layouts/MyPage/Report/Report.vue");

//ImageRegisterLayout
const ImageRegister = () => import("@/layouts/Register/Image/ImageRegister.vue");

//WeightRegisterLayout
const WeightRegister = () => import("@/layouts/Register/Weight/WeightRegister.vue");

//MealRegisterLayout
const MealRegister = () => import("@/layouts/Register/Meal/MealRegister.vue");


Vue.use(VueRouter)
const routes = [

    {
        path: "/",
        component : DefaultLayout,
        children : [

            {
                path :"",
                component : DashBoard
            },
        ]
    },

    {
        path: "/authentication",
        component : AuthenticationLayout,
        children : [
            {
                path : 'info-first',
                component : InfoFist
            },
            {  
                path : 'info-second',
                component : InfoSecond,
            },
            {
                path : 'info-sign-up',
                component : InfoSignUp
            },
            {
                path : "sign-in",
                component : SignIn
            },
        ]
    },

    {
        path: "/page",
        component : PageLayout,
        children : [
            {
                path : "restaurantList",
                component : RestaurantList
            }
        ]
    },

    {
        path: "/mypage",
        component : MyPageLayout,
        children : [
            {   
                name : 'Diary',
                path : "diary",
                component : Diary,

            },
            {
                name : 'Report',
                path : "report",
                component : Report
            },
        ]
    },
    {
        path: '/register/weight',
        component : WeightRegisterLayout,
        children : [
            {
                name : "WeightRegister",
                path : "",
                component : WeightRegister,
                props : true
            },
        ]
    },
    {
        path: '/register/meal',
        component : MealRegisterLayout,
        children : [

            {
                name : "MealRegister",
                path : "",
                component : MealRegister,
                props : true
            },
        ]
    },
    {
        path: '/register/image',
        component : ImageRegisterLayout,
        children : [

            {
                name : "ImageRegister",
                path : "",
                component : ImageRegister,
                props : true
            },
        ]
    }
];

const router = new VueRouter({
    mode : "history",
    routes
})

export {router}; 