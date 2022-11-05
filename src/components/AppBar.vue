<template>
      <!--    <v-app-bar v-if="$vuetify.breakpoint.xsOnly"> -->
    <v-app-bar color="blue" dark app>
      <v-app-bar-nav-icon @click="$emit('drawer')"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="isLogin">
        <span class="text-decoration-underline">{{loginName}}</span> 님 환영합니다.
      </v-toolbar-title>
      
      <v-spacer/>
      
      <v-btn v-if="isLogin" class="mr-5" icon @click="logout" small>
        로그아웃
      </v-btn>
      <v-btn v-else :to="{name: 'sign-in'}" class="mr-5" icon small>
        로그인
      </v-btn>
      
      <v-btn :to="{name: 'info-first'}" class="mr-1" icon small>
        회원가입
      </v-btn>
    </v-app-bar>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  name : 'AppBar',
  computed : {
    ...mapState(['isLogin']),
    ...mapGetters({
      loginName : 'getUserInfo_name'
    }),
  },

  methods : {
    ...mapActions(['logout'])
  }

}
</script>
<style>

</style>