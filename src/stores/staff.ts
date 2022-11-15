import { defineStore } from 'pinia'
import { ApiStaff } from '@/services/api/api-staff'

import type { IDataTableQuery, IStaffRow, IBasicPageState, IdsArray } from '@/services/definitions'


// https://pinia.vuejs.org/core-concepts/#setup-stores

// Sample of option store
export const useStaffStore = defineStore({
    id: 'staff',

    state: () : IStaffState => ({
        pageNumber:    0,
        pageSize:      0,
        totalRecords: 0,
        entityPage:   [] as IStaffRow[]
    }),

    /**
     * Getters are exactly the equivalent of computed values for the state of a Store |  https://pinia.vuejs.org/core-concepts/getters.html
     * as a convention, we name all the getter with a 'get' prefix
     */
    getters: {

        getStaffList: ( state ) : Array<IStaffRow> => state.entityPage,
        getEntitiesCount: ( state ) : number => state.totalRecords
    },

    actions: {

        // ---mutators ---
        // mutates the states directly without any request call to the backend

        /**
         * Delete a bunch of Staff from the store
         * @param payload Staff identifiers list to be deleted
         */
        mutDeleteStaffList( payload: IdsArray ): void {
            this.entityPage = this.entityPage.filter(staffRow => !payload.ids.includes(staffRow.id))
            this.totalRecords -= payload.ids.length
            this.pageSize -= payload.ids.length
        },

        // --- async calls actions ---

        /**
         * Trys to log in in the backed the given user credential data as payload, with the help of a definid axios apis
         * to make the actual request
         *
         * @param payload user credential data for logged in
         */
        async reqStaffPages (payload: IDataTableQuery) : Promise<void> {

             return await new Promise<void>((resolve, reject) => {
                ApiStaff.reqStaffPage(payload)
                .then((response:any) => {

                    this.entityPage = response.data.entityList
                    this.totalRecords = response.data.totalRecords
                    this.pageSize = response.data.entityList.length
                    this.pageNumber = payload.Offset

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
         * Tries to delete a bunch of Staff
         * @param payload Staff identifiers list to be deleted
         */
        async reqStaffDeletion( payload: IdsArray ): Promise<void> {

            return await new Promise<void>(( resolve, reject ) => {
                ApiStaff.reqDelete(payload.ids).then(( response: any ) => {

                    // deleting (mutate / modify) the staff from the local store
                    this.mutDeleteStaffList(payload)
                    resolve()

                }).catch(error => { reject(error) })
            })
        },

        /**
         * Tries to toggle the active status of a entity
         * @param payload entity identifiers list to be toggled
         */
        async reqToggleStatus( payload: IdsArray ): Promise<void> {

            return await new Promise<void>(( resolve, reject ) => {

                ApiStaff.bulkToggle(payload.ids).then((response: any ) => {

                    // toggling (mutate / modify) the status of the corresponding staff from the local store
                    this.entityPage.forEach(s => payload.ids.includes(s.id) ? s.isActive = !s.isActive : null)

                    // alternative using js map function
                    /*this.entityPage = this.entityPage.map(s => {
                        if (payload.ids.includes(s.id)) s.isActive = !s.isActive

                        return s
                    })*/

                    resolve()

                }).catch(error => { reject(error) })
            })
        }
    }
})

//region ======== STATE INTERFACE =======================================================

interface IStaffState extends IBasicPageState {
    entityPage: Array<IStaffRow>
}

//endregion =============================================================================


