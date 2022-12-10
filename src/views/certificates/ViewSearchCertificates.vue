<template>
    <transition appear name="page-fade">
        <div class="container">
            <h1> {{ cap($t("query.message")) }} </h1>
            <div class="row" style="padding-top: 3em; " v-if="cmptdSearchT === searchTypes.Accredited">
                <div class="col-6">
                    <h2> {{ cap($t("query.accredited")) }}</h2>
                    <div class="row">
                        <div class="col-6">
                            <CmpBasicInput
                                id="param"
                                name="param"
                                type="text"
                                :placeholder="$t('form.placeholders.accredited').toUpperCase()"
                                v-on:keydown.enter="h_QueryIntent"
                        />             
                        </div>
                        <CmpBaseButton block button-type="success" :icon="true" @doClick.prevent="h_QueryIntent">
                            <i class="tim-icons icon-zoom-split"></i>
                        </CmpBaseButton>
                    </div>
                </div>
            </div>
            <div class="row" style="padding-top: 4em;" v-if="(cmptdSearchT === searchTypes.ID)">
                <div class="col-6">
                    <h2> {{ cap($t("query.id")) }}</h2>
                    <div class="row">
                        <div class="col-6">
                            <CmpBasicInput
                                id="param"
                                name="param"
                                type="text"
                                :placeholder="$t('form.placeholders.id').toUpperCase()"
                                v-on:keydown.enter="h_QueryIntent"
                        />             
                        </div>
                        <CmpBaseButton block button-type="success" :icon="true" @doClick.prevent="h_QueryIntent">
                            <i class="tim-icons icon-zoom-split"></i>
                        </CmpBaseButton>
                    </div>
                </div>
            </div>
            <div class="row" v-if="(cmptdSearchT === searchTypes.Status)">
                <div class="col-6">
                    <h2> {{ cap($t("query.status")) }}</h2>
                    <div class="row">
                        <div class="col-6">
                            <CmpMultiselectField :placeholder="$t('form.placeholders.status')"
                                                :options="authStore.getStatusForMultiselect"
                                                name="param"
                                                class="mb-2"
                                                closeOnSelect>
                                <!--option coming from slot child component ('slots props') [option] -->
                                <template #customOption="{option}">
                                    {{  $t(option.label) }}
                                </template>
                                <!-- option coming from slot child component ('slots props') [value] -->
                                <template #customSingleLabel="{value}">
                                    <div class="multiselect-placeholder">
                                    {{ $t(value.label)  }}
                                    </div>
                                </template>
                            </CmpMultiselectField>
                        </div>
                        <CmpBaseButton block button-type="success" :icon="true" @doClick.prevent="h_QueryIntent">
                            <i class="tim-icons icon-zoom-split"></i>
                        </CmpBaseButton>
                    </div> 
                </div>
            </div>
            <div class="row" v-if="certificatesStore.getShowTable">
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
        </div>
    </transition>
</template>

<script lang="ts">
    import { HCertificatesTable } from '@/services/definitions/data-datatables'
    import { EntityTypes, queryBase, RoutePathNames, GroupRoles } from '@/services/definitions'
    import { computed, defineComponent, onMounted, type ComputedRef} from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useToast } from 'vue-toastification'
    import { useAuthStore } from '@/stores/auth'

    import useToastify from '@/services/composables/useToastify'
    import useDialogfy from '@/services/composables/useDialogfy'
    import useCommon from '@/services/composables/useCommon'
    import { CmpBaseButton, CmpBasicInput, CmpMultiselectField, CmpCard, CmpDataTable } from '@/components'
    import { useForm } from 'vee-validate'
    import { SearchTypes, VSchemaQueryCertificateByAccredited, VSchemaQueryCertificateById, VSchemaQueryCertificateByStatus } from '@/services/definitions'
    import type { IQueryFormData } from '@/services/definitions/types-forms'
    import { useCertificatesStore } from '@/stores/certificates'

    import type { TFormMode, IDataTableQuery, IBulkData } from '@/services/definitions'

    export default defineComponent({
        name: 'ViewSearchCertificates',
        components: {
            CmpBaseButton,
            CmpBasicInput,
            CmpMultiselectField,
            CmpCard,
            CmpDataTable
        },

        setup(){
        //region ======== DECLARATIONS & LOCAL STATE ============================================

        const authStore = useAuthStore()
        const certificatesStore = useCertificatesStore()

        const eMode: EntityTypes = EntityTypes.Certificates
        const groupRoles = GroupRoles

        const router = useRouter()
        const toast = useToast() // The toast lib interface

        const columns = HCertificatesTable
        const filters = [ 'storeType', 'isActive' ]

        const { tfyBasicSuccess, tfyBasicFail } = useToastify(toast)
        const { dialogfyConfirmation } = useDialogfy()
        const { cap } = useCommon()

        const searchTypes = SearchTypes
        
        //#endregion ==========================================================================

        //region ======== HOOKS ===============================================================

        onMounted(() => {
            if (certificatesStore.getShowTable) {
                certificatesStore.reqCertificatesSearch(queryBase)
                .catch(err => {
                    tfyBasicFail(err, 'certificates', 'request')
                    certificatesStore.mutShowValue(false)
                    resetForm()
                })
            }               
        })

        //endregion ===========================================================================

        //region ======= COMPUTATIONS & GETTERS ===============================================

        // compute the form mode: creation mode or edition mode
        const cmptdSearchT: ComputedRef<number> = computed(() => +certificatesStore.getSearchType)

        // getting the vee validate method to manipulate the form related actions from the view
        const { handleSubmit, resetForm } = useForm<IQueryFormData>({
            validationSchema: cmptdSearchT.value === SearchTypes.Accredited ? VSchemaQueryCertificateByAccredited : 
                              cmptdSearchT.value === SearchTypes.ID ? VSchemaQueryCertificateById : VSchemaQueryCertificateByStatus,
        })
        
        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================

        function a_reqQuery( queryData: IDataTableQuery ) {
            certificatesStore.reqCertificatesSearch(queryData)
                .catch(err => {
                    tfyBasicFail(err, 'certificates', 'request')
                    certificatesStore.mutShowValue(false)
                })
        }

        async function a_ReqQueryCertificates ( data: number | string) {
            certificatesStore.mutSearchParam(data as string)
            await certificatesStore.reqCertificatesSearch(queryBase)
            .then(() => {
                certificatesStore.mutShowValue(true)
            })
            .catch(err => {
                tfyBasicFail(err, 'certificates', 'request')
                certificatesStore.mutShowValue(false)
                resetForm()
            })
        }

        function a_reqDelete( id: string ) {

            certificatesStore.reqDeleteCertificate(id).then(() => {

                tfyBasicSuccess(`${id}`, 'deletion')

            }).catch(err => tfyBasicFail(err, `${id}`, 'deletion'))
        }

        //#endregion ==========================================================================

        //#region ======= HELPERS ==============================================================

        //#endregion ===========================================================================
        
        //#region ======== HOOKS ===============================================================

        //#endregion ===========================================================================
        //#region ======= EVENTS HANDLERS ======================================================
        

        const h_QueryIntent = handleSubmit(formData => {
            a_ReqQueryCertificates(formData.param)
        })

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

        //#endregion ===========================================================================
        
        return {
            authStore,
            cmptdSearchT,
            searchTypes,
            eMode,
            columns,
            filters,
            certificatesStore,
            groupRoles,

            cap,
            h_QueryIntent,
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
