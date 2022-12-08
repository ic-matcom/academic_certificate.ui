import { i18n } from '@/services/i18n'
import { max, min, numeric, regex, required } from '@vee-validate/rules'
import { regAlphaNSpaces, regStrongPassword, VSchemaCommon } from '@/services/definitions/validations/validations-commons'

const { t } = i18n.global

/**
 * User validation schema. Prepare to be used with Vee-validate lib when creating a new User
 * The 'creating' part is important, 'cause when the form is on creation mode, the pass field should
 * be required as we are creating a new User, so we need a password
 */
export const VSchemaCertificateCreate = {
    certification:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!regex(value, { regex: regAlphaNSpaces })) return t('validation.only-alpha-spaces')
        return true
    },
    emitter:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!regex(value, { regex: regAlphaNSpaces })) return t('validation.only-alpha-spaces')
        return true
    },
    accredited:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!regex(value, { regex: regAlphaNSpaces })) return t('validation.only-alpha-spaces')
        if (!min(value, { length: 6 })) return t('validation.min-length', { length: 6 })
        if (!max(value, { length: 30 })) return t('validation.max-length', { length: 30 })
        return true
    },
    created_by:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!regex(value, { regex: regAlphaNSpaces })) return t('validation.only-alpha-spaces')
        if (!min(value, { length: 6 })) return t('validation.min-length', { length: 6 })
        if (!max(value, { length: 30 })) return t('validation.max-length', { length: 30 })
        return true
    },
    volume_folio_faculty: ( value: string ): boolean | string => {
        if (!numeric(value)) return t('validation.cellphone')  
        if (!min(value, { length: 3 })) return t('validation.min-length', { length: 3 })
        if (!max(value, { length: 5 })) return t('validation.max-length', { length: 5 })

        return true
    },
    volume_folio_university: ( value: string ): boolean | string => {
        if (!numeric(value)) return t('validation.cellphone')    
        if (!min(value, { length: 3 })) return t('validation.min-length', { length: 3 })
        if (!max(value, { length: 5 })) return t('validation.max-length', { length: 5 })

        return true
    },
}

export const VSchemaCertificateEdit = {
    certification:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!regex(value, { regex: regAlphaNSpaces })) return t('validation.only-alpha-spaces')
        return true
    },
    emitter:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!regex(value, { regex: regAlphaNSpaces })) return t('validation.only-alpha-spaces')
        return true
    },
    accredited:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!regex(value, { regex: regAlphaNSpaces })) return t('validation.only-alpha-spaces')
        if (!min(value, { length: 6 })) return t('validation.min-length', { length: 6 })
        if (!max(value, { length: 30 })) return t('validation.max-length', { length: 30 })
        return true
    }
}

export const VSchemaCertificateInvalidate = {
    param:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        return true
    }
}

export const VSchemaQueryCertificateByAccredited = {
    param:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!regex(value, { regex: regAlphaNSpaces })) return t('validation.only-alpha-spaces')
        if (!min(value, { length: 6 })) return t('validation.min-length', { length: 6 })
        if (!max(value, { length: 30 })) return t('validation.max-length', { length: 30 })
        return true
    }
}

export const VSchemaQueryCertificateById = {
    param:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!min(value, { length: 18 })) return t('validation.min-length', { length: 18 })
        return true
    }
}

export const VSchemaQueryCertificateByStatus = {
    param:  ( value: number ): boolean | string => {
        if (!required(value)) return t('validation.required')
        return true
    }
}

