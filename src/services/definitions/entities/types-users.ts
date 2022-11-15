import type { IDataListBasicResponse } from '@/services/definitions/types-common'

export interface IUsersPage extends IDataListBasicResponse {
    entityList: Array<IUsersRow>;
}

export interface IUsersRow {
    email: string,
    username: string,
    firstname: string,
    lastname: string
}

export type UserInfo = {
    username: string,
    firstname: string,
    lastname: string,
    email: string
}