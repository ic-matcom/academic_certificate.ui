<template>
    <nav class="navbar navbar-expand-lg navbar-absolute"
         :class="{ 'bg-white': showMenu, 'navbar-transparent': !showMenu }">
        <div class="container-fluid">
            <!-- KEBAB & BURGER BUTTONS -->
            <div class="navbar-wrapper">
                <a class="navbar-brand" href="#">{{ routeName }}</a>
            </div>
            <button
                    class="navbar-toggler"
                    type="button"
                    @click="hMenuToggle"
                    data-toggle="collapse"
                    data-target="#navigation"
                    aria-controls="navigation-index"
                    aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-bar navbar-kebab"></span>
                <span class="navbar-toggler-bar navbar-kebab"></span>
                <span class="navbar-toggler-bar navbar-kebab"></span>
            </button>

            <!-- TODO animation is missing, watch https://github.com/BinarCode/vue2-transitions/issues/42 for including the lib -->
            <!-- ELEMENTS -->
            <div class="collapse navbar-collapse show" v-show="showMenu">
                <ul class="navbar-nav ml-auto">
                    <!-- BUTTONS -->

                    <!--  -->
                    <CmpDropdown tag="li"
                                   class="nav-item"
                                   title-tag="a"
                                   menu-classes="dropdown-navbar"
                                   :menu-on-right="true">
                        <template #title>
                            <a href="#"
                               class="dropdown-toggle nav-link"
                               data-toggle="dropdown"
                               aria-expanded="true">
                                <div class="photo"><img alt="" src="../assets/imgs/anime3.png" /></div>

                                <b class="caret d-none d-lg-block d-xl-block"></b>
                                <p class="d-lg-none">Menu</p>
                            </a>
                        </template>

                        <!-- Menu Links -->
                        <li class="nav-link" v-if="showSubMenu">
                            <a href="#" 
                               class="nav-item dropdown-item"
                               @click="hGetProfileIntent">
                               {{ common.cap( $t( 'routes.profile' )) }}
                               </a>
                        </li>
                        <li class="nav-link" v-if="showSubMenu">
                            <a href="#" class="nav-item dropdown-item">{{ common.cap( $t( 'routes.settings' )) }}</a>
                        </li>
                        <div class="dropdown-divider" v-if="showSubMenu"></div>
                        <li class="nav-link">
                            <a href="#"
                               class="nav-item dropdown-item"
                               @click="hLogOutIntent">
                                {{ common.cap( $t( 'routes.logout' )) }}
                            </a>
                        </li>
                    </CmpDropdown>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth'
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import { CmpModal, CmpDropdown } from '../components'
import { GroupRoles, RoutePaths } from '@/services/definitions'
import useCommon from '@/services/composables/useCommon'


interface INavData {
    // TODO Pass this state data to the general store / state manager code. See data below.
    showMenu: boolean
    activeNotifications: boolean

    // Do not move this from here
    searchQuery: string
    searchModalVisible: boolean
    common: any
}

export default defineComponent({
    name: 'LayBaseTopNav',
    components: {
        CmpModal,
        CmpDropdown
    },
    props: {
        
        rmode: {
            type: Number,
            default: 0,
            description: "The rmode (sets of buttons) to show in actions buttons according to the specified group roles type",
        },

    },
    data(): INavData {
        return {
            showMenu: false,
            activeNotifications: false,

            searchQuery: '',
            searchModalVisible: false,
            common: useCommon(),
        }
    },
    computed: {
        routeName(): string {
            const { name } = this.$route
            
            return this.$t('routes.' + String(name))
        },
        showSubMenu(): boolean {
            if(this.rmode === GroupRoles.Normal)
            {
                return false
            }

            return true
        }
    },
    methods: {

        //region ======== FROM STORE ============================================================

        // ...mapActions(useAuthStore, { callLogOut: 'setLoggedOut' }),
        ...mapActions(useAuthStore, ['setLoggedOut']),

        //endregion =============================================================================

        //region ======== EVENTS HANDLERS =======================================================

        hLogOutIntent(): void {
            this.setLoggedOut()
            this.$router.push(RoutePaths.login)
        },
        hGetProfileIntent(): void {
            this.$router.push(RoutePaths.profile)
        },
        hMenuToggle(): void {
            this.showMenu = !this.showMenu
        }

        //endregion =============================================================================

        //region ======== HELPERS ===============================================================
        //endregion =============================================================================
    }
})
</script>

<style scoped></style>
