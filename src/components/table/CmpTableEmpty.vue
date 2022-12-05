<template>
    <div style="text-align: center" class="mb-5">
        <i class="tim-icons icon-alert-circle-exc text-success" style="font-size: 80px"></i>
        <p class="text-success mt-3">No hay contenido para mostrar</p>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'


    export default defineComponent({
        name: 'CmpTableEmpty',
        props: {},
    })
</script>
