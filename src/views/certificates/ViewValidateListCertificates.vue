<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">
                <CmpCard>
                    <template v-if="authStore.getUserGroup === groupRoles.SDR">
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
import useToastify from '@/services/composables/useToastify'

import type { TFormMode, IDataTableQuery, IBulkData } from '@/services/definitions'

export default defineComponent({
    name: 'ViewValidateListCertificates',
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

        const router = useRouter()
        const toast = useToast()                                            // The toast lib interface
        const columns = HCertificatesTable
        const filters = [ 'storeType', 'isActive' ]

        const { tfyBasicSuccess, tfyBasicFail } = useToastify(toast)

        //#endregion ==========================================================================

        //region ======== HOOKS ===============================================================

        /**
         * setup is called before component creation, so the onMounted hook is a good time / place to
         * invoke data population method through web API request.
         */
        onMounted(() => {
            // populate certificates datatable
            certificatesStore.reqCertificatesToValidateByRol(queryBase).catch(err => tfyBasicFail(err, 'Certificates', 'request'))
        })

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================
        // ❗ this functions here for fetching data could be async await functions easily, if is needed

        function a_reqQuery( queryData: IDataTableQuery ) {
            certificatesStore.reqCertificatesSearch(queryData)
                .catch(err => {
                    tfyBasicFail(err, 'certificates', 'request')
                    certificatesStore.mutShowValue(false)
                })
        }

        //#endregion ==========================================================================

        //#region ======= COMPUTATIONS & GETTERS ==============================================
        //#endregion ==========================================================================

        //#region ======= EVENTS HANDLERS =====================================================

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