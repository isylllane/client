<script setup>
import {login, registration} from "@/http/userAPI.js";

const visiblePassword = ref(false);
import {useRoute, useRouter} from 'vue-router';
import {useUserStore} from "@/stores/UserStore.js";

const route = useRoute();
const router = useRouter();
const user = useUserStore()
const isLogin = computed(() => {
  return route.path === '/login'
})

const email = ref('');
const password = ref('');
const loading = shallowRef(false);
const rules = [
  value => {
    if (value) return true

    return 'Поле должно быть заполнено'
  }
];

const click = async () => {
  try {
    loading.value = true;
    if (isLogin.value) {
      await login(email.value, password.value);
    } else {
      await registration(email.value, password.value);
    }
    user.setUser(user)
    user.setIsAuth(true)
    loading.value = false;
    router.push('/');
  } catch (err) {
    alert(err.response.data.message);
    loading.value = false;
  }


}
</script>

<template>
  <v-container class = "d-flex justify-center align-center h-100">

    <v-card class = "text-center pa-5"
            min-width = "350px"
    >
      <v-card-title class = "text-h4">{{ isLogin ? 'Авторизация' : 'Регистрация' }}</v-card-title>

      <form action = ""
            @submit.prevent = "submit"
      >

        <v-text-field
          class = "mb-1"
          density = "compact"
          placeholder = "Введите ваш email..."
          :rules = "rules"
          prepend-inner-icon = "mdi-email-outline"
          variant = "outlined"
          v-model = "email"
          required
        ></v-text-field>
        <v-text-field
          :append-inner-icon = "visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type = "visiblePassword ? 'text' : 'password'"
          :rules = "rules"
          density = "compact"
          placeholder = "Введите пароль"
          prepend-inner-icon = "mdi-lock-outline"
          variant = "outlined"
          @click:append-inner = "visiblePassword = !visiblePassword"
          v-model = "password"
          required
        ></v-text-field>


        <v-btn
          class = "mb-8 mt-2"
          color = "primary"
          size = "large"
          variant = "tonal"
          block
          @click = "click"
          :loading = "loading"
          type = "submit"
        >
          {{ isLogin ? "Войти" : "Регистрация" }}
        </v-btn>

      </form>

      <v-card-text class = "text-center"
                   v-if = "isLogin"
      >
        <router-link
          class = "text-decoration-none text-primary"

          to = "/registration"
        >
          Нет аккаунта? Зарегистрируйся!
          <v-icon icon = "mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped
>

</style>
