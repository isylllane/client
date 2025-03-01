<script setup>
import {useDeviceStore} from "@/stores/DeviceStore.js";
import {createDevice, fetchBrand, fetchTypes} from "@/http/deviceAPI.js";

const device = useDeviceStore()

const info = ref([])

const name = ref('')
const price = ref(0)
const brand = ref(null)
const type = ref(null)
const file = ref(null)
const isActive = ref(false)

const changeInfo = (key, value, number) => {
  info.value = info.value.map(item => {
    if (item.number === number) {
      return {...item, [key]: value};
    }
    return item;
  });
};

const addInfo = () => {
  info.value = [...info.value, {title: '', description: '', number: Date.now()}]
}
const removeInfo = (number) => {
  info.value = info.value.filter(item => item.number !== number)
}
const itemProps = (item) => {
  return {
    title: item.name,
  }
};

const selectFile = (e) => {
  file.value = e.target.files[0]
}

const addDevice = () => {
  const formData = new FormData()
  formData.append("name", name.value)
  formData.append("price", `${price.value}`)
  formData.append("img", file.value)
  formData.append("brandId", brand.value.id)
  formData.append("typeId", type.value.id)
  formData.append("info", JSON.stringify(info.value))

  createDevice(formData).then(() => {
      isActive.value = false
    }
  ).catch(error => {
    console.error("Ошибка при создании нового устройства", error.response ? error.response.data : error);
  });
}

onMounted(() => {
  fetchBrand().then(data => {
    device.setBrands(data);
  }).catch(error => {
    console.error("Ошибка при получении брендов:", error);
  });
  fetchTypes().then(data => {
    device.setTypes(data);
  }).catch(error => {
    console.error("Ошибка при получении типов:", error);
  });
});
</script>

<template>
  <v-btn
    @click = "isActive = true"
    variant = "outlined"
    class = "mt-2"
    color = "secondary"
    text = "Добавить устройство"
  ></v-btn>

  <v-dialog
    transition = "dialog-bottom-transition"
    max-width = "600px"
    scrollable
    v-model = "isActive"
  >
    <v-toolbar rounded
               title = "Добавить устройство"
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
    <v-card>
      <template v-slot:text>
        <v-card-item class = "mt-2">
          <v-form @submit.prevent
                  class = "py-2"
          >
            <v-text-field
              v-model = "name"
              density = "compact"
              placeholder = "Введите название"
              variant = "outlined"
            ></v-text-field>
            <v-select
              v-model = "brand"
              :items = "device.brands"
              :item-props = "itemProps"
              label = "Выберите бренд"
              density = "compact"
              variant = "outlined"
            >
            </v-select>
            <v-select
              v-model = "type"
              :items = "device.types"
              :item-props = "itemProps"
              label = "Выберите тип"
              density = "compact"
              variant = "outlined"
            >
            </v-select>
            <v-text-field
              v-model = price
              type = "number"
              density = "compact"
              placeholder = "Введите стоимость"
              variant = "outlined"
            ></v-text-field>

            <v-file-upload density = "comfortable"
                           title = "Перетащите файл сюда"
                           clearable
                           show-size
                           @change = "selectFile"
            ></v-file-upload>
            <v-divider class = "my-4"/>

            <v-btn class = "d-flex justify-end"
                   @click = "addInfo"
            >
              Добавить новое свойство
            </v-btn>

            <div v-for = "item in info"
                 :key = "item.number"
                 class = "pa-4  d-flex justify-space-between"
            >
              <v-text-field
                v-model = "item.title"
                @input = "changeInfo('title', item.title, item.number)"
                density = "compact"
                placeholder = "Введите название"
                variant = "outlined"
              ></v-text-field>
              <v-text-field
                v-model = "item.description"
                @input = "changeInfo('description', item.description, item.number)"
                density = "compact"
                placeholder = "Введите описание"
                variant = "outlined"
              ></v-text-field>
              <v-btn
                variant = "flat"
                class = "text-body-1"
                color = "error"
                text = "Удалить"
                @click = "removeInfo(item.number)"
              ></v-btn>
            </div>
          </v-form>
        </v-card-item>

      </template>
      <v-card-actions class = "justify-end">
        <v-btn
          text = "Закрыть"
          @click = "isActive = false"
        ></v-btn>
        <v-btn
          text = "Добавить"
          @click = "addDevice"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
