<template>
    <div class="label-container">
        <h1 class="label-justify main-title">{{$t('data.certificates-title')}}</h1>
        <h5 class="label-justify main-title-description" style="font-style: italic">{{$t('data.certificates-subtitle')}}</h5>
    </div>

    <CmpCard card-type="auto-margin">
        <form>
            <div class="form-group">
                <CmpBasicInput
                        id="user"
                        name="username"
                        type="text"
                        :placeholder="$t('form.placeholders.user')"
                />
            </div>
            <div class="form-group has-label">
                <CmpBasicInput
                        id="password"
                        name="password"
                        type="password"
                        :placeholder="$t('form.placeholders.pass')"
                        v-on:keydown.enter="hLoginIntent"
                />
            </div>
        </form>

        <template v-slot:footer>
            <CmpBaseButton block button-type="default" @doClick.prevent="hLoginIntent">
                {{ cap($t("btn.val-login")) }}
            </CmpBaseButton>
            <CmpBaseButton block button-type="default" @doClick.prevent="hAnonymousLoginIntent">
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
        const { handleSubmit, resetForm } = useForm<IAuthFormData>({ validationSchema: VSchemaAuth })

        //endregion =============================================================================

        //#region ======= FETCHING DATA & ACTIONS ===============================================

        const aReqAccess = ( data: IAuthFormData ) => {
            authStore.reqLogin(data)
            .then(() => { goToHome() })
            .catch(error => {
                resetForm()
                tfyAuthFail(error) })
        }

        //endregion =============================================================================

        //region ======= HELPERS ==============================================================

        //endregion ===========================================================================

        //region ======== NAVIGATION ============================================================

        const goToHome = () => {
            router.push({ name: RoutePathNames.home })
        }

        //endregion =============================================================================

        //region ======== EVENTS HANDLERS =======================================================

        const hLoginIntent = handleSubmit(formData => {
            aReqAccess(formData)
        })

        const hAnonymousLoginIntent = () => goToHome()

        //endregion =============================================================================

        return {
            hLoginIntent,
            hAnonymousLoginIntent,
            cap
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
