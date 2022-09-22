<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">
                <CmpCard>
                    <CmpDataTable table-type="hover"
                                  :entityMode="eMode"
                                  :columns="columns"
                                  :data="staffStore.getStaffList"
                                  :count="staffStore.getEntitiesCount"
                                  :has-actions="true"
                                  :filters="filters"

                                  @navCreateIntent="h_NavCreateStaff"
                                  @requestIntent="h_requestQuery"


                    >
                    </CmpDataTable>
                </CmpCard>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">

import { useRouter } from 'vue-router'
import { defineComponent, onMounted } from 'vue'
import { useStaffStore } from '@/stores/staff'
import { useToast } from 'vue-toastification'
import { HStaffTable } from '@/services/definitions/data-datatables'
import { RoutePathNames } from '@/services/definitions'
import { EntityTypes, queryBase } from '@/services/definitions'
import { CmpCard, CmpDataTable } from '@/components'
import useToastify from '@/services/composables/useToastify'

import type { FormMode, IDataTableQuery } from '@/services/definitions'


export default defineComponent({
    name: 'ViewListStaff',
    components: {
        CmpCard,
        CmpDataTable
    },
    setup() {

        //#region ======= DECLARATIONS & LOCAL STATE ==========================================

        const staffStore = useStaffStore()
        const eMode: EntityTypes = EntityTypes.Staff

        const router = useRouter()
        const toast = useToast()                                            // The toast lib interface
        const columns = HStaffTable
        const filters = [ 'storeType', 'isActive' ]

        const { tfyBasicFail } = useToastify(toast)

        //#endregion ==========================================================================

        //region ======== HOOKS ===============================================================

        /**
         * setup is called before component creation, so the onMounted hook is a good time / place to
         * invoke data population method through web API request.
         */
        onMounted(() => {
            // populate staff datatable
            staffStore.reqStaffPages(queryBase).catch(err => tfyBasicFail(err, 'Staff', 'request'))
        })

        //endregion ===========================================================================

        //#region ======= FETCHING DATA & ACTIONS =============================================

        function a_reqQuery( queryData: IDataTableQuery ) {
            staffStore.reqStaffPages(queryData).catch(err => tfyBasicFail(err, 'Staff', 'request'))
        }

        //#endregion ==========================================================================

        //#region ======= COMPUTATIONS & GETTERS ==============================================
        //#endregion ==========================================================================

        //#region ======= EVENTS HANDLERS =====================================================

        function h_NavCreateStaff() {
            router.push({
                name  : RoutePathNames.staffForm,
                params: {
                    fmode: 'create' as FormMode,
                    id   : '',
                    cname: RoutePathNames.staffCreate                                  // Translation Name of the Route, this is used when we need to specify a name programmatically, cname = custom name
                }
            })
        }

        function h_requestQuery( queryData: IDataTableQuery ) {
            a_reqQuery(queryData)
        }

        //#endregion ==========================================================================

        return {
            eMode,
            columns,
            filters,
            staffStore,

            h_NavCreateStaff,
            h_requestQuery
        }
    }

})
</script>

<style scoped>
</style>
