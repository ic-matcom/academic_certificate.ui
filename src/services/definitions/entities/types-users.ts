import type { IDataListBasicResponse } from '@/services/definitions/types-common'

export interface IUsersPage extends IDataListBasicResponse {
    entityList: Array<IUsersRow>;
}

export interface IUsersRow {
    id:        number,
    email:     string,
    username:  string,
    firstname: string,
    lastname:  string
}

export type UserInfo = {
    id:        number,
    username:  string,
    firstname: string,
    lastname:  string,
    email:     string
}