import { LayBaseHome } from '@/layouts'
import { RoutePaths, RoutePathNames } from '@/services/definitions'

import type { RouteRecordRaw } from 'vue-router'


export const PeopleRoutes: Array<RouteRecordRaw> = [

    // ======== STAFF
    {
        path: RoutePaths.staffList,
        name: RoutePathNames.staff,
        component: () => import('../views/people/staff/ViewListStaff.vue'),
        meta: { layout: LayBaseHome, reqAuth: true }
    },
    {
        path: RoutePaths.staffForm,
        name: RoutePathNames.staffForm,
        component: () => import('../views/people/staff/ViewFormStaff.vue'),
        meta: { layout: LayBaseHome, reqAuth: true, }
    },


    // ======== CLIENTS
    {
        path: RoutePaths.clientsList,
        name: RoutePathNames.clients,
        component: () => import('../views/people/clients/ViewListClients.vue'),
        meta: { layout: LayBaseHome, reqAuth: true }
    },

    // ======== AUTHORIZATION
    {
        path: RoutePaths.authList,
        name: RoutePathNames.auth,
        component: () => import('../views/people/rbac/ViewListAuth.vue'),
        meta: { layout: LayBaseHome, reqAuth: true }
    }
]
