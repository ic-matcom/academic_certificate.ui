<template>
    <div class="form-check">
        <label class="form-check-label">
            <input class="form-check-input" v-bind="$attrs" type="checkbox" @change="h_ChkChange">
        <span class="form-check-sign"></span>
        </label>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import type { ITableChkEmit } from '@/services/definitions'


    export default defineComponent({
        name: 'CmpTableChkbox',
        props: {
            identifier: {
                type: Number,
                description: 'Row object identifier/id'
            }
        },
        methods: {
            h_ChkChange (evt: Event) {
                // @ts-ignore
                this.$emit('checkIntent', { newStatus: evt.target!.checked, id: this.identifier } as ITableChkEmit)
            }
        },
        emits: ['checkIntent']
    })
</script>
