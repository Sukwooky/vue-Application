<template>
      <!--    <v-app-bar v-if="$vuetify.breakpoint.xsOnly"> -->
    <v-app-bar color="blue" dark app>
      <v-app-bar-nav-icon @click="$emit('drawer')"></v-app-bar-nav-icon>
      <v-spacer/>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-view-module</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {

}
</script>

<style>

</style>