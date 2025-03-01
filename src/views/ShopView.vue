<script setup>
import AppTypeBar from "@/components/TypeBar.vue";
import BrandBar from "@/components/BrandBar.vue";
import DeviceList from "@/components/DeviceList.vue";
import {useDeviceStore} from "@/stores/DeviceStore.js";
import Pagintaion from "@/components/Pagintaion.vue";
import {fetchDevices} from "@/http/deviceAPI.js";

const device = useDeviceStore()

const isLoading = ref(false);
onMounted(() => {
  isLoading.value = true;
  fetchDevices(null, null, device.page, device.limit).then(data => {
    device.setDevices(data.rows);
    device.setTotalCount(data.count);
    isLoading.value = false;
  }).catch(error => {
    console.error("Ошибка при получении товаров:", error);
  });
})
watch(
  () => [device.selectedType, device.selectedBrand, device.page],
  ([selectedType, selectedBrand, page]) => {
    isLoading.value = true;
    fetchDevices(selectedType, selectedBrand, page, device.limit)
      .then(data => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
        isLoading.value = false;
      })
      .catch(error => {
        console.error("Ошибка при получении товаров:", error);
      });
  }
);

</script>

<template>
  <v-container>
    <v-row>

      <v-col md = "3"
             cols = "12"
      >

        <AppTypeBar/>
      </v-col>
      <v-col md = "9">
        <BrandBar/>
        <div v-if = "isLoading"
             class = "d-flex flex-column align-center justify-center align-center h-100"
        >

          <v-progress-circular
            indeterminate
            color = "primary"
          >

          </v-progress-circular>
        </div>
        <DeviceList v-else/>
        <Pagintaion/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped
>

</style>
