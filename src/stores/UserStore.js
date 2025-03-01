// Utilities
import {defineStore} from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuth: false,
    user: null,
  }),
  getters: {
    getIsAuth: (state) => state.isAuth,
    getUser: (state) => state.user,
  },
  actions: {
    setIsAuth(bool) {
      this.isAuth = bool;
    },
    setUser(user) {
      this.user = user;
    },
  },
});


