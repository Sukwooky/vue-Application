<template>
  <div>
    <div class="mb-3">
        <v-chip-group mandatory active-class="primary--text" v-model="selectedTag">
          <v-chip v-for="tag in tags" :key="tag">
            {{ tag }}
          </v-chip>
        </v-chip-group>
    </div>

    <v-divider></v-divider>

    <!--칼로리 chip-->
    <div v-if="selectedTag === 0">
      <ReportChangeKcal/>
    </div>

    <!--몸무게 chip-->
    <div v-else>
      <ReportChangeWeight/>
    </div>

  </div>
</template>

<script>
const ReportChangeKcal = () => import("@/components/Report/ReportChange/ReportChangeKcal.vue");
const ReportChangeWeight = () => import("@/components/Report/ReportChange/ReportChangeWeight.vue");

export default {
    
    name : "ReportChange",

    components : {
      "ReportChangeKcal" : ReportChangeKcal,
      "ReportChangeWeight" : ReportChangeWeight,
    },

    data(){
        return {
            tags: ['칼로리', '몸무게'],
            selectedTag : null
        }
    },
}
</script>

<style>

</style>