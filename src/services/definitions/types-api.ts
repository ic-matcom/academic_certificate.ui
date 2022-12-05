export interface IAuthResponse {
    access_token: string
}

export interface IAuthProfileResponse {
    id:        number,
    username:  string,
    firstname: string,
    lastname:  string,
    email:     string,
    rol:       string
}

export type IUserResponseData = {
    id:         number
    email:      string
    firstname:  string
    lastname:   string
    username:   string
    rol:        string
}

export interface ICertificateResponseData {
    docType:                    string,
    ID:                         string,
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
    certificate_status:         string
}
