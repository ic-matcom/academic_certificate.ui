<template>
    <div class="form-group">

        <!-- INPUT -->
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input"
                       type="checkbox"
                       v-bind="$attrs"
                       :checked="value"
                       @change="hdlChange">
                <span class="form-check-sign"></span>{{ value ? labels[0] : labels[1] }}
            </label>
        </div>
    </div>
</template>

<script lang="ts">
    import { useField } from "vee-validate"
    import { defineComponent } from 'vue'


    export default defineComponent({
        name: 'CmpBasicCheckbox',
        props: {
            name: {
                type: String,
                description: "The name of the input"
            },
            checked: {
                type: Boolean,
                description: "Input value"
            },
            labels: {
                type: Array,
                description: "Labels for when the value is true (position 0) or when is false (position 1)"
            }
        },
        setup (props, _) {

            //region ======== DECLARATIONS & LOCAL STATE ============================================
            const { value, handleChange } = useField(props.name as string, "", { initialValue: props.checked })
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const hdlChange = (evt: Event) => {
                // @ts-ignore
                handleChange(evt.target!.checked)
            }
            //endregion =============================================================================

            return {

                value,
                hdlChange
            }
        }
    })
</script>