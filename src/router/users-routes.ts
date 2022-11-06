import { LayBaseDashboard } from '@/layouts'
import { RoutePaths, RoutePathNames } from '@/services/definitions'

import type { RouteRecordRaw } from 'vue-router'


export const UsersRoutes: Array<RouteRecordRaw> = [

    // ======== USERS
    {
        path: RoutePaths.usersList,
        name: RoutePathNames.users,
        component: () => import('../views/users/ViewListUsers.vue'),
        meta: { layout: LayBaseDashboard, reqAuth: true }
    },
    {
        path: RoutePaths.usersForm,
        name: RoutePathNames.usersCreate,
        component: () => import('../views/users/ViewCreateUser.vue'),
        meta: { layout: LayBaseDashboard, reqAuth: true, }
    },
    {
        path: RoutePaths.usersForm,
        name: RoutePathNames.usersForm,
        component: () => import('../views/users/ViewCreateUser.vue'),
        meta: { layout: LayBaseDashboard, reqAuth: true, }
    },

]
