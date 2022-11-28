import type { IDataListBasicResponse } from '@/services/definitions/types-common'


export interface IStaffPage extends IDataListBasicResponse {
    entityList: Array<IStaffRow>;
}

/**
 * Interface for describing a Staff row on the datatable
 */
export interface IStaffRow {
    id: number,
    firstName: string,
    username: string,
    roleId: number,
    isActive: boolean,
    created?: Date,                             // TODO poner como info fija "miembro desde" y hacer el cálculo
    cell: number,
    avatarPath: string
}

/**
 * Main Staff entity interface
 */
export interface IStaffDto extends IStaffRow {
    lastName: string,
    email: string,
    password? : string,
    passwordConf?: string,
    locale: string,
}