<script setup>
import {useDeviceStore} from "@/stores/DeviceStore.js";
import {fetchBrand} from "@/http/deviceAPI.js";

const device = useDeviceStore()

const itemProps = (item) => {
  return {
    title: item.name,
  }
};

// Загрузка брендов при монтировании компонента
onMounted(() => {
  fetchBrand().then(data => {
    device.setBrands(data);
  }).catch(error => {
    console.error("Ошибка при получении брендов:", error);
  });
});

</script>

<template>
  <v-select
    :items = "device.brands"
    :item-props = "itemProps"
    label = "Производитель"
    variant = "outlined"
    chips
    density = "compact"
    clearable
    closable-chips
  >
    <template v-slot:item = "{ props, item }">
      <v-list-item v-bind = "props"
                   :title = "item.title"
                   @click = "device.setSelectedBrand(item.raw.id)"
      ></v-list-item>
    </template>
  </v-select>
</template>

<style scoped
       lang = "sass"
>

</style>
