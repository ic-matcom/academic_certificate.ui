<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">
                <CmpCard :hasFormBackBtn="true" v-on:doClick="h_Back">
                    <template> 
                        <fieldset disabled>
                            <form>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.certification') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            :key="componentKey"
                                            id="certification"
                                            name="certification"
                                            type="text"                                        
                                            v-model="iniFormData.certification"
                                        />
                                    </div>                                    
                            </div>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.emitter') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            :key="componentKey"
                                            id="emitter"
                                            name="emitter"
                                            type="text"
                                            v-model="iniFormData.emitter"
                                        />
                                    </div>                                    
                            </div>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.accredited') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            :key="componentKey"
                                            id="accredited"
                                            name="accredited"
                                            type="text"
                                            v-model="iniFormData.accredited"
                                        />
                                    </div>                                    
                            </div>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.created_by') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            :key="componentKey"
                                            id="created_by"
                                            name="created_by"
                                            type="text"
                                            v-model="iniFormData.created_by"
                                        />
                                    </div>                                    
                            </div>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.volume_folio') }}
                                    </label>
                                    <div class="col-md-3">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="volume_folio_faculty"
                                        name="volume_folio_faculty"
                                        type="text"
                                        v-model="iniFormData.volume_folio_faculty"
                                        />
                                    </div>
                                    <div class="col-md-3">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="volume_folio_university"
                                        name="volume_folio_university"
                                        type="text"
                                        v-model="iniFormData.volume_folio_university"
                                        />
                                    </div>
                            </div>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.date') }}
                                    </label>
                                    <div class="col-md-3">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="date"
                                        name="date"
                                        type="text"
                                        v-model="iniFormData.date"
                                    />
                                    </div>
                        
                                    <div class="col-md-3">
                                        <CmpBasicCheckbox name="gold_certificate"
                                                      :key="componentKey"
                                                      :checked="iniFormData.gold_certificate"
                                                      :labels="[$t('form.fields-common.gold_certificate'), $t('btn.val-no')]"
                                         />
                                     </div>                          
                            </div>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.invalid_reason') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            :key="componentKey"
                                            id="invalid_reason"
                                            name="invalid_reason"
                                            type="text"                                        
                                            v-model="iniFormData.invalid_reason"
                                        />
                                    </div>                                    
                            </div>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.secretary_validating') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            :key="componentKey"
                                            id="secretary_validating"
                                            name="secretary_validating"
                                            type="text"
                                            v-model="iniFormData.secretary_validating"
                                        />
                                    </div>                                    
                            </div>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.dean_validating') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            :key="componentKey"
                                            id="dean_validating"
                                            name="dean_validating"
                                            type="text"
                                            v-model="iniFormData.dean_validating"
                                        />
                                    </div>                                    
                            </div>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.rector_validating') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            :key="componentKey"
                                            id="rector_validating"
                                            name="rector_validating"
                                            type="text"
                                            v-model="iniFormData.rector_validating"
                                        />
                                    </div>                                    
                            </div>
                            <div class="row">
                                <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.data') }}
                                    </label>
                                    <div class="col-md-3">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="id"
                                        name="id"
                                        type="text"
                                        v-model="iniFormData.id"
                                        />
                                    </div>
                                    <div class="col-md-2">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="docType"
                                        name="docType"
                                        type="text"
                                        v-model="iniFormData.docType"
                                        />
                                    </div>
                                    <div class="col-md-1">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="certificate_status"
                                        name="certificate_status"
                                        type="text"
                                        v-model="iniFormData.certificate_status"
                                        />
                                    </div>
                            </div>
                        </form>
                        </fieldset>                   
                    </template>
                </CmpCard>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, type ComputedRef } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { CmpBaseButton, CmpBasicInput, CmpCard, CmpFormActionsButton, CmpBasicCheckbox } from '@/components'
import { RoutePathNames, SearchTypes, type TFormMode} from '@/services/definitions'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'

import type { ICertificateFormData} from '@/services/definitions/types-forms'

import useToastify from '@/services/composables/useToastify'
import useCommon from '@/services/composables/useCommon'
import { useCertificatesStore } from '@/stores/certificates';
import useFactory from '@/services/composables/useFactory';

export default defineComponent({
    name: 'ViewFormCertificates',

    components: {
        CmpCard,
        CmpBaseButton,
        CmpBasicInput,
        CmpFormActionsButton,
        CmpBasicCheckbox
    },

    setup() {

        //region ======= DECLARATIONS & LOCAL STATE ===========================================
        const certificatesStore = useCertificatesStore()

        const route = useRoute()
        const router = useRouter()
        const { id } = route.params
        
        const toast = useToast() // The toast lib interface

        const { tfyBasicFail } = useToastify(toast)
        const { cap } = useCommon()
        
        const { mkCertificate } = useFactory()
        let iniFormData = reactive<ICertificateFormData>(mkCertificate())                 // initial form data

        const componentKey = ref(0);

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================

        //#endregion ==========================================================================

        //region ======= HELPERS ==============================================================

        const forceRerender = () => {
            componentKey.value += 1;
        };

        //endregion ===========================================================================

        //region ======= COMPUTATIONS & GETTERS ===============================================

        // getting the vee validate method to manipulate the form related actions from the view
        const { setValues } = useForm<ICertificateFormData>({
            //validationSchema: fmode === 'create' as TFormMode ? VSchemaUserCreate : VSchemaUserEdit,
            initialValues:    iniFormData
        })
        
        //endregion ===========================================================================
        
        //region ======== HOOKS ===============================================================
        
        onMounted(() => {
            if(id){
                certificatesStore.reqCertificatesById(id as string)
                .then(() => {
                    setValues(certificatesStore.certificate)
                    forceRerender()
                })
                .catch(error => { tfyBasicFail(error, 'Certificates','request') })
            }
        })

        //endregion ===========================================================================

        //region ======= EVENTS HANDLERS ======================================================
        
        const h_Back = () => {
                router.push({
                    name: RoutePathNames.login,
            })
        }

        //endregion ===========================================================================

        return {
            h_Back,
            cap,
            certificatesStore,
            componentKey,
            iniFormData
        }
    }
})

</script>

<style scoped>
</style>
