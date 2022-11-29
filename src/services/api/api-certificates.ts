import axios from './api'
import config from './config'

import type { AxiosPromise } from 'axios'
import type { ICertificateFormData, IUserFormData } from '@/services/definitions/types-forms'
import type { IDataTableQuery } from '../definitions/types-common'
import useFactory from '../composables/useFactory'
import { Chaincode, HTTP_RESPONSES, type ICertificateDto, type ICertificatesPage } from '../definitions'
import { transformCertificateForm } from '../helpers/help-forms'


const version = config.site.current_version
const url = `api/v${ version }/dapp/certificates`
const { mkCertificate } = useFactory()

/***
 * REST API class for backend interaction logic related with Certificates
 */
export class ApiCertificates {

    //#region ======= SERVER INTERACTION METHODS (PROMISES / REQUESTS) ====================
    
    /**
     * Create / insert a new certificate on the system
     *
     * @param certificate
     */
     public static insertCertificate( certificate: ICertificateFormData ): AxiosPromise<void> {
        return axios.post(url + "?channel=mychannel&chaincode=certificate&signer=User1", JSON.stringify(certificate))
    }

    /**
     * Request datatable page data according to the given query parameters
     * @param queryParams Parameterized request for the entities. Contains query params such as pagination details and filter options for searching.
     */
     public static getCertificatesPageById(id: string ): AxiosPromise<void> {
        const payload = {
            ...Chaincode
        }
        
        return axios.get(url  + `/${id}`, { params: payload })
    }

    /**
     * Request datatable page data according to the given query parameters
     * @param queryParams Parameterized request for the entities. Contains query params such as pagination details and filter options for searching.
     */
     public static getCertificatesPageByStatus( queryParams: IDataTableQuery, status: number ): AxiosPromise<ICertificatesPage> {

        const payload = {
            page_limit  : queryParams.Limit - 5,
            ...Chaincode
        }

        return axios.get(url + "_by_state/" + `${status}`, { params: payload })
    }

    /**
     * Request datatable page data according to the given query parameters
     * @param queryParams Parameterized request for the entities. Contains query params such as pagination details and filter options for searching.
     */
     public static getCertificatesPageByAccredited( queryParams: IDataTableQuery, accredited: string ): AxiosPromise<ICertificatesPage> {
        const payload = {
            page_limit  : queryParams.Limit - 5,
            ...Chaincode
        }
        return axios.get(url + "_by_accredited/" + `${accredited}`, { params: payload })
    }

    /**
     * Invoke an api call to delete a certificate
     * @param id entity identifier to delete
     */
     public static deleteCertificate( id: string ): AxiosPromise<void> {
        const payload = {
            ...Chaincode
        }
        
        return axios.delete(url + `/${id}`, { params: payload })
    }

    /**
     * Invoke an api call to get a user by id
     * @param id user identifier
     */
     public static reqValidateCertificate( id: string, signed_by : string ): AxiosPromise<void> {
        const payload = {
            ID  : id,
            signed_by: signed_by,
            ...Chaincode
        }
        return axios.put(`api/v${ version }/dapp/validate_certificate`, payload)
    }

    /**
     * Invoke an api call to get a user by id
     * @param id user identifier
     */
     public static reqInvalidateCertificate( id: string , description: string): AxiosPromise<void> {
        const payload = {
            ID  : id,
            description: description,
            ...Chaincode
        }
        return axios.put(`api/v${ version }/dapp/invalidate_certificate`, payload)
    }

    /**
     * Invoke an api call to delete a user
     * @param id user identifier
     */
     public static modifyCertificate(certificate: ICertificateDto ): AxiosPromise<void> {
        const newCertificate = transformCertificateForm(certificate)
        return axios.put(url + "?channel=mychannel&chaincode=certificate&signer=User1", JSON.stringify(newCertificate))
    }

    //endregion ===========================================================================

    //#region ======= DATA READY METHODS ==================================================

    /**
     * Tries to get formulary data information, pertaining to a Staff given its identifier.
     * ❗ If information from server could not be obtained, an empty Entity will be returned then
     *
     * @param id staff identifier
     */
     /*public static async getStaffById( id: number ): Promise<IDtoStaff> {
        const response = await ApiCertificates.reqCertificatesById(+id)

        if (response.status === HTTP_RESPONSES.OK) return response.data as ICertificateDto
        return mkCertificate
        ()
    }*/

    //endregion ===========================================================================

}

    

    

