<script setup>
import {useDeviceStore} from "@/stores/DeviceStore.js";

const device = useDeviceStore()

const onPageChange = (page) => {
  device.setPage = page;
}
</script>

<template>
  <v-pagination :length = "device.pageCount"
                class = "mt-5"
                v-model = "device.page"
                @input = "onPageChange"
  >

  </v-pagination>
</template>

<style scoped>

</style>
