import { ALIGN_POSITION} from './types-common'
import { RoutePaths, RoutePathNames } from './route-paths'
import { Roles, GroupRoles } from './users-roles'
import { HCatalogsTable, PAGE_SIZE, queryBase } from './data-datatables'
import { EntityTypes } from '@/services/definitions/enums-entities'
import { HTTP_RESPONSES, Chaincode, SearchTypes } from '@/services/definitions/enums-common'

import { VSchemaStaffCreate, VSchemaStaffEdit } from '@/services/definitions/validations/validations-people'
import { VSchemaUserCreate, VSchemaUserEdit } from '@/services/definitions/validations/validations-users'
import { VSchemaCertificateInvalidate } from '@/services/definitions/validations/validations-certificates'
import { VSchemaCommon } from '@/services/definitions/validations/validations-commons'
import { VSchemaAuth } from '@/services/definitions/validations/validations-auth'

import type { Problem, ErrorDictionary } from '@/services/definitions/types-errors'
import type { TOPSKind, Function0, Function1, IColumnHeader, IDataTableQuery, ITableChkEmit, BULK_ACTION, ById, IIndexable, IChecked, Filter, IBasicPageState, IDataListBasicResponse, TFormMode, TActionKind, EntityGenericNames, IdsArray, IBulkData, IMultiselectBasic, IShell, IScrollInfo  } from './types-common'
import type { IStaffPage, IStaffRow, IStaffDto } from '@/services/definitions/entities/types-staff'
import type { IUsersPage, IUsersRow, UserInfo, IRol} from '@/services/definitions/entities/types-users'
import type { ICertificatesPage, ICertificatesRow, ICertificateDto } from '@/services/definitions/entities/types-certificates'


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
    HTTP_RESPONSES,
    Chaincode,
    SearchTypes,

    // Functions & other Types
    TOPSKind,
    Function0, Function1,

    // Common Types
    Problem,
    ErrorDictionary,
    IDataTableQuery, ITableChkEmit, IColumnHeader, IIndexable, IChecked, IBasicPageState, IDataListBasicResponse, IBulkData, IMultiselectBasic, IShell, IScrollInfo,
    ById, BULK_ACTION, Filter, TFormMode, TActionKind, EntityGenericNames, IdsArray,
    ALIGN_POSITION,

    // Validations ... VSchema == validations schema
    VSchemaAuth, VSchemaCommon, VSchemaStaffCreate, VSchemaStaffEdit, 
    VSchemaUserCreate, VSchemaUserEdit, VSchemaCertificateInvalidate,

    // =====  ENTITIES =====

    // staff
    IStaffPage,  IStaffRow, IStaffDto,

    // users
    IUsersPage, IUsersRow, UserInfo,

    //roles
    IRol, Roles, GroupRoles,

    //certificates
    ICertificatesPage, ICertificatesRow, ICertificateDto

}
