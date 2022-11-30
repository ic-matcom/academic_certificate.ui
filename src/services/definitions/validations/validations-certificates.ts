import { i18n } from '@/services/i18n'
import { min, regex, required } from '@vee-validate/rules'
import { regStrongPassword, VSchemaCommon } from '@/services/definitions/validations/validations-commons'

const { t } = i18n.global

/**
 * User validation schema. Prepare to be used with Vee-validate lib when creating a new User
 * The 'creating' part is important, 'cause when the form is on creation mode, the pass field should
 * be required as we are creating a new User, so we need a password
 */
export const VSchemaCertificateCreate = {

}

export const VSchemaCertificateEdit = {

}

export const VSchemaCertificateInvalidate = {
    param:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        return true
    }
}