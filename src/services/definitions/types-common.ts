export interface IIndexable {
    id: number
}

export type IdsArray = { ids: Array<number> }

export interface IChecked {
    chked: boolean
}

/***
 * Generic type for a non param function
 */
export interface Function0<T = void> {
    (): T
}

/***
 * Generic type for a functions with one parameter
 */
export interface Function1<T1, T2 = void> {
    ( param1: T1 ): T2
}

/***
 * Interface to describe object for datatable headers abstraction.
 * This create a flexible configuration for describing how to handle the headers and cell representation.
 */
export interface IColumnHeader {
    hidden: boolean | undefined
    /**
     * Define a checkbox cell / header
     */
    chk: boolean | undefined
    /**
     * Defines a multiselect cell
     */
    multi?: Array<{ value: any, label: string }>
    title: string
    /**
     * To be uses as tips / hints / help right int the UI. Right now, we have not components making uses of that.
     */
    hint: string
    /**
     * So v-for can navigate in the data array. if isn't present, lower-cased title be use then. It comes in handy when we have a user friendly title different from the real key
     */
    navKey: string | undefined
    toLeft: boolean | undefined
    toRight: boolean | undefined
    toCenter: boolean | undefined
    /**
     * percent (%)
     */
    width: number | undefined
    /**
     * If we can use this cell as a switch for enable / disable actions
     */
    switch: boolean | undefined
    /**
     * This type property defines the roles for witches. It may comes in handy when we need more than one
     * switches in the data-grid, this way we can make a distinction for emitting the events from
     * the data-grid
     */
    switchRole: TSwitchRole | undefined
    /**
     * Sorting information of the header
     */
    sorting: SortDir | undefined
}

/***
 * Describe a dictionary mapped by the object ids or keys
 */
export type ById<T> = {
    [ id: number ]: T
}

/***
 * A Shell or abstractions has a collection of object by array and with a dictionary mapped by the id object
 */
export type IShell<T> = {
    array: T[]
    dic: ById<T>
}

/***
 * Definition for API operations that requieres a UI toast feedback
 */
export type OPSKind = 'deletion' | 'addition' | 'update' | 'enable' | 'disable' | 'request'

/***
 * Definition for UI actions that requieres a dialog confirmations or UI feedback
 */
export type ActionKind = 'delete' | 'create' | 'update' | 'activate' | 'deactivate'

/**
 * Definition for entities forms view mode
 */
export type FormMode = 'edit' | 'create' | 'details'

/**
 * This mostly used in the dialog (Dialogfy) custom composable, as constraint type of actual business entities names
 * when those names will be pases as parameters of some kind
 */
export type EntityGenericNames = 'staff'
// export type EntityGenericNames = 'item' | 'items' | 'store' | 'stores' | 'menu' | 'menus'

/***
 * Table Top Buttons Action Bar (BULK ACTION) clicked action
 */
export type BULK_ACTION = 'ENABLE' | 'DISABLE' | 'REMOVE'

/***
 * Interface for type the emission argument object for the table's checkbox component
 */
export interface ITableChkEmit {
    id: number
    newStatus: boolean
}

/***
 * Interface for type the emission argument object for the table's bulk actions events
 */
export interface IBulkData {
    ids: string[]
    actionType: BULK_ACTION
}

export type TGetStoreEntities = {
    storeId: number
    queryParams: IDataTableQuery
}

/**
 * Generic common type for bulk / batch actions for stores related entities like items, menus, modifiers, etc
 */
export type TBulkActions = {
    ids: Array<number>
    /**
     * Store that owns the entity identifiers This can be null in some situations. E.g. in Staff's endpoint the
     * privileges are higher, so the  bulks operations can perform on item of multiple store. In this situations we can
     * filter the items by the store that owns it, this is an example when "StoreId" can be null
     */
    storeId?: number
}

/**
 * Datatable sort header direction
 */
export type SortDir = 'ASC' | 'DESC' | ''

/**
 * This type hold the base query information related to a datatable
 */
export interface IDTQueryBase {
    sortdir: SortDir
    field: string
    skip: number
    limit: number
    search: string
}

export type Filter = Record<string, string>

export interface IDataTableQuery {
    /**
     * Offset page, commonly start in 0
     */
    Offset: number

    /**
     * Size (limit) of the page, count of element to be included
     */
    Limit: number

    /**
     * Table field to {ORDER BY} for
     */
    Orderer: string

    /**
     * Order direction: ascending (ASC), descending (DSC)
     */
    OrderDir?: SortDir

    /**
     * Actual query to look for. This value is going to use to search in the
     * specified entity field
     */
    Search?: string

    /**
     * Key-Value collection of filters for the query
     */
    Filters?: Filter
}

/**
 * Definition of elements styles.
 */
export type TElementType = '' | 'success' | 'danger' | 'info' | 'warning'

export type TAlignment = {
    v: 'top' | 'bottom'
    h: 'left' | 'right' | 'center'
}

/**
 * This type define the roles for witches. It may comes in handy when we need more than one
 * switches in the data-grid, this way we can make a distinction for emitting the events from
 * the data-grid
 */
export type TSwitchRole = 'main' | 'secondary'

export const ALIGN_POSITION = {
    TOP_CENTER:    { v: 'top', h: 'center' },
    TOP_RIGHT:     { v: 'top', h: 'right' },
    TOP_LEFT:      { v: 'top', h: 'left' },
    BOTTOM_RIGHT:  { v: 'bottom', h: 'right' },
    BOTTOM_LEFT:   { v: 'bottom', h: 'left' },
    BOTTOM_CENTER: { v: 'bottom', h: 'center' }
} as {
    TOP_CENTER:     TAlignment
    TOP_RIGHT:      TAlignment
    TOP_LEFT:       TAlignment
    BOTTOM_CENTER:  TAlignment
    BOTTOM_LEFT:    TAlignment
    BOTTOM_RIGHT:   TAlignment
}

/**
 * Definition of elements referring to scroll information
 */
export interface IScrollInfo {
    /**
     * distance of the current element from the top edge of the node
     */
    offsetTop: number;
    /**
     * gets or sets the number of pixels that the content of an element has been scrolled up
     */
    scrollTop: number;
}

/**
 * Describe the basic (but incomplete) data of a data-table page view. The field regarding of the type of the entity
 * is missing this interface can be adapted to any case
 */
export interface IDataListBasicResponse {
    totalRecords: number                  // Total entity count on the entire system
}

/**
 * We are handling the data-table paging  data in the store (Pinia) so we need to store pagination related data in the
 * store for each entity. Optionally we can handle the pagination data in the View local store using the Vue native
 * 'reactive' method
 */
export interface IBasicPageState {
    pageNumber: number,
    pageSize: number,
    totalRecords: number                  // Total entity count on the entire system
}
