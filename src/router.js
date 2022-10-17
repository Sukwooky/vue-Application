import Vue from "vue"
import VueRouter from "vue-router"

const DefaultLayout = () => import("@/layouts/default/index.vue")
const AuthenticationLayout = () => import("@/layouts/authentication/index.vue")
const PageLayout = () => import("@/layouts/page/index.vue")

// DefaultLayout
const DashBoard = () => import("./components/DashBoard.vue")

//AuthenticationLayout
const SignIn = () => import('@/layouts/authentication/SignIn.vue')

const InfoFist = () => import("@/layouts/authentication/InfoFirstIn.vue");
const InfoSecond = () => import("@/layouts/authentication/InfoSecondIn.vue");
const InfoSignUp  = () => import("@/layouts/authentication/InfoSignUp.vue");

//PageLayout
const RestaurantList = () => import("@/layouts/page/RestaurantList.vue")


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
    }

   
];

const router = new VueRouter({
    mode : "history",
    routes
})

export {router}; 