<template>
    <v-tabs dark background-color="blue darken-1" centered  show-arrows>
        <v-tabs-slider color="blue lighten-3"></v-tabs-slider>

        <v-tab v-for="item in items" :key="item.idx" :to="item.href">{{ item.idx }} 단계</v-tab>
    </v-tabs>

</template>

<script>
export default {
    data(){
        return{
            items: [
                {
                    idx : 1,
                    href: '/authentication/info-first',
                },
                {
                    idx : 2,
                    href: '/authentication/info-second',
                },
                {
                    idx : 3,
                    href: '/authentication/info-sign-up',
                },
            ],
        }
    }
}
</script>

<style>

</style>