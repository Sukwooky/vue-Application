<template>
      <!--    <v-app-bar v-if="$vuetify.breakpoint.xsOnly"> -->
    <v-app-bar color="blue" dark app>
      <v-app-bar-nav-icon @click="$emit('drawer')"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="text-decoration-underline">{{loginName}}</span> 님 환영합니다.
      </v-toolbar-title>

      <v-spacer/>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed : {
    ...mapGetters({
      loginName : 'getUserInfo_name'
    })
  }
}
</script>

<style>

</style>