<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4">
                <CmpCard :hasFormBackBtn="true" v-on:doClick="h_Back"
                         :key="componentKey" 
                         card-type="user"
                         >
                    <template v-slot:image>                                                             
                               <div class="author">
                                   <div class="block block-one"></div>
                                   <div class="block block-two"></div>
                                   <div class="block block-three"></div>
                                   <div class="block block-four"></div>
                                   <img src="../../assets/imgs/anime3.png" alt="..." class="avatar">
                                   <h4 class="title">{{user.username}}</h4>
                                   <divider/>
                                   <h3 class="title">{{user.firstname}} {{user.lastname}}</h3>
                                   <h4 class="subtitle">{{user.rol}}</h4>
                                   <p class="description">{{user.email}}</p>
                               </div>
                    </template>                                                               
                </CmpCard>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { CmpCard } from '@/components'
import { RoutePathNames } from '@/services/definitions'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia';

import useToastify from '@/services/composables/useToastify'

export default defineComponent({
    name: 'ViewProfile',

    components: {
        CmpCard
    },

    setup() {

        //region ======= DECLARATIONS & LOCAL STATE ===========================================
        const authStore = useAuthStore()

        const toast = useToast() // The toast lib interface
        const { tfyBasicFail } = useToastify(toast)

        const route = useRoute()
        const router = useRouter()

        const componentKey = ref(0);

        let user:any = null;
        ({ user } = storeToRefs(authStore))

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================
        //#endregion ==========================================================================

        //region ======= HELPERS ==============================================================

        const forceRerender = () => {
            componentKey.value += 1;
        };

        //endregion ===========================================================================

        //region ======= COMPUTATIONS & GETTERS ===============================================
        //endregion ===========================================================================

        //region ======== HOOKS ===============================================================
        
        onMounted(() => {            
            authStore.reqUserInfo().then(() => {forceRerender()}).catch(error => { tfyBasicFail(error, 'Users','request') })
        })

        //endregion ===========================================================================

        //region ======= EVENTS HANDLERS ======================================================

        const h_Back = () => {
            router.push({ name: RoutePathNames.dashboard });
        }

        //endregion ===========================================================================

        return {
            h_Back,
            user,
            componentKey
        }
    }
})

</script>

<style scoped>
</style>
