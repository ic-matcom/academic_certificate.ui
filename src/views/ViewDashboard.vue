<template>
    <transition appear name="page-fade">
    <div class="row">
        <div class="col-6">
            <h2>Certificados Académicos </h2>
            <h3>Búsqueda por acreditado</h3>
            <div class="row">
                <div class="col-6">
                    <CmpBasicInput
                        id="accredited"
                        name="accredited"
                        type="text"
                        :placeholder="$t('form.placeholders.accredited').toUpperCase()"
                        v-on:keydown.enter="hQueryIntentByAccredited"
                />             
                </div>
                    <CmpBaseButton block button-type="success" :icon="true" @doClick.prevent="hQueryIntentByAccredited">
                        <i class="tim-icons icon-zoom-split"></i>
                    </CmpBaseButton>
            </div>
            <h3>Búsqueda por identificador</h3>
            <div class="row">
                <div class="col-6">
                    <CmpBasicInput
                        id="id"
                        name="id"
                        type="text"
                        :placeholder="$t('form.placeholders.id').toUpperCase()"
                        v-on:keydown.enter="hQueryIntentById"
                />             
                </div>
                    <CmpBaseButton block button-type="success" :icon="true" @doClick.prevent="hQueryIntentById">
                        <i class="tim-icons icon-zoom-split"></i>
                    </CmpBaseButton>
            </div>

            <h3 v-if="authStore.showSearchByState">Búsqueda por estado del certificado</h3>
            <div class="row" v-if="authStore.showSearchByState">
                <div class="col-6">
                    <CmpMultiselectField :placeholder="$t('form.placeholders.status')"
                        :options="authStore.getStatusForMultiselect"
                        name="status"
                        class="mb-2"
                        mode="single"
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
                    <CmpBaseButton block button-type="success" :icon="true" @doClick.prevent="hQueryIntentByStatus">
                        <i class="tim-icons icon-zoom-split"></i>
                    </CmpBaseButton>
            </div>
        </div>
    </div>
    </transition>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref} from 'vue'
    import { useRouter } from 'vue-router'
    import { useToast } from 'vue-toastification'
    import { RoutePathNames } from '@/services/definitions/route-paths'
    import { useAuthStore } from '@/stores/auth'

    import useToastify from '@/services/composables/useToastify'
    import useCommon from '@/services/composables/useCommon'
    import { CmpBaseButton, CmpBasicInput, CmpMultiselectField } from '@/components'
    import { useForm } from 'vee-validate'
    import { VSchemaAuth } from '@/services/definitions'
import type { IQueryFormData } from '@/services/definitions/types-forms'

    export default defineComponent({
        name: 'ViewDashboard',
        components: {
            CmpBaseButton,
            CmpBasicInput,
            CmpMultiselectField
        },

        setup(){
        //region ======== DECLARATIONS & LOCAL STATE ============================================

        const authStore = useAuthStore()
        const router = useRouter()
        const toast = useToast() // The toast lib interface

        const { tfyAuthFail, tfyBasicSuccess, tfyBasicFail } = useToastify(toast)
        const { cap } = useCommon()

        const { handleSubmit } = useForm<IQueryFormData>(VSchemaAuth)

        const componentKey = ref(0);
        
        //#endregion ==========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================

        const aReqQueryCertificates = ( data: any, searchType:string ="accredited" ) => {
            router.push({
                name  : RoutePathNames.certificates,
                params: {
                    param: data,
                    searchType: searchType,
                }
            })
        }

        //#endregion ==========================================================================

        //region ======= HELPERS ==============================================================

        const forceRerender = () => {
            componentKey.value += 1;
        };

        //endregion ===========================================================================
        
        //region ======== HOOKS ===============================================================

        /**
         * setup is called before component creation, so the onMounted hook is a good time / place to
         * invoke data population method through web API request.
         */
        onMounted(() => {
            if(authStore.isLoggedIn){
                authStore.reqUserInfo().then(() => {forceRerender()}).catch(err => tfyBasicFail(err, 'Auth', 'request'))
            }           
        })

        //endregion ===========================================================================
        //region ======= EVENTS HANDLERS ======================================================

        const hQueryIntentByAccredited = handleSubmit(formData => {
            aReqQueryCertificates(formData.accredited)
        })

        const hQueryIntentById = handleSubmit(formData => {
            aReqQueryCertificates(formData.id, "id")
        })

        const hQueryIntentByStatus = handleSubmit(formData => {
            aReqQueryCertificates(formData.status, "status")
        })

        //endregion ===========================================================================
        
        return {
            authStore,
            hQueryIntentByAccredited,
            hQueryIntentById,
            hQueryIntentByStatus,
            componentKey
        }

    }

    })
</script>
