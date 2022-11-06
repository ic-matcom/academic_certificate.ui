import { ALIGN_POSITION } from './types-common'
import { RoutePaths, RoutePathNames } from './route-paths'
import { HCatalogsTable, PAGE_SIZE, queryBase } from './data-datatables'
import { EntityTypes } from '@/services/definitions/enums-entities'

import type { Problem, ErrorDictionary } from '@/services/definitions/types-errors'
import type { OPSKind, Function0, Function1, IColumnHeader, IDataTableQuery, ITableChkEmit, BULK_ACTION, ById, IIndexable, IChecked, Filter, IBasicPageState, IDataListBasicResponse, FormMode, ActionKind, EntityGenericNames, IdsArray, IBulkData  } from './types-common'
import type { IStaffPage, IStaffRow } from '@/services/definitions/entities/types-staff'
import type { IUsersPage, IUsersRow, UserInfo } from '@/services/definitions/entities/types-users'


export {
    // Routes
    RoutePaths,
    RoutePathNames,

    // Data Definitions
    HCatalogsTable,
    PAGE_SIZE,
    queryBase,

    // Enums
    EntityTypes,

    // Functions & other Types
    OPSKind,
    Function0, Function1,

    // Common Types
    Problem,
    ErrorDictionary,
    IDataTableQuery, ITableChkEmit, IColumnHeader, IIndexable, IChecked, IBasicPageState, IDataListBasicResponse, IBulkData,
    ById, BULK_ACTION, Filter, FormMode, ActionKind, EntityGenericNames, IdsArray,
    ALIGN_POSITION,

    // =====  ENTITIES =====

    // staff
    IStaffPage,  IStaffRow,

    // users
    IUsersPage, IUsersRow, UserInfo

}
