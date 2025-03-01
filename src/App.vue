<template>
  <v-app>
    <Navbar/>
    <v-main>
      <div v-if = "loading"
           class = "d-flex flex-column align-center justify-center align-center h-100"
      >

        <v-progress-circular

          color = "primary"
          indeterminate
          :size = "65"
          :width = "10"
        ></v-progress-circular>
      </div>

      <router-view v-else/>
    </v-main>
    <Footer/>
  </v-app>

</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import {useUserStore} from "@/stores/UserStore.js";
import {check} from "@/http/userAPI.js";

const user = useUserStore()
const loading = ref(true);
onMounted(() => {
  check().then(() => {
    user.setUser(true);
    user.setIsAuth(true);
  }).finally(() => {
    loading.value = false;
  }).catch(error => {
    console.error(error);
  });
});

</script>

<style>

</style>
