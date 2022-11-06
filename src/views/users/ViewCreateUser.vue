<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">

                <CmpCard :hasFormBackBtn="true" v-on:doClick="h_Back">
                    <form>
                        <div class="form-group">
                            <CmpBasicInput
                                    id="email"
                                    name="email"
                                    type="text"
                                    :placeholder="$t('forms.placeholders.email')"
                            />
                        </div>
                        <div class="form-group">
                            <CmpBasicInput
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    :placeholder="$t('forms.placeholders.firstname')"
                            />
                        </div>
                        <div class="form-group">
                            <CmpBasicInput
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    :placeholder="$t('forms.placeholders.lastname')"
                            />
                        </div>
                        <div class="form-group has-label">
                            <CmpBasicInput
                                    id="passphrase"
                                    name="passphrase"
                                    type="password"
                                    :placeholder="$t('forms.placeholders.pass')"
                            />
                        </div>
                        <div class="form-group">
                            <CmpBasicInput
                                    id="username"
                                    name="username"
                                    type="text"
                                    :placeholder="$t('forms.placeholders.user')"
                            />
                        </div>
                    </form>
                
                    <template v-slot:footer>
                        <CmpBaseButton block button-type="primary" @doClick.prevent="hCreateIntent">
                            {{ cap($t("btn.val-save")) }}
                        </CmpBaseButton>
                    </template>
                </CmpCard>

            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { CmpBaseButton, CmpBasicInput, CmpCard } from '@/components'
import { RoutePathNames } from '@/services/definitions'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { useUsersStore } from '@/stores/users'
import { VSCHEMA } from '@/views/auth/validation'

import type { IAuthFormData, IUserFormData } from '@/services/definitions/types-forms'

import useToastify from '@/services/composables/useToastify'
import useCommon from '@/services/composables/useCommon'


export default defineComponent({
    name: 'ViewFormUsers',

    components: {
        CmpCard,
        CmpBaseButton,
        CmpBasicInput
    },

    setup() {

        //region ======= DECLARATIONS & LOCAL STATE ===========================================
        const usersStore = useUsersStore()

        const route = useRoute()
        const router = useRouter()
        const { fmode, id } = route.params

        const toast = useToast() // The toast lib interface

        const { tfyAuthFail } = useToastify(toast)
        const { cap } = useCommon()
        const { handleSubmit } = useForm<IUserFormData>({ validationSchema: VSCHEMA })

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================
        const aReqUserCreation = ( data: IUserFormData ) => {
            usersStore.reqUserCreation(data)
            //usersStore.reqUserUpdate('josele',data)
            .then(() => { router.push({ name: RoutePathNames.users }); })
            .catch(error => { tfyAuthFail(error) })
        }
        //#endregion ==========================================================================

        //region ======= HELPERS ==============================================================
        //endregion ===========================================================================

        //region ======= COMPUTATIONS & GETTERS ===============================================
        //endregion ===========================================================================

        //region ======= EVENTS HANDLERS ======================================================

        const hCreateIntent = handleSubmit(formData => {
            aReqUserCreation(formData)
        })

        const h_Back = () => {
            // router.back()
            router.push({ name: RoutePathNames.users });
        }

        //endregion ===========================================================================

        return {
            h_Back,
            hCreateIntent,
            cap
        }
    }
})

</script>

<style scoped>
</style>
