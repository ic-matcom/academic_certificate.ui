<template>

    <!-- LABEL -->
    <div class="form-group"
         :class="{
            'has-danger': !!errorMessage && type !== 'hidden',
            'has-success': meta.valid && type !== 'hidden',
        }">

        <slot name="label">
            <label v-if="label" class="control-label">{{ label }}</label>
        </slot>

        <!-- INPUT -->
        <!-- Wrap the multiselect component's slots inside our own slots -->
        <!-- so this component can provide a way to customize the multiselect -->
        <!-- at the time it provides support for Field forms -->
        <multiselect :options="options"
                     :placeholder="placeholder"
                     :closeOnSelect="closeOnSelect"
                     :mode="mode"
                     :max="max"
                     v-model="inputValue"
                     v-bind="$attrs"
                     @change="h_OnChangeWrap"
                     ref="selectRef">

            <!-- using 'slots props' features see here https://v3.vuejs.org/guide/component-slots.html#scoped-slots -->
            <!-- allow us to customize the render front parent component -->

            <template :v-if="$slots.customOption !== undefined" #option="{option}">
                <slot name="customOption" :option="option" />
            </template>

            <template :v-if="$slots.customTag !== undefined" #tag="{option, handleTagRemove}">
                <slot name="customTag" :option="option" :handleTagRemove="handleTagRemove" />
            </template>

            <template :v-if="$slots.customSingleLabel !== undefined" #singlelabel="{value}">
                <slot name="customSingleLabel" :value="value" />
            </template>

        </multiselect>

        <!-- Error Msg -->
        <label v-show="errorMessage" class="error">{{ errorMessage }}</label>

    </div>
</template>

<script lang="ts">
import { useField } from 'vee-validate'
import { defineComponent, ref } from 'vue'
import Multiselect from '@vueform/multiselect'


export default defineComponent({
    components: { Multiselect },
    name:       'CmpMultiselectField',
    props:      {
        name:          {
            type:        String,
            description: 'The name of the input',
            required:    true
        },
        label:         String,
        rules:         {
            type:        String,
            description: 'A vee validate global rule to apply to this input',
            default:     ''
        },
        type:          String,
        options:       {
            type:        [ Object, Array ],
            required:    true,
            description: 'Set of options to pick from'
        },
        mode:          {
            type:    String,
            default: 'single',
            validation( value: string ) {
                return [ 'single', 'multiple', 'tag' ].includes(value)
            }
        },
        max:           {
            type:        Number,
            default:     -1,
            description: 'The maximum number of options that can be selected when using multiple or tags mode. If -1 the number of options won\'t be limited.'
        },
        placeholder:   {
            type:     String,
            default:  '',
            required: false
        },
        closeOnSelect: {
            type:     Boolean,
            default:  false,
            required: false
        }
    },
    emits:      [ 'changehapend' ],
    setup( props: any, context: any ) {

        const { value: inputValue, errorMessage, handleChange, meta } = useField(
                props.name as string,
                props.rules
        )

        const selectRef = ref(null)                    // reference to the selectRef comp

        /**
         * This may come in handy when a parent component needs to trigger something after this
         * select changes
         *
         * @param e Event
         */
        const h_OnChangeWrap = ( e: any ) => {
            handleChange(e)
            context.emit('changehapend', e)
        }

        /**
         * As this component wraps the 'multi select' component, its API methods ar not reachable from others
         * parents component (of this). So this method acts like a proxy so parents component can reach / call
         * to 'multiselect.clear' API method
         *
         * check this https://github.com/vueform/multiselect#api
         */
        const clearSelection = () => {
            //@ts-ignore
            if (selectRef.value !== null) selectRef.value.clear()
        }

        return {
            selectRef,
            inputValue,
            errorMessage,
            meta,

            clearSelection,

            // handleChange,
            h_OnChangeWrap
        }
    }
})
</script>