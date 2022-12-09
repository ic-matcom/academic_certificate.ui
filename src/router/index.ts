import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'
import { ApiAuth } from '@/services/api/api-auth'
import { LayBasePage, LayBaseHome } from '@/layouts'
import { RoutePaths, RoutePathNames } from '@/services/definitions'
import { PeopleRoutes } from '@/router/people-routes'
import { UsersRoutes } from '@/router/users-routes'
import { CertificatesRoutes } from '@/router/certificates-routes'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:  [
        {
            path:      RoutePaths.login,
            name:      RoutePathNames.login,
            component: () => import('../views/auth/ViewLogin.vue'),
            meta:      { layout: LayBasePage }
        },
        {
            path:      RoutePaths.home,
            name:      RoutePathNames.home,
            component: () => import('../views/ViewHome.vue'),
            meta:      { 
                layout: LayBaseHome,
                breadCrumb: [
                    {
                      text: RoutePathNames.home,
                      to: { path: RoutePaths.home }
                    }
                  ] 
            }
        },
        {
            path:      RoutePaths.profile,
            name:      RoutePathNames.profile,
            component: () => import('../views/auth/ViewProfile.vue'),
            meta:      { 
                layout: LayBaseHome, 
                reqAuth: true,
                breadCrumb() {
                    return [
                      {
                        text: RoutePathNames.home,
                        to: { path: RoutePaths.home }
                      },
                      {
                        text: RoutePathNames.profile,
                        to: { name: RoutePaths.profile }
                      }
            
                    ]
                  }
            }
        },
        ...PeopleRoutes,
        ...UsersRoutes,
        ...CertificatesRoutes
    ]
})

// GUARD - authentication checker | axios hook
router.beforeEach(( to, _, next ) => {

    const store = useAuthStore()
                                                // maybe we can put this outside this method to improve speed

    if (store === undefined) next()
    else if (to.meta.reqAuth && !store.isLoggedIn) {
        next(RoutePaths.login)
    }
    else if (to.name === RoutePathNames.login && store.isLoggedIn) {            // Not logged / auth
        // Try to login but the user is logged in already
        ApiAuth.setAccessToken(store.authTk)                                    // As the user is logged in already the access_token has to be in the store
        next(RoutePaths.home)
    }
    else if (to.meta.authorize)
    {
        const authorize : any = to.meta.authorize
        const role = store.user?.rol
        if(!authorize.includes(role))
        {
          next(RoutePaths.home)
        }
        else{
            next()
        }
    }
    else {
        next()                                                                  // Carry on
    }
})

export default router
