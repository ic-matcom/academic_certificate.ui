import axios from './api'
import config from './config'

import type { AxiosPromise } from 'axios'
import type { IUserFormData } from '@/services/definitions/types-forms'


const version = config.site.current_version
const url = `api/v${ version }/users`

export class ApiUsers {

    /**
     * Invoke an api call to get the list of users
     */
     public static reqGetUsers( ): AxiosPromise<void> {
        return axios.get(url)
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
     public static reqGetUserById( id: string ): AxiosPromise<void> {
        return axios.get(`${ url }/${id}`)
    }

    /**
     * Invoke an api call to update a user information
     * * @param id user identifier
     * @param formData new user information
     */
     public static reqUpdateUser(id: string, formData: IUserFormData ): AxiosPromise<void> {
        return axios.put(`${ url }/${id}`,JSON.stringify(formData))
    }

    /**
     * Invoke an api call to delete a user
     * @param id user identifier
     */
     public static reqDeleteUser( id: string ): AxiosPromise<void> {
        return axios.delete(`${ url }/${id}`)
    }

}

    

    

