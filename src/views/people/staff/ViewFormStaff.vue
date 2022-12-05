<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">

                <CmpCard :hasFormBackBtn="true" v-on:doClick="h_Back">

                    <!-- FORM -->
                    <form class="form-horizontal">
                        <div class="row">

                            <div class="col-xm-12 col-md-6">
                                <h3 class="text">{{ $t("form.section.staff-information") }}</h3>

                                <!-- id -->
                                <div class="row">
                                    <div class="col-md-9">
                                        <CmpBasicInput
                                                disabled
                                                placeholder="###########"
                                                name="id"
                                                type="hidden"
                                                v-model="iniFormData.id"
                                        />
                                    </div>
                                </div>

                                <!-- firstname -->
                                <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t("form.fields-common.firstname") }}
                                    </label>
                                    <div class="col-md-9">
                                        <CmpBasicInput
                                                :placeholder="$t('form.placeholders.staff-firstname')"
                                                name="firstName"
                                                type="text"
                                                v-model="iniFormData.firstName"
                                        />
                                    </div>
                                </div>

                                <!-- lastname -->
                                <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t("form.fields-common.lastname") }}
                                    </label>
                                    <div class="col-md-9">
                                        <CmpBasicInput
                                                :placeholder="$t('form.placeholders.staff-lastname')"
                                                name="lastName"
                                                type="text"
                                                v-model="iniFormData.lastName"
                                        />
                                    </div>
                                </div>

                                <!-- username -->
                                <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t("form.fields-common.username") }}
                                    </label>
                                    <div class="col-md-9">
                                        <CmpBasicInput
                                                :placeholder="$t('form.placeholders.username')"
                                                name="username"
                                                type="text"
                                                v-model="iniFormData.username"
                                        />
                                    </div>
                                </div>

                                <!-- username -->
                                <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t("form.fields-common.email") }}
                                    </label>
                                    <div class="col-md-9">
                                        <CmpBasicInput
                                                :placeholder="$t('form.placeholders.email')"
                                                name="email"
                                                type="text"
                                                v-model="iniFormData.email"
                                        />
                                    </div>
                                </div>

                                <!-- cell -->
                                <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t("form.fields-common.cell") }}
                                    </label>
                                    <div class="col-md-9">
                                        <CmpBasicInput
                                                placeholder="### ## ### ## ##"
                                                name="cell"
                                                type="number"
                                                v-model="iniFormData.cell"
                                        />
                                    </div>
                                </div>

                                <!-- role -->
                                <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('form.fields.staff.system-role') }}
                                    </label>
                                    <div class="col-md-9">
                                        <CmpMultiselectField placeholder="- rol - "
                                                             :options="nomencStore.getRolesForMultiselect"
                                                             name="roleId"
                                                             class="mb-2"
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
                                </div>

                                <!-- isActive / status -->
                                <div class="row">
                                    <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ $t('data.status') }}
                                    </label>
                                    <div class="col-md-9">
                                        <CmpBasicCheckbox name="isActive"
                                                          :checked="iniFormData.isActive"
                                                          v-model="iniFormData.isActive"
                                                          :labels="[$t('others.available'), $t('others.unavailable')]"
                                        />
                                    </div>
                                </div>

                                <!-- change / set password -->
                                <div class="row" @click.prevent="h_toggleCollapsable">
                                    <h5 class="text-sm-left text-md-right col-md-3 col-form-label">
                                        {{ cmptdFmode === 'edit' ? $t( 'form.fields-common.change-password' ) : $t( 'form.fields-common.set-password' ) }}
                                    </h5>
                                    <div class="col-md-9">
                                        <i class="tim-icons icon-minimal-down caret-form-section"
                                           :class="rotationCaretClass" />
                                    </div>
                                    <hr class="collapsable-form-section-divisor">
                                </div>
                                <Transition name="collapsable">
                                    <div class="collapsable-div" v-if="doWeShowCollapsable">
                                        <div class="row">
                                            <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                                {{ $t( 'form.fields-common.password' ) }}
                                            </label>
                                            <div class="col-md-9">
                                                <CmpBasicInput
                                                        placeholder="**************"
                                                        name="password"
                                                        type="password"
                                                        v-model="iniFormData.password"
                                                        ref="password"
                                                />
                                            </div>
                                        </div>

                                        <div class="row">
                                            <label class="text-sm-left text-md-right col-md-3 col-form-label">
                                                {{ $t( 'form.fields-common.password-confirm' ) }}
                                            </label>
                                            <div class="col-md-9">
                                                <CmpBasicInput
                                                        placeholder="**************"
                                                        name="passwordConf"
                                                        type="password"
                                                        v-model="iniFormData.passwordConf"
                                                        data-vv-as="password"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Transition>

                            </div>

                            <div class="col-xs-12 col-md-6">
                            </div>

                        </div>
                    </form>

                    <!-- FORM ACTION BUTTONS -->
                    <template v-slot:footer>
                        <CmpFormActionsButton
                                :show-delete="cmptdFmode === 'edit'"
                                v-on:saveIntent="h_submit"
                                v-on:deleteIntent="h_Delete"
                                v-on:cancelIntent="h_Cancel"
                        />
                    </template>
                </CmpCard>

            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { useToast } from 'vue-toastification'
import { useStaffStore } from '@/stores/staff'
import { useNomencStore } from '@/stores/nomenc'
import useFactory from '@/services/composables/useFactory'
import useToastify from '@/services/composables/useToastify'
import { computed, onMounted, ref, defineComponent, reactive } from 'vue'
import { useForm } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import { CmpCard, CmpFormActionsButton, CmpBasicInput, CmpBasicCheckbox, CmpMultiselectField } from '@/components'
import { RoutePathNames, VSchemaStaffCreate, VSchemaStaffEdit } from '@/services/definitions'

