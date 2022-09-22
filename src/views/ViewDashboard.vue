<template>
    <transition appear name="page-fade">
    <div class="row">
        <div class="col-12">
            <h2>{{info}}</h2>
            <h3>Id : {{id}}</h3>
            <h3>Username : {{username}}</h3>
            <h3>Name : {{name}}</h3>
        </div>
        <div><a href="#" class="button" @click="aReqUser">Get User</a></div>
    </div>
    </transition>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { useAuthStore } from '@/stores/auth'
    import { mapActions } from 'pinia'

    export default defineComponent({
        name: 'ViewDashboard',
        components: {},

        data(): any {
            return {
                info: "This is the dashboard",
                id: "",
                username: "",
                user: ""
            }        
        },

        methods:{
            //region ======== FROM STORE ============================================================

            // ...mapActions(useAuthStore, { callLogOut: 'reqUser' }),
            ...mapActions(useAuthStore, ['reqUser']),

        //endregion =============================================================================

        //region ======== Actions ============================================================
            aReqUser(): void {
            this.reqUser().then((response : any) => { this.id = response.data.user.id, this.username = response.data.user.username, this.name = response.data.user.name})
            }
        //endregion =============================================================================

        }
    })
</script>
