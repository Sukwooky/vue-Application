import Vue from 'vue'
import App from './App.vue'

import { store } from "./store/store"
import { router } from "./router.js"

import vuetify from './plugins/vuetify'

import VueGeolocation from "vue-browser-geolocation"


Vue.config.productionTip = false
Vue.use(VueGeolocation)


new Vue({
  store : store,
  router : router,
  vuetify,
  beforeCreate(){
    this.$store.dispatch('getMemberInfo')
  },
  render: h => h(App)
}).$mount('#app')
