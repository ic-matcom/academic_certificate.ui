<template>
    <component :is="tag"
               :button-type="tag === 'button' ? nativeType : ''"
               class="btn"
               :disabled="disabled || loading"
               :class="[
                    {'btn-round': round},
                    {'btn-block': block},
                    {'btn-icon btn-fab': icon},
                    {[`btn-${buttonType}`]: buttonType},
                    {[`btn-${size}`]: size},
                    {'btn-simple': simple},
                    {'btn-link': link},
                ]"
               @click.prevent="h_Click">

        <!-- loading slot  -->
        <slot name="loading">
            <i v-if="loading" class="fas fa-spinner fa-spin" />
        </slot>

        <!-- default slot -->
        <slot></slot>

    </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
    name:  'CmpBaseButton',
    props: {
        round:    Boolean,
        icon:     Boolean,
        block:    Boolean,
        loading:  Boolean,
        disabled: Boolean,
        simple:   {
            type:        Boolean,
            description: 'Whether button is simple (outlined)'
        },
        link:     {
            type:        Boolean,
            description: 'Whether button is a link (no borders or background)'
        },

        tag:        {
            type:        String,
            default:     'button',
            description: 'Button html tag'
        },
        buttonType: {
            type:        String,
            default:     'default',
            description: 'Button type (primary|secondary|danger|warning|success etc)'
        },
        nativeType: {
            type:        String,
            default:     'button',
            description: 'Button native type (e.g button, input etc)'
        },
        size:       {
            type:        String,
            default:     '',
            description: 'Button size (sm|lg)'
        }
    },

    methods: {
        //region ======== HANDLERS ==============================================================

        h_Click( evt: Event ) {
            this.$emit('doClick', evt)
        }

        //endregion =============================================================================
    },
    emits:   [ 'doClick' ]
})

</script>