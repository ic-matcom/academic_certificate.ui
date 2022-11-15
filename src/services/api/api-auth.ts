import axios from './api'
import config from './config'
import qs from 'query-string'

import type { AxiosPromise } from 'axios'
import type { IAuthFormData } from '../definitions/types-forms'
import type { IAuthResponse } from '../definitions/types-api'


const version = config.site.current_version
const url = `api/v${ version }/auth`
//const url = `auth`


export class ApiAuth {

    /**
     * Request authentication / access to the backend
     * @param formData user credentials
     */
    public static reqAuth( formData: IAuthFormData ): AxiosPromise<IAuthResponse> {

        return axios.post(`${ url }`, JSON.stringify(formData), {
            headers: { 'Content-Type': 'application/json' }
        })
    }

    /**
     * Request logout to the backend
     */
    public static reqLogOut(): AxiosPromise<void>{
        return axios.get(`${ url }/logout`)
    }

    /**
     * Request logged user to the backend
     */
     public static reqGetUser(): AxiosPromise<any>{
        return axios.get(`${ url }/profile`)
    }

    public static setAccessToken( at: string ) {
        // @ts-ignore
        axios.defaults.headers[ 'Authorization' ] = `Bearer ${ at }`               // Setting Bearer Token
    }

    /**
     * we are not using this here 'cause Pinia has a method to reset the entire (auth) store, so we are using that
     * by now, in the auth store
     */
    public static removeAccessToken() {
        // @ts-ignore
        delete axios.defaults.headers[ 'Authorization' ]                         // Removing Bearer Token
    }

}
