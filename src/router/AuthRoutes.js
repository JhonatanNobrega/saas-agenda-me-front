import { auth } from '@/router/guards';

export default [
    {
        path: '/login',
        component: () => import('@/layouts/blank/BlankLayout.vue'),
        beforeEnter: auth,
        children: [
            {
                name: 'login',
                path: '',
                component: () => import('@/views/auth/Login.vue')
            }
        ]
    },
    {
        path: '/cadastrar',
        component: () => import('@/layouts/blank/BlankLayout.vue'),
        beforeEnter: auth,
        children: [
            {
                name: 'register',
                path: '',
                component: () => import('@/views/auth/Register.vue')
            }
        ]
    }
];
