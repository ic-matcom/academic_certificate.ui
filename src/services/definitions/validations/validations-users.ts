import { i18n } from '@/services/i18n'
import { min, regex, required } from '@vee-validate/rules'
import { regStrongPassword, VSchemaCommon } from '@/services/definitions/validations/validations-commons'

const { t } = i18n.global

/**
 * User validation schema. Prepare to be used with Vee-validate lib when creating a new User
 * The 'creating' part is important, 'cause when the form is on creation mode, the pass field should
 * be required as we are creating a new User, so we need a password
 */
export const VSchemaUserCreate = {
    firstName: VSchemaCommon.firstName,
    lastName:  VSchemaCommon.lastName,
    username:  VSchemaCommon.username,
    email:     VSchemaCommon.email,
    password:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!min(value, { length: 6 })) return t('validation.min-length', { length: 6 })
        if (!regex(value, { regex: regStrongPassword })) return t('validation.password-complexity')
        return true
    },
    rol: (value: string): boolean | string => 
    {
        if (!required(value)) return t('validation.required')
        return true
    }
}

export const VSchemaUserEdit = {
    firstName: VSchemaCommon.firstName,
    lastName:  VSchemaCommon.lastName,
    username:  VSchemaCommon.username,
    email:     VSchemaCommon.email,
    password:  ( value: string ): boolean | string => {
        if (!regex(value, { regex: regStrongPassword })) return t('validation.password-complexity')
        return true
    },
}