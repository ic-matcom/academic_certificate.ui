<template>
    <div
        class="form-group"
        :class="{
            'input-group': hasIcon,
            'input-group-focus': isFocused,
            'has-danger': !!errorMessage && type !== 'hidden',
            'has-success': meta.valid && type !== 'hidden',
        }"
    >
        <!-- LABEL -->
        <slot name="label">
            <label v-if="label" class="control-label">{{ label }}</label>
        </slot>

        <!-- ADDON LEFT -->
        <slot name="aleft">
            <span v-if="aleftIcon" class="input-group-prepend">
                <div class="input-group-text"><i :class="aleftIcon"></i></div>
            </span>
        </slot>

        <!-- INPUT -->
        <!--:v-model.value="value"-->
        <input
            class="form-control"
            :name="name"
            :value="inputValue"
            :placeholder="placeholder"
            :type="type"
            v-bind="$attrs"
            @focus="onInputFocused"
            @input="handleChange"
            @blur="onInputBlur"
        />

        <!-- ADDON RIGHT -->
        <slot name="aright">
            <span v-if="arightIcon" class="input-group-append">
                <div class="input-group-text"><i :class="arightIcon"></i></div>
            </span>
        </slot>

        <!-- Error Msg -->
        <label v-show="errorMessage" class="error">{{ errorMessage }}</label>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useField } from 'vee-validate'
import type { SetupContext } from 'vue'

export default defineComponent({
    name: "CmpBasicInput",
    props: {
        name: {
            type: String,
            description: "The name of the input",
        },
        placeholder: String,
        label: String,
        aleftIcon: {
            type: String,
            description: "The icon to show in the left of the input",
        },
        arightIcon: {
            type: String,
            description: "The icon to show in the right of the input",
        },
        value: {
            type: [String, Number],
            description: "Input value",
        },
        rules: {
            type: String,
            description: "A vee validate global rule to apply to this input",
            default: ""
        },
        type: String,
    },
    setup(props, cntx: SetupContext) {
        // #region  ======== DECLARATIONS & LOCAL STATE ============================================
        let isFocused = ref<boolean>(false);
        const {
            value: inputValue,
            errorMessage,
            handleBlur,
            handleChange,
            meta,
        } = useField(props.name as string, props.rules, { initialValue: props.value });
        // #endregion =============================================================================

        //region ======== COMPUTATIONS & GETTERS ================================================
        const hasIcon = computed(() => {
            const { aleft, aright } = cntx.slots;
            return (
                aleft !== undefined ||
                aright !== undefined ||
                props.aleftIcon !== undefined ||
                props.arightIcon !== undefined
            );
        });
        //endregion =============================================================================

        //region ======== EVENTS HANDLERS =======================================================
        const onInputFocused = () => {
            isFocused.value = true;
        };
        const onInputBlur = () => {
            isFocused.value = false;
            handleBlur();
        };
        //endregion =============================================================================

        return {
            isFocused,
            hasIcon,

            inputValue,

            onInputFocused,
            onInputBlur,

            handleChange,
            errorMessage,
            meta,
        };
    },
});
</script>
