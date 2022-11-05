<template>

    <!--사진 등록 o-->
    <div class="border-image" v-if="!isDefaultLabelImage">
        <v-img :src="cLabelImg" height="200px" contain 
         class="container">

            <div v-for="(food,index) in activeFoods" :key="`food-${index}`"
            class="label-block label-border"
            :style="{
            'top': `${food.ymain}%`, 'left': `${food.xmain}%`
            }">
                <small>{{food.name}}</small>
            </div>
        </v-img>
    </div>

    <!--사진 등록 x-->
    <div class="border-image" v-else>
        <v-img :src="cLabelImg" height="200px" contain 
         class="container">
        </v-img>
    </div>
</template>

<script>
export default {
    name : 'labelImage',
    props : {

        isDefaultLabelImage : {
            type: Boolean,
        },

        foods : {
            type : Array,
        },

        labelImgPreURL : {
            type : String,
        }
    },

    computed : {
        cLabelImg(){
            return this.isDefaultLabelImage ? require('@/assets/default.png') : this.labelImgPreURL;
        },

        //xmain, ymain null인 food 제외위함
        activeFoods(){

            let activeFoods = [];

            for(let i=0; i<this.foods.length; i++){
                const isXmainNull = !(this.foods[i].xmain);
                const isYmainNull = !(this.foods[i].ymain);
                if(isXmainNull || isYmainNull){
                    //
                }else{
                    activeFoods.push(this.foods[i]);
                }

            }
            return activeFoods;
        }
    },
}
</script>
<style scoped>
/* Container holding the image and the text */
.container {
  position: relative;
}

/* Bottom right text */
.label-block {
  position: absolute;
  background-color: grey;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
}

.label-border {
  border-radius: 30px;
}

.border-image{
  border : 3px solid ;
}
</style>