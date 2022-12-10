import axios from './api'
import config from './config'

import type { AxiosPromise } from 'axios'
import type { ICertificateFormData, IUserFormData } from '@/services/definitions/types-forms'
import type { IDataTableQuery } from '../definitions/types-common'
import useFactory from '../composables/useFactory'
import type { ICertificatesPage } from '../definitions'
import { transformCertificateForm } from '../helpers/help-forms'


const version = config.site.current_version
const url = `api/v${ version }/dapp/certificates`
const urlValidate = `api/v${ version }/dapp/validate_certificate`
const urlInvalidate = `api/v${ version }/dapp/invalidate_certificate`
const chaincode = `?channel=${config.chaincode.channel}&chaincode=${config.chaincode.name}&signer=${config.chaincode.signer}`
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
        return axios.post(url + chaincode, JSON.stringify(certificate))
    }

    /**
     * Request a certificate by their id
     * @param id certificate's identifier
     */
     public static getCertificatesPageById(id: string ): AxiosPromise<void> {
        return axios.get(url  + `/${id}` + chaincode)
    }

    /**
     * Request datatable page data of certificates according to the given query parameters and the certificate status
     * @param queryParams Parameterized request for the entities. Contains query params such as pagination details and filter options for searching.
     * @param status status of the certificates to be fetched
     */
     public static getCertificatesPageByStatus( queryParams: IDataTableQuery, status: number ): AxiosPromise<ICertificatesPage> {

        const payload = {
            page_limit  : queryParams.Limit,
            bookmark: queryParams.nextPage
        }

        return axios.get(url + "_by_state/" + `${status}` + chaincode, { params: payload })
    }

    /**
     * Request datatable page data of certificates according to the given query parameters and the certificate's accredited
     * @param queryParams Parameterized request for the entities. Contains query params such as pagination details and filter options for searching.
     * @param accredited Accredited's full name
     */
     public static getCertificatesPageByAccredited( queryParams: IDataTableQuery, accredited: string ): AxiosPromise<ICertificatesPage> {
        const payload = {
            page_limit  : queryParams.Limit,
            bookmark: queryParams.nextPage
        }
        return axios.get(url + "_by_accredited/" + `${accredited}` + chaincode, { params: payload })
    }

    /**
     * Invoke an api call to delete a certificate
     * @param id entity identifier to delete
     */
     public static deleteCertificate( id: string ): AxiosPromise<void> {        
        return axios.delete(url + `/${id}` + chaincode)
    }

    /**
     * Invoke an api call to validate a certificate
     * @param id certificate's identifier
     * @param signed_by Name of the person who is validating the certificate
     */
     public static reqValidateCertificate( id: string, signed_by : string ): AxiosPromise<void> {
        const payload = {
            ID  : id,
            signed_by: signed_by,
        }
        return axios.put( urlValidate + chaincode, payload)
    }

    /**
     * Invoke an api call to invalidate a certificate
     * @param id certificate's identifier
     * @param description Invalidation reason
     */
     public static reqInvalidateCertificate( id: string , description: string): AxiosPromise<void> {
        const payload = {
            ID  : id,
            description: description,
        }
        return axios.put( urlInvalidate + chaincode, payload)
    }

    /**
     * Invoke an api call to update a certificate
     * @param certificate new data to update the certificate
     */
     public static modifyCertificate(certificate: ICertificateFormData ): AxiosPromise<void> {
        const newCertificate = transformCertificateForm(certificate)
        return axios.put(url + chaincode, JSON.stringify(newCertificate))
    }

    //endregion ===========================================================================

}

    

    

