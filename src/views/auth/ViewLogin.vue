<template>
    <div class="label-container">
        <h1 class="label-justify main-title">Certificados Académicos </h1>
        <h5 class="label-justify main-title-description" style="font-style: italic">Plataforma de Credenciales Digitales</h5>
    </div>

    <CmpCard card-type="auto-margin">
        <form>
            <div class="form-group">
                <CmpBasicInput
                        :key="componentKey"
                        id="user"
                        name="username"
                        type="text"
                        :placeholder="$t('form.placeholders.user')"
                />
            </div>
            <div class="form-group has-label">
                <CmpBasicInput
                        :key="componentKey"
                        id="password"
                        name="password"
                        type="password"
                        :placeholder="$t('form.placeholders.pass')"
                        v-on:keydown.enter="hLoginIntent"
                />
            </div>
        </form>

        <template v-slot:footer>
            <CmpBaseButton block button-type="success" @doClick.prevent="hLoginIntent">
                {{ cap($t("btn.val-login")) }}
            </CmpBaseButton>
            <CmpBaseButton block button-type="success" @doClick.prevent="hAnonymousLoginIntent">
                {{ cap($t("btn.val-guest-login")) }}
            </CmpBaseButton>
        </template>
    </CmpCard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { CmpBaseButton, CmpBasicInput, CmpCard } from '@/components'
import { VSchemaAuth } from '@/services/definitions'
import { RoutePathNames } from '@/services/definitions/route-paths'
import { useAuthStore } from '@/stores/auth'

import type { IAuthFormData } from '@/services/definitions/types-forms'

import useToastify from '@/services/composables/useToastify'
import useCommon from '@/services/composables/useCommon'


export default defineComponent({
    name:       'LoginView',
    components: {
        CmpCard,
        CmpBaseButton,
        CmpBasicInput
    },
    setup() {
        //region ======== DECLARATIONS & LOCAL STATE ============================================

        const authStore = useAuthStore()
        const router = useRouter()
        const toast = useToast() // The toast lib interface

        const { tfyAuthFail } = useToastify(toast)
        const { cap } = useCommon()
        const { handleSubmit } = useForm<IAuthFormData>({ validationSchema: VSchemaAuth })

        const componentKey = ref(0);

        //endregion =============================================================================

        //#region ======= FETCHING DATA & ACTIONS ===============================================

        const aReqAccess = ( data: IAuthFormData ) => {
            authStore.reqLogin(data)
            .then(() => { goToDashboard() })
            .catch(error => { 
                data.password =""
                forceRerender()
                tfyAuthFail(error) })
        }

        //endregion =============================================================================

        //region ======= HELPERS ==============================================================

        const forceRerender = () => {
            componentKey.value += 1;
        };

        //endregion ===========================================================================

        //region ======== NAVIGATION ============================================================

        const goToDashboard = () => {
            router.push({ name: RoutePathNames.dashboard })
        }

        //endregion =============================================================================

        //region ======== EVENTS HANDLERS =======================================================

        const hLoginIntent = handleSubmit(formData => {
            aReqAccess(formData)
        })

        const hAnonymousLoginIntent = handleSubmit(formData => {
            goToDashboard()
        })

        //endregion =============================================================================

        return {
            hLoginIntent,
            hAnonymousLoginIntent,
            cap,
            componentKey
        }
    }
})
</script>

<style scoped lang="scss">
h5 {
    margin-bottom : 26px;
}

.main-title {
    margin-bottom: 12px;
}

.main-title-description {
    margin-bottom: 6%;
}

.label-justify {
    text-align : center;
}

.label-container {
    margin : auto;
    width  : 40%;
}
</style>
