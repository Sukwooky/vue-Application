<template>

   <!-- v-bind="$attrs"를 통해 상위 props를 내려받음 -->
   <!-- <v-navigation-drawer v-model="drawer" :src="require('@/assets/sidebar.jpg')" dark app> -->
  <v-navigation-drawer v-bind="$attrs" :src="require('@/assets/sidebar.jpg')" dark app>

      <!--(1)v-navigation-drawer :src="require('@/assets/sidebar.jpg')"[배경입히기]-->
      <!--(2)v-navigation-drawer 배경이미지[그라디언트 취하기]-->
      <!--(3)v-navigation-drawer dark[글자 밝게하기]-->
      <!--(4)v-navigation-drawer active-class="primary"[선택시 색깔 표시]-->

      <!--하위컴포넌트에서 slot을 이용해 해당부분에 삽입-->
      <!--상위컴포넌트--> 
      <template v-slot:img="props">
        <v-img :gradient="gradient" v-bind="props"></v-img>
      </template>

      <!--drawer 제목, 부제목-->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!--drawer Navigation-->
      <v-list expand dense nav>
        
        <template v-for="(item,index) in items">
          
          <!--item.items가 존재하면O-->
          <v-list-group v-if="item.items" :key="index" :prepend-icon="item.icon">
            
            <!--주 Navigtaion-->
            <template #activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <!--보조 Navigtaion-->
            <template v-for="(itemchild, index) in item.items">
              <!--item-->
              <v-list-item :key="index" :to="itemchild.to" link>
                <v-list-item-icon>
                  <v-icon>{{ itemchild.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ itemchild.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

          </v-list-group>

          <!--item.items가 존재하면X-->
          <!--item-->
          <v-list-item v-else :key="index" :to="item.to" active-class="primary" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </template>


      </v-list>

    </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      gradient: "rgba(0,0,0,0.7), rgba(0,0,0,0.7)",

      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: "/" },
        
        { title: 'Pages', icon: 'mdi-menu', items : [
            { title: "SignIn", icon: 'mdi-account-badge', to: "/authentication/sign-in" },
            { title: "Info", icon: 'mdi-apple-finder', to: "/authentication/info" },
            
            { title: "RestaurantList", icon: 'mdi-clipboard-list-outline', to: "/page/restaurantList" },
        ]},        
      ],
    }
  }
}
</script>

<style>

</style>