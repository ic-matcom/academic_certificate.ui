<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">
                <CmpCard :hasFormBackBtn="true" v-on:doClick="h_Back">
                    <template v-if="cmptdFmode === 'create' ">
                        <form>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.certification') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            id="certification"
                                            name="certification"
                                            type="text"                                        
                                            :placeholder="$t('form.placeholders.certification')"
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
                                            id="emitter"
                                            name="emitter"
                                            type="text"
                                            :placeholder="$t('form.placeholders.emitter')"
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
                                            id="accredited"
                                            name="accredited"
                                            type="text"
                                            :placeholder="$t('form.placeholders.accredited')"
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
                                        id="volume_folio_faculty"
                                        name="volume_folio_faculty"
                                        type="text"
                                        :placeholder="$t('form.placeholders.volume_folio_faculty')"
                                        v-model="iniFormData.volume_folio_faculty"
                                        />
                                    </div>
                                    <div class="col-md-3">
                                        <CmpBasicInput
                                        id="volume_folio_university"
                                        name="volume_folio_university"
                                        type="text"
                                        :placeholder="$t('form.placeholders.volume_folio_university')"
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
                                        id="date"
                                        name="date"
                                        type="text"
                                        :placeholder="$t('form.placeholders.date')"
                                        v-model="iniFormData.date"
                                    />
                                    </div>
                        
                                    <div class="col-md-3">
                                        <CmpBasicCheckbox name="gold_certificate"
                                                      :checked="iniFormData.gold_certificate"
                                                      :labels="[$t('form.fields-common.gold_certificate'), $t('btn.val-no')]"
                                         />
                                     </div>                          
                            </div>
                        </form>
                    </template>
                    <template v-else-if="cmptdFmode === 'edit'">
                        <form>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.certification') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            id="certification"
                                            name="certification"
                                            type="text"                                        
                                            :placeholder="$t('form.placeholders.certification')"
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
                                            id="emitter"
                                            name="emitter"
                                            type="text"
                                            :placeholder="$t('form.placeholders.emitter')"
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
                                            id="accredited"
                                            name="accredited"
                                            type="text"
                                            :placeholder="$t('form.placeholders.accredited')"
                                            v-model="iniFormData.accredited"
                                        />
                                    </div>                                    
                            </div>
                            <fieldset disabled>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.created_by') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
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
                                        id="volume_folio_faculty"
                                        name="volume_folio_faculty"
                                        type="text"
                                        :placeholder="$t('form.placeholders.volume_folio_faculty')"
                                        v-model="iniFormData.volume_folio_faculty"
                                        />
                                    </div>
                                    <div class="col-md-3">
                                        <CmpBasicInput
                                        id="volume_folio_university"
                                        name="volume_folio_university"
                                        type="text"
                                        :placeholder="$t('form.placeholders.volume_folio_university')"
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
                                        id="date"
                                        name="date"
                                        type="text"
                                        :placeholder="$t('form.placeholders.date')"
                                        v-model="iniFormData.date"
                                    />
                                    </div>
                        
                                    <div class="col-md-3">
                                        <CmpBasicCheckbox name="gold_certificate"
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
                                        id="id"
                                        name="id"
                                        type="text"
                                        v-model="iniFormData.id"
                                        />
                                    </div>
                                    <div class="col-md-2">
                                        <CmpBasicInput
                                        id="docType"
                                        name="docType"
                                        type="text"
                                        v-model="iniFormData.docType"
                                        />
                                    </div>
                            </div>
                        </fieldset>
                        </form>
                    </template>
                    <template v-else> 
                        <fieldset disabled>
                            <form>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.certification') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
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
                                        id="volume_folio_faculty"
                                        name="volume_folio_faculty"
                                        type="text"
                                        v-model="iniFormData.volume_folio_faculty"
                                        />
                                    </div>
                                    <div class="col-md-3">
                                        <CmpBasicInput
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
                                        id="date"
                                        name="date"
                                        type="text"
                                        v-model="iniFormData.date"
                                    />
                                    </div>
                        
                                    <div class="col-md-3">
                                        <CmpBasicCheckbox name="gold_certificate"
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
                                        id="id"
                                        name="id"
                                        type="text"
                                        v-model="iniFormData.id"
                                        />
                                    </div>
                                    <div class="col-md-2">
                                        <CmpBasicInput
                                        id="docType"
                                        name="docType"
                                        type="text"
                                        v-model="iniFormData.docType"
                                        />
                                    </div>
                                    <div class="col-md-1">
                                        <CmpBasicInput
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
                    <!-- FORM ACTION BUTTONS -->
                    <template v-slot:footer v-if="cmptdFmode === 'create' || cmptdFmode === 'edit'">
                        <CmpFormActionsButton
                                v-on:saveIntent="h_submit"
                                v-on:cancel-intent="h_Back"
                                :loading="loading"
                        />
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
import { RoutePathNames, SearchTypes, VSchemaCertificateCreate, VSchemaCertificateEdit, type TFormMode} from '@/services/definitions'
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
        const { fmode, id } = route.params
        
        const toast = useToast() // The toast lib interface

        const { tfyBasicSuccess, tfyBasicFail } = useToastify(toast)
        const { cap } = useCommon()
        
        const { mkCertificate } = useFactory()
        let iniFormData = reactive<ICertificateFormData>(mkCertificate())                 // initial form data

        const loading = ref(false);

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================

        const aReqCertificateCreation = ( data: ICertificateFormData ) => {
            loading.value = true
            certificatesStore.reqInsertCertificate(data)
            .then(() => {
                tfyBasicSuccess('certificates', 'addition')
                h_Back() })
            .catch(error => { 
                loading.value = false;
                tfyBasicFail(error, 'certificates','addition'); 
                })
        }

        const aReqCertificateUpdate = (data: ICertificateFormData ) => {
            loading.value = true
            certificatesStore.reqModifyCertificate(data)
            .then(() => {
                tfyBasicSuccess(`${id}`, 'update')
                h_Back() })
            .catch(error => { 
                loading.value = false;
                tfyBasicFail(error, 'certificates','update');
                })
        }

        //#endregion ==========================================================================

        //region ======= HELPERS ==============================================================

        //endregion ===========================================================================

        //region ======= COMPUTATIONS & GETTERS ===============================================

        // compute the form mode: creation mode or edition mode
        const cmptdFmode: ComputedRef<string | string[]> = computed(() => fmode)

        // getting the vee validate method to manipulate the form related actions from the view
        const { handleSubmit, meta, setValues, resetForm } = useForm<ICertificateFormData>({
            validationSchema: fmode === 'create' as TFormMode ? VSchemaCertificateCreate : VSchemaCertificateEdit,
            initialValues:    iniFormData
        })
        
        //endregion ===========================================================================
        
        //region ======== HOOKS ===============================================================
        
        onMounted(() => {
            if (cmptdFmode.value === 'edit' as TFormMode || cmptdFmode.value === 'details' as TFormMode) {
                certificatesStore.reqCertificatesById(id as string)
                .then(() => {
                    setValues(certificatesStore.certificate)
                })
                .catch(error => { tfyBasicFail(error, 'certificates','request') })
            }
            else if (cmptdFmode.value !== 'create' as TFormMode){
                
                certificatesStore.reqCertificatesById(cmptdFmode.value as string)
                .then(() => {
                    setValues(certificatesStore.certificate)
                })
                .catch(error => { tfyBasicFail(error, 'certificates','request') })
            }
        })

        //endregion ===========================================================================

        //region ======= EVENTS HANDLERS ======================================================

        const h_submit = (event: Event) => {
            event.preventDefault()
            // handling the submission with vee-validate method
            handleSubmit(formData => {
                if (cmptdFmode.value == ("create" as TFormMode)) aReqCertificateCreation(formData);
                if (cmptdFmode.value == ("edit" as TFormMode) && meta.value.dirty) aReqCertificateUpdate(formData);
                if (cmptdFmode.value == ("edit" as TFormMode) && !meta.value.dirty) h_Back();               // was no changes (no dirty) with the data, so going back normally
            }).call(this)
        }
        
        const h_Back = () => {
            if(certificatesStore.getSearchType === SearchTypes.ToValidate)
            {
                router.push({
                    name: RoutePathNames.certificatesToValidate,
                })
            }
            else
            {
                router.push({
                    name: RoutePathNames.certificatesSearch,
                })
            };
        }

        //endregion ===========================================================================

        return {
            h_Back,
            h_submit,
            cap,
            cmptdFmode,
            certificatesStore,
            iniFormData,
            loading
        }
    }
})

</script>

<style scoped>
</style>
