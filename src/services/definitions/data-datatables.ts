import type { IColumnHeader, IDataTableQuery } from '@/services/definitions'

// H means headers
export const PAGE_SIZE = 10

// base datatable page object, commonly used in the first datatable page request
export const queryBase: IDataTableQuery = {
    Offset:  0,
    Limit:   PAGE_SIZE,
    Orderer: 'id'
}

export const HCatalogsTable: Partial<IColumnHeader>[] = [
    { title: '', chk: true, width: 2 },
    { title: 'Id', navKey: '_id', hidden: true },
    { title: 'Name', sorting: '' },
    { title: 'Active', toCenter: true, navKey: 'isEnable', switch: true },
    { title: 'Size(MB)', navKey: 'size', width: 12, sorting: '' },
    { title: 'Items', toCenter: true, width: 10 },
    { title: 'Actions', toRight: true, width: 40 }
]

export const HStaffTable: Partial<IColumnHeader>[] = [
    {
        title: '',
        chk:   true,
        width: 2
    },

    {
        title:  'Id',
        hidden: true
    },

    {
        title:   'Img',
        navKey:  'avatarPath'
    },

    {
        title:   'Nombre',
        sorting: '',
        navKey:  'firstName'
    },

    {
        title:    'Usuario',
        toCenter: true,
        sorting:  '',
        navKey:   'username'
    },

    {
        title:    'Contacto',
        sorting: '',
        navKey:   'cell'
    },

    {
        title:    'Rol',
        toCenter: true,
        navKey:   'roleId'
    },

    {
        title:   'Actions',
        toRight: true,
        width:   40
    }
]

