<template>
  <ForgotPasswordForm 
    v-if="state === 'forgotPassword'"
    @after-request="state = 'resetPassword'"
  />
  <ResetPasswordForm 
    v-if="state === 'resetPassword'"
    @after-reset="state = 'reset'"
  />
  <template v-if="state === 'reset'" >
    <v-alert color="success" class="mb-2">
      Sua senha foi redefinida com sucesso!
    </v-alert>
    <v-col cols="12" class="pt-0">
        <div class="d-flex flex-wrap align-center ml-n2">
          <div class="ml-sm-auto">
            <RouterLink :to="{name: 'login'}" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
              Login
            </RouterLink>
          </div>
        </div>
      </v-col>
  </template>
</template>

<script setup>
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue';
import { ref } from 'vue';

const state = ref('forgotPassword');
</script>