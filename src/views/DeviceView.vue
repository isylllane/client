<script setup>
import {useRoute} from "vue-router";
import {fetchOneDevice} from "@/http/deviceAPI.js";

const route = useRoute()
const device = ref({info: []});

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

onMounted(async () => {
  try {
    const data = await fetchOneDevice(route.params.id);
    if (data) {
      device.value = data;
    } else {
      console.warn("No device data received for ID:", route.params.id);
    }
  } catch (error) {
    console.error("Error fetching device:", error);
  }
});
</script>

<template>
  <v-container class = "mt-3"
  >
    <v-row>
      <v-col md = "4"
             cols = "12"
      >
        <v-img
          height = "200px"
          :src = "apiBaseUrl+'/api/img/'+device.img"

        ></v-img>
      </v-col>
      <v-col md = "4"
             cols = "12"
      >
        <h2>{{ device.name }}</h2>
        <div class = "d-flex align-center">
          <v-rating v-model = "device.rating"
                    color = "secondary"
                    readonly
          >
          </v-rating>
        </div>

      </v-col>
      <v-col md = "4">
        <v-card elevation = "2">
          <v-card-title class = "text-h5 font-weight-bold">
            {{ device.price }} ₽

          </v-card-title>

          <v-card-actions>
            <v-btn
              color = "primary"
              class = "rounded-lg text-none flex-fill"
              size = "large"
              variant = "elevated"
            >В корзину
            </v-btn
            >
          </v-card-actions>
          <v-divider></v-divider>

        </v-card>
      </v-col>
    </v-row>
    <div class = "text-h6 text-md-h6 font-weight-bold my-4"
    >
      Описание и характеристики
    </div>
    <v-row>
      <v-col cols = "12"
             md = "9"

      >
        <v-list rounded
                elevation = "1"
        >
          <v-list-item :title = description.title
                       v-for = "description in device.info"
                       :key = "description.id"
          >
            <template v-slot:append>
              <div class = "text-left"
                   style = "display: flex"
              >
                {{ description.description }}
                <v-spacer></v-spacer>
              </div>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped
       lang = "sass"
>

</style>
