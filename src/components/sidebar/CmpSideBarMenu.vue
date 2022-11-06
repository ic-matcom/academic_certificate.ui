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
import { RoutePathNames, RoutePaths } from '@/services/definitions/route-paths';

export default {
    name: 'CmpSideBarMenu',
    data() {
        return {
            menu: [
                {
                    href: { path: RoutePaths.dashboard },
                    title: this.$t( 'routes.' + RoutePathNames.dashboard ).toUpperCase(),
                    icon: 'tim-icons icon-chart-pie-36',
                },
                {
                    href: {},
                    title: this.$t( 'nav.sidebar-people' ).toUpperCase(),
                    icon: 'fa fa-users',
                    child: [
                        {
                            href: { path: RoutePaths.usersList },
                            title: RoutePathNames.users,
                            icon: 'tim-icons icon-single-02',
                        },
                        {
                            href: { path: RoutePaths.clientsList },
                            title: RoutePathNames.clients,
                            icon: 'fa fa-heartbeat',
                        },
                        {
                            href: { path: RoutePaths.authList },
                            title: RoutePathNames.auth,
                            icon: 'tim-icons icon-badge',
                        }
                    ]
                }
            ],
            collapsed: false,
            isOnMobile: false,
        };
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
