<template>

    <!-- BUTTONS BAR -->
    <template v-if="hasTopBtnBar">
        <!-- If you need another direction of action bar function create a dynamic component here -->
        <CmpTableActionBar
                :subject="this.$props.subject"
                :entityMode="eMode"
                :groupRolMode="gRMode"
                :chkCount="Object.keys(ls_selections.selected).length"
                v-on:navCreateIntent="$emit('navCreateIntent')"
                v-on:enableChkCollIntent="h_EnableChkCollection"
                v-on:disableChkCollIntent="h_DisableChkCollection"
                v-on:removeChkCollIntent="h_RemoveChkCollection"
        />
    </template>

    <!-- SEARCH & PAGE SIZE BAR -->
    <template v-if="hasPageSizeSelector || hasSearch">
        <div class="table-action-bars col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
            <!-- TABLE PAGE SIZE -->
            <div class="select-success mb-3 m-1 pagination-select row" v-if="hasPageSizeSelector">
                <multiselect
                        v-model="pageSizeOptions.value"
                        id="table-page-size"
                        v-if="data.length > 0"
                        name="page_size"
                        closeOnSelect
                        placeholder="10"
                        :options="pageSizeOptions"
                        style="width:100px"
                        @change="h_pageSizeChange($event)"
                />
            </div>

            <!-- SEARCH INPUT -->
            <div class="form-group has-icon" v-if="hasSearch">
                <div class="mb-0 input-group">
                    <div v-if="isAnyFilerActive " class="pr-3 justify-content-left">
                        <button
                                @click.prevent="h_clearAllFilters()"
                                type="button"
                                :title="$t('form.placeholders.reset-filters')"
                                class="btn remove btn-icon btn-sm"
                        >
                            <i class="tim-icons icon-refresh-01"></i>
                        </button>
                    </div>
                    <span class="input-group-prepend" @click="h_search">
                        <div class="input-group-text">
                            <i :class="searchHasText ? 'multiselect-clear multiselect-clear-icon' : 'tim-icons icon-zoom-split'"
                               @click="h_cleanInputSearch()"
                            ></i>
                        </div>
                    </span>

                    <!--With debaunce version for trigger the event for request the new data with the search criteria-->
                    <!--<input v-model="search"-->
                    <!--       class="form-control"-->
                    <!--       type="text"-->
                    <!--       :placeholder="cap('data.ph-search')"-->
                    <!--       aria-describedby="addon-right addon-left"-->
                    <!--       @input="debounceListener"-->
                    <!--       @blur="h_onSrchBlursEvt($event)"-->
                    <!--       @focus="h_onSrchFocusEvt($event)"                           -->
                    <!--/>-->

                    <input v-model="search"
                           class="form-control"
                           type="text"
                           :placeholder="cap($t('form.placeholders.search'))"
                           aria-describedby="addon-right addon-left"
                           @blur="h_onSrchBlursEvt($event)"
                           @focus="h_onSrchFocusEvt($event)"
                           @keydown.enter="h_searchChange($event)"
                    />

                </div>
            </div>
        </div>
    </template>

    <!-- TABLE -->
    <table v-if="data.length > 0" class="table table-responsive-sm" :class="tableClass">
        <!-- TABLE HEADER -->
        <thead :class="theadClasses">
        <tr>
            <template v-for="header in ls_columns" :key="header.title">
                <!-- check all cell -->
                <th v-if="header.chk" colspan="1" rowspan="1">
                    <div class="form-check">
                        <label class="form-check-label">
                            <input
                                    class="form-check-input"
                                    type="checkbox"
                                    v-bind="$attrs"
                                    :checked="ls_rootChkBoxState"
                                    @change="h_ChkAllObjects($event)"
                            />
                            <span class="form-check-sign"></span>
                        </label>
                    </div>
                </th>

                <!-- normal header cell -->
                <th v-else-if="!header.hidden"
                    colspan="1"
                    rowspan="1"
                    :class="[
                            { 'text-right': header.toRight },
                            { 'text-left': header.toLeft },
                            { 'text-center': header.toCenter }
                        ]">

                    <!-- printing the header with i18n -->

                    {{ header.title !== '' ? $t( 'table-headers["' + header.title + '"]' ) : '' }}

                    <!-- some alternatives -->
                    <!--{{ $t( 'table-headers.' + header.title ) }}-->
                    <!--{{ $t( 'table-headers["' + header.title + '"]' ) }}-->
                    <!-- {{ header.navKey ? $t("table-headers." + header.navKey) : $t("table-headers." + header.title) }} -->

                    <!-- printing the sorters carets -->
                    <span @click.prevent="h_changeSort(header)"
                          v-if="header.sorting || header.sorting === ''"
                          class="caret-wrapper"
                    >
                            <i class="fa fa-caret-up sorter" :class="{ active: header.sorting === 'ASC' }"></i>
                            <i class="fa fa-caret-down sorter" :class="{ active: header.sorting === 'DESC' }"></i>
                    </span>
                </th>
            </template>
        </tr>

        <!-- Another row if field filters are specified -->
        <tr v-if="filters.length > 0">
            <template v-for="(header, i) in ls_columns" :key="`filter-${header.title}`" class="text-center">
                <th v-if="(header.chk || header.switch) && filters.includes(getNavKey(header))"
                    colspan="1"
                    rowspan="1"
                    :style="[{ width: header.width + '%' }]"
                >
                    <div class="form-check text-center">
                        <label class="form-check-label">
                            <input class="form-check-input"
                                   type="checkbox"
                                   v-on:editIntent="$emit('editIntent', $event)"
                                   :checked="dtFilters[getNavKey(header)]"
                                   v-model="dtFilters[getNavKey(header)]"
                                   @click="isCheckBoxSelected($event)"
                            />
                            <span class="form-check-sign"></span>
                        </label>
                    </div>
                </th>
                <th v-else-if="filters.includes(getNavKey(header)) && header.multi"
                    colspan="1"
                    rowspan="1"
                    :style="[{ width: header.width + '%' }]"
                >
                    <div class="form-group input-group">
                        <multiselect
                                v-model="dtFilters[getNavKey(header)]"
                                :options="header.multi"
                                @change="lastSelectedSelectElem($event)"
                                :ref="
                                    el => {
                                        if (el) selectFilterListRef [i] = el;
                                    }
                                "
                        />
                    </div>
                </th>
                <th v-else-if="!header.hidden"></th>
            </template>
        </tr>
        </thead>

        <!-- TABLE BODY -->
        <tbody :class="tbodyClasses">
        <tr v-for="(rowObj, index) in data" :key="index" class="d-md-table-row">

            <template v-for="(header, index) in ls_columns" :key="index">

                <!-- checkbox cell -->
                <td v-if="header.chk === true" rowspan="1" colspan="1" :style="[{ width: header.width + '%' }]">
                    <CmpTableChkbox :identifier="rowObj['id']"
                                       :checked="ls_selections.selected[rowObj['id']]"
                                       v-on:checkIntent="h_ChkObject"
                    />
                </td>

                <!-- switch / toggle mode for a cell -->
                <td v-else-if="chkHasValue(rowObj, header) && !header.hidden && header.switch"
                    rowspan="1"
                    colspan="1"
                    :style="[{ width: header.width + '%' }]"
                >
                    <!-- main role -->
                    <CmpSwitchCell :identifier="rowObj['id']"
                                   :is-enable="getRowValue(rowObj, header)"
                                   v-on:enableIntent="$emit('enableIntent', $event)"
                                   v-on:disableIntent="$emit('disableIntent', $event)"
                                   v-if="header.switchRole !== undefined && header.switchRole === 'main'"
                    />

                    <!-- secondary role | when we need two switches in the data-grid -->
                    <CmpSwitchCell :identifier="rowObj['id']"
                                   :is-enable="getRowValue(rowObj, header)"
                                   v-on:enableIntent="$emit('enableIntentSecond', $event)"
                                   v-on:disableIntent="$emit('disableIntentSecond', $event)"
                                   v-else-if="header.switchRole !== undefined && header.switchRole === 'secondary'"
                    />

                    <!-- default switch -->
                    <CmpSwitchCell :identifier="rowObj['id']"
                                   :is-enable="getRowValue(rowObj, header)"
                                   v-on:enableIntent="$emit('enableIntent', $event)"
                                   v-on:disableIntent="$emit('disableIntent', $event)"
                                   v-else
                    />


                </td>

                <!-- normal mode -->
                <td v-else-if="chkHasValue(rowObj, header) && !header.hidden"
                    rowspan="1"
                    colspan="1"
                    :class="[
                            { 'text-right': header.toRight },
                            { 'text-left': header.toLeft },
                            { 'text-center': header.toCenter }
                        ]"
                    :style="[{ width: header.width + '%' }]"
                >
                    {{ getRowValue( rowObj, header ) }}

                </td>
            </template>

            <!-- ACTIONS BUTTONS TD -->
            <td class="actions" v-if="hasActions && chkHasId(rowObj)">
                <!-- we can are going to adapt the action bar buttons according to the entity given in entityMode props -->

                <!--<CmpTableRowActions v-if="entityTypes.Store === entityMode || entityTypes.Menu === entityMode"-->
                <CmpTableRowActions :mode="eMode"
                                    :rmode="gRMode"
                                    :identifier="rowObj['id']"
                                    v-on:deleteIntent="$emit('deleteIntent', $event)"
                                    v-on:detailsIntent="$emit('detailsIntent', $event)"
                                    v-on:editIntent="$emit('editIntent', {...rowObj})"
                />

            </td>
        </tr>
        </tbody>
    </table>
    <CmpTableEmpty v-else />

    <!-- PAGINATION -->
    <CmpTablePagination v-if="data.length > 0 && eMode === entityTypes.Users" :size="ls_pageSize" :total="count" :mode="eMode" v-on:next="h_computePaginationData" />
    <CmpTablePagination v-else-if="eMode === entityTypes.Certificates" :size="ls_pageSize" :total="count" :dataCount="data.length" :mode="eMode" v-on:next="h_computePaginationData" />
