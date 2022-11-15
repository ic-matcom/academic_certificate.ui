<template>
    <div class="mt-5 d-flex justify-content-center justify-content-sm-between">

        <!-- INFO [LEFT] -->
        <!--<div><p class="card-category">{{ `Showing ${ls.start} to ${ls.end} of ${total} entries` }}</p></div>-->
        <div><p class="card-pagination">{{ $t('data.footer-description', { start: ls.start, end: ls.end, total: total }) }}</p></div>

        <!-- BUTTONS [RIGHT] -->
        <ul class="pagination pagination-no-border">

            <!-- START ARROW -->
            <li :class="[{'disabled': ls.currentPage === 1}]"
                class="page-item prev-page">
                <a aria-label="Previous" class="page-link" @click="h_arrowClick(0)">
                    <i aria-hidden="true" class="tim-icons icon-double-left"></i>
                </a>
            </li>

            <div v-if="ls.currentGroup > 1" class="pt-1"><p class="mb-0">...</p></div>

            <!-- BUTTONS PAGES -->
            <template v-for="(page, index) in ls.displayedPages" :key="`displayed-page-${index}`">
                <li class="page-item" :class="[{'active': ls.currentPos === index}]" >
                    <a class="page-link" @click.prevent="h_pageClick(index)">{{ page }}</a>
                </li>
            </template>

            <div v-if="ls.currentGroup < totalGroups" class="pt-1"><p class="mb-0">...</p></div>

            <!-- END ARROW -->
            <li :class="[{'disabled': ls.currentPage === totalPages}]"
                class="page-item page-pre next-page">
                <a aria-label="Next" class="page-link" @click="h_arrowClick(4)">
                    <i aria-hidden="true" class="tim-icons icon-double-right"></i>
                </a>
            </li>

        </ul>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, reactive, watch } from 'vue'
    import type { ComputedRef, SetupContext } from 'vue'


    export default defineComponent({
        name: 'CmpTablePagination',
        props: {
            size: {
                type: Number,
                default: 5,
                description: 'Selected page size to work with. This props is the LIMIT int the pagination'
            },
            total: {
                type: Number,
                description: 'The total amount of data of all records'
            }
        },
        setup (props: any, ctx: SetupContext) {
            //region ======== LOCAL TYPES ===========================================================
            interface ILState {
                currentPage: number,
                currentPos: number,
                currentGroup: number,                  // The number of the group count product of                ,
                displayedPages: Array<number>,
                start: number,
                end: number
            }
            //endregion =============================================================================

            //region ======== COMPUTATIONS & GETTERS ================================================
            const totalPages: ComputedRef<number> = computed(() =>
                props.total % props.size === 0 ? props.total / props.size : Math.floor(props.total / props.size) + 1
            )
            const totalGroups: ComputedRef<number> = computed(() =>
                totalPages.value % 5 === 0 ? totalPages.value / 5 : Math.floor(totalPages.value / 5) + 1
            )
            //endregion =============================================================================

            //region ======== DECLARATIONS & LOCAL STATE ============================================
            // ls means local state
            const ls = reactive<ILState>({
                currentPage: 1,                     // current page displayed
                currentPos: 0,                      // current position fo the page displayed
                currentGroup: 1,                    // current group displayed. Each group have five pages according, to the top of page that the pagination component can represent at the same time
                displayedPages: totalPages.value >= 5 ? [1, 2, 3, 4, 5] : Array.from({ length: totalPages.value }, (_, i) => i + 1),

                start: 1,                           // used for pagination string info
                end: props.size                     // used for pagination string info
            })
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const h_pageClick = (clickedPos: number) => {
                if (ls.currentPos === clickedPos) return

                ls.currentPos = clickedPos
                ls.currentPage = ls.displayedPages[clickedPos]
            }

            const h_arrowClick = (arrow: number) => {
                if (arrow == 0 && ls.currentPage !== 1) _goingLeft()
                else if (arrow === 4 && ls.currentPage !== totalPages.value) _goingRight()
            }
            //endregion =============================================================================

            //region ======== HELPERS ===============================================================
            const _goingLeft = () => {
                if (ls.currentPos === 0) _changePagesLeft()                    // we reach the bottom page of the group, we need to redisplay the group
                else {                                                        // just passing to previous page within the current group
                    ls.currentPos -= 1
                    ls.currentPage -=1
                }
            }
            const _goingRight = () => {
                if (ls.currentPos === 4) _changePagesRight()                   // we reach the top page of the group, we need to redisplay the group
                else {                                                        // just passing to next page within the current group
                    ls.currentPos += 1
                    ls.currentPage += 1
                }
            }

            /***
             * This method is called when we need to redisplay the pages array, 'cause page navigation on RIGHT direction (->)
             */
            const _changePagesRight = () => {
                ls.currentGroup += 1                                            // changing the group
                ls.currentPos = 0                                               // reset the pos to the first position in the current group

                const rest = totalPages.value % 5                               // we have to know if the total page to represent in the page group are even, 'cause if not, we have to refill the group with pages that belong to the group before the current

                // it isn't the first group || its the last group and the total page are multiply of five
                if ((ls.currentGroup < totalGroups.value) || (ls.currentGroup === totalGroups.value && rest === 0))
                    ls.displayedPages = ls.displayedPages.map(x => x + 5)
                else
                {
                    let arr = []

                    for (let i = rest; i < 5; i++) arr.push(ls.displayedPages[i])       // reallocation of the pages that that will be reuse from all group display array in the beginning of the new displaying array
                    for (let i = 0; i < rest; i++) arr.push(arr[arr.length - 1] + 1)    // refilling new pages (less than five) in the remaining empty position of the display array

                    ls.currentPos = 4 - rest + 1                                    // fix, setting the current pos to the correct next position in the new rearranged array
                    ls.displayedPages = arr
                }
                ls.currentPage = ls.displayedPages[ls.currentPos]
            }

            /***
             * This method is called when we need to redisplay the pages array, 'cause page navigation on LEFT direction (<-)
             */
            const _changePagesLeft = () => {
                ls.currentGroup -= 1
                ls.currentPos = 4

                if (ls.currentGroup > 1) ls.displayedPages = ls.displayedPages.map(x => x - 5)
                else if (ls.currentGroup === 1)                                                 // check if is the first group
                {
                    if (ls.displayedPages[0] !== 6) ls.currentPos = (totalPages.value % 5) - 1  // if the total page are not even (five multiply), we need to handle the positions when the pagination is back to represent the first group
                    ls.displayedPages = [1, 2, 3, 4, 5]
                }
                ls.currentPage = ls.displayedPages[ls.currentPos]
            }

            /***
             * When the computations of TotalPage change, we can call this mated for recalculate and reset the page displayed array.
             * This method reset the current Page and Pos to the correspond initial values.
             */
            const _getResetPageArray = () => {
                ls.currentPage = 1
                ls.currentPos = 0
                return totalPages.value >= 5 ? [1, 2, 3, 4, 5] : Array.from({length: totalPages.value}, (_, i) => i + 1)
            }
            //endregion =============================================================================

            //region ======== WATCHERS ==============================================================
            watch(() => [ls.currentPage, props.size], ([newPage]) => {
                ctx.emit('next', newPage)                                                           // Watching for current page and prop.size (limit) selector, if change then request the new page

                ls.start = ls.currentPage === 1 ? ls.currentPage : (ls.currentPage * props.size) - props.size + 1
                ls.end = ls.start + props.size - 1 > props.total ? props.total : ls.start + props.size - 1
            })
            watch(totalPages, () => {ls.displayedPages = _getResetPageArray()})

            //endregion =============================================================================

            return {
                ls,

                totalGroups,
                totalPages,

                h_pageClick,
                h_arrowClick
            }
        },
        emits: ['next']
    })
</script>
