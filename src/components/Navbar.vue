<script setup>
import {useUserStore} from "@/stores/UserStore.js";

const user = useUserStore()

const pages = [
  {text: "Главная", path: "/"},
  {text: "Логин", path: "/login"},
  {text: "Рег", path: "/registration/"},
];
const logOut = () => {
  user.setUser({})
  user.setIsAuth(false)
  localStorage.removeItem("token")
}
</script>

<template>


  <v-app-bar
    dense
    :density = "$vuetify.display.mdAndUp ? 'default' : 'compact'"
    class = " px-2 px-md-8 px-lg-16"
    scroll-behavior = "elevate"
    max-width = "1200px"
  >
    <v-container class = "pa-0 fill-height">
      <v-btn
        class = "ms-1 text-h5"
        color = "primary"
        to = "/"
        variant = "plain"
        v-ripple = "false"
      >TechPoint
      </v-btn>

      <v-spacer/>
      <div class = "d-flex">
        <div v-for = "(page, i) in pages"
             :key = "i"
        >
          <v-btn
            v-bind = "page"
            slim
            :to = "page.path"
            class = "me-2 text-none text-base"
          />
        </div>
      </div>

      <v-spacer/>

      <v-divider class = "mr-3"
                 inset
                 vertical
      ></v-divider>

      <div v-if = "user.isAuth"

      >
        <v-btn
          class = "text-none text-subtitle-1 mx-2"
          color = "secondary"
          to = "/admin"
          variant = "outlined"
          v-ripple = "false"
        >Админ панель
        </v-btn>
        <v-btn
          class = "text-none text-subtitle-1"
          color = "secondary"
          @click = "logOut"
          variant = "outlined"
          v-ripple = "false"
        >Выйти
        </v-btn>
        <!--      <v-btn-->
        <!--        class = "ms-1"-->
        <!--        color = "medium-emphasis"-->
        <!--        icon = "mdi-cart-outline"-->
        <!--        to = "/cart/"-->
        <!--        variant = "plain"-->
        <!--        v-ripple = "false"-->
        <!--      />-->
      </div>
      <div v-else
      >
        <v-btn
          class = "text-none text-subtitle-1"
          color = "secondary"
          to = "/login"
          variant = "outlined"
          v-ripple = "false"
        >Авторизация
        </v-btn>

      </div>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.nav-bar-logo a {
  color: #fff;
  text-decoration: none;

}
</style>
