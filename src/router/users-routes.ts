import { LayBaseHome } from '@/layouts'
import { RoutePaths, RoutePathNames, Roles } from '@/services/definitions'

import type { RouteRecordRaw } from 'vue-router'


export const UsersRoutes: Array<RouteRecordRaw> = [

    // ======== USERS
    {
        path: RoutePaths.usersList,
        name: RoutePathNames.users,
        component: () => import('../views/users/ViewListUsers.vue'),
        meta: { layout: LayBaseHome, reqAuth: true, authorize:[Roles.sysadmin]}
    },
    {
        path: RoutePaths.usersForm,
        name: RoutePathNames.usersCreate,
        component: () => import('../views/users/ViewFormUsers.vue'),
        meta: { layout: LayBaseHome, reqAuth: true, authorize:[Roles.sysadmin]}
    },
    {
        path: RoutePaths.usersForm,
        name: RoutePathNames.usersForm,
        component: () => import('../views/users/ViewFormUsers.vue'),
        meta: { layout: LayBaseHome, reqAuth: true, authorize:[Roles.sysadmin] }
    },
    {
        path: RoutePaths.usersForm,
        name: RoutePathNames.usersDetails,
        component: () => import('../views/users/ViewFormUsers.vue'),
        meta: { layout: LayBaseHome, reqAuth: true, authorize:[Roles.sysadmin]}
    },

]
