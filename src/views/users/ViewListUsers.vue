<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">
                <CmpCard>
                    <CmpDataTable table-type="hover"
                                  :subject="$t('entities.users.name')"
                                  :entityMode="eMode"
                                  :columns="columns"
                                  :data="usersStore.getUsersList"
                                  :count="usersStore.getEntitiesCount"
                                  :has-actions="true"
                                  :filters="filters"

                                  @navCreateIntent="h_navCreateUsers"
                                  @requestIntent="h_reqQuery"
                                  @editIntent="h_navEditUsers"
                                  @deleteIntent="h_reqDeleteUser"

                                  @bulkActionIntent="h_BulkActionIntent"
                    >
                    </CmpDataTable>
                </CmpCard>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">

import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { defineComponent, onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import { useToast } from 'vue-toastification'
import { HUsersTable } from '@/services/definitions/data-datatables'
import { RoutePathNames } from '@/services/definitions'
import { EntityTypes, queryBase } from '@/services/definitions'
import { CmpCard, CmpDataTable } from '@/components'
import useDialogfy from '@/services/composables/useDialogfy'
import useToastify from '@/services/composables/useToastify'

import type { FormMode, IDataTableQuery, IBulkData } from '@/services/definitions'


export default defineComponent({
    name: 'ViewListUsers',
    components: {
        CmpCard,
        CmpDataTable
    },
    setup() {

        //#region ======= DECLARATIONS & LOCAL STATE ==========================================

        const {t} = useI18n({useScope: 'global'})

        const usersStore = useUsersStore()
        const eMode: EntityTypes = EntityTypes.Users

        const router = useRouter()
        const toast = useToast()                                            // The toast lib interface
        const columns = HUsersTable
        const filters = [ 'storeType', 'isActive' ]

        const { tfyBasicSuccess, tfyBasicFail } = useToastify(toast)
        const { dialogfyConfirmation } = useDialogfy()

        //#endregion ==========================================================================

        //region ======== HOOKS ===============================================================

        /**
         * setup is called before component creation, so the onMounted hook is a good time / place to
         * invoke data population method through web API request.
         */
        onMounted(() => {
            // populate users datatable
            usersStore.reqUsersPages().catch(err => tfyBasicFail(err, 'Users', 'request'))
        })

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================
        // ❗ this functions here for fetching data could be async await functions easily, if is needed

        function a_reqQuery( queryData: IDataTableQuery ) {
            usersStore.reqUsersPages().catch(err => tfyBasicFail(err, 'Users', 'request'))
        }

        function a_reqUser( id: string ) {
            console.log(id)
            usersStore.reqUserById(id).then(() => {

                router.push({
                name  : RoutePathNames.usersForm,
                params: {
                    fmode: 'details' as FormMode,
                    id   : '',
                    cname: RoutePathNames.usersCreate                                  // Translation Name of the Route, this is used when we need to specify a name programmatically, cname = custom name
                }
            })

            }).catch(err => tfyBasicFail(err, 'User', 'request'))
        }

        function a_reqDelete( id: string ) {
            console.log(id)
            usersStore.reqUserDeletion(id).then(() => {

                tfyBasicSuccess('User', 'deletion')

                // If a user delete al the records from a page of the table, then the table becomes empty, so in this case we need to make a request for the remains data (in the server, ... if any) and repopulate the table / page
                //if (usersStore.pageSize == 0 && usersStore.totalRecords > 0)
                //    usersStore.reqStaffPages(queryBase).catch(err => tfyBasicFail(err, 'Staff', 'request'))

            }).catch(err => tfyBasicFail(err, 'User', 'deletion'))
        }

        function a_bulkSwitchState( ids: Array<number> ) {
            let msgSubject = t('entities.staff.name', ids.length)

            usersStore.reqToggleStatus({ids})
            .then(() => tfyBasicSuccess(msgSubject, 'update'))
            .catch(err => tfyBasicFail(err, msgSubject, 'update'))
        }

        //#endregion ==========================================================================

        //#region ======= COMPUTATIONS & GETTERS ==============================================
        //#endregion ==========================================================================

        //#region ======= EVENTS HANDLERS =====================================================

        async function h_reqGetUserById( objectId: string ) {
            console.log(objectId)
            a_reqUser(objectId)
        }

        async function h_reqDeleteUser( objectId: string ) {
            console.log(objectId)
            const wasConfirmed = await dialogfyConfirmation('delete', 'users')
            if (wasConfirmed) a_reqDelete(objectId)
        }

        function h_navCreateUsers() {
            router.push({
                name  : RoutePathNames.usersForm,
                params: {
                    fmode: 'create' as FormMode,
                    id   : '',
                    cname: RoutePathNames.usersCreate                                  // Translation Name of the Route, this is used when we need to specify a name programmatically, cname = custom name
                }
            })
        }

        async function h_navEditUsers( objectId: string ) {
            console.log(objectId)
            router.push({
                name  : RoutePathNames.usersForm,
                params: {
                    fmode: 'edit' as FormMode,
                    id   : objectId,
                    cname: RoutePathNames.usersForm                                  // Translation Name of the Route, this is used when we need to specify a name programmatically, cname = custom name
                }
            })
        }

        function h_reqQuery( queryData: IDataTableQuery ) {
            console.log(usersStore.entityPage)
            a_reqQuery(queryData)
        }

        async function h_BulkActionIntent( bulkData: IBulkData ) {

            /*// This is a somewhat hacky way of cast string to int in typescript. It has to do with type coercion, and
            // it is a pain to deal with in JS. I use this way because is visually placement and beautiful, in some way;
            // for a more readable form, use v => parseInt (v)
            const dataIds = bulkData.ids.map(v => +v)
            if (bulkData.actionType === 'REMOVE') {
                const wasConfirmed = await dialogfyConfirmation('delete', 'staff')
                if (wasConfirmed) a_reqDelete(dataIds)
            }
            else if (bulkData.actionType === 'ENABLE') {
                const wasConfirmed = await dialogfyConfirmation('activate', 'staff', true)
                if (wasConfirmed) {
                    // need to enable all selected disabled stores. Filter the staff to find whether Id from the staff in the local store
                    // actually is in the given Id list ... and also check the Staff isn't active already in the local store
                    let ids = usersStore.entityPage.filter(s => dataIds.indexOf(s.id) !== -1 && !s.isActive).map(s => s.id)
                    if (ids.length > 0) a_bulkSwitchState(ids)
                }
            }
            else {
                const wasConfirmed = await dialogfyConfirmation('deactivate', 'staff', true)
                if (wasConfirmed) {
                    // disable case, same as enable but with the disable state ... and also check the Staff isn't disabled already in the local store
                    let ids = usersStore.entityPage.filter(s => dataIds.indexOf(s.id) !== -1 &&  s.isActive).map(s => s.id)
                    if (ids.length > 0) a_bulkSwitchState(ids)
                }
            }*/
        }

        //#endregion ==========================================================================

        return {
            eMode,
            columns,
            filters,
            usersStore,

            h_reqQuery,
            h_reqDeleteUser,
            h_navCreateUsers,
            h_navEditUsers,
            h_BulkActionIntent
        }
    }

})
</script>

<style scoped>
</style>