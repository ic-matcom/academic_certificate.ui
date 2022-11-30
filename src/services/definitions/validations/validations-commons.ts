import { i18n } from '@/services/i18n'
import { regex, required, min, max, numeric, email } from '@vee-validate/rules'

// https://github.com/logaretm/vee-validate/issues/2297

const { t } = i18n.global

/** Just permit words with just letters and spaces. Not allows spaces at the end.
 * The value hast to end with letters.
 */
export const regAlphaNSpaces: RegExp = /^([a-z|A-Z]+( ){0,1})+[a-z|A-Z]$/
export const regAlphaDigitsUnderscoreNDots: RegExp = /^([a-z|A-Z]+(.){0,1}(_){0,2}\d*)+[a-z|A-Z](_){0,2}\d*$/

/**
 * Strong password validation regex. Requirements are:
 * - at least two uppercase letters.
 * - at least one special case letter (!@#$&._*)
 * - at least two digits
 * - at least three lowercase letters
 * - length 8 minimum, 20 tops
 */
export const regStrongPassword: RegExp  = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&._*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,20}$/    // https://stackoverflow.com/questions/5142103/regex-to-validate-password-strength

//region ======== COMMON VALIDATIONS FIELDS RULES =======================================

export const VSchemaCommon = {

    username:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!regex(value, { regex: regAlphaDigitsUnderscoreNDots })) return t('validation.only-alpha-digits-underscore-dots')
        if (!min(value, { length: 4 })) return t('validation.min-length', { length: 4 })
        if (!max(value, { length: 26 })) return t('validation.max-length', { length: 30 })

        return true
    },
    firstName: ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!regex(value, { regex: regAlphaNSpaces })) return t('validation.only-alpha-spaces')
        if (!min(value, { length: 3 })) return t('validation.min-length', { length: 3 })
        if (!max(value, { length: 30 })) return t('validation.max-length', { length: 30 })

        return true
    },
    lastName:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!regex(value, { regex: regAlphaNSpaces })) return t('validation.only-alpha-spaces')
        if (!min(value, { length: 6 })) return t('validation.min-length', { length: 6 })
        if (!max(value, { length: 30 })) return t('validation.max-length', { length: 30 })
        return true
    },
    cell:      ( value: string ): boolean | string => {
        if (!numeric(value)) return t('validation.cellphone')           // TODO test if the user can enter a float number. If so use a regex to ensure only integres
        if (!min(value, { length: 7 })) return t('validation.min-length', { length: 7 })
        if (!max(value, { length: 8 })) return t('validation.max-length', { length: 8 })

        return true
    },
    email:     ( value: string ): boolean | string => {
        if (!email(value)) return t('validation.email')

        return true
    },
}

//endregion =============================================================================
