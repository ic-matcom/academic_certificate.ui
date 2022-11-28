<template>

    <!-- SIDEBAR -->
    <CmpSideBarMenu>
        <div id="topper-border-cont" class="mp-stylized main-panel" >

            <!-- NAV BAR -->
            <LayBaseTopNav></LayBaseTopNav>
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
    }
})
</script>
