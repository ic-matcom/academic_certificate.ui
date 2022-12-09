<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">
                <CmpCard :hasFormBackBtn="true" v-on:doClick="h_Back">
                    <template v-if="fmode === 'validate' || fmode === 'invalidate'"> 
                        <fieldset disabled>
                            <form>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label-lg">
                                        {{ $t('form.fields-common.certification') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            :key="componentKey"
                                            id="certification"
                                            name="certification"
                                            type="text"                                        
                                            :value="certificatesStore.certificate.certification"
                                        />
                                    </div>                                    
                            </div>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label-lg">
                                        {{ $t('form.fields-common.emitter') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            :key="componentKey"
                                            id="emitter"
                                            name="emitter"
                                            type="text"
                                            :value="certificatesStore.certificate.emitter"
                                        />
                                    </div>                                    
                            </div>
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label-lg">
                                        {{ $t('form.fields-common.accredited') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            :key="componentKey"
                                            id="accredited"
                                            name="accredited"
                                            type="text"
                                            :value="certificatesStore.certificate.accredited"
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
                                            :value="certificatesStore.certificate.created_by"
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
                                        :value="certificatesStore.certificate.volume_folio_faculty"
                                        />
                                    </div>
                                    <div class="col-md-3">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="volume_folio_university"
                                        name="volume_folio_university"
                                        type="text"
                                        :value="certificatesStore.certificate.volume_folio_university"
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
                                        :value="certificatesStore.certificate.date"
                                    />
                                    </div>
                        
                                    <div class="col-md-3">
                                        <CmpBasicCheckbox name="gold_certificate"
                                                      :key="componentKey"
                                                      :checked="certificatesStore.certificate.gold_certificate"
                                                      :labels="[$t('form.fields-common.gold_certificate'), $t('btn.val-no')]"
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
                                            :value="certificatesStore.certificate.secretary_validating"
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
                                            :value="certificatesStore.certificate.dean_validating"
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
                                            :value="certificatesStore.certificate.rector_validating"
                                        />
                                    </div>                                    
                            </div>
                            <div class="row">
                                <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.data') }}
                                    </label>
                                    <div class="col-md-1">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="id"
                                        name="id"
                                        type="text"
                                        :value="certificatesStore.certificate.id"
                                        />
                                    </div>
                                    <div class="col-md-1">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="docType"
                                        name="docType"
                                        type="text"
                                        :value="certificatesStore.certificate.docType"
                                        />
                                    </div>
                                    <div class="col-md-1">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="certificate_status"
                                        name="certificate_status"
                                        type="number"
                                        :value="certificatesStore.certificate.certificate_status"
                                        />
                                    </div>
                            </div>
                            <div class="row" v-if="fmode === 'validate' ||  (fmode === 'invalidate' && certificatesStore.certificate.certificate_status === 0)" >
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.invalid_reason') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            :key="componentKey"
                                            id="invalid_reason"
                                            name="invalid_reason"
                                            type="text"
                                            :value="certificatesStore.certificate.invalid_reason"
                                        />
                                    </div>                                    
                            </div>
                        </form>
                        </fieldset>
                        <form v-if="(fmode === 'invalidate' && certificatesStore.certificate.certificate_status !== 0)">
                            <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields-common.invalid_reason') }}
                                    </label>
                                    <div class="col-md-6">
                                        <CmpBasicInput
                                            :key="componentKey"
                                            id="param"
                                            name="param"
                                            type="text" 
                                        />
                                    </div>                                    
                            </div>
                        </form>          
                    </template>
                    <!-- FORM ACTION BUTTONS -->
                    <template v-slot:footer v-if="(fmode === 'validate' && authStore.getValidatePermission(certificatesStore.certificate.certificate_status))">
                        <div class="row">
                            <div class="col-3"></div>
                            <div class="col-md-6">
                                <CmpBaseButton block button-type="success" @doClick.prevent="hValidateIntent" :loading="loading">
                                    {{ cap($t("btn.val-validate")) }}
                                </CmpBaseButton>
                            </div>             
                        </div>          
                    </template>
                    <template v-slot:footer v-else-if="fmode === 'invalidate' && certificatesStore.certificate.certificate_status !== 0">
                        <div class="row">
                            <div class="col-3"></div>
                            <div class="col-md-6">
                                <CmpBaseButton block button-type="success" @doClick.prevent="hInvalidateIntent" :loading="loading">
                                    {{ cap($t("btn.val-invalidate")) }}
                                </CmpBaseButton>
                            </div>             
                        </div>     
                    </template>
                </CmpCard>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { CmpBaseButton, CmpBasicInput, CmpCard, CmpFormActionsButton, CmpBasicCheckbox } from '@/components'
import { RoutePathNames, SearchTypes, VSchemaCertificateInvalidate } from '@/services/definitions'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'

import type { IValidateFormData } from '@/services/definitions/types-forms'

import useToastify from '@/services/composables/useToastify'
import useCommon from '@/services/composables/useCommon'
import { useCertificatesStore } from '@/stores/certificates';
import { useAuthStore } from '@/stores/auth';
import useDialogfy from '@/services/composables/useDialogfy';

export default defineComponent({
    name: 'ViewFormValidateCertificates',

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
        const authStore = useAuthStore()

        const route = useRoute()
        const router = useRouter()
        const { fmode, id } = route.params

        const toast = useToast() // The toast lib interface

        const { tfyBasicSuccess, tfyBasicFail } = useToastify(toast)
        const { dialogfyConfirmation } = useDialogfy()
        const { cap } = useCommon()

        const componentKey = ref(0);
        const loading = ref(false);

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================

        const aReqValidateCertificate = () => {
            loading.value = true
            certificatesStore.reqValidateCertificate(id as string, `${authStore.user.firstname} ${authStore.user.lastname}`)
            .then(() => {
                tfyBasicSuccess('certificates', 'validation')
                h_Back() })
            .catch(error => { loading.value = false;
                tfyBasicFail(error, 'certificates','validation'); 
                resetForm();})
        }

        const aReqInvalidateCertificate = (data: IValidateFormData ) => {
            loading.value = true
            certificatesStore.reqInvalidateCertificate(id as string, data.param)
            .then(() => {
                tfyBasicSuccess('certificates', 'invalidation')
                h_Back() })
            .catch(error => { 
                loading.value = false;
                tfyBasicFail(error, 'certificates','invalidation'); 
                resetForm();})
        }

        //#endregion ==========================================================================

        //region ======= HELPERS ==============================================================

        const forceRerender = () => {
            componentKey.value += 1;
        };

        //endregion ===========================================================================

        //region ======= COMPUTATIONS & GETTERS ===============================================

        // getting the vee validate method to manipulate the form related actions from the view
        const { handleSubmit, resetForm } = useForm<IValidateFormData>({
            validationSchema: VSchemaCertificateInvalidate,
        })

        //endregion ===========================================================================
        
        //region ======== HOOKS ===============================================================
        
        onMounted(() => {
            if(id)
            {
                certificatesStore.reqCertificatesById(id as string).then(() => {forceRerender()}).catch(error => { tfyBasicFail(error, 'Certificate','request') })
            }
        })

        //endregion ===========================================================================

        //region ======= EVENTS HANDLERS ======================================================

        const hValidateIntent = () => {
            aReqValidateCertificate()
        }

        const hInvalidate = async (formData: IValidateFormData) => {
            const isOk = await dialogfyConfirmation('invalidate', 'certificates')
            if(isOk)
            {
                aReqInvalidateCertificate(formData)
            }
        }

        const hInvalidateIntent= handleSubmit(formData => {
            hInvalidate(formData)
        })
        
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
            hValidateIntent,
            hInvalidateIntent,
            cap,
            fmode,
            authStore,
            certificatesStore,
            componentKey,
            loading
        }
    }
})

</script>

<style scoped>
</style>
