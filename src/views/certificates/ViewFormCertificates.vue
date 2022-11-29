<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">
                <CmpCard :hasFormBackBtn="true" v-on:doClick="h_Back">
                    <template v-if="fmode === 'create'">
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
                                        />
                                    </div>
                                    <div class="col-md-3">
                                        <CmpBasicInput
                                        id="volume_folio_university"
                                        name="volume_folio_university"
                                        type="text"
                                        :placeholder="$t('form.placeholders.volume_folio_university')"
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
                                    />
                                    </div>
                        
                                    <div class="col-md-3">
                                        <CmpBasicCheckbox name="gold_certificate"
                                                      :checked="true"
                                                      :labels="[$t('form.fields-common.gold_certificate'), $t('btn.val-no')]"
                                         />
                                     </div>                          
                            </div>
                        </form>
                    </template>
                    <template v-else-if="fmode === 'edit'">
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
                                            :value="certificate.certification"
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
                                            :value="certificate.emitter"
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
                                            :value="certificate.accredited"
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
                                            :value="certificate.created_by"
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
                                        :value="certificate.volume_folio_faculty"
                                        />
                                    </div>
                                    <div class="col-md-3">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="volume_folio_university"
                                        name="volume_folio_university"
                                        type="text"
                                        :value="certificate.volume_folio_university"
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
                                        :value="certificate.date"
                                    />
                                    </div>
                        
                                    <div class="col-md-3">
                                        <CmpBasicCheckbox name="gold_certificate"
                                                      :key="componentKey"
                                                      :checked="certificate.gold_certificate"
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
                                            :value="certificate.invalid_reason"
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
                                            :value="certificate.secretary_validating"
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
                                            :value="certificate.dean_validating"
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
                                            :value="certificate.rector_validating"
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
                                        :value="certificate.id"
                                        />
                                    </div>
                                    <div class="col-md-3">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="docType"
                                        name="docType"
                                        type="text"
                                        :value="certificate.docType"
                                        />
                                    </div>
                                    <div class="col-md-1">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="certificate_status"
                                        name="certificate_status"
                                        type="number"
                                        :value="certificate.certificate_status"
                                        />
                                    </div>
                            </div>
                        </form>
                    </template>
                    <template v-else-if="fmode === 'validate'">
                        
                    </template>
                    <template v-else-if="fmode === 'details'"> 
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
                                            :value="certificate.certification"
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
                                            :value="certificate.emitter"
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
                                            :value="certificate.accredited"
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
                                            :value="certificate.created_by"
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
                                        :value="certificate.volume_folio_faculty"
                                        />
                                    </div>
                                    <div class="col-md-3">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="volume_folio_university"
                                        name="volume_folio_university"
                                        type="text"
                                        :value="certificate.volume_folio_university"
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
                                        :value="certificate.date"
                                    />
                                    </div>
                        
                                    <div class="col-md-3">
                                        <CmpBasicCheckbox name="gold_certificate"
                                                      :key="componentKey"
                                                      :checked="certificate.gold_certificate"
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
                                            :value="certificate.invalid_reason"
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
                                            :value="certificate.secretary_validating"
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
                                            :value="certificate.dean_validating"
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
                                            :value="certificate.rector_validating"
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
                                        :value="certificate.id"
                                        />
                                    </div>
                                    <div class="col-md-1">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="docType"
                                        name="docType"
                                        type="text"
                                        :value="certificate.docType"
                                        />
                                    </div>
                                    <div class="col-md-1">
                                        <CmpBasicInput
                                        :key="componentKey"
                                        id="certificate_status"
                                        name="certificate_status"
                                        type="number"
                                        :value="certificate.certificate_status"
                                        />
                                    </div>
                            </div>
                        </form>
                        </fieldset>                   
                    </template>
                    <!-- FORM ACTION BUTTONS -->
                    <template v-slot:footer v-if="fmode === 'create'">
                        <CmpFormActionsButton
                                v-on:saveIntent="hCreateIntent"
                        />
                    </template>
                    <template v-slot:footer v-else-if="fmode === 'edit'">
                        <CmpFormActionsButton
                                v-on:saveIntent="hEditIntent"
                        />
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
import { RoutePathNames} from '@/services/definitions'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { VSCHEMA } from '@/views/auth/validation'

import type { ICertificateFormData } from '@/services/definitions/types-forms'

import useToastify from '@/services/composables/useToastify'
import useCommon from '@/services/composables/useCommon'
import { storeToRefs } from 'pinia';
import { useCertificatesStore } from '@/stores/certificates';
import type { ICertificateDto } from '@/services/definitions';

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
        //const userId = Number.parseInt(id as string, 10)
        

        const toast = useToast() // The toast lib interface

        const { tfyBasicFail } = useToastify(toast)
        const { cap } = useCommon()
        const { handleSubmit } = useForm<ICertificateFormData>({ validationSchema: VSCHEMA })

        const componentKey = ref(0);

        let certificate:any = null;
        
        if(id)
        {
            ({ certificate } = storeToRefs(certificatesStore))
        }

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================

        const aReqCertificateCreation = ( data: ICertificateFormData ) => {
            certificatesStore.reqInsertCertificate(data)
            .then(() => { 
                
                router.push({ 
                name: RoutePathNames.certificates,
                params: {
                    param: "1",
                    searchType: "status",
                    rol: "admin"
                }
             }); })
            .catch(error => { tfyBasicFail(error, 'Certificates','addition') })
        }

        const aReqCertificateUpdate = (data: ICertificateDto ) => {
            certificatesStore.reqModifyCertificate(data)
            .then(() => { 
                
                router.push({ 
                name: RoutePathNames.certificates,
                params: {
                    param: "1",
                    searchType: "status",
                    rol: "admin"
                }
             }); })
            .catch(error => { tfyBasicFail(error, 'Certificates','update') })
        }

        /*const aReqUserUpdate = ( id: number, data: IUserFormData ) => {
            usersStore.reqUserUpdate(id, data)
            .then(() => { router.push({ name: RoutePathNames.users }); })
            .catch(error => { tfyBasicFail(error, 'users','update') })
        }*/

        //#endregion ==========================================================================

        //region ======= HELPERS ==============================================================

        const forceRerender = () => {
            componentKey.value += 1;
        };

        //endregion ===========================================================================

        //region ======= COMPUTATIONS & GETTERS ===============================================
        //endregion ===========================================================================
        
        //region ======== HOOKS ===============================================================
        
        onMounted(() => {            
            if(id)
            {
                certificatesStore.reqCertificatesById(id as string).then(() => {forceRerender()}).catch(error => { tfyBasicFail(error, 'User','request') })
            }
        })

        //endregion ===========================================================================

        //region ======= EVENTS HANDLERS ======================================================

        const hCreateIntent = handleSubmit(formData => {
            aReqCertificateCreation(formData)
        })

        const hEditIntent= handleSubmit(formData => {
            aReqCertificateUpdate(formData)
        })
        
        const h_Back = () => {
            router.push({ name: RoutePathNames.users });
        }

        //endregion ===========================================================================

        return {
            h_Back,
            hCreateIntent,
            hEditIntent,
            cap,
            fmode,
            certificate,
            componentKey,
        }
    }
})

</script>

<style scoped>
</style>
