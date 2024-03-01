<template>
    <v-alert v-if="feedbackMessage" color="error" class="mb-2">{{ feedbackMessage }}</v-alert>
    <v-form @submit.prevent="submit">
        <v-row class="d-flex mb-3">
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Name</v-label>
                <v-text-field variant="outlined" v-model="first_name" :error-messages="errors.first_name" color="primary" />
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Email Address</v-label>
                <v-text-field variant="outlined" v-model="email" :error-messages="errors.email" type="email"
                    color="primary" />
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Password</v-label>
                <v-text-field variant="outlined" v-model="password" :error-messages="errors.password" type="password"
                    color="primary" />
            </v-col>
            <v-col cols="12">
                <v-btn type="submit" :loading="isSubmitting" color="primary" size="large" block flat>Sign up</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template> 

<script setup>
import { useForm, useField } from 'vee-validate';
import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const schema = toTypedSchema(object({
    first_name: string().required().label('Nome'),
    email: string().email().required().label('E-mail'),
    password: string().required().min(8).matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        'Pelo menos uma letra e um número'
    ).label('Senha'),
}));
const { handleSubmit, errors, isSubmitting } = useForm({
    validationSchema: schema,
    initialValues: {
        first_name: 'Jon',
        email: 'jon@snom.com',
        password: 'password1'
    }
});

const router = useRouter();
const feedbackMessage = ref('');

const submit = handleSubmit(async (values) => {
    feedbackMessage.value = '';
    const authStore = useAuthStore();
    await authStore.register(values.first_name, values.email, values.password)
        .then(async () => {
            await authStore.login(values.email, values.password)
            router.push({ name: 'dashboard' })
        })
        .catch((e) => {
            feedbackMessage.value = e.message
        })
});

const { value: first_name } = useField('first_name');
const { value: email } = useField('email');
const { value: password } = useField('password');
</script>