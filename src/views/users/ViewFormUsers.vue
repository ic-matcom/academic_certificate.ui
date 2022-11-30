<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">
                <CmpCard :hasFormBackBtn="true" v-on:doClick="h_Back">
                    <template v-if="cmptdFmode === 'create' || cmptdFmode === 'edit'">
                        <form>
                            <div class="form-group">
                                <CmpBasicInput
                                        :key="componentKey"
                                        id="email"
                                        name="email"
                                        type="text"               
                                        :placeholder="$t('form.placeholders.email')"
                                        v-model="iniFormData.email"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        :key="componentKey"
                                        id="firstname"
                                        name="firstname"
                                        type="text"                                        
                                        :placeholder="$t('form.placeholders.user-firstname')"
                                        v-model="iniFormData.firstname"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        :key="componentKey"
                                        id="lastname"
                                        name="lastname"
                                        type="text"                                        
                                        :placeholder="$t('form.placeholders.user-lastname')"
                                        v-model="iniFormData.lastname"
                                />
                            </div>
                            <div class="form-group has-label">
                                <CmpBasicInput
                                        :key="componentKey"
                                        id="passphrase"
                                        name="passphrase"
                                        type="password"                                        
                                        :placeholder="$t('form.placeholders.pass')"
                                        v-model="iniFormData.passphrase"
                                />
                            </div>
                            <div class="form-group">
                                <CmpBasicInput
                                        :key="componentKey"
                                        id="username"
                                        name="username"
                                        type="text"
                                        :placeholder="$t('form.placeholders.user')"
                                        v-model="iniFormData.username"
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

                    <template v-else-if="cmptdFmode === 'details'">
                        <fieldset disabled>
                            <form>
                                <div class="form-group">
                                    <CmpBasicInput
                                            :key="componentKey"
                                            :label="$t('form.fields-common.email')"
                                            id="email"
                                            name="email"
                                            type="text"
                                            v-model="iniFormData.email"
                                    />
                                </div>
                                <div class="form-group">
                                    <CmpBasicInput
                                            :key="componentKey"
                                            :label="$t('form.fields-common.firstname')"
                                            id="firstname"
                                            name="firstname"
                                            type="text"
                                            v-model="iniFormData.firstname"
                                    />
                                </div>
                                <div class="form-group">
                                    <CmpBasicInput
                                            :key="componentKey"
                                            :label="$t('form.fields-common.lastname')"
                                            id="lastname"
                                            name="lastname"
                                            type="text"
                                            v-model="iniFormData.lastname"
                                    />
                                </div>
                                <div class="form-group">
                                    <CmpBasicInput
                                            :key="componentKey"
                                            :label="$t('form.fields-common.username')"
                                            id="username"
                                            name="username"
                                            type="text"
                                            v-model="iniFormData.username"
                                    />
                                </div>
                                <div class="form-group">
                                    <CmpBasicInput
                                            :key="componentKey"
                                            label="Rol"
                                            id="rol"
                                            name="rol"
                                            type="text"
                                            v-model="iniFormData.rol"
                                    />
                                </div>
                            </form>
                        </fieldset>                       
                    </template>
                    <!-- FORM ACTION BUTTONS -->
                    <template v-slot:footer v-if="cmptdFmode === 'create' || cmptdFmode === 'edit'">
                        <CmpFormActionsButton
                                v-on:saveIntent="h_submit"
                                v-on:cancelIntent="h_Cancel"
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
import { CmpBasicInput, CmpCard, CmpBasicCheckbox, CmpMultiselectField, CmpFormActionsButton } from '@/components'
import { RoutePathNames, VSchemaUserCreate, VSchemaUserEdit} from '@/services/definitions'
import type { TFormMode, TOPSKind } from '@/services/definitions'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { useUsersStore } from '@/stores/users'
import { VSCHEMA } from '@/views/auth/validation'

import type { IUserFormData } from '@/services/definitions/types-forms'

import useToastify from '@/services/composables/useToastify'
import useCommon from '@/services/composables/useCommon'
import useFactory from '@/services/composables/useFactory';

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
        //const userId = Number.parseInt(id as string, 10)
        
        const toast = useToast() // The toast lib interface

        const { tfyBasicFail } = useToastify(toast)
        const { cap } = useCommon()

        const { mkUser } = useFactory()
        let iniFormData = reactive<IUserFormData>(mkUser())                 // initial form data

        const componentKey = ref(0);

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================

        const aReqUserCreation = ( data: IUserFormData ) => {
            usersStore.reqUserCreation(data)
            .then(() => { router.push({ name: RoutePathNames.users }); })
            .catch(error => { tfyBasicFail(error, 'Users','addition') })
        }

        const aReqUserUpdate = ( data: IUserFormData ) => {
            usersStore.reqUserUpdate(+id, data)
            .then(() => { router.push({ name: RoutePathNames.users }); })
            .catch(error => { tfyBasicFail(error, 'Users','update') })
        }

        //#endregion ==========================================================================

        //region ======= HELPERS ==============================================================

        const forceRerender = () => {
                componentKey.value += 1;
        };

        //endregion ===========================================================================

        //region ======= COMPUTATIONS & GETTERS ===============================================

        // compute the form mode: creation mode or edition mode
        const cmptdFmode: ComputedRef<string | string[]> = computed(() => fmode)

        // getting the vee validate method to manipulate the form related actions from the view
        const { handleSubmit, meta, setValues, resetForm } = useForm<IUserFormData>({
            //validationSchema: fmode === 'create' as TFormMode ? VSchemaUserCreate : VSchemaUserEdit,
            validationSchema: VSCHEMA,
            initialValues:    iniFormData
        })

        //endregion ===========================================================================
        
        //region ======== HOOKS ===============================================================
        
        onMounted(() => {            
            if (cmptdFmode.value === 'edit' as TFormMode || cmptdFmode.value === 'details' as TFormMode) {
                usersStore.reqUserById(+id)
                .then(() => {
                    setValues(usersStore.user)
                    forceRerender()})
                .catch(error => { tfyBasicFail(error, 'User','request') })
            }
        })

        //endregion ===========================================================================

        //region ======= EVENTS HANDLERS ======================================================

        const h_submit = (event: Event) => {
            event.preventDefault()
            // handling the submission with vee-validate method
            handleSubmit(formData => {
                if (cmptdFmode.value == ("create" as TFormMode)) aReqUserCreation(formData);
                if (cmptdFmode.value == ("edit" as TFormMode) && meta.value.dirty) aReqUserUpdate(formData);
                if (cmptdFmode.value == ("edit" as TFormMode) && !meta.value.dirty) h_Back();               // was no changes (no dirty) with the data, so going back normally
            }).call(this)
        }

        const h_Back = () => {
            router.push({ name: RoutePathNames.users });
        }

        const h_Cancel = () => {
            router.push({ name: RoutePathNames.users });
        }

        //endregion ===========================================================================

        return {
            h_Back,
            h_submit,
            h_Cancel,
            cap,
            cmptdFmode,
            iniFormData,
            componentKey,
            usersStore
        }
    }
})

</script>

<style scoped>
</style>
