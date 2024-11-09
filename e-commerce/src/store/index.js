// store/index.js
import { createStore } from "vuex";

export default createStore({
  state: {
    currentUser: null,
    isAdmin: false,
  },
  mutations: {
    SET_USER(state, user) {
      console.log(user?.isAdmin);
      state.currentUser = user;
      state.isAdmin = user?.isAdmin || false;
    },
    LOGOUT_USER(state) {
      state.currentUser = null;
      state.isAdmin = false;
    },
  },
  actions: {
    loginUser({ commit }, user) {
      commit("SET_USER", user);
      localStorage.setItem("currentUser", JSON.stringify(user));
    },
    logoutUser({ commit }) {
      commit("LOGOUT_USER");
      localStorage.removeItem("currentUser");
    },
    initializeStore({ commit }) {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (user) {
        commit("SET_USER", user);
      }
    },
  },
});
