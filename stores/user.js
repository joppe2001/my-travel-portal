// stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('users', {
  state: () => ({
    user: {
      uid: null,
      email: null,
    },
    loggedIn: false
  }),
  actions: {
    setUser(uid, email) {
      this.user.uid = uid;
      this.user.email = email;
      this.loggedIn = !!uid;
    },
    clearUser() {
      this.user.uid = null;
      this.user.email = null;
      this.loggedIn = false;
    }
  },
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.loggedIn
  }
});

export default useUserStore;
