<script setup>

import {useDeviceStore} from "@/stores/DeviceStore.js";
import DeviceItem from "@/components/DeviceItem.vue";

const device = useDeviceStore()
</script>

<template>
  <v-row>

    <DeviceItem v-for = "(device, index) in device.devices"
                :key = "index"
                :device = "device"
    />

  </v-row>
</template>

<style scoped>

</style>
