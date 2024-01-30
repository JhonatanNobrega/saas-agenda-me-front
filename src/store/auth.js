import { defineStore } from 'pinia';
import { useMeStore } from './me';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
	state: () => ({}),
	actions: {
		sanctum() {
			return axios.get('sanctum/csrf-cookie');
		},
		async login(email, password) {
			return axios.post('api/login', { email, password })
				.then((response) => {
					const meStore = useMeStore();
					meStore.user = response.data.data;
				});
		}
	}
});