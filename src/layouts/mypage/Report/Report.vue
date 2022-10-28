<template>
  <v-container fluid>

    <!--Tab 선택-->
    <v-tabs v-model="tab" background-color="transparent" color="blue">
      <v-tab v-for="tabItem in tabItems" :key="tabItem.tabIdx">
        {{ tabItem.tabName }}
      </v-tab>
    </v-tabs>

    <!--Tab 선택시 내용-->
    <v-tabs-items v-model="tab" class="mt-5">
      <v-tab-item v-for="tabItem in tabItems" :key="tabItem.tabIdx">
        <div v-if="tabItem.tabIdx === 0">
          <ReportChange/>
        </div>
        <div v-else-if="tabItem.tabIdx === 1">
          <ReportBalance/>
        </div>
        <div v-else>
          <ReportMeal/>
        </div>
      </v-tab-item>
    </v-tabs-items>

    <v-divider></v-divider>

  </v-container>
</template>

<script>
const ReportChange = () => import("@/layouts/MyPage/Report/ReportChange.vue");
const ReportBalance = () => import("@/layouts/MyPage/Report/ReportBalance.vue");
const ReportMeal = () => import("@/layouts/MyPage/Report/ReportMeal.vue");

export default {
    name : 'Report',
    data () {
      return {
        tab: null,
        tabItems : [
          {tabIdx: 0, tabName : '변화추이'},
          {tabIdx: 1, tabName : '영양균형'},
          {tabIdx: 2, tabName : '식사기록'},
        ],

      }
    },

    components : {
      "ReportChange" : ReportChange,
      "ReportBalance" : ReportBalance,
      "ReportMeal" : ReportMeal,

    }
}
</script>

<style>

</style>