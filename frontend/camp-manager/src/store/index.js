import { createStore } from "vuex";

export default createStore({
  state: {
    role: "null",
    institution: "null",
    token: null,
    csrfToken: null,
    user: null,
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
    changeCsrfToken(state, csrfToken) {
      state.csrfToken = csrfToken;
    },
    changeUser(state, user) {
      state.user = user;
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
    changeCsrfToken(context, csrfToken) {
      context.commit("changeCsrfToken", csrfToken);
    },
    changeUser(context, user) {
      context.commit("changeUser", user);
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
    getCsrfToken(state) {
      return state.csrfToken;
    },
    getUser(state) {
      return state.user;
    },
  },
});
