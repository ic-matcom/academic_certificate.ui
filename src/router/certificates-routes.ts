import { LayBaseDashboard } from '@/layouts'
import { RoutePaths, RoutePathNames, Roles } from '@/services/definitions'

import type { RouteRecordRaw } from 'vue-router'


export const CertificatesRoutes: Array<RouteRecordRaw> = [

    // ======== Certificates
    {
        path: RoutePaths.certificatesList,
        name: RoutePathNames.certificates,
        component: () => import('../views/certificates/ViewListCertificates.vue'),
        meta: { layout: LayBaseDashboard, reqAuth: true }
    },
    {
        path: RoutePaths.certificatesCreate,
        name: RoutePathNames.certificatesCreate,
        component: () => import('../views/certificates/ViewFormCertificates.vue'),
        meta: { layout: LayBaseDashboard, reqAuth: true, authorize:[Roles.certadmin] }
    },
    {
        path: RoutePaths.certificatesForm,
        name: RoutePathNames.certificatesDetails,
        component: () => import('../views/certificates/ViewFormCertificates.vue'),
        meta: { layout: LayBaseDashboard, reqAuth: true, }
    },
    {
        path: RoutePaths.certificatesForm,
        name: RoutePathNames.certificatesModify,
        component: () => import('../views/certificates/ViewFormCertificates.vue'),
        meta: { layout: LayBaseDashboard, reqAuth: true, authorize:[Roles.certadmin] }
    },
    {
        path: RoutePaths.certificatesForm,
        name: RoutePathNames.certificatesValidate,
        component: () => import('../views/certificates/ViewFormValidateCertificates.vue'),
        meta: { layout: LayBaseDashboard, reqAuth: true, authorize:[Roles.secretary,Roles.dean,Roles.rector] }
    },
    {
        path: RoutePaths.certificatesForm,
        name: RoutePathNames.certificatesInvalidate,
        component: () => import('../views/certificates/ViewFormValidateCertificates.vue'),
        meta: { layout: LayBaseDashboard, reqAuth: true, authorize:[Roles.secretary,Roles.dean,Roles.rector] }
    },
]
