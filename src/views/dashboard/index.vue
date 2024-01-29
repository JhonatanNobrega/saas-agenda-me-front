<template>
  <div>
    Dashboard <br><br>
    <pre>{{ authStore.user }}</pre> <br><br>
    Tá logado jovem? {{ authStore.isLoggedIn }}
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();
</script>