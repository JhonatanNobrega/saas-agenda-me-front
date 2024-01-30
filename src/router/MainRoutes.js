import { redirectIfAuthenticated } from '@/router/guards';

export default {
    path: '/',
    component: () => import('@/layouts/full/FullLayout.vue'),
    beforeEnter: redirectIfAuthenticated,
    children: [
        {
            name: 'dashboard',
            path: '/',
            component: () => import('@/views/dashboard/index.vue')
        },
    ]
};
