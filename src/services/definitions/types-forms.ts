export type IAuthFormData = {
    username: string
    password: string
}

export type IQueryFormData = {
    id: string
    accredited: string
    status: string
}

export type IUserFormData = {
    email:      string
    firstname:  string
    lastname:   string
    passphrase: string
    username:   string
    rol:        string
}

export type ICertificateFormData = {
    certification:              string,
    gold_certificate:           boolean,
    emitter:                    string,
    accredited:                 string,
    date:                       string,
    created_by:                 string,
    volume_folio_faculty:       string,
    volume_folio_university:    string,
    docType:                    string,
    id:                         string,
    secretary_validating:       string,
    dean_validating:            string,
    rector_validating:          string,
    certificate_status:         number,
    invalid_reason:             string
}

export type IValidateFormData = {
    param : string
}

