<template>
  <div>Sum입니다.</div>
</template>

<script>
export default {
    name : 'NutrientSum',
    props: {
        foods : {
            type : Array,
            default : () => [{
                id : 0,
                name : '김치찌개',
                imgURL : 'jjigae.jpg',
                kcal : 300,
                nutrient : {
                  carbo : 50,
                  protein : 30,
                  fat : 9,
                }
            }],
        },

        foodsKcal : {
            type : Number,
            default : 100,
        }
    },
}
</script>

<style>

</style>