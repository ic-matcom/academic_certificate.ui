<template>
    <div style="text-align: center">
        <!-- ENABLE -->
        <button @click.prevent="h_ToggleIsActiveIntent"
                type="button"
                class="btn like btn-link btn-icon btn-fab btn-sm"
                :class="[
                    {'btn-default': !isEnable},
                    {'btn-success': isEnable},
                    {'bnt-status-enable': isEnable}
                ]">
            <i class="tim-icons icon-check-2"></i>
        </button>

        <!-- DISABLE -->
        <button @click.prevent="h_DisableIntent"
                type="button"
                class="btn edit btn-link btn-icon btn-fab btn-sm"
                :class="[
                    {'btn-default': isEnable},
                    {'btn-warning': !isEnable},
                    {'bnt-status-disable': !isEnable}
                ]">
            <i class="tim-icons icon-simple-remove"></i>
        </button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'


    export default defineComponent({
        name: 'CmpSwitchCell',
        props: {
            identifier: {
                type: String,
                description: 'Row object identifier/id'
            },
            isEnable: {
                type: Boolean,
                description: 'The status of the row object'
            }
        },
        methods: {
            h_ToggleIsActiveIntent() {if (!this.isEnable) this.$emit('enableIntent', this.identifier)},
            h_DisableIntent() {if (this.isEnable) this.$emit('disableIntent', this.identifier)}
        }
    })
</script>

<style lang="scss" scoped>

    // This help to the intuition with the rustic enalbe/disable table icon switch, until we develop a proper switch

    .bnt-status-disable:hover,
    .bnt-status-disable:focus
    {
        cursor: none !important;
        color: #ff8d72 !important;
    }

    .bnt-status-enable:hover,
    .bnt-status-enable:focus
    {
        cursor: none !important;
        color: #00f2c3 !important;
    }
</style>
