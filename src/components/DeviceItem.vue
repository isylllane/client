<script setup>


defineProps({
  device: {
    type: Object,
    required: true,
  },
});

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
</script>

<template>

  <v-col md = "3">
    <v-card class = "cursor-pointer"
            variant = "outlined"
            max-width = "200px"
            min-width = "150px"
            :to = "'/device/' + device.id"

    >
      <v-img
        height = "150px"
        :src = "apiBaseUrl+'/api/img/'+device.img"
      ></v-img>

      <v-card-item>
        Samsung
        {{ device.name }}
      </v-card-item>
      <v-card-item class = "d-flex justify-end justify-content-between align-items-center">

        <v-icon icon = "mdi-star"
                color = "primary"
                size = "small"
        ></v-icon>
        <span>4.55</span>
      </v-card-item>

    </v-card>

  </v-col>
</template>

<style scoped>

</style>
