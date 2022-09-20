<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">

                <CmpCard :hasFormBackBtn="true" v-on:doClick="h_Back">
                    <p>This is the form (edit, creation and details) staff</p>
                </CmpCard>

            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { CmpCard } from '@/components'
import { RoutePathNames } from '@/services/definitions'


export default defineComponent({
    name: 'ViewFormStaff',

    components: {
        CmpCard
    },

    setup() {

        //region ======= DECLARATIONS & LOCAL STATE ===========================================

        const route = useRoute()
        const router = useRouter()
        const { fmode, id } = route.params

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================
        //#endregion ==========================================================================

        //region ======= HELPERS ==============================================================
        //endregion ===========================================================================

        //region ======= COMPUTATIONS & GETTERS ===============================================
        //endregion ===========================================================================

        //region ======= EVENTS HANDLERS ======================================================

        const h_Back = () => {
            // router.back()
            router.push({ name: RoutePathNames.staff });
        }

        //endregion ===========================================================================

        return {
            h_Back
        }
    }
})

</script>

<style scoped>
</style>
