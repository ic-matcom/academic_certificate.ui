import { defineStore } from 'pinia'
import type { IDataTableQuery, IBasicPageState, IdsArray, ICertificatesRow, ICertificateDto } from '@/services/definitions'
import type { ICertificateFormData, IUserFormData } from '@/services/definitions/types-forms'
import type { ICertificateResponseData } from '@/services/definitions/types-api'
import { ApiCertificates } from '@/services/api/api-certificates'
import { transformCertificateResponse } from '@/services/helpers/help-forms'

export const useCertificatesStore = defineStore({
    id: 'certificates',

    state: () : ICertificatesState => ({
        pageNumber:    0,
        pageSize:      0,
        totalRecords: 0,
        entityPage:   [] as ICertificatesRow[],
        certificate: {
            docType:"", 
            ID:"", 
            certification:"",
            gold_certificate:false,
            emitter:"",
            accredited:"",
            secretary_validating:"",
            dean_validating:"",
            rector_validating:"",
            date:"",
            created_by:"",
            volume_folio_faculty:"",
            volume_folio_university:"",
            certificate_status:""
        }
    }),

    /**
     * Getters are exactly the equivalent of computed values for the state of a Store |  https://pinia.vuejs.org/core-concepts/getters.html
     * as a convention, we name all the getter with a 'get' prefix
     */
    getters: {

        getCertificatesList: ( state ) : Array<ICertificatesRow> => state.entityPage,
        getEntitiesCount: ( state ) : number => state.totalRecords
    },

    actions: {

        // ---mutators ---
        // mutates the states directly without any request call to the backend

        /**
         * Delete a certificate from the store
         * @param payload certificate identifier to be deleted
         */
        mutDeleteCertificate( payload: string ): void {
            this.entityPage = this.entityPage.filter(certificateRow => payload != certificateRow.id)
            this.totalRecords -= 1
            //this.pageSize -= payload.ids.length
        },

        // --- async calls actions ---

        /**
         * Tries to insert a new certificate
         * @param payload certificate entity data to be inserted
         */
         async reqInsertCertificate (payload: ICertificateFormData) : Promise<void> {

            return await new Promise<void>((resolve, reject) => {
                ApiCertificates.insertCertificate(payload)
                .then((response:any) => {

                    /*// we are going request the page to the backend to keep the data sync after the new successfully insertion
                    const queryData: IDataTableQuery = {
                        Offset : this.pageNumber,
                        Limit  : this.pageSize,
                        Orderer: 'id'
                    }

                    this.reqCertificatesPages(queryData)               // making the request*/

                    resolve(response.data)

                }).catch(error => {reject(error)})
            })
        },

        /**
         * Tries to get a datatable page of certificates entities by id from backend
         *
         * @param payload query of filters and order criteria from datatable UI controls
         */
        async reqCertificatesById (payload: string) : Promise<void> {

             return await new Promise<void>((resolve, reject) => {
                ApiCertificates.getCertificatesPageById(payload)
                .then((response:any) => {
                    this.entityPage = transformCertificateResponse([response.data.responsePayload])              
                    this.totalRecords = 1
                    this.pageSize = 1
                    this.pageNumber = 1
                    
                    resolve()

                }).catch(error => {
                    if (error.response.status === 404)
                    {
                        this.entityPage = []
                        this.totalRecords = 0
                        this.pageSize = 0
                        this.pageNumber = 0
                    }

                    reject(error)
                })
            })
        },

        /**
         * Tries to get a datatable page of certificates entities by status from backend
         *
         * @param payload query of filters and order criteria from datatable UI controls
         */
         async reqCertificatesByStatus (payload: IDataTableQuery, status: number) : Promise<void> {

            return await new Promise<void>((resolve, reject) => {
               ApiCertificates.getCertificatesPageByStatus(payload, status)
               .then((response:any) => {
                this.entityPage = transformCertificateResponse(response.data.records)              
                this.totalRecords = response.data.records.length
                this.pageSize = 1
                this.pageNumber = 1
                   
                resolve()

               }).catch(error => {
                   if (error.response.status === 404)
                   {
                       this.entityPage = []
                       this.totalRecords = 0
                       this.pageSize = 0
                       this.pageNumber = payload.Offset
                   }

                   reject(error)
               })
           })
       },

       /**
         * Tries to get a datatable page of certificates entities by accredited from backend
         *
         * @param payload query of filters and order criteria from datatable UI controls
         */
        async reqCertificatesByAccredited (payload: IDataTableQuery, accredited: string) : Promise<void> {

            return await new Promise<void>((resolve, reject) => {
               ApiCertificates.getCertificatesPageByAccredited(payload, accredited)
               .then((response:any) => {
                   this.entityPage = transformCertificateResponse(response.data.records)              
                   this.totalRecords = response.data.records.length
                   this.pageSize = 1
                   this.pageNumber = 1
                   
                   resolve()

               }).catch(error => {
                   if (error.response.status === 404)
                   {
                       this.entityPage = []
                       this.totalRecords = 0
                       this.pageSize = 0
                       this.pageNumber = payload.Offset
                   }

                   reject(error)
               })
           })
       },

       /**
         * Tries to validate a certificate using a defined axios apis
         * to make the actual request
         *
         * @param id certificate identifier to be validated
         * @param signed_by name of the person that is validating the certificate
         */
        async reqValidateCertificate (id: string, signed_by: string) : Promise<void> {

            return await new Promise<void>((resolve, reject) => {
               ApiCertificates.reqValidateCertificate(id,signed_by)
               .then((response:any) => {

                   const at = response.data

                   resolve()

               }).catch(error => { reject(error) })
           })
       },

       /**
         * Tries to validate a certificate using a defined axios apis
         * to make the actual request
         *
         * @param id certificate identifier to be validated
         * @param description causes of the invalidation
         */
        async reqInvalidateCertificate (id: string, description: string) : Promise<void> {

            return await new Promise<void>((resolve, reject) => {
               ApiCertificates.reqInvalidateCertificate(id,description)
               .then((response:any) => {

                   const at = response.data

                   resolve()

               }).catch(error => { reject(error) })
           })
       },

       /**
         * Tries to update a certificate using a defined axios apis
         * to make the actual request
         *
         * @param payload new user data 
         */
        async reqModifyCertificate (payload: ICertificateDto) : Promise<void> {

            return await new Promise<void>((resolve, reject) => {
               ApiCertificates.modifyCertificate(payload)
               .then((response:any) => {

                   const at = response.data

                   resolve()

               }).catch(error => { reject(error) })
           })
       },

        /**
         * Tries to delete a certificate
         * @param payload Certificate identifier to be deleted
         */
        async reqDeleteCertificate( payload: string ): Promise<void> {

            return await new Promise<void>(( resolve, reject ) => {
                ApiCertificates.deleteCertificate(payload).then(( response: any ) => {

                    // deleting (mutate / modify) the users from the local store
                    this.mutDeleteCertificate(payload)
                    resolve()

                }).catch(error => { reject(error) })
            })
        },
    }
})

//region ======== STATE INTERFACE =======================================================

interface ICertificatesState extends IBasicPageState {
    entityPage: Array<ICertificatesRow>,
    certificate: ICertificateResponseData
}

//endregion =============================================================================


