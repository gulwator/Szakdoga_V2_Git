import { createStore } from "vuex";

export default createStore({
  state: {
    role: "null",
    institution: "null",
    token: "null",
  },
  mutations: {
    changeRole(state, role) {
      state.role = role;
    },
    changeInstitution(state, institution) {
      state.institution = institution;
    },
    changeToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    changeRole(context, role) {
      context.commit("changeRole", role);
    },
    changeInstitution(context, institution) {
      context.commit("changeInstitution", institution);
    },
    changeToken(context, token) {
      context.commit("changeToken", token);
    },
  },
  getters: {
    getRole(state) {
      return state.role;
    },
    getInstitution(state) {
      return state.institution;
    },
    getToken(state) {
      return state.token;
    },
  },
});
