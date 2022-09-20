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
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'ViewDashboard',
        components: {},
    })
</script>
