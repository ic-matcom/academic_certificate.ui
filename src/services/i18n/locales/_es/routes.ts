import { RoutePathNames } from '@/services/definitions'

export default {
    //region ======== ROOTS =================================================================
    [ RoutePathNames.home ]: "inicio",
    [ RoutePathNames.profile   ]: 'perfil de usuario',
    logout: 'salir',
    settings: 'configuración',
    //endregion =============================================================================

    //region ======== Certificates ==============================================================
    [ RoutePathNames.certificates ]: "@:{'entities.certificates.section-name'}",
    [ RoutePathNames.certificatesSearch ]: "Consultar @:{'entities.certificates.section-name'}",
    [ RoutePathNames.certificatesToValidate]: "@:{'entities.certificates.section-name'} por validar",
    [ RoutePathNames.certificatesCreate ]: '@:crud-actions.create @:entities.certificates.section-name',
    [ RoutePathNames.certificatesDetails ]: '@:crud-actions.details @:entities.certificates.section-name',
    [ RoutePathNames.certificatesModify ]: '@:crud-actions.edit @:entities.certificates.section-name',
    [ RoutePathNames.certificatesValidate ]: '@:crud-actions.validate @:entities.certificates.section-name',
    [ RoutePathNames.certificatesInvalidate ]: '@:crud-actions.invalidate @:entities.certificates.section-name',   
    //endregion =============================================================================

    //region ======== USERS =================================================================
    [ RoutePathNames.users ]: "@:{'entities.users.section-name'}",
    [ RoutePathNames.usersCreate ]: '@:crud-actions.create @:entities.users.section-name',
    [ RoutePathNames.usersForm ]: '@:crud-actions.edition @:entities.users.section-name',
    [ RoutePathNames.usersDetails ]: '@:crud-actions.details @:entities.users.section-name',
    // [ RoutePathNames.roles ]: RoutePathNames.roles,
    //endregion =============================================================================

    //#region ======== STORES ===============================================================
    // [ RoutePathNames.stores ]: "@:{'stores.stores'}s",
    // [ RoutePathNames.storesMenus ]: "Gestión de @:{'menu.menu'}s",
    // [ RoutePathNames.storesForm ]: 'Editar @:stores.stores',
    // [ RoutePathNames.storeCreate ]: '@:crud-actions.create @:stores.stores',
    //
    // [ RoutePathNames.storeMenuDetails ]: 'Detalles de @:menu.menu',
    // [ RoutePathNames.storeMenuCreate ]: '@:crud-actions.create @:menu.menu',
    //#endregion  ===========================================================================

    //#region ======== STAFF ================================================================
    [ RoutePathNames.staff ]: "@:{'entities.staff.section-name'}",
    [ RoutePathNames.staffCreate ]: '@:crud-actions.create @:entities.staff.section-name',
    [ RoutePathNames.staffForm ]: '@:crud-actions.edition @:entities.staff.section-name',

    // [ RoutePathNames.storesMenus ]: "Gestión de @:{'menu.menu'}s",
    // [ RoutePathNames.storeMenuDetails ]: 'Detalles de @:menu.menu',
    // [ RoutePathNames.storeMenuCreate ]: '@:crud-actions.create @:menu.menu',
    //#endregion  ===========================================================================

    //#region ======== ITEMS ================================================================
    // [ RoutePathNames.items ]: "@:{'items.menu-item'}s",
    // [ RoutePathNames.itemsForm ]: 'Editar @:items.menu-item',
    // [ RoutePathNames.itemCreate ]: '@:crud-actions.create @:items.menu-item'
    //#endregion  ===========================================================================
}
