<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">
                <CmpCard>
                    <template v-if="rol === 'admin'">
                        <CmpDataTable table-type="hover"
                                  :subject="$t('entities.certificates.name')"
                                  :entityMode="eMode"
                                  :columns="columns"
                                  :data="certificatesStore.getCertificatesList"
                                  :count="certificatesStore.getEntitiesCount"
                                  :has-actions="true"
                                  :filters="filters"

                                  @navCreateIntent="h_navCreateCertificate"
                                  @requestIntent="h_reqQuery"
                                  @editIntent="h_navModifyCertificate"
                                  @detailsIntent="h_navCertificatesDetails"
                                  @deleteIntent="h_reqDeleteCertificate"
                        >
                        </CmpDataTable>
                    </template>
                    <template v-else-if="rol === 'sdr'">
                        <CmpDataTable table-type="hover"
                                  :subject="$t('entities.certificates.name')"
                                  :entityMode="eMode"
                                  :columns="columns"
                                  :data="certificatesStore.getCertificatesList"
                                  :count="certificatesStore.getEntitiesCount"
                                  :has-actions="true"
                                  :filters="filters"

                                  @requestIntent="h_reqQuery"
                                  @editIntent="h_navValidateCertificate"
                                  @detailsIntent="h_navCertificatesDetails"
                                  @deleteIntent="h_navInvalidateCertificate"
                        >
                        </CmpDataTable>
                    </template>
                    <template v-else>
                        <CmpDataTable table-type="hover"
                                  :subject="$t('entities.certificates.name')"
                                  :entityMode="eMode"
                                  :columns="columns"
                                  :data="certificatesStore.getCertificatesList"
                                  :count="certificatesStore.getEntitiesCount"
                                  :has-actions="true"
                                  :filters="filters"

                                  @requestIntent="h_reqQuery"
                                  @detailsIntent="h_navCertificatesDetails"
                        >
                        </CmpDataTable>
                    </template>                  
                </CmpCard>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">

import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { defineComponent, onMounted } from 'vue'
import { useCertificatesStore } from '@/stores/certificates'
import { useToast } from 'vue-toastification'
import { HCertificatesTable } from '@/services/definitions/data-datatables'
import { RoutePathNames, RoutePaths } from '@/services/definitions'
import { EntityTypes, queryBase } from '@/services/definitions'
import { CmpCard, CmpDataTable } from '@/components'
import useDialogfy from '@/services/composables/useDialogfy'
import useToastify from '@/services/composables/useToastify'

import type { TFormMode, IDataTableQuery, IBulkData } from '@/services/definitions'


export default defineComponent({
    name: 'ViewListCertificates',
    components: {
        CmpCard,
        CmpDataTable
    },
    setup() {

        //#region ======= DECLARATIONS & LOCAL STATE ==========================================

        const {t} = useI18n({useScope: 'global'})

        const certificatesStore = useCertificatesStore()
        const eMode: EntityTypes = EntityTypes.Certificates

        const route = useRoute()
        const router = useRouter()
        const toast = useToast()                                            // The toast lib interface
        const columns = HCertificatesTable
        const filters = [ 'storeType', 'isActive' ]

        const { tfyBasicSuccess, tfyBasicFail } = useToastify(toast)
        const { dialogfyConfirmation } = useDialogfy()

        const { param, searchType, rol } = route.params 


        //#endregion ==========================================================================

        //region ======== HOOKS ===============================================================

        /**
         * setup is called before component creation, so the onMounted hook is a good time / place to
         * invoke data population method through web API request.
         */
        onMounted(() => {
            // populate certificates datatable
            if(searchType)
            {
                if(searchType === "id")
                {
                    certificatesStore.reqCertificatesById(param as string).catch(err => tfyBasicFail(err, 'Certificates', 'request'))
                }
                else if (searchType === "accredited")
                {
                    certificatesStore.reqCertificatesByAccredited(queryBase, param as string).catch(err => tfyBasicFail(err, 'Certificates', 'request'))
                }
                else
                {
                    certificatesStore.reqCertificatesByStatus(queryBase,Number.parseInt(param as string, 10)).catch(err => tfyBasicFail(err, 'Certificates', 'request'))
                }
            }
            
        })

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================
        // ❗ this functions here for fetching data could be async await functions easily, if is needed

        function a_reqQuery( queryData: IDataTableQuery ) {
            //usersStore.reqUsersPages(queryData).catch(err => tfyBasicFail(err, 'usuarios', 'request'))
        }

        function a_reqDelete( id: string ) {

            certificatesStore.reqDeleteCertificate(id).then(() => {

                tfyBasicSuccess(`${id}`, 'deletion')

            }).catch(err => tfyBasicFail(err, `${id}`, 'deletion'))
        }

        //#endregion ==========================================================================

        //#region ======= COMPUTATIONS & GETTERS ==============================================
        //#endregion ==========================================================================

        //#region ======= EVENTS HANDLERS =====================================================

        async function h_reqDeleteCertificate( objectId: string ) {
            const wasConfirmed = await dialogfyConfirmation('delete', 'certificates')
            if (wasConfirmed) a_reqDelete(objectId)
        }

        function h_navCreateCertificate() {
            router.push({
                name  : RoutePathNames.certificatesCreate,
                params: {
                    fmode: 'create' as TFormMode,
                    //id   : '',
                }
            })
        }

        async function h_navModifyCertificate( objectId: any ) {
            router.push({
                name  : RoutePathNames.certificatesModify,
                params: {
                    fmode: 'edit' as TFormMode,
                    id   : objectId.id,
                }
            })
        }

        async function h_navValidateCertificate( objectId: any ) {
            router.push({
                name  : RoutePathNames.certificatesValidate,
                params: {
                    fmode: 'validate' as TFormMode,
                    id   : objectId.id,
                }
            })
        }

        async function h_navInvalidateCertificate( objectId: any ) {
            router.push({
                name  : RoutePathNames.certificatesInvalidate,
                params: {
                    fmode: 'invalidate' as TFormMode,
                    id   : objectId,
                }
            })
        }

        async function h_navCertificatesDetails( objectId: any ) {
            router.push({
                name  : RoutePathNames.certificatesDetails,
                params: {
                    fmode: 'details' as TFormMode,
                    id   : objectId,
                }
            })
        }

        function h_reqQuery( queryData: IDataTableQuery ) {
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
            certificatesStore,
            rol,

            h_reqQuery,
            h_reqDeleteCertificate,
            h_navCreateCertificate,
            h_navModifyCertificate,
            h_navCertificatesDetails,
            h_navValidateCertificate,
            h_navInvalidateCertificate,
            h_BulkActionIntent
        }
    }

})
</script>

<style scoped>
</style>