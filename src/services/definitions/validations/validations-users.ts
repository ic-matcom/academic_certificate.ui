import { i18n } from '@/services/i18n'
import { min, required } from '@vee-validate/rules'
import { VSchemaCommon } from '@/services/definitions/validations/validations-commons'

const { t } = i18n.global

/**
 * User validation schema. Prepare to be used with Vee-validate lib when creating a new User
 * The 'creating' part is important, 'cause when the form is on creation mode, the pass field should
 * be required as we are creating a new User, so we need a password
 */
export const VSchemaUserCreate = {
    firstname: VSchemaCommon.firstName,
    lastname:  VSchemaCommon.lastName,
    username:  VSchemaCommon.username,
    email:     VSchemaCommon.email,
    passphrase:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!min(value, { length: 6 })) return t('validation.min-length', { length: 6 })

        return true
    },
    rol: (value: string): boolean | string => 
    {
        if (!required(value)) return t('validation.required')
        return true
    }
}

export const VSchemaUserEdit = {
    firstname: VSchemaCommon.firstName,
    lastname:  VSchemaCommon.lastName,
    username:  VSchemaCommon.username,
    email:     VSchemaCommon.email,
    passphrase:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!min(value, { length: 6 })) return t('validation.min-length', { length: 6 })

        return true
    },
    rol: (value: string): boolean | string => 
    {
        if (!required(value)) return t('validation.required')
        return true
    }
}