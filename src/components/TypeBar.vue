<script setup>

import {useDeviceStore} from "@/stores/DeviceStore.js";
import {fetchTypes} from "@/http/deviceAPI.js";

const device = useDeviceStore()


const SelectType = (name) => {
  device.setSelectedType(name.id)
}

// Загрузка типов при монтировании компонента

onMounted(() => {
  fetchTypes().then(data => {
    device.setTypes(data);
  }).catch(error => {
    console.error("Ошибка при получении типов:", error);
  });
});
</script>

<template>
  <v-list>
    <v-list-subheader>Все типы</v-list-subheader>

    <v-list-item
      v-for = "(item, i) in device.types"
      :key = "i"
      :value = "item"
      color = "primary"
      variant = "tonal"
    >

      <v-list-item-title v-text = "item.name"
                         @click = SelectType(item)
      ></v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style scoped
>

</style>
