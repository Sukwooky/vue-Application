<template>
    <v-card class="mx-auto" max-width="344">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

        <v-card-title>{{rtr.place}}</v-card-title>
        <v-card-subtitle>주소 : 서울특별시</v-card-subtitle>

        <v-card-actions>
          <v-btn color="primary lighten-1" text @click="show = !show">메뉴보기</v-btn>

          <v-spacer></v-spacer>

          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              {{rtr.info}}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              {{rtr.info}}
            </v-card-text>
          </div>
        </v-expand-transition>
    </v-card>
</template>

<script>
export default {

    props : {
      rtr : Object
    },

    data(){
        return {
          show: false,
        }
  }
}
</script>

<style>

</style>