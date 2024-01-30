<template>
  <div>
    Dashboard <br><br>
    <pre>{{ meStore.user }}</pre> <br><br>
    Tá logado jovem? {{ meStore.isLoggedIn }}
  </div>
</template>

<script setup>
import { useMeStore } from '@/store/me';
const meStore = useMeStore();
</script>