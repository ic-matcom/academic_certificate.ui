import { LayBaseHome } from '@/layouts'
import { RoutePaths, RoutePathNames, Roles } from '@/services/definitions'

import type { RouteRecordRaw } from 'vue-router'


export const CertificatesRoutes: Array<RouteRecordRaw> = [

    // ======== Certificates
    {
        path: RoutePaths.certificatesSearch,
        name: RoutePathNames.certificatesSearch,
        component: () => import('../views/certificates/ViewSearchCertificates.vue'),
        meta: { 
            layout: LayBaseHome,
            breadCrumb() {
                return [
                  {
                    text: RoutePathNames.home,
                    to: { path: RoutePaths.home }
                  },
                  {
                    text: RoutePathNames.certificatesSearch,
                    to: { name: RoutePaths.certificatesSearch }
                  }
        
                ]
              }
            }
    },
    {
        path: RoutePaths.certificatesList,
        name: RoutePathNames.certificates,
        component: () => import('../views/certificates/ViewListCertificates.vue'),
        meta: { 
            layout: LayBaseHome,
            breadCrumb() {
                return [
                  {
                    text: RoutePathNames.home,
                    to: { path: RoutePaths.home }
                  },
                  {
                    text: RoutePathNames.certificatesSearch,
                    to: { name: RoutePaths.certificatesSearch }
                  },
                  {
                    text: RoutePathNames.certificates,
                    to: { name: RoutePaths.certificatesList }
                  }
        
                ]
              }
        }
    },
    {
        path: RoutePaths.certificatesToValidateList,
        name: RoutePathNames.certificatesToValidate,
        component: () => import('../views/certificates/ViewValidateListCertificates.vue'),
        meta: { layout: LayBaseHome, reqAuth: true, authorize:[Roles.secretary,Roles.dean,Roles.rector] }
    },
    {
        path: RoutePaths.certificatesCreate,
        name: RoutePathNames.certificatesCreate,
        component: () => import('../views/certificates/ViewFormCertificates.vue'),
        meta: { layout: LayBaseHome, reqAuth: true, authorize:[Roles.certadmin] }
    },
    {
        path: RoutePaths.certificatesForm,
        name: RoutePathNames.certificatesDetails,
        component: () => import('../views/certificates/ViewFormCertificates.vue'),
        meta: { layout: LayBaseHome, }
    },
    {
        path: RoutePaths.certificatesForm,
        name: RoutePathNames.certificatesModify,
        component: () => import('../views/certificates/ViewFormCertificates.vue'),
        meta: { layout: LayBaseHome, reqAuth: true, authorize:[Roles.certadmin] }
    },
    {
        path: RoutePaths.certificatesValidate,
        name: RoutePathNames.certificatesValidate,
        component: () => import('../views/certificates/ViewFormValidateCertificates.vue'),
        meta: { layout: LayBaseHome, reqAuth: true, authorize:[Roles.secretary,Roles.dean,Roles.rector] }
    },
    {
        path: RoutePaths.certificatesValidate,
        name: RoutePathNames.certificatesInvalidate,
        component: () => import('../views/certificates/ViewFormValidateCertificates.vue'),
        meta: { layout: LayBaseHome, reqAuth: true, authorize:[Roles.secretary,Roles.dean,Roles.rector] }
    },
]
