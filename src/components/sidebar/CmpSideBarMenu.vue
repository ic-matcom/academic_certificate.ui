<template>

    <sidebar-menu v-model:collapsed="collapsed"
                  :menu="menu"
                  @update:collapsed="onToggleCollapse"
                  @item-click="onItemClick" />

    <div v-if="isOnMobile && !collapsed"
         class="sidebar-overlay"
         @click="collapsed = true"></div>

    <div id="container" :class="[{'collapsed' : collapsed}, {'onmobile' : isOnMobile}]">
        <slot></slot>
    </div>

</template>

<script lang="ts">
import { GroupRoles, SearchTypes } from '@/services/definitions';
import { RoutePathNames, RoutePaths } from '@/services/definitions/route-paths';
import type { TFormMode } from '@/services/definitions/types-common';

export default {
    name: 'CmpSideBarMenu',
    props: {
        
        rmode: {
            type: Number,
            default: 0,
            description: "The rmode (sets of buttons) to show in actions buttons according to the specified group roles type",
        },

    },
    data() {
        return {
            collapsed: false,
            isOnMobile: false,
        };
    },
    computed: {
        menu(): any {
            if(this.rmode === GroupRoles.CertAdmin)
            {
                return [
                    {
                        href: { path: RoutePaths.home },
                        title: this.$t( 'routes.' + RoutePathNames.home ).toUpperCase(),
                        icon: 'tim-icons icon-chart-pie-36',
                    },
                    {
                        href: {},
                        title: this.$t( 'nav.sidebar-certificates' ).toUpperCase(),
                        icon: 'fa fa-id-card',
                        child: [
                            {
                                href: { path: RoutePaths.home },
                                title: this.$t( 'nav.sidebar-query-certificates'),
                                icon: 'tim-icons icon-credit-card',
                            },
                            {
                                href: { name: RoutePathNames.certificatesCreate, params: {fmode: 'create' as TFormMode } },
                                title: this.$t('nav.sidebar-create-certificates'),
                                icon: 'tim-icons icon-send',
                            },
                        ]
                    },
                ]
            }
            else if(this.rmode === GroupRoles.UserAdmin)
            {
                return [
                    {
                        href: { path: RoutePaths.home },
                        title: this.$t( 'routes.' + RoutePathNames.home ).toUpperCase(),
                        icon: 'tim-icons icon-chart-pie-36',
                    },
                    {
                        href: {},
                        title: this.$t( 'nav.sidebar-certificates' ).toUpperCase(),
                        icon: 'fa fa-id-card',
                        child: [
                            {
                                href: { path: RoutePaths.home },
                                title: this.$t( 'nav.sidebar-query-certificates'),
                                icon: 'tim-icons icon-credit-card',
                            },
                        ]
                    },
                    {
                        href: {},
                        title: this.$t( 'nav.sidebar-people' ).toUpperCase(),
                        icon: 'fa fa-users',
                        child: [
                            {
                                href: { path: RoutePaths.usersList },
                                title: this.$t('entities.users.name'),
                                icon: 'tim-icons icon-single-02',
                            },
                            /*{
                                href: { path: RoutePaths.home },
                                title: this.$t('nav.sidebar-authorization'),
                                icon: 'tim-icons icon-badge',
                            }*/
                        ]
                    }
                ]
            }
            else if(this.rmode === GroupRoles.SDR)
            {
                return [
                    {
                        href: { path: RoutePaths.home },
                        title: this.$t( 'routes.' + RoutePathNames.home ).toUpperCase(),
                        icon: 'tim-icons icon-chart-pie-36',
                    },
                    {
                        href: {},
                        title: this.$t( 'nav.sidebar-certificates' ).toUpperCase(),
                        icon: 'fa fa-id-card',
                        child: [
                            {
                                href: { path: RoutePaths.home },
                                title: this.$t( 'nav.sidebar-query-certificates'),
                                icon: 'tim-icons icon-credit-card',
                            },
                            {
                                href: { path: RoutePaths.certificatesToValidateList},
                                title: this.$t('nav.sidebar-validate-certificates'),
                                icon: 'tim-icons icon-bank',
                            }
                        ]
                    },
                ]
            }
            else
            {
                return [
                    {
                        href: { path: RoutePaths.home },
                        title: this.$t( 'routes.' + RoutePathNames.home ).toUpperCase(),
                        icon: 'tim-icons icon-chart-pie-36',
                    },
                    {
                        href: {},
                        title: this.$t( 'nav.sidebar-certificates' ).toUpperCase(),
                        icon: 'fa fa-id-card',
                        child: [
                            {
                                href: { path: RoutePaths.home },
                                title: this.$t( 'nav.sidebar-query-certificates'),
                                icon: 'tim-icons icon-credit-card',
                            },
                        ]
                    },
                ]
            }   
        }
    },
    mounted() {
        this.onResize();
        window.addEventListener( 'resize', this.onResize );
    },
    methods: {
        onToggleCollapse( collapsed: boolean ) {
        },
        onItemClick() {
            if (this.isOnMobile) {
                this.collapsed = true;
            }
        },
        onResize() {
            if (window.innerWidth <= 991) {
                this.isOnMobile = true;
                this.collapsed = true;
            } else {
                this.isOnMobile = false;
                this.collapsed = false;
            }
        },
    },
};
</script>

<style lang="scss">


</style>
