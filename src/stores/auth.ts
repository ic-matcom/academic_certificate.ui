import { defineStore } from 'pinia'
import { ApiAuth } from '@/services/api/api-auth'
import type { IAuthFormData } from '@/services/definitions/types-forms'
import type { UserInfo } from '@/services/definitions/entities/types-users'
import { Roles, type IMultiselectBasic } from '@/services/definitions'
import { GroupRoles } from '@/services/definitions/users-roles'
import { Cert_Status } from '@/services/definitions/enums-common'
import { mapCertStatus2Multiselect } from '@/services/helpers/help-forms'

// https://pinia.vuejs.org/core-concepts/#setup-stores

// Sample of option store
export const useAuthStore = defineStore({
    id: 'auth',

    persist: true,
    state: () : IAuthState => ({
        isLoggedIn: false,
        authTk: '',
        user: {id:0, username:'',firstname:'',lastname:'',email:'',rol:''},
        showSearchByState: false,
        userGroupRol: GroupRoles.Normal,
        validatePermission: false
    }),

    getters: {
        // doubleCount: ( state ) => state.counter * 2
        getUserRol: ( state ) => state.user.rol,
        getUserGroup: ( state ) => state.userGroupRol,
        getStatusForMultiselect: ( state ): IMultiselectBasic[] => mapCertStatus2Multiselect(Cert_Status),
        getValidatePermission: (state) => (status: number) : boolean => {
            if(state.user.rol === Roles.secretary && status === 1)
            {
                return true
            }
            else if(state.user.rol === Roles.dean && status === 2)
            {
                return true
            }
            else if(state.user.rol === Roles.rector && status === 3)
            {
                return true
            }
            return false
        }
    },

    actions: {

        // ---mutators ---

        /**
         * Set the current user logged in the system
         * @param token The JWT Authentication token
         */
        setLoggedIn( token: string ) : void {
            this.authTk = token
            this.isLoggedIn = true
        },

        /**
         * Revoking the JWT Authentication token
         */
        setLoggedOut() : void {
            // we could use this in addition to call a backend endpoint for revoking the auth token generated by the backend
            this.$reset()
        },

        /**
         * Set the current user info in the system
         * @param user The User Profile
         */
        setUserInfo( userInfo: UserInfo ) : void {
            this.user.email = userInfo.email
            this.user.firstname = userInfo.firstname
            this.user.username = userInfo.username
            this.user.lastname = userInfo.lastname
            this.user.id = userInfo.id
            this.user.rol = userInfo.rol

            if(this.getUserRol === Roles.certadmin)
            {
                this.showSearchByState = true
                this.userGroupRol = GroupRoles.CertAdmin
            }
            else if ([Roles.dean,Roles.secretary,Roles.rector].includes(this.getUserRol))
            {
                this.showSearchByState = true
                this.userGroupRol = GroupRoles.SDR
            }

        },

        // --- async calls actions ---

        /**
         * Tries to log in in the backed the given user credential data as payload, with the help of a definid axios apis
         * to make the actual request
         *
         * @param payload user credential data for logged in
         */
        async reqLogin (payload: IAuthFormData) : Promise<void> {

             return await new Promise<void>((resolve, reject) => {
                ApiAuth.reqAuth(payload as IAuthFormData)
                .then((response:any) => {

                    const at = response.data

                    if(response.status == 200){
                        this.setLoggedIn(at)
                        ApiAuth.setAccessToken(at)
                    }

                    resolve()

                }).catch(error => { reject(error) })
            })
        },

        /**
         * Tries to log out in the backend the given user with the JWT Authentication token, with the help of a defined axios apis
         * to make the actual request
         *
         */
        async reqLogout (): Promise<void> {
            return await new Promise<void>((resolve, reject) => {
                ApiAuth.reqLogOut()
                .then(() => {
                    /**
                     * Revoking the JWT Authentication token
                    */
                    this.$reset()
                    resolve()

                }).catch(error => { reject(error) })

            })

        },

        /**
         * Tries to get the logged user in the backend with the JWT Authentication token, with the help of a defined axios apis
         * to make the actual request
         *
         */
         async reqUserInfo (): Promise<void> {
            return await new Promise<void>((resolve, reject) => {
                ApiAuth.reqGetUser()
                .then((response:any) => {

                    const at = response.data

                    if(response.status == 200){
                        this.setUserInfo(at as UserInfo)
                    }

                    resolve()

                }).catch(error => { reject(error) })
            })
        }
    }
})

//region ======== INTERFACES & TYPES ====================================================

/**
 * Authentication State interface
 */
interface IAuthState {
    isLoggedIn: boolean
    authTk: string
    user: UserInfo
    showSearchByState: boolean
    userGroupRol: GroupRoles
    validatePermission: boolean
}

//endregion =============================================================================


