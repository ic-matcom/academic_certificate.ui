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
                                        :placeholder="$t('form.placeholders.email')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        id="firstname"
                                        name="firstname"
                                        type="text"                                        
                                        :placeholder="$t('form.placeholders.user-firstname')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        id="lastname"
                                        name="lastname"
                                        type="text"                                        
                                        :placeholder="$t('form.placeholders.user-lastname')"
                                />
                            </div>
                            <div class="form-group has-label">
                                <CmpBasicInput
                                        id="passphrase"
                                        name="passphrase"
                                        type="password"                                        
                                        :placeholder="$t('form.placeholders.pass')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        id="username"
                                        name="username"
                                        type="text"
                                        :placeholder="$t('form.placeholders.user')"
                                />
                            </div>
                            <!-- role -->
                            <div class="form-group">
                                    <CmpMultiselectField placeholder="- rol - "
                                                         :options="usersStore.getRolesForMultiselect"
                                                         name="rol"
                                                         class="mb-2"
                                                         mode="single"
                                                         closeOnSelect>
                                        <!--option coming from slot child component ('slots props') [option] -->
                                        <template #customOption="{option}">
                                            {{  option.label }}
                                        </template>
                                        <!-- option coming from slot child component ('slots props') [value] -->
                                        <template #customSingleLabel="{value}">
                                            <div class="multiselect-placeholder">
                                                {{ value.label }}
                                            </div>
                                        </template>
                                    </CmpMultiselectField>
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
                                        :placeholder="$t('form.placeholders.email')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        :key="componentKey"
                                        id="firstname"
                                        name="firstname"
                                        type="text"
                                        :value="user.firstname"
                                        :placeholder="$t('form.placeholders.user-firstname')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        :key="componentKey"
                                        id="lastname"
                                        name="lastname"
                                        type="text"
                                        :value="user.lastname"
                                        :placeholder="$t('form.placeholders.user-lastname')"
                                />
                            </div>
                            <div class="form-group has-label">
                                <CmpBasicInput
                                        :key="componentKey"
                                        id="passphrase"
                                        name="passphrase"
                                        type="password"
                                        :value="user.passphrase"
                                        :placeholder="$t('form.placeholders.pass')"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        :key="componentKey"
                                        id="username"
                                        name="username"
                                        type="text"
                                        :value="user.username"
                                        :placeholder="$t('form.placeholders.user')"
                                />
                            </div>
                            <div class="form-group">
                                    <CmpMultiselectField placeholder="- rol - "
                                                         :options="usersStore.getRolesForMultiselect"
                                                         name="rol"
                                                         class="mb-2"
                                                         :label="user.rol"
                                                         mode="single"
                                                         closeOnSelect>
                                        <!--option coming from slot child component ('slots props') [option] -->
                                        <template #customOption="{option}">
                                            {{  option.label }}
                                        </template>
                                        <!-- option coming from slot child component ('slots props') [value] -->
                                        <template #customSingleLabel="{value}">
                                            <div class="multiselect-placeholder">
                                                {{ value.label }}
                                            </div>
                                        </template>
                                    </CmpMultiselectField>
                            </div>
                        </form>
                    </template>
                    <template v-else-if="fmode === 'details'">
                        <fieldset disabled>
                            <form>
                                <div class="form-group">
                                    <CmpBasicInput
                                            :key="componentKey"
                                            :label="$t('form.fields-common.email')"
                                            id="email"
                                            name="email"
                                            type="text"
                                            :value="user.email"
                                    />
                                </div>
                                <div class="form-group">
                                    <CmpBasicInput
                                            :key="componentKey"
                                            :label="$t('form.fields-common.firstname')"
                                            id="firstname"
                                            name="firstname"
                                            type="text"
                                            :value="user.firstname"
                                    />
                                </div>
                                <div class="form-group">
                                    <CmpBasicInput
                                            :key="componentKey"
                                            :label="$t('form.fields-common.lastname')"
                                            id="lastname"
                                            name="lastname"
                                            type="text"
                                            :value="user.lastname"
                                    />
                                </div>
                                <div class="form-group">
                                    <CmpBasicInput
                                            :key="componentKey"
                                            :label="$t('form.fields-common.username')"
                                            id="username"
                                            name="username"
                                            type="text"
                                            :value="user.username"
                                    />
                                </div>
                                <div class="form-group">
                                    <CmpBasicInput
                                            :key="componentKey"
                                            label="Rol"
                                            id="rol"
                                            name="rol"
                                            type="text"
                                            :value="user.rol"
                                    />
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
import { CmpBasicInput, CmpCard, CmpBasicCheckbox, CmpMultiselectField, CmpFormActionsButton } from '@/components'
import { RoutePathNames } from '@/services/definitions'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { useUsersStore } from '@/stores/users'
import { VSCHEMA } from '@/views/auth/validation'

import type { IUserFormData } from '@/services/definitions/types-forms'

import useToastify from '@/services/composables/useToastify'
import useCommon from '@/services/composables/useCommon'
import { storeToRefs } from 'pinia';
import { number } from '@intlify/core-base';


export default defineComponent({
    name: 'ViewFormUsers',

    components: {
        CmpCard,
        CmpBasicInput,
        CmpBasicCheckbox,
        CmpMultiselectField,
        CmpFormActionsButton
    },

    setup() {

        //region ======= DECLARATIONS & LOCAL STATE ===========================================
        const usersStore = useUsersStore()

        const route = useRoute()
        const router = useRouter()
        const { fmode, id } = route.params
        const userId = Number.parseInt(id as string, 10)
        

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

        const aReqUserUpdate = ( id: number, data: IUserFormData ) => {
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
                usersStore.reqUserById(userId).then(() => {forceRerender()}).catch(error => { tfyBasicFail(error, 'User','request') })
            }
        })

        //endregion ===========================================================================

        //region ======= EVENTS HANDLERS ======================================================

        const hCreateIntent = handleSubmit(formData => {
            aReqUserCreation(formData)
        })

        const hEditIntent = handleSubmit(formData => {
            aReqUserUpdate(userId, formData)
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
            componentKey,
            usersStore
        }
    }
})

</script>

<style scoped>
</style>
