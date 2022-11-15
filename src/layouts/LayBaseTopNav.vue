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
                    <!-- SEARCH COMPONENT -->
                    <div class="search-bar input-group" @click="searchModalVisible = true">
                        <button class="btn btn-link"
                                id="search-button"
                                data-toggle="modal"
                                data-target="#searchModal"
                        >
                            <i class="tim-icons icon-zoom-split"></i>
                        </button>
                    </div>
                    <CmpModal
                            v-model:show="searchModalVisible"
                            class="modal-search"
                            id="searchModal"
                            :centered="false"
                            :show-close="true"
                    >
                        <template v-slot:header>
                            <input v-model="searchQuery"
                                   type="text"
                                   class="form-control"
                                   id="inlineFormInputGroup"
                                   :placeholder="$t('forms.placeholders.search').toUpperCase()"
                            />
                        </template>
                    </CmpModal>

                    <!-- BUTTONS -->

                    <!-- NOTIFICATIONS BTN DROPDOWN -->
                    <CmpDropdown tag="li" class="nav-item" title-tag="a" :menu-on-right="true">
                        <template v-slot:title>
                            <a href="#"
                               class="dropdown-toggle nav-link"
                               data-toggle="dropdown"
                               aria-expanded="true"
                            >
                                <div class="notification d-none d-lg-block d-xl-block"></div>
                                <i class="tim-icons icon-sound-wave"></i>
                                <p class="d-lg-none">
                                    New Notifications
                                </p>
                            </a>
                        </template>

                        <!-- Notifications -->
                        <li class="nav-link">
                            <a href="#" class="nav-item dropdown-item"
                            >Mike John responded to your email</a
                            >
                        </li>
                        <li class="nav-link">
                            <a href="#" class="nav-item dropdown-item">You have 5 more tasks</a>
                        </li>
                        <li class="nav-link">
                            <a href="#" class="nav-item dropdown-item">Another notification</a>
                        </li>
                    </CmpDropdown>

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
                        <li class="nav-link">
                            <a href="#" 
                               class="nav-item dropdown-item"
                               @click="hGetProfileIntent">
                               {{ common.cap( $t( 'routes.profile' )) }}
                               </a>
                        </li>
                        <li class="nav-link">
                            <a href="#" class="nav-item dropdown-item">Settings</a>
                        </li>
                        <div class="dropdown-divider"></div>
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
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { CmpModal, CmpDropdown } from '../components'
import { RoutePaths } from '@/services/definitions'
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
    data(): INavData {
        return {
            showMenu: false,
            activeNotifications: false,

            searchQuery: '',
            searchModalVisible: false,
            common: useCommon()
        }
    },
    computed: {
        routeName(): string {
            const { name } = this.$route
            const { cname } = this.$route.params // Translation Name of the Route, this is used when we need to specify a name programmatically, cname = custom name

            if (cname !== undefined && typeof cname === 'string') return this.$t('routes.' + cname)
            else return this.$t('routes.' + String(name))
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
