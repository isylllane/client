<script setup>

import CreateDevice from "@/components/modals/CreateDevice.vue";
import CreateType from "@/components/modals/CreateType.vue";
import CreateBrand from "@/components/modals/CreateBrand.vue";

</script>

<template>
  <v-container class = "d-flex flex-column">
    <CreateType/>
    <CreateBrand/>
    <CreateDevice
    />

  </v-container>
</template>

<style scoped
       lang = "sass"
>

</style>
