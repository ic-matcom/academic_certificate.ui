import type { IDataListBasicResponse } from '@/services/definitions/types-common'


export interface IStaffPage extends IDataListBasicResponse {
    entityList: Array<IStaffRow>;
}

export interface IStaffRow {
    id: number,
    firstName: string,
    username: string,
    roleId: number,
    isActive: boolean,
    created: Date,
    cell: number,
    avatarPath: string
}
