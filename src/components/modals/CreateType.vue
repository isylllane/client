<script setup>
import {createType} from "@/http/deviceAPI.js";

const value = ref('')
const isActive = ref(false)
const loading = ref(false)

const addType = async () => {
  try {
    loading.value = true
    const data = await createType({name: value.value});
    if (data) {
      value.value = '';
      isActive.value = false;
      loading.value = false
    } else {

      console.warn("Type creation failed, no data received");
    }
  } catch (error) {
    console.error("Error creating type:", error);
  }
};
</script>

<template>
  <v-btn
    @click = "isActive = true"
    variant = "outlined"
    class = "mt-2"
    color = "secondary"
    text = "Добавить тип"
  ></v-btn>
  <v-dialog
    transition = "dialog-bottom-transition"
    width = "300px"
    v-model = "isActive"
  >

    <v-card>
      <v-toolbar title = "Добавить тип"
                 density = "compact"
      >
        <v-btn icon
               size = "small"
               @click = "isActive.value = false"
        >
          <v-icon icon = "mdi-close"

          />
        </v-btn>
      </v-toolbar>

      <v-card-item>
        <v-form @submit.prevent>
          <v-text-field
            density = "compact"
            placeholder = "Введите тип"
            variant = "outlined"
            v-model = "value"
          ></v-text-field>
        </v-form>
      </v-card-item>

      <v-card-actions class = "justify-end">
        <v-btn
          text = "Закрыть"
          @click = "isActive.value = false"
        ></v-btn>
        <v-btn
          text = "Добавить"
          @click = "addType(isActive)"
          :loading = "loading"
        ></v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<style scoped>

</style>
