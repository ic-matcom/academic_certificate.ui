<template>
    <transition appear name="page-fade">
    <div class="row">
        <div class="col-12">
            <h2>This is the dashboard</h2>
        </div>
    </div>
    </transition>
</template>

<script lang="ts">
    import { defineComponent, onMounted, onBeforeMount } from 'vue'
    import { useRouter } from 'vue-router'
    import { useToast } from 'vue-toastification'
    import { RoutePathNames } from '@/services/definitions/route-paths'
    import { useAuthStore } from '@/stores/auth'

    import useToastify from '@/services/composables/useToastify'
    import useCommon from '@/services/composables/useCommon'


    export default defineComponent({
        name: 'ViewDashboard',
        components: {},

        setup(){
        //region ======== DECLARATIONS & LOCAL STATE ============================================

        const authStore = useAuthStore()
        const router = useRouter()
        const toast = useToast() // The toast lib interface

        const { tfyAuthFail, tfyBasicSuccess, tfyBasicFail } = useToastify(toast)
        const { cap } = useCommon() 

        //#endregion ==========================================================================

        //region ======== HOOKS ===============================================================

        /**
         * setup is called before component creation, so the onMounted hook is a good time / place to
         * invoke data population method through web API request.
         */

        //endregion ===========================================================================
        return {
        }

    }

    })
</script>
