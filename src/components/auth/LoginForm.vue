<template>
  <v-alert v-if="feedbackMessage" color="error" class="mb-2">{{ feedbackMessage }}</v-alert>
  <v-form @submit.prevent="submit">
    <v-row class="d-flex mb-3">
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">E-mail</v-label>
        <v-text-field v-model="email" :error-messages="errors.email" variant="outlined" color="primary" />
      </v-col>
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Senha</v-label>
        <v-text-field v-model="password" :error-messages="errors.password" variant="outlined" type="password"
          color="primary" />
      </v-col>
      <v-col cols="12" class="pt-0">
        <div class="d-flex flex-wrap align-center ml-n2">
          <div class="ml-sm-auto">
            <RouterLink :to="{name: 'forgotPassword'}" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
              Esqueceu sua senha?
            </RouterLink>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pt-0">
        <v-btn type="submit" :loading="isSubmitting" color="primary" size="large" block flat>Entrar</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const feedbackMessage = ref("");
const authStore = useAuthStore();
const router = useRouter();

const schema = toTypedSchema(object({
  email: string().email().required().label('E-mail'),
  password: string().required().label('Senha'),
}));
const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    email: 'test@example.com',
    password: 'Password1'
  }
});
const { value: email } = useField('email');
const { value: password } = useField('password');

const submit = handleSubmit(async (values) => {
  feedbackMessage.value = '';
  await authStore
    .login(values.email, values.password)
    .then(() => {
      router.push({ name: 'dashboard' })
    }).catch((e) => {
        feedbackMessage.value = e.message;
    });
});
</script>
