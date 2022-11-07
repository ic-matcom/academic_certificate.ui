import { defineStore } from 'pinia'
import { ApiUsers } from '@/services/api/api-users'

import type { IDataTableQuery, IUsersRow, IBasicPageState, IdsArray } from '@/services/definitions'
import type { IUserFormData } from '@/services/definitions/types-forms'


// https://pinia.vuejs.org/core-concepts/#setup-stores

// Sample of option store
export const useUsersStore = defineStore({
    id: 'users',

    state: () : IUsersState => ({
        pageNumber:    0,
        pageSize:      0,
        totalRecords: 0,
        entityPage:   [] as IUsersRow[],
        user: {email:'',firstname:'',lastname:'',passphrase:'',username:''} 
    }),

    /**
     * Getters are exactly the equivalent of computed values for the state of a Store |  https://pinia.vuejs.org/core-concepts/getters.html
     * as a convention, we name all the getter with a 'get' prefix
     */
    getters: {

        getUsersList: ( state ) : Array<IUsersRow> => state.entityPage,
        getEntitiesCount: ( state ) : number => state.totalRecords
    },

    actions: {

        // ---mutators ---
        // mutates the states directly without any request call to the backend

        /**
         * Delete a User from the store
         * @param payload User identifier to be deleted
         */
        mutDeleteUser( payload: string ): void {
            this.entityPage = this.entityPage.filter(userRow => payload != userRow.username)
            this.totalRecords -= 1
            //this.pageSize -= payload.ids.length
        },

        // --- async calls actions ---

        /**
         * Trys to log in in the backed the given user credential data as payload, with the help of a definid axios apis
         * to make the actual request
         *
         * @param payload user credential data for logged in
         */
        async reqUsersPages () : Promise<void> {

             return await new Promise<void>((resolve, reject) => {
                ApiUsers.reqGetUsers()
                .then((response:any) => {

                    this.entityPage = response.data                    
                    this.totalRecords = response.data.length
                    this.pageSize = response.data.length
                    this.pageNumber = 1
                    
                    resolve()

                }).catch(error => {

                    if (error.response.status === 404)
                    {
                        this.entityPage = []
                        this.totalRecords = 0
                        this.pageSize = 0
                        this.pageNumber = 1//payload.Offset
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
        async reqUserUpdate (id: string, payload: IUserFormData) : Promise<void> {

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
        async reqUserById( payload: string ): Promise<any> {

            return await new Promise<void>((resolve, reject) => {
                ApiUsers.reqGetUserById(payload).then((response: any) => {
                    this.user.email = response.data.email
                    this.user.firstname = response.data.firstname
                    this.user.lastname = response.data.lastname
                    this.user.username =  response.data.username

                    resolve()
                    
                }).catch(error => { reject(error) })
            }) 
        },

        /**
         * Tries to delete a user
         * @param payload User identifier to be deleted
         */
        async reqUserDeletion( payload: string ): Promise<void> {

            return await new Promise<void>(( resolve, reject ) => {
                ApiUsers.reqDeleteUser(payload).then(( response: any ) => {

                    // deleting (mutate / modify) the users from the local store
                    this.mutDeleteUser(payload)
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
    entityPage: Array<IUsersRow>,
    user: IUserFormData
}

//endregion =============================================================================


