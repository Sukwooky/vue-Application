<template>
    <div v-if="(Array.isArray(this.foods) && this.foods.length === 0) === false">
        <v-row align="center" justify="center">
            <v-col cols="auto">
                <v-chip-group column mandatory v-model="activeFood" active-class="blue--text">
                    <v-chip v-for="(food,index) in foods" :key="`food-${index}`" link filter>
                        {{food.name}}
                    </v-chip>  
                </v-chip-group>
            </v-col>
        </v-row>

        <v-row align="center" justify="center">
            <v-col cols="auto">
                <v-simple-table>
                    <template v-slot:default>
                      <tbody>
                        <tr>
                            <td class="red--text">칼로리(kcal)</td>
                            <td>{{kcal}}kcal</td>
                        </tr>
                        <tr>
                            <td class="red--text">제공량(g)</td>
                            <td>{{all}}g</td>
                        </tr>
                        <tr>
                            <td>탄수화물 양(g)</td>
                            <td>{{carbo}}g</td>
                        </tr>
                        <tr>
                            <td>단백질 양(g)</td>
                            <td>{{protein}}g</td>
                        </tr>
                        <tr>
                            <td>지방 양(g)</td>
                            <td>{{fat}}g</td>
                        </tr>
                      </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
    </div>
    <div v-else>
        음식을 추가해주세요
    </div>
</template>

<script>
export default {
    name : 'NutrientDetail',
    props: {
        foods : {
            type : Array,
        },

        foodsKcal : {
            type : Number,
        }
    },

    data(){
        return {
            activeFood : 0,
        }
    },

    computed : {
        kcal(){
            return this.foods[this.activeFood].kcal;
        },

        all(){
            const carbo = this.foods[this.activeFood].nutrient.carbo;
            const protein = this.foods[this.activeFood].nutrient.protein;
            const fat = this.foods[this.activeFood].nutrient.fat;
            return carbo + protein + fat
        },

        carbo(){
            return this.foods[this.activeFood].nutrient.carbo;
        },

        protein(){
            return this.foods[this.activeFood].nutrient.protein;
        },

        fat(){
            return this.foods[this.activeFood].nutrient.fat;
        }
    }

}
</script>

<style>

</style>