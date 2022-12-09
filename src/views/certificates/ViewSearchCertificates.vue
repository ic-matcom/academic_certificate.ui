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
                                v-on:keydown.enter="hQueryIntent"
                        />             
                        </div>
                        <CmpBaseButton block button-type="success" :icon="true" @doClick.prevent="hQueryIntent">
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
                                v-on:keydown.enter="hQueryIntent"
                        />             
                        </div>
                        <CmpBaseButton block button-type="success" :icon="true" @doClick.prevent="hQueryIntent">
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
                        <CmpBaseButton block button-type="success" :icon="true" @doClick.prevent="hQueryIntent">
                            <i class="tim-icons icon-zoom-split"></i>
                        </CmpBaseButton>
                    </div> 
                </div>
            </div>
        </div>   
    </transition>
</template>

<script lang="ts">
    import { computed, defineComponent, onMounted, type ComputedRef} from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useToast } from 'vue-toastification'
    import { RoutePathNames } from '@/services/definitions/route-paths'
    import { useAuthStore } from '@/stores/auth'

    import useToastify from '@/services/composables/useToastify'
    import useCommon from '@/services/composables/useCommon'
    import { CmpBaseButton, CmpBasicInput, CmpMultiselectField } from '@/components'
    import { useForm } from 'vee-validate'
    import { SearchTypes, VSchemaQueryCertificateByAccredited, VSchemaQueryCertificateById, VSchemaQueryCertificateByStatus } from '@/services/definitions'
    import type { IQueryFormData } from '@/services/definitions/types-forms'
    import { useCertificatesStore } from '@/stores/certificates'

    export default defineComponent({
        name: 'ViewSearchCertificates',
        components: {
            CmpBaseButton,
            CmpBasicInput,
            CmpMultiselectField
        },

        setup(){
        //region ======== DECLARATIONS & LOCAL STATE ============================================

        const authStore = useAuthStore()
        const certificateStore = useCertificatesStore()

        const route = useRoute()
        const router = useRouter()
        const toast = useToast() // The toast lib interface

        const { tfyAuthFail, tfyBasicSuccess, tfyBasicFail } = useToastify(toast)
        const { cap } = useCommon()

        const { searchType } = route.params

        const searchTypes = SearchTypes
        
        //#endregion ==========================================================================

        //region ======= COMPUTATIONS & GETTERS ===============================================

        // compute the form mode: creation mode or edition mode
        const cmptdSearchT: ComputedRef<number> = computed(() => +searchType)

        // getting the vee validate method to manipulate the form related actions from the view
        const { handleSubmit, resetForm } = useForm<IQueryFormData>({
            validationSchema: +searchType === SearchTypes.Accredited ? VSchemaQueryCertificateByAccredited : 
                              +searchType === SearchTypes.ID ? VSchemaQueryCertificateById : VSchemaQueryCertificateByStatus,
        })
        
        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================

        const aReqQueryCertificates = ( data: number | string) => {
            certificateStore.mutSearch(+searchType, data as string)
            router.push({ name  : RoutePathNames.certificates, })
        }

        //#endregion ==========================================================================

        //#region ======= HELPERS ==============================================================

        //#endregion ===========================================================================
        
        //#region ======== HOOKS ===============================================================

        //#endregion ===========================================================================
        //#region ======= EVENTS HANDLERS ======================================================

        const hQueryIntent = handleSubmit(formData => {
            aReqQueryCertificates(formData.param)
        })

        //#endregion ===========================================================================
        
        return {
            authStore,
            cmptdSearchT,
            searchTypes,
            cap,
            hQueryIntent
        }

    }

    })
</script>
