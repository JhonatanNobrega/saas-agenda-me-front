<template>
  <v-alert v-if="feedbackMessage" color="error" class="mb-2">{{ feedbackMessage }}</v-alert>
  <v-form @submit.prevent="submit">
    <v-row class="d-flex mb-3">
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">E-mail</v-label>
        <v-text-field v-model="email" :error-messages="errors.email" variant="outlined" color="primary" />
      </v-col>
      <v-col cols="12" class="pt-0">
        <v-btn type="submit" :loading="isSubmitting" color="primary" size="large" block flat>Recuperar senha</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { useAuthStore } from '@/store/auth';

const emits = defineEmits(['after-request']);
const feedbackMessage = ref("");
const authStore = useAuthStore();

const schema = toTypedSchema(object({
  email: string().email().required().label('E-mail'),
}));
const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    email: 'test@example.com',
  }
});
const { value: email } = useField('email');

const submit = handleSubmit(async (values) => {
  feedbackMessage.value = '';
  await authStore
    .forgotPassword(values.email)
    .then(() => {
      emits('after-request');
    }).catch((e) => {
      feedbackMessage.value = e.message;
    });
});
</script>
