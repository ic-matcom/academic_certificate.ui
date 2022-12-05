<!--(CASE OF USE A: want to listen to scroll position at some element of the DOM)-->
<!--step.1> import the CmpButtonBackTop component, the IScrollInfo interface and the handleScroll function-->
<!--step.2> set mandatory prop called "global" to false -->
<!--step.3> set a ref to the element in which you want to listen to the scroll and pass it to the component in the props "elem"-->
<!--step.4> assign a function to the @ scroll.passive event handle function in this case -->
<!--step.5> implement the handle function that receives the event as parameter-->
<!--step.6> assigns the result of the handleScroll function to an object of the data, said object is passed as props to the component in the props "parentInfo"-->

<!--(CASE OF USE B: want to listen to the window scroll position) -->
<!--step.2> set mandatory prop called "global" to true (default case) -->
<template>
    <transition name="back2top-bnt-fade">
        <div v-show="pivot <= infoData.scrollTop">
            <CmpBaseButton icon
                           id="back2top-btn"
                           class="ml-1"
                           buttonType="primary"
                           @doClick="hBackToTop"
                           :title="$t('btn.tip-back-top')">
                <b-icon-arrow-up />
            </CmpBaseButton>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { CmpBaseButton } from '@/components'

import type { IScrollInfo } from '@/services/definitions/types-common'


export default defineComponent({
    name: 'CmpButtonBackTop',
    components: {
        CmpBaseButton
    },
    props: {
        infoParent: {
            type: Object,
            description: 'Scroll bar info, result of the call to the handleScroll function'
        },
        elem: {
            type: [ Object, Array ],
            description: 'Ref of the parent object whose scroll is checked'
        },
        pivot: {
            type: Number,
            description: 'The button is visible when the pivot is less than scrollPos. This indicate at which position the button become visible',
            required: true
        },
        global: {
            type: Boolean,
            description: 'Consider windows position instead of an arbitrary element position',
            required: true
        }
    },
    setup( props: any ) {

        let elemData:any=null;
        let infoData: IScrollInfo = reactive<IScrollInfo>({ scrollTop: 0, offsetTop: 0 })

        onMounted(() => {
            if (props.global) {
                elemData = window
                infoData.scrollTop = window.scrollY
                window.onscroll = (() => {infoData.scrollTop = window.scrollY})
            }
            else {
                if (props.infoParent && props.elem) {
                    infoData = props.infoParent
                    elemData = props.elem
                }
                else alert('alerts.scrollInfo')
            }
        })

        const hBackToTop = ():void => {
            elemData.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }

        return {
            elemData,
            infoData,

            hBackToTop,
        }
    },

})
</script>

<style lang="scss" scoped>
</style>