import type { ComputedRef } from 'vue'
import type { IDtoStaff, TFormMode, TOPSKind, IMultiselectBasic } from '@/services/definitions'


export default defineComponent({
    name: 'ViewFormStaff',

    components: {
        CmpCard,
        CmpBasicInput,
        CmpBasicCheckbox,
        CmpMultiselectField,
        CmpFormActionsButton
    },

    setup() {

        //region ======= DECLARATIONS & LOCAL STATE ===========================================

        const route = useRoute()
        const router = useRouter()

        const staffStore = useStaffStore()                              // Pinia store for staff
        const nomencStore = useNomencStore()                            // Pinia store for nomenclatures
        const { fmode, id } = route.params                              // remember, fmode (form mode) property denotes the mode this form view was called

        const toast = useToast()                                        // The toast lib interface
        const { tfyBasicSuccess, tfyBasicFail } = useToastify(toast)
        const { mkStaff } = useFactory()

        let iniFormData = reactive<IDtoStaff>(mkStaff())                 // initial form data
        // let rolesData = ref<IMultiselectBasic[]>([])                  // I will use rer 'cause is only one nested object

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================

        /**
         * If this view is called as edit mode rather than creation mode, we need to call the backend API
         * asking for the resource so we can populate the datatable
         *
         * Manually setting the needed values is way cleaner than the other way around. This is needed mainly because api call is asynchronous.
         */
        onMounted(() => {
                    // TODO this is for edition mode, so it need to be ready for that mode

                    /*if (cmptdFmode.value === ('edit' as TFormMode)) {
                     const storeFromApi = await getStore(+id)
                     setValues(storeFromApi)
                     }*/
                }
        )

        /**
         * Store action for the creating (request) the new entity on the backend system. This value is related to the
         * type of save button in the CmpFormActionsButton: APPLY or SAVE normally
         *
         * @param newStaff payload with the data for the request
         * @param doWeNeedToStay Tell us where to go after the successfully creation of the entity
         */
        const a_Create = ( newStaff: IDtoStaff, doWeNeedToStay: boolean): void => {

            // some aux vars
            const sub = 'Staff'
            const op: TOPSKind = 'addition'

            staffStore.reqInsertStaff(newStaff, doWeNeedToStay).then(() => {
                tfyBasicSuccess(sub, op)

                // so now what ?
                if(!doWeNeedToStay) h_Back()                            // so we are going back to the data table
                else resetForm({ values: mkStaff() })             // so wee need to clean the entire form and stay in it

            }).catch(err => tfyBasicFail(err, sub, op))
        }

        const a_Edit = ( editedStaff: IDtoStaff ): void => {
            console.warn('edit clicked')
        }

        const a_Delete = ( staffId: number ): void => {
            console.warn('delete clicked')
        }

        //#endregion ==========================================================================

        //region ======= COMPUTATIONS & GETTERS ===============================================

        // compute the form mode: creation mode or edition mode
        const cmptdFmode: ComputedRef<string | string[]> = computed(() => fmode)

        // getting the vee validate method to manipulate the form related actions from the view
        const { handleSubmit, meta, setValues, resetForm } = useForm<IDtoStaff>({
            validationSchema: fmode === 'create' as TFormMode ? VSchemaStaffCreate : VSchemaStaffEdit,
            initialValues:    iniFormData
        })

        //endregion ===========================================================================

        //region ======= HELPERS ==============================================================

        const rotationCaretClass = ref('')                                      // rotate the caret | this is the CSS alternative, no Vue transition needed
        const doWeShowCollapsable = ref(cmptdFmode.value === 'create')          // start the animation of the actual collapsible

        const h_toggleCollapsable = () => {
            doWeShowCollapsable.value = !doWeShowCollapsable.value
            rotationCaretClass.value === 'rotate-up' ? rotationCaretClass.value = 'rotate-down' : rotationCaretClass.value = 'rotate-up'
        }

        //endregion ===========================================================================

        //region ======= EVENTS HANDLERS ======================================================

        /**
         * Handles the form submission event through the vee-validate 'SubmissionHandler' so we can take advantage of all
         * the its validation logic but using with own logic inserted as callback
         *
         * @param event The DOM event coming from our Vue UI custom component (CmpFormActionsButton in this case)
         * @param doWeNeedToStay This is a boolean data coming from our Vue UI custom component (CmpFormActionsButton in this case). Tell us where to go after the successfully creation of the entity
         */
        const h_submit = (event: Event, doWeNeedToStay: boolean) => {
            event.preventDefault()

            // handling the submission with vee-validate method
            handleSubmit(formData => {
                if (cmptdFmode.value == ("create" as TFormMode)) a_Create(formData, doWeNeedToStay);
                if (cmptdFmode.value == ("edit" as TFormMode) && meta.value.dirty) a_Edit(formData);
                if (cmptdFmode.value == ("edit" as TFormMode) && !meta.value.dirty) h_Back();               // was no changes (no dirty) with the data, so going back normally
            }).call(this)
        }

        const h_Back = () => {
            // router.back()
            router.push({ name: RoutePathNames.staff });
        }

        const h_Cancel = () => {
            router.push({ name: RoutePathNames.staff });
        }

        const h_Delete = async () => {
            console.log('pending delete function')
        }

        //endregion ===========================================================================

        return {
            doWeShowCollapsable,
            rotationCaretClass,

            cmptdFmode,
            iniFormData,
            nomencStore,

            h_submit,
            h_Back,
            h_Cancel,
            h_Delete,
            h_toggleCollapsable
        }
    }
})
</script>

<style scoped>
</style>