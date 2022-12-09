import { i18n } from '@/services/i18n'
import { required, min } from "@vee-validate/rules"
import { VSchemaCommon } from "./validations-commons"

const { t } = i18n.global

//region ======== SCHEMA ================================================================
export const VSchemaAuth = {
    username:  VSchemaCommon.username,
    password:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!min(value, { length: 6 })) return t('validation.min-length', { length: 6 })

        return true
    },
}
//endregion =============================================================================


//region ======== VALIDATIONS FUNCTIONS =================================================
// function vUserName (val:any, field: string) : boolean | string {

//     if (!vRequired(val)) return `The ${field} is required`
//     if (!vLengthMin(val)) return `The ${field} is invalid`

//     return true
// }

// function vPassword (val:any, field: string) : boolean | string {

//     if (!vRequired(val)) return `The ${field} is required`
//     if (!vLengthMin(val)) return `The ${field} is invalid`

//     return true
// }
//endregion =============================================================================