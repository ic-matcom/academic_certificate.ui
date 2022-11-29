<template>
    <transition appear name="page-fade">
    <div class="row">
        <div class="col-6">
            <h2>Certificados Académicos </h2>
            <h3>Búsqueda por acreditado</h3>
            <div class="row">
                <div class="col-6">
                    <CmpBasicInput
                        id="param"
                        name="param"
                        type="text"
                        :placeholder="$t('form.placeholders.search').toUpperCase()"
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
                        id="param1"
                        name="param"
                        type="text"
                        :placeholder="$t('form.placeholders.search').toUpperCase()"
                        v-on:keydown.enter="hQueryIntentById"
                />             
                </div>
                    <CmpBaseButton block button-type="success" :icon="true" @doClick.prevent="hQueryIntentById">
                        <i class="tim-icons icon-zoom-split"></i>
                    </CmpBaseButton>
            </div>

            <h3 v-if="show">Búsqueda por estado del certificado</h3>
            <div class="row" v-if="show">
                <div class="col-6">
                    <CmpBasicInput
                        id="param2"
                        name="param"
                        type="text"
                        :placeholder="$t('form.placeholders.search').toUpperCase()"
                        v-on:keydown.enter="hQueryIntentByStatus"
                />             
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
    import { defineComponent, onMounted, onBeforeMount } from 'vue'
    import { useRouter } from 'vue-router'
    import { useToast } from 'vue-toastification'
    import { RoutePathNames } from '@/services/definitions/route-paths'
    import { useAuthStore } from '@/stores/auth'

    import useToastify from '@/services/composables/useToastify'
    import useCommon from '@/services/composables/useCommon'
    import { CmpBaseButton, CmpBasicInput } from '@/components'
    import { useForm } from 'vee-validate'
    import { Roles, VSchemaAuth } from '@/services/definitions'
import type { IQueryFormData } from '@/services/definitions/types-forms'

    export default defineComponent({
        name: 'ViewDashboard',
        components: {
            CmpBaseButton,
            CmpBasicInput
        },

        setup(){
        //region ======== DECLARATIONS & LOCAL STATE ============================================

        const authStore = useAuthStore()
        const router = useRouter()
        const toast = useToast() // The toast lib interface

        const { tfyAuthFail, tfyBasicSuccess, tfyBasicFail } = useToastify(toast)
        const { cap } = useCommon()

        const { handleSubmit } = useForm<IQueryFormData>(VSchemaAuth)

        const roles:string = authStore.user.rol
        let show: boolean = false
        let rol:string = ''
        if (roles === Roles.certadmin)
        {
            rol = 'admin'
            show = true
        }
        else if ([Roles.dean,Roles.secretary,Roles.rector].includes(roles))
        {
            rol = 'sdr'
            show = true
        }
        else
        {
            rol = 'sa'
        }

        //#endregion ==========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================

        const aReqQueryCertificates = ( data: IQueryFormData, searchType:string ="accredited" ) => {
            router.push({
                name  : RoutePathNames.certificates,
                params: {
                    param: data.param,
                    searchType: searchType,
                    rol: rol
                }
            })
        }

        //#endregion ==========================================================================

        //region ======== HOOKS ===============================================================

        /**
         * setup is called before component creation, so the onMounted hook is a good time / place to
         * invoke data population method through web API request.
         */
        onMounted(() => {
            authStore.reqUserInfo().catch(err => tfyBasicFail(err, 'User', 'request'))
        })

        //endregion ===========================================================================
        //region ======= EVENTS HANDLERS ======================================================

        const hQueryIntentByAccredited = handleSubmit(formData => {
            aReqQueryCertificates(formData)
        })

        const hQueryIntentById = handleSubmit(formData => {
            aReqQueryCertificates(formData, "id")
        })

        const hQueryIntentByStatus = handleSubmit(formData => {
            aReqQueryCertificates(formData, "status")
        })


        //endregion ===========================================================================

        
        return {
            authStore,
            hQueryIntentByAccredited,
            hQueryIntentById,
            hQueryIntentByStatus,
            show
        }

    }

    })
</script>
