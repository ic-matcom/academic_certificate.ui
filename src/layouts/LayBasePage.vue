<template>
    <div id="topper-border-cont" class="main-panel mp-stylized">
        <div class="content-page">

            <router-link class="nav-item" to="/default" tag="li">
                <!-- Trying to force, you can ask why the router-link element isn't render properly -->
                <!--<a class="nav-link">-->
                <!--    <i class="tim-icons icon-chart-pie-36"></i>-->
                <!--    <p>Testa</p>-->
                <!--</a>-->
            </router-link>

            <!-- CONTENT -->
            <slot />

        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import PerfectScrollbar from 'perfect-scrollbar'

    export default defineComponent({
        name: 'LayBasePage',
        mounted (): void {
            new PerfectScrollbar('#topper-border-cont')
        }
    })
</script>
