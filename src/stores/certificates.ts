import { defineStore } from 'pinia'
import { type IDataTableQuery, type IBasicPageState, type IdsArray, type ICertificatesRow, type ICertificateDto, SearchTypes, Roles } from '@/services/definitions'
import type { ICertificateFormData } from '@/services/definitions/types-forms'
import type { ICertificateResponseData } from '@/services/definitions/types-api'
import { ApiCertificates } from '@/services/api/api-certificates'
import { transformCertificateResponse } from '@/services/helpers/help-forms'
import { useAuthStore } from './auth'

export const useCertificatesStore = defineStore({
    id: 'certificates',

    persist: true,
    state: () : ICertificatesState => ({
        pageNumber:    0,
        pageSize:      0,
        totalRecords: 0,
        entityPage:   [] as ICertificatesRow[],
        certificate: {
            docType:"", 
            id:"", 
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
            certificate_status:0,
            invalid_reason:""
        },
        searchType: SearchTypes.Accredited,
        param: '',
        showTable: false,
        bookmark: ''
    }),

    /**
     * Getters are exactly the equivalent of computed values for the state of a Store |  https://pinia.vuejs.org/core-concepts/getters.html
     * as a convention, we name all the getter with a 'get' prefix
     */
    getters: {
        getCertificatesList: ( state ) : Array<ICertificatesRow> => state.entityPage,
        getEntitiesCount: ( state ) : number => state.totalRecords,
        getCertificateStatus: ( state ) : number => state.certificate.certificate_status,
        getSearchType: ( state ) : number => state.searchType,
        getParam: ( state ): string => state.param,
        getShowTable: ( state ): boolean => state.showTable
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

        /**
         * Change the values of the search type
         * @param searchType Type of the search (ID/Status/Accredited)
         */
        mutSearchType( searchType: SearchTypes)
        {
            if(searchType !== this.searchType){
                this.searchType = searchType
                if(this.showTable){
                    this.mutShowValue(false)
                }
            }
            
        },

        /**
         * Change the values of the param used in the search
         * @param param Value to be searched
         */
        mutSearchParam(param: string)
        {
            this.param = param
        },

        /**
         * Change the value of the boolean showTable
         * @param showTable indicates wether if possible or not to show the certificates table to the user
         */
        mutShowValue( showTable: boolean)
        {
            this.showTable = showTable
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

                    resolve(response.data)

                }).catch(error => {reject(error)})
            })
        },

        /**
         * Tries to get a datatable page of certificates entities from backend
         *
         * @param query query of filters and order criteria from datatable UI controls
         */
        async reqCertificatesSearch (query: IDataTableQuery) : Promise<void> {

            if(this.searchType === SearchTypes.ID)
            {
                return await this.reqCertificatesById(this.param)
            }
            else if(this.searchType == SearchTypes.Accredited)
            {
                return await this.reqCertificatesByAccredited(query, this.param)
            }
            else {
                return await this.reqCertificatesByStatus(query, +this.param)
            }
       },

       async reqCertificatesToValidateByRol(query: IDataTableQuery) : Promise<void> {

            const authStore = useAuthStore()

            if(authStore.getUserRol == Roles.secretary)
            {
                this.mutSearchType(SearchTypes.ToValidate)
                this.mutSearchParam('1')
            }
            else if (authStore.getUserRol == Roles.dean)
            {
                this.mutSearchType(SearchTypes.ToValidate)
                this.mutSearchParam('2')
            }
            else 
            {
                this.mutSearchType(SearchTypes.ToValidate)
                this.mutSearchParam('3')
            }

            return await this.reqCertificatesByStatus(query, +this.param)
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
                    this.certificate = this.entityPage[0]
                    this.totalRecords = 1
                    this.pageSize = 1
                    this.pageNumber = 1
                    this.bookmark = ''
                    
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
               ApiCertificates.getCertificatesPageByStatus(payload, this.bookmark, status)
               .then((response:any) => {
                const data = response.data.responsePayload
                if(data.fetchedRecordsCount !== 0)
                {
                    this.entityPage = transformCertificateResponse(data.records)              
                    this.totalRecords = data.records.length
                    this.pageSize = data.fetchedRecordsCount
                    this.pageNumber = payload.Offset !==0 ? payload.Offset : 1
                    this.bookmark = data.bookmark
                }
                else{
                    this.bookmark = ''
                }
                   
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
               ApiCertificates.getCertificatesPageByAccredited(payload, this.bookmark, accredited)
               .then((response:any) => {
                const data = response.data.responsePayload
                if(data.fetchedRecordsCount !== 0)
                {
                    this.entityPage = transformCertificateResponse(data.records)              
                    this.totalRecords = data.records.length
                    this.pageSize = data.fetchedRecordsCount
                    this.pageNumber = payload.Offset !==0 ? payload.Offset : 1
                    this.bookmark = data.bookmark
                }
                else{
                    this.bookmark = ''
                }       
                   
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
         * Tries to invalidate a certificate using a defined axios apis
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
        async reqModifyCertificate (data:any) : Promise<void> {
            return await new Promise<void>((resolve, reject) => {
               ApiCertificates.modifyCertificate(data)
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
    certificate: ICertificateDto,
    searchType: SearchTypes,
    param:    string,
    showTable: boolean
    bookmark: string
}

//endregion =============================================================================


