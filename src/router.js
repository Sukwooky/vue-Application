import Vue from "vue"
import VueRouter from "vue-router"

const DefaultLayout = () => import("@/layouts/default/index.vue")
const AuthenticationLayout = () => import("@/layouts/Auth/index.vue")
const PageLayout = () => import("@/layouts/Page/index.vue")
const MyPageLayout = () => import("@/layouts/MyPage/index.vue");


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
//MyPageLayout -> Diary
const DiaryWeight = () => import("@/layouts/MyPage/Diary/DiaryWeight.vue");
const DiaryRegister = () => import("@/layouts/MyPage/Diary/DiaryRegister.vue");

//MyPageLayout 
const Report = () => import("@/layouts/MyPage/Report/Report.vue");


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
                path : "diary",
                component : Diary,

            },
            {
                name : "DiaryWeight",
                path : "diaryWeight",
                component : DiaryWeight,
                props : true
            },
            {
                name : "DiaryRegister",
                path : "diaryRegister",
                component : DiaryRegister
            },
            {
                path : "report",
                component : Report
            },
        ]
    }
];

const router = new VueRouter({
    mode : "history",
    routes
})

export {router}; 