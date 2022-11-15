<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">
                <CmpCard :hasFormBackBtn="true" v-on:doClick="h_Back">
                    <template v-if="fmode === 'create'">
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
                    </template>
                    
                    <template v-else-if="fmode === 'edit'">
                        <form>
                            <div class="form-group">
                                <CmpBasicInput
                                        :key="componentKey"
                                        id="email"
                                        name="email"
                                        type="text"
                                        :value="user.email"
                                        :placeholder="$t('forms.placeholders.email')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        :key="componentKey"
                                        id="firstname"
                                        name="firstname"
                                        type="text"
                                        :value="user.firstname"
                                        :placeholder="$t('forms.placeholders.firstname')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        :key="componentKey"
                                        id="lastname"
                                        name="lastname"
                                        type="text"
                                        :value="user.lastname"
                                        :placeholder="$t('forms.placeholders.lastname')"
                                />
                            </div>
                            <div class="form-group has-label">
                                <CmpBasicInput
                                        :key="componentKey"
                                        id="passphrase"
                                        name="passphrase"
                                        type="password"
                                        :value="user.passphrase"
                                        :placeholder="$t('forms.placeholders.pass')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        :key="componentKey"
                                        id="username"
                                        name="username"
                                        type="text"
                                        :value="user.username"
                                        :placeholder="$t('forms.placeholders.user')"
                                />
                            </div>
                        </form>
                    </template>
                    <template v-else-if="fmode === 'details'">
                        <fieldset disabled>
                            <form>
                                <div class="form-group">
                                    <CmpBasicInput
                                            :key="componentKey"
                                            :label="$t('forms.placeholders.email')"
                                            id="email"
                                            name="email"
                                            type="text"
                                            :value="user.email"
                                    />
                                </div>
                                <div class="form-group">
                                    <CmpBasicInput
                                            :key="componentKey"
                                            :label="$t('forms.placeholders.firstname')"
                                            id="firstname"
                                            name="firstname"
                                            type="text"
                                            :value="user.firstname"
                                    />
                                </div>
                                <div class="form-group">
                                    <CmpBasicInput
                                            :key="componentKey"
                                            :label="$t('forms.placeholders.lastname')"
                                            id="lastname"
                                            name="lastname"
                                            type="text"
                                            :value="user.lastname"
                                    />
                                </div>
                                <div class="form-group">
                                    <CmpBasicInput
                                            :key="componentKey"
                                            :label="$t('forms.placeholders.user')"
                                            id="username"
                                            name="username"
                                            type="text"
                                            :value="user.username"
                                    />
                                </div>
                            </form>
                        </fieldset>                       
                    </template>
                    <template v-slot:footer v-if="fmode === 'create'">
                            <CmpBaseButton block button-type="primary" @doClick.prevent="hCreateIntent">
                                {{ cap($t("btn.val-save")) }}
                            </CmpBaseButton>
                    </template>
                    <template v-slot:footer v-else-if="fmode === 'edit'">
                            <CmpBaseButton block button-type="primary" @doClick.prevent="hEditIntent">
                                {{ cap($t("btn.tip-save")) }}
                            </CmpBaseButton>
                    </template>
                </CmpCard>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { CmpBaseButton, CmpBasicInput, CmpCard } from '@/components'
import { RoutePathNames } from '@/services/definitions'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { useUsersStore } from '@/stores/users'
import { VSCHEMA } from '@/views/auth/validation'

import type { IUserFormData } from '@/services/definitions/types-forms'

import useToastify from '@/services/composables/useToastify'
import useCommon from '@/services/composables/useCommon'
import { storeToRefs } from 'pinia';


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

        const { tfyBasicFail } = useToastify(toast)
        const { cap } = useCommon()
        const { handleSubmit } = useForm<IUserFormData>({ validationSchema: VSCHEMA })

        const componentKey = ref(0);

        let user:any = null;
        
        if(id)
        {
            ({ user } = storeToRefs(usersStore))
        }

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================

        const aReqUserCreation = ( data: IUserFormData ) => {
            usersStore.reqUserCreation(data)
            .then(() => { router.push({ name: RoutePathNames.users }); })
            .catch(error => { tfyBasicFail(error, 'users','addition') })
        }

        const aReqUserUpdate = ( id: string, data: IUserFormData ) => {
            usersStore.reqUserUpdate(id, data)
            .then(() => { router.push({ name: RoutePathNames.users }); })
            .catch(error => { tfyBasicFail(error, 'users','update') })
        }

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
                usersStore.reqUserById(id as string).then(() => {forceRerender()}).catch(error => { tfyBasicFail(error, 'User','request') })
            }
        })

        //endregion ===========================================================================

        //region ======= EVENTS HANDLERS ======================================================

        const hCreateIntent = handleSubmit(formData => {
            aReqUserCreation(formData)
        })

        const hEditIntent = handleSubmit(formData => {
            aReqUserUpdate(id as string, formData)
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
            user,
            componentKey
        }
    }
})

</script>

<style scoped>
</style>
