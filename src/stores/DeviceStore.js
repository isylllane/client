// Utilities
import {defineStore} from 'pinia'

export const useDeviceStore = defineStore('device', {
  state: () => ({
    types: [],
    brands: [],
    devices: [],
    selectedType: null,
    selectedBrand: null,
    page: 1,
    totalCount: 0,
    limit: 5
  }),
  getters: {
    pageCount(state) {
      return Math.ceil(state.totalCount / state.limit)
    },
  },
  actions: {
    setTypes(types) {
      this.types = types;
    },
    setBrands(brands) {
      this.brands = brands;
    },
    setDevices(devices) {
      this.devices = devices;
    },
    setSelectedType(type) {
      this.selectedType = type;
    },
    setSelectedBrand(brand) {
      this.selectedBrand = brand;
    },
    setPage(page) {
      this.page = page;
    },
    setTotalCount(totalCount) {
      this.totalCount = totalCount;
    },
    setLimit(limit) {
      this.limit = limit;
    }
  },
})