</template>

<script lang="ts">
import { onBeforeUpdate, computed, defineComponent, toRaw, reactive, ref } from 'vue'
import CmpTablePagination from './CmpTablePagination.vue'
import CmpSwitchCell from './CmpSwitchCell.vue'
import CmpTableEmpty from './CmpTableEmpty.vue'
import CmpTableChkbox from './CmpTableChkbox.vue'
import CmpTableRowActions from './CmpTableRowActions.vue'
import CmpTableActionBar from './CmpTableActionBar.vue'
import { EntityTypes, GroupRoles, PAGE_SIZE } from '@/services/definitions'
import { CmpBaseButton } from '@/components'
import { watch } from '@vue/runtime-core'
import useCommon from '@/services/composables/useCommon'
import Multiselect from '@vueform/multiselect'

import type { SetupContext, PropType } from 'vue'
import type { ById, BULK_ACTION, IIndexable, IColumnHeader, ITableChkEmit, IChecked, IDataTableQuery, Filter  } from '@/services/definitions'


export default defineComponent({
    name: 'CmpDataTable',
    components: {
        Multiselect,
        CmpBaseButton,

        CmpTablePagination,
        CmpSwitchCell,
        CmpTableEmpty,
        CmpTableChkbox,
        CmpTableActionBar,
        CmpTableRowActions
    },
    props: {
        subject:             {
            type:        String,
            description: 'This should be the translation (❗means the translated string) value string for a specific entity of the business. This value could be used for contextualization in components tips & titles and others translations strings.',
            required:    false,
        },
        entityMode:          {
            type:        Number,
            description: 'The type of the entity that indicate the component how to adapt according with the given entity type',
            required:    true
        },
        groupRolMode:          {
            type:        Number,
            default:     GroupRoles.Normal,
            description: 'The type of permissions that indicate the component how to adapt according with the given group rol type',
        },
        columns:             {
            type:        Array,
            default:     (): IColumnHeader[] => [],
            description: 'Table columns'
        },
        count:               {
            type:        Number,
            default:     0,
            description: 'The number of all the records/document of this type of entity in the database'
        },
        data:                {
            type:        Object as PropType<IIndexable[]>,
            default:     [],
            description: 'The collection of the data for display in the table'
        },
        hasActions:          {
            type:        Boolean,
            default:     false,
            description: 'If the table has actions buttons or not'
        },
        hasTopBtnBar:        {
            type:        Boolean,
            default:     true,
            description: 'If the table has the top button bar for specific actions like creation button'
        },
        hasPageSizeSelector: {
            type:        Boolean,
            default:     true,
            description: 'If the table has the page size (limit) selector items'
        },
        hasSearch:           {
            type:        Boolean,
            default:     true,
            description: 'If the table has search field or not'
        },
        tbodyClasses:        {
            type:        String,
            default:     '',
            description: 'tbody tag css classes'
        },
        theadClasses:        {
            type:        String,
            default:     '',
            description: 'thead tag css classes'
        },
        tableType:           {
            type:        String,            // values can be 'striped' | 'hover'
            default:     '',
            description: 'Whether table is striped or hover type',

            validator( value: string ): boolean {
                const acceptedValues = [ '', 'striped', 'hover' ]
                return acceptedValues.indexOf(value) !== -1
            }
        },

        filters: {
            type:        Array,
            description: 'Array of fields to filter by',
            required:    false,
            default:     []
        }
    },
    emits: [
        'detailsIntent',                        // details, rows action event
        'deleteIntent',                         // delete, rows action event
        'editIntent',                           // edit, rows action event

        'navCreateIntent',                      // for creating new entity

        'enableIntent',
        'disableIntent',
        'enableIntentSecond',
        'disableIntentSecond',

        'bulkActionIntent',

        'requestIntent'                        // make a request of data, normally using a IDataTableQuery object as parameter with the event emission
    ],

    setup( props: any, ctx: SetupContext ) {

        //region ======== DECLARATIONS & LOCAL STATE ============================================

        const pageSizeOptions = { '10': 10, '25': 25, '50': 50, '100': 100 }                      // pagination size (options) data
        const ls_selections = reactive<{ selected: ById<IChecked> }>({ selected: {} })            // ls =  local state
        const ls_rootChkBoxState = ref<boolean>(false)
        const ls_pageSize = ref<number>(PAGE_SIZE)
        const ls_columns = ref<Array<Partial<IColumnHeader>>>([ ...props.columns ])
        const lastSelectedSelectElemRef = ref<number>(0)                                          // Receive the value of item selected in select component
        const isAnyCheckboxSelectedRef = ref<boolean>(false)                                      //  True if at least, one checkbox component filter was selected
        const selectFilterListRef = <any> ref([])                                                 // reference to any select component filter
        let ls_dtQueryData: IDataTableQuery = {
            Offset: 0,
            Limit: PAGE_SIZE,
            Orderer: 'id',
            Search: '',
            OrderDir: 'ASC',
            nextPage: ''
        }
        const eMode = toRaw(props.entityMode)                                                       // Returns the raw, original object of a reactive or readonly proxy. This is an escape hatch that can be used to temporarily read without incurring proxy access/tracking overhead or write without triggering changes.
        const gRMode = toRaw(props.groupRolMode)
        const search = ref('')
        const { cap } = useCommon()
        const dtFilters = reactive<any>({})                                                      // Store the datatable filters

        //endregion =============================================================================

        //region ======== HOOKS =================================================================

        /***
         * Make sure to reset the refs before each update.
         */
        onBeforeUpdate(() => {
            selectFilterListRef.value = []
        })

        //endregion =============================================================================

        //region ======== COMPUTATIONS & GETTERS ================================================

        const tableClass = computed((): string => props.tableType && `table-${ props.tableType }`)
        const searchHasText = computed(() => search.value.length > 0)

        //endregion =============================================================================

        //region ======== EVENTS HANDLERS =======================================================

        const h_onSrchFocusEvt = ( evt: any ) => {
            if (evt.target.value.length < 4) inputToggleFocusClass(evt.target.parentElement.parentNode)
        }

        const h_onSrchBlursEvt = ( evt: any ) => {
            if (evt.target.value.length < 4) inputToggleFocusClass(evt.target.parentElement.parentNode)
        }

        const h_ChkAllObjects = ( evt: any ) => {
            ls_selections.selected = updateChckAllToSelection(evt.target.checked, props.data)
        }

        const h_ChkObject = ( args: ITableChkEmit ) => {
            updateChkSelection(ls_selections.selected, args)
        }

        const h_EnableChkCollection = () => {
            ctx.emit('bulkActionIntent', {
                ids: [ ...Object.keys(ls_selections.selected) ],
                actionType: 'ENABLE' as BULK_ACTION
            })
            cleanCheckBoxes()
        }

        const h_DisableChkCollection = () => {
            ctx.emit('bulkActionIntent', {
                ids: [ ...Object.keys(ls_selections.selected) ],
                actionType: 'DISABLE' as BULK_ACTION
            })
            cleanCheckBoxes()
        }

        const h_RemoveChkCollection = () => {
            ctx.emit('bulkActionIntent', {
                ids: [ ...Object.keys(ls_selections.selected) ],
                actionType: 'REMOVE' as BULK_ACTION
            })
            cleanCheckBoxes()
        }

        const h_pageSizeChange = ( evt: any ) => {
            ls_pageSize.value = +evt
            if (ls_pageSize.value === 0) {
                ls_pageSize.value = PAGE_SIZE
            }
        }

        const h_computePaginationData = ( nextPage: number ) => {
            ls_dtQueryData.Offset = nextPage == 1 ? 0 : nextPage //* ls_pageSize.value - ls_pageSize.value
            ls_dtQueryData.Limit = ls_pageSize.value

            ctx.emit('requestIntent', ls_dtQueryData)
        }

        /***
         * Update sorting information of the headers/columns array (IColumnHeader [])
         * @param clickedSortHeader Clicked header/column object
         */
        const h_changeSort = ( clickedSortHeader: Partial<IColumnHeader> ) => {
            ls_columns.value = ls_columns.value.map<Partial<IColumnHeader>>(header => {
                if (header.title === clickedSortHeader.title && header.sorting !== undefined) {
                    switch (header.sorting) {
                        case 'ASC':
                            header.sorting = 'DESC'
                            break
                        case 'DESC':
                            header.sorting = ''
                            break
                        case '':
                            header.sorting = 'ASC'
                            break
                    }
                    let key = getNavKey(header)
                    // Handling the orderer as API expects it:
                    // CamelCase with first letter caps.
                    // Specially handling the 'id' header,
                    // hopefully this is the only corner case
                    if (key !== 'id') {
                        key = key.replace(/^\w/, c => c.toUpperCase())
                    }
                    ls_dtQueryData.Orderer = key
                    ls_dtQueryData.OrderDir = header.sorting

                    ctx.emit('requestIntent', ls_dtQueryData)
                }
                else if (header.sorting !== undefined) header.sorting = ''

                return header
            })
        }

        const h_searchChange = ( evt: any ) => {
            ls_dtQueryData.Search = evt.target.value
            ctx.emit('requestIntent', ls_dtQueryData)
        }

        const h_cleanInputSearch = () => {
            ls_dtQueryData.Search = ''
            search.value = ''
            ctx.emit('requestIntent', ls_dtQueryData)
        }

        /**
         * When the user inputs data to lookup for, in the search input this methods updates
         * the query filter data struct. This struct of data will be used as query to make the
         * request to the backend with the filters and the lookup / search terms. Finally
         * the event is emitted
         */
        function h_search() {
            const dataFilter: Filter = {}

            Object.keys(dtFilters).forEach(k => {
                if (dtFilters[ k ]) {
                    dataFilter[ `Filters[${ cap(k) }]` ] = dtFilters[ k ]
                }
            })

            ls_dtQueryData.Filters = { ...dataFilter }

            ctx.emit('requestIntent', ls_dtQueryData)
        }

        /***
         * Clean all components that has a filter setup
         */
        const h_clearAllFilters = () => {
            search.value = ''
            ls_dtQueryData.Search = ''
            isAnyCheckboxSelectedRef.value = false
            cleanCheckBoxes()

            for (let filter in dtFilters) {
                if (dtFilters[ filter ]) dtFilters[ filter ] = false
            }

            for (let elemSelect of selectFilterListRef.value) {
                if (elemSelect !== undefined) elemSelect.remove([ 0 ])
            }

            ctx.emit('requestIntent', ls_dtQueryData)
        }

        //endregion =============================================================================

        //region ======== WATCHERS ==============================================================

        // TODO we need some comment here
        watch(
                () => dtFilters,
                () => h_search(),
                { deep: true }
        )

        //endregion =============================================================================

        //region ======== HELPERS ===============================================================

        /***
         * Try to empty the selection reactive var to make unchecked all the checked rows in the table
         */
        const cleanCheckBoxes = () => {
            ls_rootChkBoxState.value = false
            ls_selections.selected = updateChckAllToSelection(false)
        }

        /***
         * If status is true, return a new selection for selecting all the object from table (the same as data). Otherwise
         * return an empty selection collection.
         *
         * @param status The new status from the root checkbox input event
         * @param data The props containing all the data represented on the table
         */
        const updateChckAllToSelection = (
                status: boolean,
                data: Array<IIndexable> | undefined = undefined
        ): ById<IChecked> => {
            ls_rootChkBoxState.value = status

            if (status)
                return data!.reduce<ById<IChecked>>(( accumulator, obj ) => {
                    accumulator[ obj.id ] = { chked: true }

                    return accumulator
                }, {})
            else return {}
        }

        /***
         * Modify the source (selected objects in the table) to update (depends of newStatus in updateData) the selected object ID
         *
         * @param source The source collection of already selected (or none) ID object
         * @param updateData ITableChkEmit data. Coming from the checked row cell, containing the object id and its new checked status.
         */
        const updateChkSelection = ( source: ById<IChecked>, updateData: ITableChkEmit ): void => {
            if (updateData.newStatus) source[ updateData.id ] = { chked: updateData.newStatus }
            else delete source[ updateData.id ]
        }

        /***
         * After the addition to this class to the element the styles applies the correct border
         * color to the form group (class) element (div)
         *
         * @param formGroupEl Div with the form-group class thet the input (event target) belongs to
         */
        const inputToggleFocusClass = ( formGroupEl: Element ) => {
            formGroupEl.classList.toggle('input-group-focus')
        }

        /***
         * Get navigation key for obtain the row object property value. Like 2D matrix['navigation_key']
         * @param column object describing the header properties
         */
        const getNavKey = ( column: Partial<IColumnHeader> ): string => {
            return column.navKey !== undefined ? column.navKey : column.title!.toLowerCase()
        }

        /***
         * Check if the row object has a value corresponding to a specific header
         * @param obj row object
         * @param column object describing the header properties
         */
        const chkHasValue = ( obj: any, column: IColumnHeader ): boolean => {
            const key = getNavKey(column)

            return obj[ key ] !== undefined
        }

        /***
         * Check if the row object has an id property
         * @param obj row object
         */
        const chkHasId = ( obj: any ): boolean => {
            return obj[ 'id' ] !== undefined
        }

        /***
         * Get the actual row object property value base on the navigation key from the column object
         * @param obj row object
         * @param column object describing the header properties
         */
        const getRowValue = ( obj: any, column: IColumnHeader ): string | number => {
            const key = getNavKey(column)
            return obj[ key ]
        }

        /**
         * Check if a item was selected in select component filter
         * @param evt
         */
        const lastSelectedSelectElem = ( evt: any ) => {
            lastSelectedSelectElemRef.value = +evt
        }

        /***
         * Check if a item was selected in checkbox component filter
         * @param evt
         */
        const isCheckBoxSelected = ( evt: any ) => {
            isAnyCheckboxSelectedRef.value = evt.target!.checked
        }

        /***
         * Check if any filter is active and returns true in case positive
         * E.g: A word on input search field, a checkbox or all checkbox selected,
         * or an item of select component
         */
        const isAnyFilerActive = computed(() => {
            let chkBoxSelected = Object.keys(ls_selections.selected).length
            return search.value.length > 0 || chkBoxSelected > 0 || lastSelectedSelectElemRef.value > 0 || isAnyCheckboxSelectedRef.value
        })

        //endregion =============================================================================

        return {

            eMode,
            gRMode,
            ls_pageSize,
            ls_selections,
            ls_rootChkBoxState,
            ls_columns,
            dtFilters,
            selectFilterListRef,
            lastSelectedSelectElemRef,
            isAnyFilerActive,
            pageSizeOptions,
            search,
            searchHasText,
            entityTypes: EntityTypes,

            getNavKey,
            chkHasValue,
            getRowValue,
            chkHasId,

            h_onSrchFocusEvt,
            h_onSrchBlursEvt,

            h_ChkObject,
            h_ChkAllObjects,
            h_cleanInputSearch,
            h_pageSizeChange,
            h_EnableChkCollection,
            h_DisableChkCollection,
            h_RemoveChkCollection,
            h_computePaginationData,
            h_changeSort,
            h_searchChange,
            h_search,
            h_clearAllFilters,

            // ...useDebaunce(h_searchChange),

            lastSelectedSelectElem,
            isCheckBoxSelected,
            tableClass,

            cap
        }
    }
})
</script>
