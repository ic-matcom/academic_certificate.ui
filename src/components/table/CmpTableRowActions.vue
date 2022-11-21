<template>

    <div style="text-align: right">

        <!-- DEFAULT -->
        <!--<template v-if="mode === entityTypes.Default || mode === entityTypes.Items">-->
        <template v-if="mode === entityTypes.Default">

            <!-- btn details -->
            <button @click.prevent="$emit('detailsIntent', identifier)"
                    type="button"
                    :title="$t('btn.val-details')"
                    class="btn like btn-link btn-icon btn-fab btn-info btn-sm"
            >
                <i class="tim-icons icon-heart-2"></i>
            </button>

            <!-- btn edit -->
            <button @click.prevent="$emit('editIntent', identifier)"
                    type="button"
                    :title="$t('btn.val-edit')"
                    class="btn edit btn-link btn-icon btn-fab btn-warning btn-sm"
            >
                <i class="tim-icons icon-pencil"></i>
            </button>

            <!-- btn delete -->
            <button @click.prevent="$emit('deleteIntent', identifier)"
                    type="button"
                    :title="$t('btn.val-del')"
                    class="btn remove btn-link btn-icon btn-fab btn-danger btn-sm"
            >
                <i class="tim-icons icon-trash-simple"></i>
            </button>
        </template>

        <!-- Users  -->
        <template v-else-if="mode === entityTypes.Users">

            <!--btn edit meuns-->
            <button @click.prevent="$emit('detailsIntent', identifier)"
                    type="button"
                    :title="$t('btn.val-details')"
                    class="btn like btn-link btn-icon btn-fab btn-info btn-sm"
            >
                <i class="tim-icons icon-calendar-60"></i>
            </button>

            <!-- btn edit stores -->
            <button @click.prevent="$emit('editIntent', identifier)"
                    type="button"
                    :title="$t('btn.val-edit')"
                    class="btn edit btn-link btn-icon btn-fab btn-warning btn-sm"
            >
                <i class="tim-icons icon-pencil"></i>
            </button>

            <!-- btn delete -->
            <button @click.prevent="$emit('deleteIntent', identifier)"
                    type="button"
                    :title="$t('btn.val-del')"
                    class="btn remove btn-link btn-icon btn-fab btn-danger btn-sm"
            >
                <i class="tim-icons icon-trash-simple"></i>
            </button>
        </template>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { EntityTypes } from '@/services/definitions'

import type { SetupContext } from 'vue'

export default defineComponent({
    name: 'CmpTableRowActions',
    props: {

        identifier: {
            type: Number,
            description: "Row object identifier / id",
        },

        mode: {
            type: Number,
            description: "The mode (sets of buttons) to show in actions buttons according to the specified entity type",
        },

    },

    emits: ["detailsIntent", "editIntent", "deleteIntent"],

    setup( _: any, __: SetupContext ) {
        return {
            entityTypes: EntityTypes
        }
    }
});
</script>
