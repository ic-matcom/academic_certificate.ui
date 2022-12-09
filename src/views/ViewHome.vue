<template>
    <transition appear name="page-fade">
    <div class="container">
        <h1> {{ cap($t("data.home-message")) }} </h1>
        <div class="row" style="padding-top: 3em; ">
            <div class="col-6">
                <h2> {{ cap($t("data.accredited-search")) }}</h2>
                <div class="row">
                    <div class="col-4">
                        <CmpBaseButton block button-type="success"  @doClick.prevent="hSearchIntentByAccredited">
                            {{ cap($t("form.placeholders.search")) }} <i class="tim-icons icon-zoom-split"></i>
                        </CmpBaseButton>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="padding-top: 4em;">
            <div class="col-6">
                <h2> {{ cap($t("data.id-search")) }}</h2>
                <div class="row">
                    <div class="col-4">
                        <CmpBaseButton block button-type="success"  @doClick.prevent="hSearchIntentById">
                            {{ cap($t("form.placeholders.search")) }} <i class="tim-icons icon-zoom-split"></i>
                        </CmpBaseButton>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="authStore.showSearchByState" style="padding-top: 4em;">
            <div class="col-6">
                <h2> {{ cap($t("data.status-search")) }}</h2>
                <div class="row">
                    <div class="col-4">
                        <CmpBaseButton block button-type="success"  @doClick.prevent="hSearchIntentByStatus">
                            {{ cap($t("form.placeholders.search")) }} <i class="tim-icons icon-zoom-split"></i>
                        </CmpBaseButton>
                    </div>
                </div>
            </div>
        </div>
    </div>   
    </transition>
</template>

<script lang="ts">
    import { defineComponent, ref} from 'vue'
    import { useRouter } from 'vue-router'
    import { RoutePathNames } from '@/services/definitions/route-paths'
    import { useAuthStore } from '@/stores/auth'

    import useCommon from '@/services/composables/useCommon'
    import { CmpBaseButton } from '@/components'
    import { SearchTypes } from '@/services/definitions'
import { useCertificatesStore } from '@/stores/certificates'

    export default defineComponent({
        name: 'ViewHome',
        components: {
            CmpBaseButton,
        },

        setup(){
        //#region ======== DECLARATIONS & LOCAL STATE ============================================

        const authStore = useAuthStore()
        const certificatesStore = useCertificatesStore()
        const router = useRouter()

        const { cap } = useCommon()
        
        //#endregion ==========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================

        //#endregion ==========================================================================
        
        //#region ======== NAVIGATION ============================================================

        const goToCertificatesSearch = (searchType:SearchTypes = SearchTypes.Accredited ) => {
            certificatesStore.mutSearchType(searchType)
            router.push({
                name  : RoutePathNames.certificatesSearch,
            })
        }
        //#endregion ==========================================================================

        //#region ======= HELPERS =============================================================
        //#endregion ===========================================================================
        
        //#region ======== HOOKS ===============================================================
        //#endregion ===========================================================================

        //#region ======= EVENTS HANDLERS ======================================================

        const hSearchIntentByAccredited = () => goToCertificatesSearch()

        const hSearchIntentById = () => goToCertificatesSearch(SearchTypes.ID)

        const hSearchIntentByStatus = () => goToCertificatesSearch(SearchTypes.Status)

        //#endregion ===========================================================================
        
        return {
            authStore,
            cap,
            hSearchIntentByAccredited,
            hSearchIntentById,
            hSearchIntentByStatus
        }

    }

    })
</script>
