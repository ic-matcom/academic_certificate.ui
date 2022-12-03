<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">
                <CmpCard>
                    <template v-if="authStore.getUserGroup === groupRoles.CertAdmin">
                        <CmpDataTable table-type="hover"
                                  :subject="$t('entities.certificates.name')"
                                  :entityMode="eMode"
                                  :groupRolMode="groupRoles.CertAdmin"
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
                    <template v-else-if="authStore.getUserGroup === groupRoles.SDR">
                        <CmpDataTable table-type="hover"
                                  :subject="$t('entities.certificates.name')"
                                  :entityMode="eMode"
                                  :groupRolMode="groupRoles.SDR"
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
                                  :groupRolMode="groupRoles.Normal"
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
import { defineComponent, onMounted, onUpdated } from 'vue'
import { useCertificatesStore } from '@/stores/certificates'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { HCertificatesTable } from '@/services/definitions/data-datatables'
import { EntityTypes, queryBase, RoutePathNames, GroupRoles, Roles, SearchTypes } from '@/services/definitions'
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

        const authStore = useAuthStore()
        const certificatesStore = useCertificatesStore()
        const eMode: EntityTypes = EntityTypes.Certificates
        const groupRoles = GroupRoles

        const route = useRoute()
        const router = useRouter()
        const toast = useToast()                                            // The toast lib interface
        const columns = HCertificatesTable
        const filters = [ 'storeType', 'isActive' ]

        const { tfyBasicSuccess, tfyBasicFail } = useToastify(toast)
        const { dialogfyConfirmation } = useDialogfy()

        const { searchtype, param } = route.params
        certificatesStore.mutSearch(+searchtype as SearchTypes, param as string)

        //#endregion ==========================================================================

        //region ======== HOOKS ===============================================================

        /**
         * setup is called before component creation, so the onMounted hook is a good time / place to
         * invoke data population method through web API request.
         */
        onMounted(() => {
            // populate certificates datatable
            if(+searchtype === SearchTypes.ToValidate)
            {
                if(authStore.getUserRol == Roles.secretary)
                {
                    certificatesStore.mutSearch(SearchTypes.ToValidate,'1')
                }
                else if (authStore.getUserRol == Roles.dean)
                {
                    certificatesStore.mutSearch(SearchTypes.ToValidate,'2')
                }
                else 
                {
                    certificatesStore.mutSearch(SearchTypes.ToValidate,'3')
                }
            }
            
            certificatesStore.reqCertificatesSearch(queryBase).catch(err => tfyBasicFail(err, 'Certificates', 'request'))
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
        }

        //#endregion ==========================================================================

        return {
            eMode,
            columns,
            filters,
            certificatesStore,
            authStore,
            groupRoles,

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