import { defineStore } from 'pinia'
import { ApiUsers } from '@/services/api/api-users'

import type { IDataTableQuery, IUsersRow, IBasicPageState, IdsArray, IMultiselectBasic } from '@/services/definitions'
import type { IUserFormData } from '@/services/definitions/types-forms'
import type { IUserResponseData } from '@/services/definitions/types-api'
import type { IRol } from '@/services/definitions/entities/types-users'
import { mapRolesNom2Multiselect } from '@/services/helpers/help-forms'


// https://pinia.vuejs.org/core-concepts/#setup-stores

export const useUsersStore = defineStore({
    id: 'users',

    state: () : IUsersState => ({
        pageNumber:    0,
        pageSize:      0,
        totalRecords: 0,
        entityPage:   [] as IUsersRow[],
        roles: [] as IRol[],
        user: {id: 0, email:'',firstname:'',lastname:'',username:'', rol:''}
    }),

    /**
     * Getters are exactly the equivalent of computed values for the state of a Store |  https://pinia.vuejs.org/core-concepts/getters.html
     * as a convention, we name all the getter with a 'get' prefix
     */
    getters: {

        getUsersList: ( state ) : Array<IUsersRow> => state.entityPage,
        getRolesList: ( state ) : Array<IRol> => state.roles,
        getRolesForMultiselect: ( state ): IMultiselectBasic[] => mapRolesNom2Multiselect(state.roles),
        getEntitiesCount: ( state ) : number => state.totalRecords
    },

    actions: {

        // ---mutators ---
        // mutates the states directly without any request call to the backend

        /**
         * Delete a User from the store
         * @param payload User identifier to be deleted
         */
        mutDeleteUser( payload: number ): void {
            this.entityPage = this.entityPage.filter(userRow => payload != userRow.id)
            this.totalRecords -= 1
            //this.pageSize -= payload.ids.length
        },

        // --- async calls actions ---

        /**
         * Tries to get the list of users, with the help of a definid axios apis
         * to make the actual request
         *
         */
        async reqUsersPages (payload: IDataTableQuery) : Promise<void> {

             return await new Promise<void>((resolve, reject) => {
                ApiUsers.reqUsersPage(payload)
                .then((response:any) => {
                    this.entityPage = response.data.rows                  
                    this.totalRecords = response.data.total_rows
                    this.pageSize = response.data.limit
                    this.pageNumber = response.data.page
                    
                    resolve()

                }).catch(error => {
                    if (error.response.status === 404)
                    {
                        this.entityPage = []
                        this.totalRecords = 0
                        this.pageSize = 0
                        this.pageNumber = payload.Offset
                    }

                    reject(error)
                })
            })
        },

        /**
         * Trys to create a user using a defined axios apis
         * to make the actual request
         *
         * @param payload new user data 
         */
         async reqUserCreation (payload: IUserFormData) : Promise<void> {

            return await new Promise<void>((resolve, reject) => {
               ApiUsers.reqCreateUser(payload as IUserFormData)
               .then((response:any) => {

                   const at = response.data

                   resolve()

               }).catch(error => { reject(error) })
           })
       },

       /**
         * Trys to update a user using a defined axios apis
         * to make the actual request
         *
         * @param id User identifier to be updated
         * @param payload new user data 
         */
        async reqUserUpdate (id: number, payload: IUserFormData) : Promise<void> {

            return await new Promise<void>((resolve, reject) => {
               ApiUsers.reqUpdateUser(id, payload as IUserFormData)
               .then((response:any) => {

                   const at = response.data

                   resolve()

               }).catch(error => { reject(error) })
           })
       },

       /**
         * Tries to get a user by id
         * @param payload User identifier to be fetched
         */
        async reqUserById( payload: number ): Promise<any> {

            return await new Promise<void>((resolve, reject) => {
                ApiUsers.reqGetUserById(payload).then((response: any) => {
                    this.user.id = response.data.id
                    this.user.email = response.data.email
                    this.user.firstname = response.data.firstname
                    this.user.lastname = response.data.lastname
                    this.user.username =  response.data.username
                    this.roles.forEach(rol => {
                        if(rol.name == response.data.rol)
                        {
                            this.user.rol = rol.label                  
                        }
                    });
                    resolve()
                    
                }).catch(error => { reject(error) })
            }) 
        },

        /**
         * Tries to delete a user
         * @param payload User identifier to be deleted
         */
        async reqUserDeletion( payload: number ): Promise<void> {

            return await new Promise<void>(( resolve, reject ) => {
                ApiUsers.reqDeleteUser(payload).then(( response: any ) => {

                    // deleting (mutate / modify) the users from the local store
                    this.mutDeleteUser(payload)
                    resolve()

                }).catch(error => { reject(error) })
            })
        },

        /**
         * Tries to get the system's roles
         */
         async reqUsersRoles(): Promise<void> {

            return await new Promise<void>((resolve, reject) => {
                ApiUsers.reqGetRoles().then((response: any) => {
                    this.roles = response.data.rows

                    resolve()
                    
                }).catch(error => { reject(error) })
            }) 
        },

        /**
         * Tries to remove a user permissions
         * @param payload User identifier
         */
        async reqUserInvalidate( payload: number ): Promise<void> {

            return await new Promise<void>(( resolve, reject ) => {
                ApiUsers.reqInvalidateUser(payload).then(( response: any ) => {
                    resolve()

                }).catch(error => { reject(error) })
            })
        },

        /**
         * Tries to toggle the active status of a entity
         * @param payload entity identifiers list to be toggled
         */
        async reqToggleStatus( payload: IdsArray ): Promise<void> {
            
           // return await new Promise<void>(( resolve, reject ) => {

             //   ApiStaff.bulkToggle(payload.ids).then((response: any ) => {

                    // toggling (mutate / modify) the status of the corresponding staff from the local store
             //       this.entityPage.forEach(s => payload.ids.includes(s.id) ? s.isActive = !s.isActive : null)

                    // alternative using js map function
                    /*this.entityPage = this.entityPage.map(s => {
                        if (payload.ids.includes(s.id)) s.isActive = !s.isActive

                        return s
                    })*/

               //     resolve()

               // }).catch(error => { reject(error) })
       //     })
        }
    }
})

//region ======== STATE INTERFACE =======================================================

interface IUsersState extends IBasicPageState {
    entityPage: Array<IUsersRow>
    roles: Array<IRol>
    user: IUserResponseData
}

//endregion =============================================================================


