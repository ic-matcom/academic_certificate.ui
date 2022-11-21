import axios from './api'
import config from './config'

import type { AxiosPromise } from 'axios'
import type { IUserFormData } from '@/services/definitions/types-forms'
import type { IDataTableQuery } from '../definitions/types-common'


const version = config.site.current_version
const url = `api/v${ version }/users`

export class ApiUsers {

    /**
     * Request datatable page data according to the given query parameters
     * @param queryParams Parameterized request for the entities. Contains query params such as pagination details and filter options for searching.
     */
     public static reqUsersPage( queryParams: IDataTableQuery ): AxiosPromise<void> {

        const payload = {
            limit : queryParams.Limit,
            page  : queryParams.Offset,
            sort  : `${queryParams.Orderer} ${queryParams.OrderDir}`
        }

        return axios.get(url, { params: payload })
    }

    /**
     * Invoke an api call to create a user
     * @param formData new user information
     */
     public static reqCreateUser( formData: IUserFormData ): AxiosPromise<void> {
        return axios.post(url, JSON.stringify(formData))
    }

    /**
     * Invoke an api call to get a user by id
     * @param id user identifier
     */
     public static reqGetUserById( id: number ): AxiosPromise<void> {
        return axios.get(`${ url }/${id}`)
    }

    /**
     * Invoke an api call to update a user information
     * * @param id user identifier
     * @param formData new user information
     */
     public static reqUpdateUser(id: number, formData: IUserFormData ): AxiosPromise<void> {
        return axios.put(`${ url }/${id}`,JSON.stringify(formData))
    }

    /**
     * Invoke an api call to delete a user
     * @param id user identifier
     */
     public static reqDeleteUser( id: number ): AxiosPromise<void> {
        return axios.delete(`${ url }/${id}`)
    }

}

    

    

