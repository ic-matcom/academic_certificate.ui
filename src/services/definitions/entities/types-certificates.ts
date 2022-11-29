import type { IDataListBasicResponse } from '@/services/definitions/types-common'

export interface ICertificatesPage extends IDataListBasicResponse {
    entityList: Array<ICertificatesRow>;
}

export interface ICertificatesRow {
    docType:                    string,
    id:                         string,
    certification:              string,
    gold_certificate:           boolean,
    emitter:                    string,
    accredited:                 string,
    date:                       string,
    created_by:                 string,
    secretary_validating:       string,
    dean_validating:            string,
    rector_validating:          string,
    volume_folio_faculty:       string,
    volume_folio_university:    string,
    certificate_status:         number
    
}

export interface ICertificateDto extends ICertificatesRow {
    invalid_reason: string
}