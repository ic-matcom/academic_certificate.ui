<template>

    <!-- SIDEBAR -->
    <CmpSideBarMenu :key="componentKey" :rmode="authStore.getUserGroup">
        <div id="topper-border-cont" class="mp-stylized main-panel" >

            <!-- NAV BAR -->
            <LayBaseTopNav :key="componentKey" :rmode="authStore.getUserGroup"></LayBaseTopNav>
            <!--<notifications />-->

             <!--CONTENT-->
            <div class="content">
                <slot></slot>
            </div>

            <!-- BACK 2 TOP BUTTON -->
            <CmpButtonBackTop class="position-sticky" :global="true" :pivot="160"/>

            <!-- FOOTER -->
            <LayFooterContent />
        </div>
    </CmpSideBarMenu>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'
import LayFooterContent from './LayFooterContent.vue'
import LayBaseTopNav from './LayBaseTopNav.vue'
import { CmpSideBarMenu, CmpButtonBackTop } from '@/components'
import { GroupRoles, RoutePaths } from '@/services/definitions'
import { useAuthStore } from '@/stores/auth'
import { mapActions, mapState, mapStores } from 'pinia'

export default defineComponent({
    name: 'LayBaseDashboard',
    components: {
        LayBaseTopNav,
        LayFooterContent,
        CmpSideBarMenu,
        CmpButtonBackTop,
    },
    mounted(this:any): void {
        new PerfectScrollbar('#topper-border-cont')
        if(this.authStore.isLoggedIn === true){
            this.authStore.reqUserInfo().then(() => {this.forceRerender()})
        }  
    },
    data(): any {
        return {
            componentKey: 0
        }
    },
    computed: {
        ...mapStores(useAuthStore),
    },
    methods: {

        //region ======== FROM STORE ============================================================

        //endregion =============================================================================

        //region ======== EVENTS HANDLERS =======================================================

        //endregion =============================================================================

        //region ======== HELPERS ===============================================================

        forceRerender(): void  {
            this.componentKey += 1;
        }
        //endregion =============================================================================
    }
})
</script>
