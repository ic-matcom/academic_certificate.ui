<template>
    <component :is="tag" class="dropdown" :class="{show:isOpen}" @click.prevent="hToggleDropdown" v-click-outside="closeDropDown">

        <slot name="title-container" :is-open="isOpen">
            <component :is="titleTag"
                       class="dropdown-toggle btn-rotate"
                       :class="titleClasses"
                       :aria-expanded="isOpen"
                       :aria-label="title || ariaLabel"
                       data-toggle="dropdown">

                <slot name="title" :is-open="isOpen">
                    <i :class="icon"></i>
                    {{title}}
                </slot>

            </component>
        </slot>

        <ul class="dropdown-menu" :class="[{show:isOpen}, {'dropdown-menu-right': menuOnRight}, menuClasses]">
            <slot></slot>
        </ul>

    </component>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'


    export default defineComponent({
        name: 'CmpDropdown',
        props: {
            tag: {
                type: String,
                default: 'div',
                description: 'Dropdown html tag (e.g div, ul etc)'
            },
            titleTag: {
                type: String,
                default: 'button',
                description: 'Dropdown title (toggle) html tag'
            },
            title: {
                type: String,
                description: 'Dropdown title'
            },
            icon: {
                type: String,
                description: 'Dropdown icon'
            },
            titleClasses: {
                type: [String, Object, Array],
                description: 'Title css classes'
            },
            menuClasses: {
                type: [String, Object],
                description: 'Menu css classes'
            },
            menuOnRight: {
                type: Boolean,
                description: 'Whether menu should appear on the right'
            },
            ariaLabel: String
        },
        data () {
            return {
                isOpen: false
            }
        },
        emits: ['change'],
        methods: {
            hToggleDropdown (): void {
                this.isOpen = !this.isOpen
                this.$emit('change', this.isOpen)           // emit a generic event 'cause this is a generic component
            },
            closeDropDown () {
                this.isOpen = false
                this.$emit('change', false)                 // emit a generic event 'cause this is a generic component
            }
        }
    })
</script>
