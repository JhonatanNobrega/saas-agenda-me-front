import { defineStore } from "pinia";
import { useMeStore } from "./me";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({}),
  actions: {
    sanctum() {
      return axios.get("sanctum/csrf-cookie");
    },
    async login(email, password) {
      return axios.post("api/login", { email, password }).then((response) => {
        const meStore = useMeStore();
        meStore.user = response.data.data;
      });
    },
    async register(firstName, email, password) {
      return axios.post("api/register", {
        first_name: firstName,
        email,
        password,
      });
    },
    verifyEmail(token) {
      return axios.post("api/verify-email", { token });
    },
    forgotPassword(email) {
      return axios.post("api/forgot-password", { email });
    },
    resetPassword(token, password) {
      return axios.post("api/reset-password", { token, password });
    },
  },
});
