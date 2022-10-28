<template>
    <div>
        <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                    <td class="red--text">칼로리(kcal)</td>
                    <td>{{foodsKcal}}kcal</td>
                </tr>
                <tr>
                    <td class="red--text">제공량(g)</td>
                    <td>{{all}}g</td>
                </tr>
                <tr>
                    <td>탄수화물 양(g)</td>
                    <td>{{allCarbo}}g</td>
                </tr>
                <tr>
                    <td>단백질 양(g)</td>
                    <td>{{allProtein}}g</td>
                </tr>
                <tr>
                    <td>지방 양(g)</td>
                    <td>{{allFat}}g</td>
                </tr>
              </tbody>
            </template>
        </v-simple-table>
    </div>
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

    computed : {

        all(){
            let carbo_sum = 0
            for(let i=0; i< this.foods.length; i++){
                carbo_sum += this.foods[i].nutrient.carbo;
            } 

            let protein_sum = 0
            for(let i=0; i< this.foods.length; i++){
                protein_sum += this.foods[i].nutrient.protein;
            } 

            let fat_sum = 0
            for(let i=0; i< this.foods.length; i++){
                fat_sum += this.foods[i].nutrient.fat;
            } 
            return carbo_sum + protein_sum + fat_sum
        },
        allCarbo(){
            let sum = 0
            for(let i=0; i< this.foods.length; i++){
                sum += this.foods[i].nutrient.carbo;
            } 
            return sum
        },
        allProtein(){
            let sum = 0
            for(let i=0; i< this.foods.length; i++){
                sum += this.foods[i].nutrient.protein;
            } 
            return sum
        },
        allFat(){
            let sum = 0
            for(let i=0; i< this.foods.length; i++){
                sum += this.foods[i].nutrient.fat;
            } 
            return sum
        },
    }
}
</script>

<style>

</style>