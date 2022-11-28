<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">
                <CmpCard :hasFormBackBtn="true" v-on:doClick="h_Back">
                    <template v-if="fmode === 'create'">
                        <form>
                            <div class="form-group">
                                <CmpBasicInput
                                        id="certification"
                                        name="certification"
                                        type="text"                                        
                                        :placeholder="$t('forms.placeholders.certification')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        id="emitter"
                                        name="emitter"
                                        type="text"
                                        :placeholder="$t('forms.placeholders.emitter')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        id="accredited"
                                        name="accredited"
                                        type="text"
                                        :placeholder="$t('forms.placeholders.accredited')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        id="date"
                                        name="date"
                                        type="date"
                                        :placeholder="$t('forms.placeholders.date')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        id="created_by"
                                        name="created_by"
                                        type="text"
                                        :placeholder="$t('forms.placeholders.created_by')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        id="volume_folio_faculty"
                                        name="volume_folio_faculty"
                                        type="text"
                                        :placeholder="$t('forms.placeholders.volume_folio_faculty')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        id="volume_folio_university"
                                        name="volume_folio_university"
                                        type="text"
                                        :placeholder="$t('forms.placeholders.volume_folio_university')"
                                />
                            </div>
                        </form>
                    </template>
                    
                    <template v-else-if="fmode === 'validate'">
                        
                    </template>
                    <template v-else-if="fmode === 'details'">                     
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
import { RoutePathNames } from '@/services/definitions'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { VSCHEMA } from '@/views/auth/validation'

import type { ICertificateFormData } from '@/services/definitions/types-forms'

import useToastify from '@/services/composables/useToastify'
import useCommon from '@/services/composables/useCommon'
import { storeToRefs } from 'pinia';
import { useCertificatesStore } from '@/stores/certificates';

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
        const { fmode } = route.params
        //const userId = Number.parseInt(id as string, 10)
        

        const toast = useToast() // The toast lib interface

        const { tfyBasicFail } = useToastify(toast)
        const { cap } = useCommon()
        const { handleSubmit } = useForm<ICertificateFormData>({ validationSchema: VSCHEMA })

        const componentKey = ref(0);

        let user:any = null;
        const label : Array<String> = ["Si", "No"]
        
        /*if(id)
        {
            ({ user } = storeToRefs(usersStore))
        }*/

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================

        const aReqCertificateCreation = ( data: ICertificateFormData ) => {
            certificatesStore.reqInsertCertificate(data)
            .then(() => { router.push({ 
                name: RoutePathNames.certificates,
                params: {
                    param: "1",
                    searchType: "status",
                    rol: "admin"
                }
             }); })
            .catch(error => { tfyBasicFail(error, 'Certificates','addition') })
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
            /*if(id)
            {
                usersStore.reqUserById(userId).then(() => {forceRerender()}).catch(error => { tfyBasicFail(error, 'User','request') })
            }*/
        })

        //endregion ===========================================================================

        //region ======= EVENTS HANDLERS ======================================================

        const hCreateIntent = handleSubmit(formData => {
            aReqCertificateCreation(formData)
        })

        /*const hEditIntent = handleSubmit(formData => {
            aReqUserUpdate(userId, formData)
        })*/

        const h_Back = () => {
            router.push({ name: RoutePathNames.users });
        }

        //endregion ===========================================================================

        return {
            h_Back,
            hCreateIntent,
            cap,
            fmode,
            user,
            componentKey,
            label
        }
    }
})

</script>

<style scoped>
</style>
